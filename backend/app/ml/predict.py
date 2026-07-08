from pathlib import Path
import joblib
import pandas as pd

# -----------------------------
# Load Model
# -----------------------------

MODEL_PATH = (
    Path(__file__).resolve().parent
    / "models"
    / "bed_model.pkl"
)

model = joblib.load(MODEL_PATH)

# -----------------------------
# Prediction Function
# -----------------------------

def predict_bed_occupancy(
    department_id: int,
    occupied_beds: int,
    emergency_cases: int,
    total_beds: int,
    day_of_week: int,
    month: int
):

    sample = pd.DataFrame([{
        "department_id": department_id,
        "occupied_beds": occupied_beds,
        "emergency_cases": emergency_cases,
        "total_beds": total_beds,
        "day_of_week": day_of_week,
        "month": month
    }])

    prediction = model.predict(sample)[0]

    return round(float(prediction), 2)