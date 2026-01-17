from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update
from app.models.cause import Cause

async def expire_old_causes(db: AsyncSession):
    await db.execute(
        update(Cause)
        .where(
            Cause.is_active == True,
            Cause.deadline.isnot(None),
            Cause.deadline < datetime.utcnow()
        )
        .values(is_active=False)
    )
    await db.commit()
