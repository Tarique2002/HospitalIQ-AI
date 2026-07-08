from fastapi import APIRouter
from sqlalchemy import func

from app.db.database import SessionLocal
from app.models.patient import Patient
from app.models.doctor import Doctor
from app.models.bed import Bed
from app.models.admission import Admission
from app.ml.forecast import predict_next
from app.ai.insights import generate_insights

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)

# ----------------------------------------------------
# Dashboard Summary
# ----------------------------------------------------
@router.get("/summary")
def dashboard_summary():

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

    current_occupancy = (
        occupied_beds / total_beds * 100
        if total_beds
        else 0
    )

    predicted_occupancy = 6.39

    if current_occupancy >= 85:
        risk = "High"
        recommendations = [
            "Increase ICU beds immediately.",
            "Schedule additional medical staff.",
        ]

    elif current_occupancy >= 60:
        risk = "Medium"
        recommendations = [
            "Monitor occupancy closely.",
            "Prepare overflow beds.",
        ]

    else:
        risk = "Low"
        recommendations = [
            "Hospital capacity is healthy.",
            "No immediate operational action required.",
        ]

    db.close()

    return {
        "total_patients": total_patients,
        "total_doctors": total_doctors,
        "total_beds": total_beds,
        "occupied_beds": occupied_beds,
        "current_occupancy": round(current_occupancy, 2),
        "predicted_occupancy": predicted_occupancy,
        "total_revenue": float(total_revenue),
        "risk_level": risk,
        "recommendations": recommendations,
    }


# ----------------------------------------------------
# Revenue Trend
# ----------------------------------------------------
@router.get("/revenue-trend")
def revenue_trend():

    db = SessionLocal()

    revenue = (
        db.query(
            func.date_trunc(
                "month",
                Admission.admission_date,
            ).label("month"),
            func.sum(
                Admission.treatment_cost
            ).label("revenue"),
        )
        .group_by(
            func.date_trunc(
                "month",
                Admission.admission_date,
            )
        )
        .order_by(
            func.date_trunc(
                "month",
                Admission.admission_date,
            )
        )
        .all()
    )

    db.close()

    return [
        {
            "month": row.month.strftime("%b %Y"),
            "revenue": float(row.revenue),
        }
        for row in revenue
    ]


# ----------------------------------------------------
# Bed Occupancy
# ----------------------------------------------------
@router.get("/occupancy")
def bed_occupancy():

    db = SessionLocal()

    occupied = (
        db.query(Bed)
        .filter(Bed.status == "Occupied")
        .count()
    )

    available = (
        db.query(Bed)
        .filter(Bed.status == "Available")
        .count()
    )

    maintenance = (
        db.query(Bed)
        .filter(Bed.status == "Maintenance")
        .count()
    )

    db.close()

    return [
        {
            "name": "Occupied",
            "value": occupied,
        },
        {
            "name": "Available",
            "value": available,
        },
        {
            "name": "Maintenance",
            "value": maintenance,
        },
    ]


# ----------------------------------------------------
# Admissions Trend
# ----------------------------------------------------
@router.get("/admissions-trend")
def admissions_trend():

    db = SessionLocal()

    admissions = (
        db.query(
            func.date_trunc(
                "month",
                Admission.admission_date,
            ).label("month"),

            func.count(
                Admission.id
            ).label("admissions"),
        )
        .group_by(
            func.date_trunc(
                "month",
                Admission.admission_date
            )
        )
        .order_by(
            func.date_trunc(
                "month",
                Admission.admission_date
            )
        )
        .all()
    )

    db.close()

    return [
        {
            "month": row.month.strftime("%b %Y"),
            "admissions": row.admissions,
        }
        for row in admissions
    ]

# ----------------------------------------------------
# Department Performance
# ----------------------------------------------------
from app.models.department import Department


@router.get("/department-performance")
def department_performance():

    db = SessionLocal()

    performance = (
        db.query(
            Department.name.label("department"),
            func.count(Admission.id).label("patients"),
            func.coalesce(
                func.sum(Admission.treatment_cost),
                0
            ).label("revenue"),
        )
        .outerjoin(
            Admission,
            Admission.department_id == Department.id
        )
        .group_by(
            Department.id,
            Department.name
        )
        .order_by(
            func.sum(
                Admission.treatment_cost
            ).desc()
        )
        .all()
    )

    db.close()

    return [
        {
            "department": row.department,
            "patients": row.patients,
            "revenue": float(row.revenue),
        }
        for row in performance
    ]


