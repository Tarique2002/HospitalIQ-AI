import random
import pandas as pd
from faker import Faker
from pathlib import Path

fake = Faker("en_IN")

BASE_DIR = Path(__file__).resolve().parents[4]
OUTPUT = BASE_DIR / "datasets" / "processed" / "doctors.csv"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

rows=[]

for doctor_id in range(1,151):

    rows.append({

        "doctor_id":doctor_id,
        "name":fake.name(),
        "department_id":random.randint(1,12),
        "experience":random.randint(2,30),
        "shift":random.choice([
            "Morning",
            "Evening",
            "Night"
        ])
    })

pd.DataFrame(rows).to_csv(OUTPUT,index=False)

print("✅ doctors.csv generated")