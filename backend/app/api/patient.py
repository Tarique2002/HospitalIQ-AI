from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.patient import PatientCreate, PatientResponse
from app.services.patient_service import create_patient, get_patients

router = APIRouter(prefix="/patients", tags=["Patients"])


@router.post("/", response_model=PatientResponse)
def add_patient(data: PatientCreate, db: Session = Depends(get_db)):
    return create_patient(db, data)


@router.get("/", response_model=list[PatientResponse])
def list_patients(db: Session = Depends(get_db)):
    return get_patients(db)