from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.database import Base

class Bed(Base):
    __tablename__ = "beds"

    id = Column(Integer, primary_key=True, index=True)

    department_id = Column(
        Integer,
        ForeignKey("departments.id")
    )

    bed_type = Column(String)
    status = Column(String)