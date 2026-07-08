from fastapi import APIRouter
import psycopg2

router = APIRouter()

def get_db():
    return psycopg2.connect(
        dbname="hospital",
        user="postgres",
        password="password",
        host="localhost",
        port="5432"
    )

@router.get("/dashboard/summary")
def get_summary():
    conn = get_db()
    cur = conn.cursor()

    # Total Revenue
    cur.execute("SELECT COALESCE(SUM(revenue),0) FROM revenue")
    total_revenue = cur.fetchone()[0]

    # Total Patients
    cur.execute("SELECT COUNT(*) FROM patients")
    total_patients = cur.fetchone()[0]

    # Occupancy %
    cur.execute("""
        SELECT COALESCE(
            (SUM(occupied_beds)::float / NULLIF(SUM(total_beds),0)) * 100,
            0
        )
        FROM hospital_beds
    """)
    occupancy = cur.fetchone()[0]

    cur.close()
    conn.close()

    return {
        "totalRevenue": total_revenue,
        "totalPatients": total_patients,
        "occupancyRate": round(occupancy, 2)
    }