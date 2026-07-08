from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.sql_agent import execute_query

router = APIRouter(
    prefix="/ai",
    tags=["AI SQL Agent"],
)


class SQLRequest(BaseModel):
    question: str


@router.post("/sql")
def ai_sql(request: SQLRequest):

    result = execute_query(
        request.question
    )

    return result