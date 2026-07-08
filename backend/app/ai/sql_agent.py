from sqlalchemy import func
from app.db.database import SessionLocal
from app.models.patient import Patient
from app.models.doctor import Doctor
from app.models.bed import Bed
from app.models.admission import Admission


def execute_query(question: str):

    db = SessionLocal()

    q = question.lower().strip()

    try:

        # -----------------------------
        # Total Patients
        # -----------------------------

        if "total patient" in q or "patients" == q:

            total = db.query(Patient).count()

            return {
                "title": "Total Patients",
                "columns": ["Metric", "Value"],
                "rows": [
                    ["Patients", total]
                ]
            }

        # -----------------------------
        # Total Doctors
        # -----------------------------

        elif "total doctor" in q:

            total = db.query(Doctor).count()

            return {
                "title": "Total Doctors",
                "columns": ["Metric", "Value"],
                "rows": [
                    ["Doctors", total]
                ]
            }

        # -----------------------------
        # Total Admissions
        # -----------------------------

        elif "admission" in q:

            total = db.query(Admission).count()

            return {
                "title": "Total Admissions",
                "columns": ["Metric", "Value"],
                "rows": [
                    ["Admissions", total]
                ]
            }

        # -----------------------------
        # Total Revenue
        # -----------------------------

        elif "revenue" in q:

            revenue = (
                db.query(
                    func.sum(
                        Admission.treatment_cost
                    )
                ).scalar()
                or 0
            )

            return {
                "title": "Hospital Revenue",
                "columns": ["Metric", "Value"],
                "rows": [
                    [
                        "Revenue",
                        f"₹ {revenue:,.2f}"
                    ]
                ]
            }

        # -----------------------------
        # Occupied Beds
        # -----------------------------

        elif "occupied" in q:

            occupied = (
                db.query(Bed)
                .filter(
                    Bed.status == "Occupied"
                )
                .count()
            )

            return {
                "title": "Occupied Beds",
                "columns": ["Metric", "Value"],
                "rows": [
                    ["Occupied Beds", occupied]
                ]
            }

        # -----------------------------
        # Available Beds
        # -----------------------------

        elif "available" in q:

            available = (
                db.query(Bed)
                .filter(
                    Bed.status == "Available"
                )
                .count()
            )

            return {
                "title": "Available Beds",
                "columns": ["Metric", "Value"],
                "rows": [
                    ["Available Beds", available]
                ]
            }

        # -----------------------------
        # Unknown Question
        # -----------------------------

        else:

            return {
                "title": "Unknown Question",
                "columns": ["Message"],
                "rows": [
                    [
                        "Sorry, I don't understand this question yet."
                    ]
                ]
            }

    finally:

        db.close()