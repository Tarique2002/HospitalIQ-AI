from fastapi import APIRouter

from app.services.ai_report import generate_ai_report

router = APIRouter(
    prefix="/ai/v1",
    tags=["AI"],
)


@router.post("/report")
def ai_report():
    """
    Generate an AI operational report
    """

    return generate_ai_report()