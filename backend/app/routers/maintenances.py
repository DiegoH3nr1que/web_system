from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import Maintenance, Machine
from app.schemas import MaintenanceCreate, MaintenanceUpdate, MaintenanceResponse
from app.database import get_db
from sqlalchemy.sql import func

router = APIRouter(prefix="/maintenances", tags=["Manutenções"])

# Criar uma manutenção
@router.post("/", response_model=MaintenanceResponse)
def create_maintenance(maintenance: MaintenanceCreate, db: Session = Depends(get_db)):
    machine = db.query(Machine).filter(Machine.id == maintenance.machine_id).first()
    if not machine:
        raise HTTPException(status_code=404, detail="Machine not found")
    
    # Remova o campo 'status' de maintenance.dict() para evitar conflito
    maintenance_data = maintenance.model_dump(exclude={"status"})

    # Adicione 'status' manualmente
    db_maintenance = Maintenance(**maintenance_data, status="pending")
    db.add(db_maintenance)
    db.commit()
    db.refresh(db_maintenance)
    return db_maintenance

# Listar todas as manutenções
@router.get("/", response_model=list[MaintenanceResponse])
def list_maintenances(
    status: str = None,
    priority: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Maintenance)
    if status:
        query = query.filter(Maintenance.status == status)
    if priority:
        query = query.filter(Maintenance.priority == priority)
    return query.all()


@router.get("/chart-data", response_model=list[dict])
def get_maintenance_chart_data(db: Session = Depends(get_db)):
    results = (
        db.query(
            func.strftime("%Y-%m", Maintenance.requested_date).label("month"),
            func.count().label("count")
        )
        .group_by(func.strftime("%Y-%m", Maintenance.requested_date))
        .order_by(func.strftime("%Y-%m", Maintenance.requested_date))
        .all()
    )
    return [{"month": r[0], "manutencoes": r[1]} for r in results]

# Obter detalhes de uma manutenção
@router.get("/{maintenance_id}", response_model=MaintenanceResponse)
def get_maintenance(maintenance_id: int, db: Session = Depends(get_db)):
    maintenance = db.query(Maintenance).filter(Maintenance.id == maintenance_id).first()
    if not maintenance:
        raise HTTPException(status_code=404, detail="Manutenção não encontrada")
    return maintenance

# Atualizar uma manutenção
@router.put("/{maintenance_id}", response_model=MaintenanceResponse)
def update_maintenance(
    maintenance_id: int,
    maintenance_data: MaintenanceUpdate,
    db: Session = Depends(get_db)
):
    maintenance = db.query(Maintenance).filter(Maintenance.id == maintenance_id).first()
    if not maintenance:
        raise HTTPException(status_code=404, detail="Manutenção não encontrada")
    
    update_data = maintenance_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(maintenance, key, value)
    
    db.commit()
    db.refresh(maintenance)
    return maintenance

# Deletar uma manutenção
@router.delete("/{maintenance_id}", response_model=dict)
def delete_maintenance(maintenance_id: int, db: Session = Depends(get_db)):
    maintenance = db.query(Maintenance).filter(Maintenance.id == maintenance_id).first()
    if not maintenance:
        raise HTTPException(status_code=404, detail="Manutenção não encontrada")
    
    db.delete(maintenance)
    db.commit()
    return {"detail": "Manutenção deletada com sucesso"}
