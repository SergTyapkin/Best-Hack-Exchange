from hashlib import new
from fastapi import APIRouter, Body, Depends, status
from sqlalchemy.orm import Session

from .models import UserCreate, UserPublic
from ....external.postgres.db_utils import get_db
from .core import register_new_user

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

    return created_user