# ----------------------------------------------------
# Patient Satisfaction
# ----------------------------------------------------
@router.get("/patient-satisfaction")
def patient_satisfaction():

    db = SessionLocal()

    total_patients = db.query(Patient).count()

    total_admissions = db.query(Admission).count()

    discharged = (
        db.query(Admission)
        .filter(Admission.discharge_date != None)
        .count()
    )

    average_stay = (
        db.query(
            func.avg(
                Admission.discharge_date -
                Admission.admission_date
            )
        ).scalar()
    )

    db.close()

    # Temporary demo metrics
    satisfaction = 92

    wait_time = 4.3

    readmission_rate = (
        round(
            (total_admissions / total_patients) * 10,
            1,
        )
        if total_patients
        else 0
    )

    avg_stay = (
        round(float(average_stay), 1)
        if average_stay
        else 3.8
    )

    return {
        "satisfaction": satisfaction,
        "wait_time": wait_time,
        "average_stay": avg_stay,
        "readmission_rate": readmission_rate,
        "rating": "Excellent"
        if satisfaction >= 90
        else "Good"
        if satisfaction >= 75
        else "Poor",
    }

# ----------------------------------------------------
# Live Notifications
# ----------------------------------------------------
@router.get("/notifications")
def notifications():

    db = SessionLocal()

    total_admissions = db.query(Admission).count()

    occupied_beds = (
        db.query(Bed)
        .filter(Bed.status == "Occupied")
        .count()
    )

    total_beds = db.query(Bed).count()

    occupancy = (
        occupied_beds / total_beds * 100
        if total_beds
        else 0
    )

    total_revenue = (
        db.query(
            func.sum(Admission.treatment_cost)
        ).scalar()
        or 0
    )

    db.close()

    notifications = []

    if total_revenue > 10000000:
        notifications.append({
            "title": "Revenue target exceeded",
            "type": "success",
            "time": "2 min ago",
        })

    if occupancy >= 80:
        notifications.append({
            "title": "ICU occupancy above 80%",
            "type": "warning",
            "time": "12 min ago",
        })

    notifications.append({
        "title": f"{total_admissions} total admissions",
        "type": "info",
        "time": "18 min ago",
    })

    notifications.append({
        "title": "Emergency cases increased",
        "type": "danger",
        "time": "35 min ago",
    })

    notifications.append({
        "title": "AI report generated",
        "type": "success",
        "time": "1 hour ago",
    })

    return notifications

# ----------------------------------------------------
# Executive KPI Strip
# ----------------------------------------------------
@router.get("/executive-kpis")
def executive_kpis():

    db = SessionLocal()

    total_patients = db.query(Patient).count()

    total_revenue = (
        db.query(
            func.sum(Admission.treatment_cost)
        ).scalar()
        or 0
    )

    occupied_beds = (
        db.query(Bed)
        .filter(Bed.status == "Occupied")
        .count()
    )

    total_beds = db.query(Bed).count()

    occupancy = (
        occupied_beds / total_beds * 100
        if total_beds
        else 0
    )

    db.close()

    avg_revenue = (
        total_revenue / total_patients
        if total_patients
        else 0
    )

    return {
        "revenue_growth": 12.4,
        "admission_growth": 8.2,
        "occupancy": round(occupancy, 1),
        "avg_revenue_per_patient": round(avg_revenue, 2),
    }

# ----------------------------------------------------
# Forecast
# ----------------------------------------------------
@router.get("/forecast")
def forecast():

    db = SessionLocal()

    monthly = (
        db.query(
            func.extract(
                "month",
                Admission.admission_date
            ).label("month"),

            func.sum(
                Admission.treatment_cost
            ).label("revenue"),

            func.count(
                Admission.id
            ).label("admissions"),
        )
        .group_by(
            func.extract(
                "month",
                Admission.admission_date
            )
        )
        .order_by(
            func.extract(
                "month",
                Admission.admission_date
            )
        )
        .all()
    )

    occupied = (
        db.query(Bed)
        .filter(Bed.status == "Occupied")
        .count()
    )

    total = db.query(Bed).count()

    db.close()

    revenue = [
        float(x.revenue or 0)
        for x in monthly
    ]

    admissions = [
        int(x.admissions)
        for x in monthly
    ]

    next_revenue = predict_next(revenue)

    next_admissions = int(
        predict_next(admissions)
    )

    occupancy = (
        occupied / total * 100
        if total
        else 0
    )

    predicted_occupancy = min(
        100,
        round(occupancy + 3, 1)
    )

    return {
        "expected_revenue": next_revenue,
        "expected_admissions": next_admissions,
        "predicted_occupancy": predicted_occupancy,
        "confidence": 94,
        "trend": (
            "Increasing"
            if next_revenue >= (revenue[-1] if revenue else 0)
            else "Decreasing"
        ),
    }

# ----------------------------------------------------
# AI Insights
# ----------------------------------------------------
@router.get("/ai-insights")
def ai_insights():

    db = SessionLocal()

    total_revenue = (
        db.query(
            func.sum(Admission.treatment_cost)
        ).scalar()
        or 0
    )

    total_patients = db.query(Patient).count()

    occupied = (
        db.query(Bed)
        .filter(Bed.status == "Occupied")
        .count()
    )

    total_beds = db.query(Bed).count()

    db.close()

    occupancy = (
        occupied / total_beds * 100
        if total_beds
        else 0
    )

    revenue_growth = 12.4

    satisfaction = 92

    return generate_insights(
        revenue_growth,
        occupancy,
        satisfaction,
    )