from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    Date,
    Boolean,
    Float
)

from app.db.database import Base

class Admission(Base):
    __tablename__ = "admissions"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    doctor_id = Column(
        Integer,
        ForeignKey("doctors.id")
    )

    department_id = Column(
        Integer,
        ForeignKey("departments.id")
    )

    bed_id = Column(
        Integer,
        ForeignKey("beds.id")
    )

    admission_date = Column(Date)
    discharge_date = Column(Date)

    emergency = Column(Boolean)

    treatment_cost = Column(Float)