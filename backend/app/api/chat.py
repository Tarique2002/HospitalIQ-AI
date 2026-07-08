from fastapi import APIRouter
from pydantic import BaseModel

from app.services.chat_service import generate_response

router = APIRouter(
    prefix="/ai/v1",
    tags=["AI Chat"],
)


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(request: ChatRequest):
    return generate_response(request.question)