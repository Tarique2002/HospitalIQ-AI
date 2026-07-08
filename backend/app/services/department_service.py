from sqlalchemy.orm import Session
from app.models.department import Department
from app.schemas.department import DepartmentCreate

def create_department(db: Session, data: DepartmentCreate):
    dept = Department(
        name=data.name,
        floor=data.floor,
        total_beds=data.total_beds
    )
    db.add(dept)
    db.commit()
    db.refresh(dept)
    return dept


def get_departments(db: Session):
    return db.query(Department).all()