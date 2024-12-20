from pydantic import BaseModel
from datetime import datetime, date
from typing import List, Optional
# Máquinas
class MachineCreate(BaseModel):
    name: str
    type: str
    model: str
    serial_number: str
    location: str
    manufacture_date: date

class MachineResponse(MachineCreate):
    id: int
    has_image: bool = False

    class Config:
        orm_mode = True


class MachineByIDResponse(BaseModel):
    id: int
    name: str
    type: str
    model: str
    serial_number: str
    location: str
    manufacture_date: date

    class Config:
        orm_mode = True

class EnvironmentCreate(BaseModel):
    name: str
    type: str
    location: str
    condition: str = "normal"
    maintenance_team: str | None = None
    maintenances_done: int = 0

class EnvironmentUpdate(BaseModel):
    name: str | None = None
    type: str | None = None
    location: str | None = None
    condition: str | None = None
    maintenance_team: str | None = None
    maintenances_done: int | None = None

class EnvironmentResponse(BaseModel):
    id: int
    name: str
    type: str
    location: str
    condition: str
    maintenance_team: str | None
    maintenances_done: int

    class Config:
        orm_mode = True

class MaintenanceCreate(BaseModel):
    description: str
    priority: str
    status: str = "pending"
    requested_date: date
    machine_id: int

class MaintenanceUpdate(BaseModel):
    description: str = None
    priority: str = None
    status: str = None
    requested_date: date = None
    machine_id: int = None

class MaintenanceResponse(BaseModel):
    id: int
    description: str
    priority: str
    status: str
    requested_date: date
    machine_id: int

    class Config:
        orm_mode = True
        
class PartBase(BaseModel):
    name: str
    code: str
    entry_quantity: int = 0
    exit_quantity: int = 0
    date_entry: date

class PartCreate(PartBase):
    pass

class PartResponse(PartBase):
    id: int
    current_stock: int

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str
    password: str
    email: str
    role: str = "user"

class UserUpdate(BaseModel):
    username: str
    password: str
    email: str
    role: str = "user"

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
class TeamCreate(BaseModel):
    team_name: str
    technical_ids: List[int]
    quant_maintenanc_realized: int
    quant_maintenanc_finalized: int

class TeamUpdate(BaseModel):
    team_name: Optional[str] = None
    technical_ids: Optional[List[int]] = None    
    quant_maintenanc_realized: int = None
    quant_maintenanc_finalized: int = None

class TeamResponse(BaseModel):
    id: int
    team_name: str
    technical_count: int
    technical_names: List[str]
    quant_maintenanc_realized: int
    quant_maintenanc_finalized: int
    creation_date: datetime
    class Config:
        orm_mode = True
