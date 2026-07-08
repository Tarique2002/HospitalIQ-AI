from pydantic import BaseModel, EmailStr


# -----------------------------
# Login Request
# -----------------------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# -----------------------------
# Login Response
# -----------------------------
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: str


# -----------------------------
# User Response
# -----------------------------
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        from_attributes = True