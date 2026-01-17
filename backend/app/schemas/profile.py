from pydantic import BaseModel
from typing import Optional

class ProfileCreate(BaseModel):
    name: str
    age: Optional[int] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    about: Optional[str] = None

class ProfileResponse(ProfileCreate):
    email: str
