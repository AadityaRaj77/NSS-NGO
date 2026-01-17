from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.profile import Profile
from app.models.user import User
from app.schemas.profile import ProfileCreate, ProfileResponse
from app.core.deps import get_current_user

router = APIRouter(prefix="/users/profile", tags=["profile"])

@router.post("", status_code=201)
async def create_profile(
    payload: ProfileCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    q = await db.execute(
        select(Profile).where(Profile.user_id == current_user.id)
    )
    if q.scalar_one_or_none():
        raise HTTPException(
            status_code=400,
            detail="Profile already exists"
        )

    profile = Profile(
        user_id=current_user.id,
        **payload.dict()
    )

    db.add(profile)
    await db.commit()
    return {"message": "Profile created"}

@router.get("", response_model=ProfileResponse)
async def get_profile(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    q = await db.execute(
        select(Profile).where(Profile.user_id == current_user.id)
    )
    profile = q.scalar_one_or_none()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    return {
        "email": current_user.email,
        "name": profile.name,
        "age": profile.age,
        "gender": profile.gender,
        "phone": profile.phone,
        "city": profile.city,
        "state": profile.state,
        "country": profile.country,
        "about": profile.about,
    }

@router.put("")
async def update_profile(
    payload: ProfileCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    q = await db.execute(
        select(Profile).where(Profile.user_id == current_user.id)
    )
    profile = q.scalar_one_or_none()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    for field, value in payload.dict().items():
        setattr(profile, field, value)

    await db.commit()
    return {"message": "Profile updated"}
