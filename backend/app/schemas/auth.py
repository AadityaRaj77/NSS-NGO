from pydantic import BaseModel, EmailStr
from typing import Optional, Literal

Role = Literal["USER", "ADMIN"]

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    role: Role
    admin_key: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
