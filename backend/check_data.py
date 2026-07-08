from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[1]

DATA = BASE_DIR / "datasets" / "processed" / "occupancy_training.csv"

print(DATA)

df = pd.read_csv(DATA)

print(df.head(20))
print("\n")
print(df.describe())