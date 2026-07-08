import random
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[4]
OUTPUT = BASE_DIR / "datasets" / "processed" / "beds.csv"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

rows=[]

for bed in range(1,501):

    rows.append({

        "bed_id":bed,
        "department_id":random.randint(1,12),
        "bed_type":random.choice([
            "General",
            "ICU",
            "Ventilator"
        ]),
        "status":random.choice([
            "Available",
            "Occupied",
            "Maintenance"
        ])
    })

pd.DataFrame(rows).to_csv(OUTPUT,index=False)

print("✅ beds.csv generated")