from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.cause import Cause
from app.models.donation import Donation
from app.models.user import User
from app.core.deps import get_current_user
from sqlalchemy.orm import selectinload

router = APIRouter(prefix="/donations", tags=["donations"])


@router.post("/create")
async def create_donation(
    payload: dict,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    cause_id = payload.get("cause_id")
    amount = payload.get("amount")

    if not cause_id or not amount:
        raise HTTPException(400, "Invalid payload")

    cause = await db.get(Cause, cause_id)
    if not cause or not cause.is_active:
        raise HTTPException(400, "Cause not available")

    donation = Donation(
        user_id=user.id,
        cause_id=cause_id,
        amount=amount,
        status="PENDING",
    )

    db.add(donation)
    await db.commit()
    await db.refresh(donation)

    # Sandbox payment order
    return {
        "donation_id": donation.id,
        "payment": {
            "payment_id": f"test_pay_{donation.id}",
            "amount": amount,
            "currency": "INR",
        },
    }

@router.post("/verify")
async def verify_payment(
    payload: dict,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    donation_id = payload.get("donation_id")
    payment_id = payload.get("payment_id")

    donation = await db.get(Donation, donation_id)
    if not donation or donation.user_id != user.id:
        raise HTTPException(404, "Donation not found")

    cause = await db.get(Cause, donation.cause_id)

    # Sandbox test cases
    if donation.amount == 1:
        donation.status = "SUCCESS"
        cause.current_amount += donation.amount

    elif donation.amount == 2:
        donation.status = "FAILED"

    elif donation.amount == 3:
        donation.status = "PENDING"

    else:
        donation.status = "SUCCESS"
        cause.current_amount += donation.amount

    donation.payment_id = payment_id

    await db.commit()
    return {"message": "Payment processed", "status": donation.status}

@router.get("/me")
async def my_donations(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    res = await db.execute(
        select(Donation)
        .options(selectinload(Donation.cause))
        .where(Donation.user_id == user.id)
        .order_by(Donation.created_at.desc())
    )

    donations = res.scalars().all()

    return [
        {
            "id": d.id,
            "amount": d.amount,
            "status": d.status,
            "created_at": d.created_at,
            "payment_id": d.payment_id,
            "cause": {
                "id": d.cause.id,
                "title": d.cause.title,
            } if d.cause else None,
        }
        for d in donations
    ]