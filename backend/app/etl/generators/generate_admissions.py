import random
import pandas as pd
from faker import Faker
from pathlib import Path
from datetime import timedelta

fake = Faker("en_IN")

BASE_DIR = Path(__file__).resolve().parents[4]
OUTPUT = BASE_DIR / "datasets" / "processed" / "admissions.csv"

NUM_ADMISSIONS = 1000

rows = []

for admission_id in range(1, NUM_ADMISSIONS + 1):

    admission_date = fake.date_between(
        start_date="-365d",
        end_date="today"
    )

    stay = random.randint(1, 10)

    discharge_date = admission_date + timedelta(days=stay)

    rows.append({
        "admission_id": admission_id,
        "patient_id": admission_id,
        "department_id": random.randint(1, 12),
        "doctor_id": random.randint(1, 100),
        "bed_id": random.randint(1, 500),
        "admission_date": admission_date,
        "discharge_date": discharge_date,
        "emergency": random.choice([0, 1]),
        "treatment_cost": random.randint(5000, 150000)
    })

df = pd.DataFrame(rows)
df.to_csv(OUTPUT, index=False)

print("✅ admissions.csv generated")