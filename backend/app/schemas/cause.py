from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CauseCreate(BaseModel):
    title: str
    description: str
    target_amount: int
    deadline: Optional[datetime] = None

class CauseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    target_amount: Optional[int] = None
    deadline: Optional[datetime] = None
    
class CauseResponse(CauseCreate):
    id: int
    current_amount: int
    is_active: bool
