from app.etl.loaders.load_departments import load_departments
from app.etl.loaders.load_diseases import load_diseases
from app.etl.loaders.load_doctors import load_doctors
from app.etl.loaders.load_beds import load_beds
from app.etl.loaders.load_patients import load_patients
from app.etl.loaders.load_admissions import load_admissions

from app.db.database import SessionLocal
from app.models.admission import Admission
from app.models.patient import Patient
from app.models.bed import Bed
from app.models.doctor import Doctor
from app.models.disease import Disease
from app.models.department import Department


def load_all():
    print("Cleaning database tables (respecting foreign key order)...")
    db = SessionLocal()
    try:
        db.query(Admission).delete()
        db.query(Patient).delete()
        db.query(Bed).delete()
        db.query(Doctor).delete()
        db.query(Disease).delete()
        db.query(Department).delete()
        db.commit()
        print("Database cleaned")
    except Exception as e:
        db.rollback()
        print(f"Error cleaning database: {e}")
        raise e
    finally:
        db.close()

    print("Loading HospitalIQ datasets...")

    load_departments()
    load_diseases()
    load_doctors()
    load_beds()
    load_patients()
    load_admissions()

    print("All data loaded successfully!")


if __name__ == "__main__":
    load_all()