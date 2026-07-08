from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.doctor import Doctor
from app.etl.utils import read_csv


def load_doctors():
    db: Session = SessionLocal()

    df = read_csv("doctors.csv")

    db.query(Doctor).delete()

    for _, row in df.iterrows():

        doctor = Doctor(
            id=int(row["doctor_id"]),
            name=row["name"],
            department_id=int(row["department_id"]),
            experience=int(row["experience"]),
            shift=row["shift"]
        )

        db.add(doctor)

    db.commit()
    db.close()

    print("✅ Doctors loaded")