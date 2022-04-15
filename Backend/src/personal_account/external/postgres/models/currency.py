
from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from ..db import Base


class Currency(Base):
    __tablename__ = "currency"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True, unique=True)

    name = Column(String, unique=True, nullable=False, index=True)
    amount = Column(Float, default=0.0)

    wallet_id = Column(Integer, ForeignKey("wallet.id"), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        server_onupdate=func.now(),
    )

    __mapper_args__ = {"eager_defaults": True}

    def __repr__(self):
        return f"Currency(name={self.name}, amount={self.amount})"
