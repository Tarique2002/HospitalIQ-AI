from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.database import Base

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    department_id = Column(
        Integer,
        ForeignKey("departments.id")
    )

    experience = Column(Integer)
    shift = Column(String)