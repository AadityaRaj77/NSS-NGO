from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.cause import Cause
from app.models.user import User
from app.schemas.cause import CauseCreate, CauseUpdate, CauseResponse
from app.core.deps import require_admin
from app.utils.cause_expiry import expire_old_causes

router = APIRouter(prefix="/admin/causes", tags=["admin-causes"])


# CREATE
@router.post("", status_code=201, response_model=CauseResponse)
async def create_cause(
    payload: CauseCreate,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    cause = Cause(
        title=payload.title,
        description=payload.description,
        target_amount=payload.target_amount,
        deadline=payload.deadline,
        created_by=admin.id,
    )
    db.add(cause)
    await db.commit()
    await db.refresh(cause)
    return cause

@router.get("", response_model=list[CauseResponse])
async def list_causes(
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    await expire_old_causes(db)

    res = await db.execute(
        select(Cause).order_by(Cause.created_at.desc())
    )
    return res.scalars().all()


@router.patch("/{cause_id}", response_model=CauseResponse)
async def update_cause(
    cause_id: int,
    payload: CauseUpdate,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    cause = await db.get(Cause, cause_id)
    if not cause:
        raise HTTPException(404, "Cause not found")

    for field, value in payload.dict(exclude_unset=True).items():
        setattr(cause, field, value)

    await db.commit()
    await db.refresh(cause)
    return cause


@router.patch("/{cause_id}/toggle")
async def toggle_cause(
    cause_id: int,
    is_active: bool,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    cause = await db.get(Cause, cause_id)
    if not cause:
        raise HTTPException(404, "Cause not found")

    cause.is_active = is_active
    await db.commit()
    return {"message": "Status updated"}
