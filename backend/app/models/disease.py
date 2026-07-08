from sqlalchemy import Column, Integer, String
from app.db.database import Base

class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    severity = Column(String)
    average_stay_days = Column(Integer)