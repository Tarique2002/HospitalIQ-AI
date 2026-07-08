from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.analytics_service import get_bed_occupancy_stats

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/bed-occupancy")
def bed_occupancy(db: Session = Depends(get_db)):
    return get_bed_occupancy_stats(db)