import pandas as pd
from pathlib import Path
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

# ------------------------------------
# Paths
# ------------------------------------

BASE_DIR = Path(__file__).resolve().parents[3]

DATA = BASE_DIR / "datasets" / "processed" / "occupancy_training.csv"

MODEL_DIR = Path(__file__).resolve().parent / "models"
MODEL_DIR.mkdir(exist_ok=True)

MODEL_FILE = MODEL_DIR / "bed_model.pkl"

# ------------------------------------
# Load Data
# ------------------------------------

df = pd.read_csv(DATA)

# ------------------------------------
# Features
# ------------------------------------

X = df[
    [
        "department_id",
        "occupied_beds",
        "emergency_cases",
        "total_beds",
        "day_of_week",
        "month"
    ]
]

y = df["occupancy_rate"]

# ------------------------------------
# Train/Test Split
# ------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ------------------------------------
# Model
# ------------------------------------

model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)

model.fit(X_train, y_train)

# ------------------------------------
# Prediction
# ------------------------------------

pred = model.predict(X_test)

print("\n========== MODEL RESULTS ==========")
print(f"MAE : {mean_absolute_error(y_test,pred):.2f}")
print(f"RMSE: {mean_squared_error(y_test,pred)**0.5:.2f}")
print(f"R²  : {r2_score(y_test,pred):.4f}")

# ------------------------------------
# Save Model
# ------------------------------------

joblib.dump(model, MODEL_FILE)

print("\n✅ Model Saved")
print(MODEL_FILE)