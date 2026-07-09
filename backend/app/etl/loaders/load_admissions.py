from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.admission import Admission
from app.etl.utils import read_csv


def load_admissions():
    db: Session = SessionLocal()

    df = read_csv("admissions.csv")

    db.query(Admission).delete()

    for _, row in df.iterrows():

        admission = Admission(
            id=int(row["admission_id"]),
            patient_id=int(row["patient_id"]),
            department_id=int(row["department_id"]),
            doctor_id=int(row["doctor_id"]),
            bed_id=int(row["bed_id"]),
            admission_date=row["admission_date"],
            discharge_date=row["discharge_date"],
            emergency=bool(row["emergency"]),
            treatment_cost=float(row["treatment_cost"])
        )

        db.add(admission)

    db.commit()
    db.close()

    print("Admissions loaded")