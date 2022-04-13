from fastapi import APIRouter, Body, Depends, status
from sqlalchemy.orm import Session

from .models import UserCreate, UserPublic
from ....external.postgres.db_utils import get_db
from .token import AccessToken
from .core import register_new_user, auth_service

user_router = APIRouter(prefix="/user", tags=["user"])


@user_router.post(
    "/",
    response_model=UserPublic,
    name="user:register-new-user",
    status_code=status.HTTP_201_CREATED,
)
async def register_new_user_view(
    new_user: UserCreate = Body(..., embed=True), db: Session = Depends(get_db)
):
    created_user = register_new_user(new_user=new_user, db=db)

    access_token = AccessToken(
        access_token=auth_service.create_access_token(user=created_user),
        token_type="bearer",
    )

    return UserPublic(**created_user.dict(), access_token=access_token)
