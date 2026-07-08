from app.etl.loaders.load_departments import load_departments
from app.etl.loaders.load_diseases import load_diseases
from app.etl.loaders.load_doctors import load_doctors
from app.etl.loaders.load_beds import load_beds
from app.etl.loaders.load_patients import load_patients
from app.etl.loaders.load_admissions import load_admissions


def load_all():

    print("🚀 Loading HospitalIQ datasets...")

    load_departments()
    load_diseases()
    load_doctors()
    load_beds()
    load_patients()
    load_admissions()

    print("🎉 All data loaded successfully!")


if __name__ == "__main__":
    load_all()