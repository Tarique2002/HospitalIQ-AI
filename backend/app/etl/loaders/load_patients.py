from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.patient import Patient
from app.etl.utils import read_csv


def load_patients():
    db: Session = SessionLocal()

    df = read_csv("patients.csv")

    db.query(Patient).delete()

    for _, row in df.iterrows():

        patient = Patient(
            id=int(row["patient_id"]),
            name=row["name"],
            age=int(row["age"]),
            gender=row["gender"],
            city=row["city"],
            disease_id=int(row["disease_id"])
        )

        db.add(patient)

    db.commit()
    db.close()

    print("✅ Patients loaded")