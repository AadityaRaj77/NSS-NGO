from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Donation(Base):
    __tablename__ = "donations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    cause_id = Column(Integer, ForeignKey("causes.id"), nullable=False)

    amount = Column(Integer, nullable=False)
    status = Column(String, nullable=False)  # PENDING | SUCCESS | FAILED

    created_at = Column(DateTime(timezone=True), server_default=func.now())
