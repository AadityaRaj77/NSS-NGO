from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models.cause import Cause
from app.models.donation import Donation
from app.models.user import User
from app.core.deps import require_admin

router = APIRouter(prefix="/admin/dashboard", tags=["admin-dashboard"])


@router.get("")
async def admin_dashboard(
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    res = await db.execute(
        select(Cause)
        .where(or_(Cause.is_active == True, Cause.is_active == None))
        .options(selectinload(Cause.donations))
        .order_by(Cause.created_at.desc())
    )

    causes = res.scalars().all()

    dashboard = []

    for c in causes:
        success_donations = [d for d in c.donations if d.status == "SUCCESS"]

        dashboard.append({
            "id": c.id,
            "title": c.title,
            "target_amount": c.target_amount,
            "current_amount": c.current_amount,
            "total_donations": len(success_donations),
            "total_amount": sum(d.amount for d in success_donations),
        })

    return dashboard
