from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.cause import Cause

router = APIRouter(prefix="/causes", tags=["causes"])

@router.get("")
async def list_causes(db: AsyncSession = Depends(get_db)):
    res = await db.execute(
        select(Cause)
        .order_by(Cause.created_at.desc())
    )
    return res.scalars().all()
