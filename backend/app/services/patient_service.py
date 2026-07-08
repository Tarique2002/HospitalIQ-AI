from sqlalchemy.orm import Session
from app.models.patient import Patient
from app.schemas.patient import PatientCreate

def create_patient(db: Session, data: PatientCreate):
    patient = Patient(**data.dict())
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


def get_patients(db: Session):
    return db.query(Patient).all()