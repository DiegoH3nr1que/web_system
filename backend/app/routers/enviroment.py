from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import Environment
from app.schemas import EnvironmentCreate, EnvironmentUpdate, EnvironmentResponse
from app.database import get_db

router = APIRouter(prefix="/environments", tags=["Environments"])

@router.post("/", response_model=EnvironmentResponse)
def create_environment(environment: EnvironmentCreate, db: Session = Depends(get_db)):
    db_environment = Environment(**environment.dict())
    db.add(db_environment)
    db.commit()
    db.refresh(db_environment)
    return db_environment

@router.get("/", response_model=list[EnvironmentResponse])
def list_environments(db: Session = Depends(get_db)):
    return db.query(Environment).all()

@router.get("/{environment_id}", response_model=EnvironmentResponse)
def get_environment(environment_id: int, db: Session = Depends(get_db)):
    environment = db.query(Environment).filter(Environment.id == environment_id).first()
    if not environment:
        raise HTTPException(status_code=404, detail="Environment not found")
    return environment

@router.put("/{environment_id}", response_model=EnvironmentResponse)
def update_environment(
    environment_id: int, environment_data: EnvironmentUpdate, db: Session = Depends(get_db)
):
    environment = db.query(Environment).filter(Environment.id == environment_id).first()
    if not environment:
        raise HTTPException(status_code=404, detail="Environment not found")

    update_data = environment_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(environment, key, value)

    db.commit()
    db.refresh(environment)
    return environment

@router.delete("/{environment_id}", response_model=dict)
def delete_environment(environment_id: int, db: Session = Depends(get_db)):
    environment = db.query(Environment).filter(Environment.id == environment_id).first()
    if not environment:
        raise HTTPException(status_code=404, detail="Environment not found")

    db.delete(environment)
    db.commit()
    return {"detail": "Environment deleted successfully"}