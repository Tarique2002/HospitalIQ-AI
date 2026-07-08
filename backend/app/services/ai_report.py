from sqlalchemy import func

from app.db.database import SessionLocal

from app.models.patient import Patient
from app.models.doctor import Doctor
from app.models.bed import Bed
from app.models.admission import Admission


def generate_ai_report():

    db = SessionLocal()

    total_patients = db.query(Patient).count()

    total_doctors = db.query(Doctor).count()

    total_beds = db.query(Bed).count()

    occupied_beds = (
        db.query(Bed)
        .filter(Bed.status == "Occupied")
        .count()
    )

    total_revenue = (
        db.query(func.sum(Admission.treatment_cost))
        .scalar()
        or 0
    )

    occupancy = (
        occupied_beds / total_beds * 100
        if total_beds
        else 0
    )

    if occupancy >= 85:

        risk = "High"

        summary = (
            "Hospital occupancy is critically high. "
            "Immediate operational attention is recommended."
        )

        recommendations = [
            "Increase ICU capacity.",
            "Call additional medical staff.",
            "Delay elective admissions."
        ]

    elif occupancy >= 60:

        risk = "Medium"

        summary = (
            "Hospital occupancy is increasing. "
            "Operations should be monitored closely."
        )

        recommendations = [
            "Prepare overflow beds.",
            "Monitor emergency admissions.",
            "Review staff scheduling."
        ]

    else:

        risk = "Low"

        summary = (
            "Hospital operations are healthy and stable. "
            "No significant operational risks detected."
        )

        recommendations = [
            "Maintain current staffing.",
            "Continue monitoring occupancy.",
            "No emergency action required."
        ]

    db.close()

    return {

        "generated_by": "HospitalIQ AI",

        "risk": risk,

        "summary": summary,

        "total_patients": total_patients,

        "total_doctors": total_doctors,

        "total_beds": total_beds,

        "occupied_beds": occupied_beds,

        "occupancy": round(occupancy, 2),

        "total_revenue": round(float(total_revenue), 2),

        "recommendations": recommendations,
    }