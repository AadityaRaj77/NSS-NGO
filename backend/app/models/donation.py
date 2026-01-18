from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func
from app.database import Base
from datetime import datetime
from sqlalchemy.orm import relationship

class Donation(Base):
    __tablename__ = "donations"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    cause_id = Column(Integer, ForeignKey("causes.id"))
    amount = Column(Integer, nullable=False)
    status = Column(String, default="PENDING")
    payment_id = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    cause = relationship("Cause", back_populates="donations")
