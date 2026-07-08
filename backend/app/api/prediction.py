from fastapi import APIRouter
from app.schemas.prediction import BedPredictionRequest
from app.ml.predict import predict_bed_occupancy
from app.ml.recommendation import get_recommendation

router = APIRouter(
    prefix="/predict",
    tags=["AI Prediction"]
)

@router.post("/bed")
def predict_bed(data: BedPredictionRequest):

    prediction = predict_bed_occupancy(
        department_id=data.department_id,
        occupied_beds=data.occupied_beds,
        emergency_cases=data.emergency_cases,
        total_beds=data.total_beds,
        day_of_week=data.day_of_week,
        month=data.month,
    )

    recommendation = get_recommendation(prediction)

    return {
        "predicted_bed_occupancy": prediction,
        "risk_level": recommendation["risk_level"],
        "recommendations": recommendation["recommendations"]
    }