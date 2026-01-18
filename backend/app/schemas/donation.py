from pydantic import BaseModel
from datetime import datetime

class DonationCreate(BaseModel):
    cause_id: int
    amount: int

class DonationVerify(BaseModel):
    donation_id: int
    success: bool
    payment_id: str

class DonationResponse(BaseModel):
    id: int
    cause_id: int
    amount: int
    status: str
    created_at: datetime
