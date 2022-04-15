from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from ..db import Base


class Wallet(Base):
    __tablename__ = "wallet"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True, unique=True)

    user = relationship("User", back_populates="wallet", lazy=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        server_onupdate=func.now(),
    )

    currencies = relationship("Currency", backref="promo", lazy=True)

    __mapper_args__ = {"eager_defaults": True}

    def __repr__(self):
        return f"Wallet(id={self.id}, user={self.user.username})"
