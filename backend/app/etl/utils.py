from pathlib import Path
import pandas as pd

# Project root (HospitalIQ-AI)
BASE_DIR = Path(__file__).resolve().parents[3]


def read_csv(filename: str):
    """
    Reads a CSV file from datasets/processed/
    """
    csv_path = BASE_DIR / "datasets" / "processed" / filename
    return pd.read_csv(csv_path)