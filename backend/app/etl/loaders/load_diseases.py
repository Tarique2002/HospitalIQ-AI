from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.disease import Disease
from app.etl.utils import read_csv


def load_diseases():
    db: Session = SessionLocal()

    df = read_csv("diseases.csv")

    db.query(Disease).delete()

    for _, row in df.iterrows():

        disease = Disease(
            id=int(row["disease_id"]),
            name=row["disease_name"],
            severity=row["severity"],
            average_stay_days=int(row["average_stay_days"])
        )

        db.add(disease)

    db.commit()
    db.close()

    print("✅ Diseases loaded")