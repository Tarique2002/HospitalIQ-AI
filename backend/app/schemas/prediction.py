from pydantic import BaseModel

class BedPredictionRequest(BaseModel):
    department_id: int
    occupied_beds: int
    emergency_cases: int
    total_beds: int
    day_of_week: int
    month: int