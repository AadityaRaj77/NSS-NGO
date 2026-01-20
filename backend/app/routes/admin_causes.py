from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models.cause import Cause
from app.models.donation import Donation
from app.models.user import User
from app.schemas.cause import CauseCreate, CauseUpdate
from app.core.deps import require_admin
from datetime import datetime

router = APIRouter(prefix="/admin/causes", tags=["admin-causes"])

@router.post("")
async def create_cause(
    payload: CauseCreate,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    cause = Cause(**payload.dict(), created_by=admin.id)
    db.add(cause)
    await db.commit()
    await db.refresh(cause)
    return cause


@router.get("")
async def list_causes(
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    res = await db.execute(select(Cause).order_by(Cause.created_at.desc()))
    return res.scalars().all()


@router.patch("/{cause_id}")
async def update_cause(
    cause_id: int,
    payload: CauseUpdate,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    cause = await db.get(Cause, cause_id)
    if not cause:
        raise HTTPException(404, "Cause not found")

    for k, v in payload.dict(exclude_unset=True).items():
        setattr(cause, k, v)

    await db.commit()
    await db.refresh(cause)
    return cause

@router.get("/{cause_id}/donations")
async def admin_cause_donations(
    cause_id: int,
    sort: str = Query("date_desc"),
    from_date: datetime | None = Query(None, alias="from"),
    to_date: datetime | None = Query(None, alias="to"),
    status: str | None = Query(None),  # SUCCESS / FAILED / PENDING
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    cause = await db.get(Cause, cause_id)
    if not cause:
        raise HTTPException(404, "Cause not found")

    query = (
        select(Donation)
        .where(Donation.cause_id == cause_id)
        .options(selectinload(Donation.user).selectinload(User.profile))
    )

    if from_date:
        query = query.where(Donation.created_at >= from_date)
    if to_date:
        query = query.where(Donation.created_at <= to_date)

    if status:
        query = query.where(Donation.status == status)

    if sort == "date_asc":
        query = query.order_by(Donation.created_at.asc())
    elif sort == "amount_asc":
        query = query.order_by(Donation.amount.asc())
    elif sort == "amount_desc":
        query = query.order_by(Donation.amount.desc())
    elif sort == "name_asc":
        query = query.join(Donation.user).join(User.profile).order_by(
            User.profile.name.asc()
        )
    else:  
        query = query.order_by(Donation.created_at.desc())

    res = await db.execute(query)
    donations = res.scalars().all()

    success = [d for d in donations if d.status == "SUCCESS"]
    total_amount = sum(d.amount for d in success)

    return {
        "cause": {
            "id": cause.id,
            "title": cause.title,
            "target_amount": cause.target_amount,
            "current_amount": cause.current_amount,
        },
        "total_donations": len(success),
        "total_amount": total_amount,
        "donations": [
            {
                "id": d.id,
                "amount": d.amount,
                "status": d.status,
                "created_at": d.created_at,
                "donor": {
                    "email": d.user.email,
                    "name": d.user.profile.name if d.user.profile else None,
                },
            }
            for d in donations
        ],
    }
