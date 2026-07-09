import random
import pandas as pd
from faker import Faker
from pathlib import Path

fake = Faker("en_IN")

BASE_DIR = Path(__file__).resolve().parents[4]
OUTPUT = BASE_DIR / "datasets" / "processed" / "patients.csv"

def generate_patients():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    NUM_PATIENTS = 1000

    cities = [
        "Delhi",
        "Mumbai",
        "Kolkata",
        "Chennai",
        "Lucknow",
        "Jaipur",
        "Bhopal",
        "Patna",
        "Pune",
        "Hyderabad",
    ]

    patients = []

    for patient_id in range(1, NUM_PATIENTS + 1):
        patients.append({
            "patient_id": patient_id,
            "name": fake.name(),
            "age": random.randint(1, 90),
            "gender": random.choice(["Male", "Female"]),
            "city": random.choice(cities),
            "disease_id": random.randint(1, 20)
        })

    df = pd.DataFrame(patients)
    df.to_csv(OUTPUT, index=False)

    print("patients.csv generated")

if __name__ == "__main__":
    generate_patients()