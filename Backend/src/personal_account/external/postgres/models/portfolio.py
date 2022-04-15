from sqlalchemy import Column, Integer, DateTime, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from ..db import Base


class Portfolio(Base):
    __tablename__ = "portfolio"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True, unique=True)

    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="portfolio", lazy=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        server_onupdate=func.now(),
    )

    __mapper_args__ = {"eager_defaults": True}

    def __repr__(self):
        return f"Portfolio(id={self.id}, user={self.user.username})"
