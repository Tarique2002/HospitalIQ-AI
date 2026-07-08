from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.bed_service import (
    create_bed,
    get_all_beds,
    assign_bed,
    release_bed
)

router = APIRouter(prefix="/beds", tags=["Beds"])


@router.post("/")
def add_bed(department_id: int, bed_type: str, db: Session = Depends(get_db)):
    return create_bed(db, department_id, bed_type)


@router.get("/")
def list_beds(db: Session = Depends(get_db)):
    return get_all_beds(db)


@router.post("/assign")
def assign(bed_id: int, patient_id: int, db: Session = Depends(get_db)):
    return assign_bed(db, bed_id, patient_id)


@router.post("/release")
def release(bed_id: int, db: Session = Depends(get_db)):
    return release_bed(db, bed_id)