import imp
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from pydantic import EmailStr

from .models import UserCreate, UserInDB
from ....external.postgres.models.user import User


def get_user_by_email(*, email: EmailStr, db: Session) -> UserInDB:
    user_record = db.query(User).filter(User.email == email).first()

    if not user_record:
        return

    return UserInDB(**user_record)


def get_user_by_username(*, username: str, db: Session) -> UserInDB:
    user_record = db.query(User).filter(User.username == username).first()

    if not user_record:
        return

    return UserInDB(**user_record)


def register_new_user(*, new_user: UserCreate, db: Session) -> UserInDB:
    if get_user_by_email(email=new_user.email, db=db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already taken",
        )

    if get_user_by_username(username=new_user.username, db=db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username is already taken",
        )

    created_user = User(**new_user.dict())

    db.add(created_user)
    db.commit()

    return UserInDB(**created_user)
