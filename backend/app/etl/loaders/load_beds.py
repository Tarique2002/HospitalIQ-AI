from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.bed import Bed
from app.etl.utils import read_csv


def load_beds():
    db: Session = SessionLocal()

    df = read_csv("beds.csv")

    db.query(Bed).delete()

    for _, row in df.iterrows():

        bed = Bed(
            id=int(row["bed_id"]),
            department_id=int(row["department_id"]),
            bed_type=row["bed_type"],
            status=row["status"]
        )

        db.add(bed)

    db.commit()
    db.close()

    print("Beds loaded")