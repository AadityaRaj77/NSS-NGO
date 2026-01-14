from fastapi import APIRouter, Depends
from app.core.deps import require_admin
from app.models.user import User

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/dashboard")
async def admin_dashboard(admin: User = Depends(require_admin)):
    return {
        "message": "Welcome Admin",
        "email": admin.email
    }
