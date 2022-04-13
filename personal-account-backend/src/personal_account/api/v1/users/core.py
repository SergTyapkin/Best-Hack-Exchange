from fastapi import HTTPException, status
from loguru import logger
from sqlalchemy.orm import Session
from pydantic import EmailStr

from .models import UserCreate, UserInDB
from .authentication import AuthService
from ....external.postgres.models.user import User


auth_service = AuthService()


def get_user_by_email(*, email: EmailStr, db: Session) -> UserInDB:
    user_record = db.query(User).filter(User.email == email).first()

    if not user_record:
        return

    return UserInDB(**user_record.__dict__)


def get_user_by_username(*, username: str, db: Session) -> UserInDB:
    user_record = db.query(User).filter(User.username == username).first()

    if not user_record:
        return

    return UserInDB(**user_record.__dict__)


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

    user = None

    try:
        user_password = auth_service.create_hashed_password_and_salt(
            plain_password=new_user.password
        )

        updated_user_params = new_user.copy(update=user_password.dict())

        created_user = User(**updated_user_params.dict())

        db.add(created_user)
        db.flush()

        user = UserInDB(**created_user.__dict__)

        db.commit()

    except Exception as exc:
        logger.error(exc)

        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User isn't created",
        )

    return user
