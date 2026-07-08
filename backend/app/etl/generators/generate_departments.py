import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[4]
OUTPUT = BASE_DIR / "datasets" / "processed" / "departments.csv"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

departments = [
    ("Cardiology",1,60),
    ("Neurology",2,45),
    ("Orthopedics",3,70),
    ("Emergency",0,80),
    ("Pediatrics",4,50),
    ("Oncology",5,40),
    ("ICU",1,30),
    ("ENT",2,35),
    ("Dermatology",3,25),
    ("Gynecology",4,55),
    ("Urology",5,30),
    ("Psychiatry",6,20),
]

df = pd.DataFrame(
    departments,
    columns=["department_name","floor","total_beds"]
)

df.insert(0,"department_id",range(1,len(df)+1))

df.to_csv(OUTPUT,index=False)

print("✅ departments.csv generated")