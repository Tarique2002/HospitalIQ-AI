from sqlalchemy.orm import Session
from app.models.bed import Bed


def get_bed_occupancy_stats(db: Session):
    total_beds = db.query(Bed).count()
    occupied_beds = db.query(Bed).filter(Bed.is_occupied == True).count()
    free_beds = total_beds - occupied_beds

    occupancy_rate = 0
    if total_beds > 0:
        occupancy_rate = (occupied_beds / total_beds) * 100

    return {
        "total_beds": total_beds,
        "occupied_beds": occupied_beds,
        "free_beds": free_beds,
        "occupancy_rate": round(occupancy_rate, 2)
    }