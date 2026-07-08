from app.etl.generators.generate_departments import generate_departments
from app.etl.generators.generate_diseases import generate_diseases
from app.etl.generators.generate_doctors import generate_doctors
from app.etl.generators.generate_beds import generate_beds
from app.etl.generators.generate_patients import generate_patients
from app.etl.generators.generate_admissions import generate_admissions

from app.etl.loaders.load_all import load_all


def main():
    print("=" * 50)
    print("🏥 HospitalIQ AI ETL Pipeline")
    print("=" * 50)

    generate_departments()
    generate_diseases()
    generate_doctors()
    generate_beds()
    generate_patients()
    generate_admissions()

    load_all()

    print("\n🎉 Pipeline completed successfully!")


if __name__ == "__main__":
    main()