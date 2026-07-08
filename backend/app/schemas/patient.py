from pydantic import BaseModel

class PatientBase(BaseModel):
    name: str
    age: int
    gender: str
    city: str
    disease_id: int

class PatientCreate(PatientBase):
    pass

class PatientResponse(PatientBase):
    id: int

    class Config:
        from_attributes = True