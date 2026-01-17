from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.cause import Cause
from app.models.donation import Donation
from app.models.user import User
from app.core.deps import get_current_user

router = APIRouter(prefix="/donations", tags=["donations"])

@router.post("")
async def donate(
    payload: dict,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    cause_id = payload.get("cause_id")
    amount = payload.get("amount")

    res = await db.execute(select(Cause).where(Cause.id == cause_id))
    cause = res.scalar_one_or_none()

    if not cause or not cause.is_active:
        raise HTTPException(400, "Invalid cause")

    donation = Donation(
        user_id=user.id,
        cause_id=cause.id,
        amount=amount,
        status="SUCCESS"  # mocked payment
    )

    cause.current_amount += amount

    db.add(donation)
    await db.commit()

    return {"message": "Donation successful"}
