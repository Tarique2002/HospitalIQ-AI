import pandas as pd
from pathlib import Path

# ---------------------------------------
# Paths
# ---------------------------------------

BASE_DIR = Path(__file__).resolve().parents[3]

DATASET_DIR = BASE_DIR / "datasets" / "processed"

admissions = pd.read_csv(DATASET_DIR / "admissions.csv")
beds = pd.read_csv(DATASET_DIR / "beds.csv")

# ---------------------------------------
# Dates
# ---------------------------------------

admissions["admission_date"] = pd.to_datetime(admissions["admission_date"])
admissions["discharge_date"] = pd.to_datetime(admissions["discharge_date"])

# ---------------------------------------
# Total beds in every department
# ---------------------------------------

bed_counts = (
    beds.groupby("department_id")
    .size()
    .reset_index(name="total_beds")
)

# ---------------------------------------
# Expand every admission
# ---------------------------------------

records = []

for _, row in admissions.iterrows():

    days = pd.date_range(
        row["admission_date"],
        row["discharge_date"],
        freq="D"
    )

    for day in days:

        records.append({

            "date": day,

            "department_id": row["department_id"],

            "emergency": row["emergency"],

            "treatment_cost": row["treatment_cost"]

        })

daily = pd.DataFrame(records)

# ---------------------------------------
# Aggregate Daily
# ---------------------------------------

daily = (
    daily
    .groupby(
        [
            "date",
            "department_id"
        ]
    )
    .agg(

        occupied_beds=("department_id", "count"),

        emergency_cases=("emergency", "sum"),

        revenue=("treatment_cost", "sum")

    )
    .reset_index()
)

# ---------------------------------------
# Merge Bed Counts
# ---------------------------------------

daily = daily.merge(
    bed_counts,
    on="department_id",
    how="left"
)

# ---------------------------------------
# Occupancy %
# ---------------------------------------

daily["occupancy_rate"] = (
    daily["occupied_beds"]
    /
    daily["total_beds"]
) * 100

# ---------------------------------------
# Time Features
# ---------------------------------------

daily["day_of_week"] = daily["date"].dt.dayofweek

daily["month"] = daily["date"].dt.month

daily["weekend"] = (
    daily["day_of_week"] >= 5
).astype(int)

# ---------------------------------------
# Save
# ---------------------------------------

OUTPUT = DATASET_DIR / "occupancy_training.csv"

daily.to_csv(
    OUTPUT,
    index=False
)

print("\nDataset Shape:", daily.shape)

print("\nAverage Occupancy:")
print(daily["occupancy_rate"].describe())

print("\nSaved To:")
print(OUTPUT)