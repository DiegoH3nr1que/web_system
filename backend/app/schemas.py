from pydantic import BaseModel, Field, EmailStr, validator
from datetime import datetime
from typing import List, Optional, Dict
# Máquinas
class MachineCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Nome da máquina")
    type: str = Field(..., description="Tipo da máquina")
    model: str = Field(..., description="Modelo da máquina")
    serial_number: str = Field(..., description="Número de série único")
    location: str = Field(..., description="Localização da máquina")
    manufacture_date: datetime = Field(..., description="Data de fabricação")
    
    @validator('serial_number')
    def validate_serial_number(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Número de série não pode ser vazio')
        return v
    
class MaintenanceUpdate(BaseModel):
    description: Optional[str] = Field(None, min_length=10, max_length=500, description="Descrição atualizada da manutenção")
    priority: Optional[str] = Field(None, description="Prioridade atualizada da manutenção")
    status: Optional[str] = Field(None, description="Status atualizado da manutenção")
    parts_used: Optional[Dict[int, int]] = Field(None, description="Peças utilizadas no formato {id_da_peça: quantidade}")

    @validator('priority')
    def validate_priority(cls, v):
        if v:
            valid_priorities = ['low', 'medium', 'high', 'urgent']
            if v.lower() not in valid_priorities:
                raise ValueError(f'Prioridade inválida. Utilize: {", ".join(valid_priorities)}')
            return v.lower()
        return v

    @validator('status')
    def validate_status(cls, v):
        if v:
            valid_statuses = ['pending', 'in_progress', 'completed', 'cancelled']
            if v.lower() not in valid_statuses:
                raise ValueError(f'Status inválido. Utilize: {", ".join(valid_statuses)}')
            return v.lower()
        return v

class MachineResponse(MachineCreate):
    id: int
    status: Optional[str] = "active"  # Adiciona um status para a máquina
    last_maintenance_date: Optional[datetime] = None
    maintenance_count: int = 0
    
    class Config:
        orm_mode = True

# Manutenções
class MaintenanceCreate(BaseModel):
    description: str = Field(..., min_length=10, max_length=500, description="Descrição da manutenção")
    priority: str = Field(..., description="Prioridade da manutenção") 
    machine_id: int = Field(..., gt=0, description="ID da máquina")
    estimated_duration: Optional[int] = Field(None, description="Duração estimada em minutos")
    
    @validator('priority')
    def validate_priority(cls, v):
        valid_priorities = ['low', 'medium', 'high', 'urgent']
        if v.lower() not in valid_priorities:
            raise ValueError(f'Prioridade inválida. Utilize: {", ".join(valid_priorities)}')
        return v.lower()

class MaintenanceResponse(MaintenanceCreate):
    id: int
    status: str = "pending"
    requested_date: datetime
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    technician_id: Optional[int] = None
    parts_used: Optional[List[dict]] = None
    
    class Config:
        orm_mode = True

# Estoque
class PartCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Nome da peça")
    code: str = Field(..., description="Código único da peça")
    quantity: int = Field(..., ge=0, description="Quantidade em estoque")
    min_quantity: Optional[int] = Field(None, description="Quantidade mínima para reposição")
    unit_price: Optional[float] = Field(None, description="Preço unitário")
    
    @validator('code')
    def validate_code(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Código da peça não pode ser vazio')
        return v

class PartResponse(PartCreate):
    id: int
    last_updated: Optional[datetime] = None
    
    class Config:
        orm_mode = True

# Usuários
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, description="Nome de usuário")
    password: str = Field(..., min_length=8, description="Senha")
    email: EmailStr = Field(..., description="Endereço de email")
    role: str = Field(default="user", description="Papel do usuário")
    
    @validator('password')
    def validate_password(cls, v):
        # Exemplo de validação de senha
        if not any(char.isdigit() for char in v):
            raise ValueError('A senha deve conter pelo menos um número')
        if not any(char.isupper() for char in v):
            raise ValueError('A senha deve conter pelo menos uma letra maiúscula')
        return v

class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    role: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str
    last_login: Optional[datetime] = None
    
    class Config:
        orm_mode = True

# Times
class TeamCreate(BaseModel):
    team_name: str = Field(..., min_length=2, max_length=100, description="Nome do time")
    technical_ids: List[int] = Field(..., description="IDs dos técnicos")

class TeamUpdate(BaseModel):
    team_name: Optional[str] = None
    technical_ids: Optional[List[int]] = None

class TeamResponse(BaseModel):
    id: int
    team_name: str
    technical_count: int
    technical_names: List[str]
    maintenance_realized: int
    maintenance_finalized: int
    creation_date: datetime
    
    class Config:
        orm_mode = True

# Autenticação
class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    username: str
    role: str