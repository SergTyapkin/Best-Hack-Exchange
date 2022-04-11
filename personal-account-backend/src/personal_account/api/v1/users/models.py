import string
from typing import Optional
from pydantic import EmailStr, validator, constr

from ..base.models.core import CoreModel, IDModelMixin, DateTimeModelMixin


class UserBase(CoreModel):
    username: Optional[str]
    name: Optional[str]
    surname: Optional[str]
    email: Optional[EmailStr]

    is_email_verified: bool = False
    is_active: bool = True
    is_staff: bool = False


class UserCreate(CoreModel):
    username: constr(min_length=3, regex="^[a-zA-Z0-9_-]+$")
    name: constr(min_length=1, regex="^[a-zA-Z-]+$")
    surname: constr(min_length=1, regex="^[a-zA-Z-]+$")
    email: EmailStr


class UserUpdate(CoreModel):
    username: Optional[Optional[constr(min_length=3, regex="^[a-zA-Z0-9_-]+$")]]
    name: Optional[constr(min_length=1, regex="^[a-zA-Z-]+$")]
    surname: Optional[constr(min_length=1, regex="^[a-zA-Z-]+$")]
    email: Optional[EmailStr]


class UserPasswordUpdate(CoreModel):
    password: constr(min_length=8, max_length=64)
    salt: str


class UserInDB(IDModelMixin, DateTimeModelMixin, UserBase):
    class Config:
        orm_mode = True


class UserPublic(IDModelMixin, DateTimeModelMixin, UserBase):
    class Config:
        orm_mode = True