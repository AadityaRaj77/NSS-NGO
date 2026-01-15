from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import os

from app.database import get_db
from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest, AuthResponse
from app.core.security import hash_password, verify_password, create_access_token
from app.core.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

ADMIN_KEY = os.getenv("ADMIN_REGISTRATION_KEY")

@router.post("/register")
async def register(payload: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # email uniqueness
    q = await db.execute(select(User).where(User.email == payload.email))
    if q.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    # role handling
    if payload.role == "ADMIN":
        if not payload.admin_key or payload.admin_key != ADMIN_KEY:
            raise HTTPException(status_code=403, detail="Invalid admin key")

    user = User(
        email=payload.email,
        password_hash=hash_password(payload.password),
        role=payload.role
    )
    db.add(user)
    await db.commit()
    return {"message": "registered"}

@router.post("/login", response_model=AuthResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    q = await db.execute(select(User).where(User.email == payload.email))
    user = q.scalar_one_or_none()

    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    token = create_access_token({
        "sub": user.email,   # ✅ EMAIL ONLY
        "role": user.role
    })

    return AuthResponse(access_token=token)


@router.get("/me")
async def me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
    }