from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy.orm import relationship

class Cause(Base):
    __tablename__ = "causes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    target_amount = Column(Integer, nullable=False)
    current_amount = Column(Integer, default=0)
    deadline = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)

    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    donations = relationship("Donation", back_populates="cause")
