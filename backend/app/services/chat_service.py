from sqlalchemy import func

from app.db.database import SessionLocal

from app.models.patient import Patient
from app.models.doctor import Doctor
from app.models.bed import Bed
from app.models.admission import Admission


def generate_response(question: str):

    db = SessionLocal()

    q = question.lower()

    total_patients = db.query(Patient).count()

    total_doctors = db.query(Doctor).count()

    total_beds = db.query(Bed).count()

    occupied = (
        db.query(Bed)
        .filter(Bed.status == "Occupied")
        .count()
    )

    revenue = (
        db.query(func.sum(Admission.treatment_cost))
        .scalar()
        or 0
    )

    occupancy = (
        occupied / total_beds * 100
        if total_beds
        else 0
    )

    db.close()

    if "patient" in q:
        return {
            "answer": f"There are currently {total_patients} registered patients."
        }

    if "doctor" in q:
        return {
            "answer": f"The hospital has {total_doctors} doctors."
        }

    if "bed" in q:
        return {
            "answer": f"There are {occupied} occupied beds out of {total_beds} beds ({occupancy:.1f}% occupancy)."
        }

    if "revenue" in q:
        return {
            "answer": f"Total hospital revenue is ₹ {revenue:,.2f}."
        }

    if "occupancy" in q:
        return {
            "answer": f"Current bed occupancy is {occupancy:.2f}%."
        }

    if "hello" in q or "hi" in q:
        return {
            "answer": "Hello! I am HospitalIQ AI. Ask me about revenue, beds, doctors, patients or occupancy."
        }

    return {
        "answer": "Sorry, I couldn't understand that question yet."
    }