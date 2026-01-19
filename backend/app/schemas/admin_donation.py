from pydantic import BaseModel
from datetime import datetime
from typing import List


class DonationUser(BaseModel):
    name: str | None
    email: str
    age: int | None
    gender: str | None


class DonationItem(BaseModel):
    donation_id: int
    amount: int
    created_at: datetime
    user: DonationUser


class DonationSummary(BaseModel):
    total_donations: int
    total_amount: int


class AdminCauseDonationsResponse(BaseModel):
    summary: DonationSummary
    donations: List[DonationItem]
