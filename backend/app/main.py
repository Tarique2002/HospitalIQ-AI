from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, engine

# Import all models BEFORE create_all()
from app.models.department import Department
from app.models.disease import Disease
from app.models.doctor import Doctor
from app.models.bed import Bed
from app.models.patient import Patient
from app.models.admission import Admission
from app.models.user import User
from app.db.seed_admin import seed_admin

from app.api.department import router as department_router
from app.api.patient import router as patient_router
from app.api.bed import router as bed_router
from app.api.analytics import router as analytics_router
from app.api.prediction import router as prediction_router
from app.api.dashboard import router as dashboard_router
from app.api.ai import router as ai_router
from app.api.chat import router as chat_router
from app.api.sql import router as sql_router
from app.api.auth import router as auth_router

app = FastAPI(
    title="HospitalIQ AI",
    version="1.0.0",
)

import os

allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
allowed_origins = [origin.strip() for origin in allowed_origins_str.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

try:
    seed_admin()
except Exception as e:
    print(f"Error seeding admin user: {e}")

app.include_router(department_router)
app.include_router(patient_router)
app.include_router(bed_router)
app.include_router(analytics_router)
app.include_router(prediction_router)
app.include_router(dashboard_router)
app.include_router(ai_router)
app.include_router(chat_router)
app.include_router(sql_router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {
        "status": "success",
        "message": "HospitalIQ AI API running 🚑"
    }