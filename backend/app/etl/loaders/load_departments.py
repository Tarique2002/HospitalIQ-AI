from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.department import Department
from app.etl.utils import read_csv


def load_departments():
    db: Session = SessionLocal()

    df = read_csv("departments.csv")

    # Clear existing data
    db.query(Department).delete()

    # Load new data
    for _, row in df.iterrows():
        department = Department(
            id=int(row["department_id"]),
            name=row["department_name"],
            floor=int(row["floor"]),
            total_beds=int(row["total_beds"])
        )
        db.add(department)

    db.commit()
    db.close()

    print("✅ Departments loaded")