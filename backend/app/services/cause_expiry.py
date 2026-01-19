from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timezone

from app.models.cause import Cause


async def expire_causes(db: AsyncSession):
    now = datetime.now(timezone.utc)

    res = await db.execute(
        select(Cause).where(
            Cause.is_active == True,
            Cause.deadline.is_not(None),
            Cause.deadline < now,
        )
    )

    causes = res.scalars().all()

    for cause in causes:
        cause.is_active = False

    if causes:
        await db.commit()

    return len(causes)
