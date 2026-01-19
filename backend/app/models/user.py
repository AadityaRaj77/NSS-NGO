from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="USER")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    #profile = relationship("Profile", back_populates="user", uselist=False)
    #donations = relationship("Donation", back_populates="user")
    profile = relationship(
        "Profile",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
    )

    donations = relationship(
        "Donation",
        back_populates="user",
        cascade="all, delete-orphan",
    )
