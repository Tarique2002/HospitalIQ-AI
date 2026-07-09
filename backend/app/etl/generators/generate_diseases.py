import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[4]
OUTPUT = BASE_DIR / "datasets" / "processed" / "diseases.csv"

def generate_diseases():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    diseases = [
        ("Heart Attack","Critical",10),
        ("Hypertension","Medium",3),
        ("Stroke","Critical",12),
        ("Migraine","Low",2),
        ("Diabetes","Medium",4),
        ("Asthma","Medium",3),
        ("Pneumonia","High",8),
        ("COVID-19","High",9),
        ("Cancer","Critical",20),
        ("Kidney Stone","Medium",5),
        ("Dengue","High",7),
        ("Typhoid","Medium",6),
        ("Malaria","Medium",5),
        ("Fracture","Medium",10),
        ("Burn Injury","Critical",15),
        ("Appendicitis","High",4),
        ("Tuberculosis","High",18),
        ("Arthritis","Low",3),
        ("Depression","Medium",6),
        ("Epilepsy","High",8),
    ]

    df = pd.DataFrame(
        diseases,
        columns=[
            "disease_name",
            "severity",
            "average_stay_days"
        ]
    )

    df.insert(0,"disease_id",range(1,len(df)+1))

    df.to_csv(OUTPUT,index=False)

    print("diseases.csv generated")

if __name__ == "__main__":
    generate_diseases()