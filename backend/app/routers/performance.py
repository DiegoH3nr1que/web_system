from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Maintenance, Part, Machine
from sqlalchemy.sql import func

router = APIRouter(prefix="/performance", tags=["Performance"])

@router.get("/summary")
def get_performance_summary(db: Session = Depends(get_db)):
    average_resolution_time = db.query(
        func.avg(func.julianday(Maintenance.end_date) - func.julianday(Maintenance.start_date))
    ).filter(Maintenance.status == "completed").scalar()
    
    total_maintenance_completed = db.query(Maintenance).filter(Maintenance.status == "completed").count()
    
    total_parts_used = db.query(func.sum(Part.quantity)).scalar()
    
    parts_stock = db.query(Part.name.label("nome"), Part.quantity.label("valor")).all()
    
    maintenances_by_machine = (
        db.query(Machine.name.label("nome"), func.count(Maintenance.id).label("valor"))
        .join(Maintenance, Maintenance.machine_id == Machine.id)
        .group_by(Machine.name)
        .all()
    )
    
    return {
        "average_resolution_time": f"{average_resolution_time:.2f} dias" if average_resolution_time else "N/A",
        "total_maintenance_completed": total_maintenance_completed,
        "total_parts_used": total_parts_used or 0,
        "parts_stock": [{"nome": item.nome, "valor": item.valor} for item in parts_stock],
        "maintenances_by_machine": [{"nome": item.nome, "valor": item.valor} for item in maintenances_by_machine]
    }
