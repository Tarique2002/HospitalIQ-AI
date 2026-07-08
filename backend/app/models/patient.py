from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    age = Column(Integer)
    gender = Column(String)
    city = Column(String)

    disease_id = Column(
        Integer,
        ForeignKey("diseases.id")
    )