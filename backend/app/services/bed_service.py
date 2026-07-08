from sqlalchemy.orm import Session
from app.models.bed import Bed


def create_bed(db: Session, department_id: int, bed_type: str):
    bed = Bed(
        department_id=department_id,
        bed_type=bed_type,
        is_occupied=False
    )
    db.add(bed)
    db.commit()
    db.refresh(bed)
    return bed


def get_all_beds(db: Session):
    return db.query(Bed).all()


def assign_bed(db: Session, bed_id: int, patient_id: int):
    bed = db.query(Bed).filter(Bed.id == bed_id).first()

    if not bed:
        return None

    if bed.is_occupied:
        return "already_occupied"

    bed.is_occupied = True
    bed.patient_id = patient_id

    db.commit()
    db.refresh(bed)
    return bed


def release_bed(db: Session, bed_id: int):
    bed = db.query(Bed).filter(Bed.id == bed_id).first()

    if not bed:
        return None

    bed.is_occupied = False
    bed.patient_id = None

    db.commit()
    db.refresh(bed)
    return bed