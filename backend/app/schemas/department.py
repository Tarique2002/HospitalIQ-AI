from pydantic import BaseModel

class DepartmentBase(BaseModel):
    name: str
    floor: int
    total_beds: int

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentResponse(DepartmentBase):
    id: int

    class Config:
        from_attributes = True