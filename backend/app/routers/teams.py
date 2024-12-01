from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import Team, User
from app.schemas import TeamCreate, TeamUpdate
from app.database import get_db

router = APIRouter(prefix="/teams", tags=["Times"])

@router.post("/", response_model=dict)
def create_team(team_data: TeamCreate, db: Session = Depends(get_db)):
    # Verificar se já existe um time com o mesmo nome
    existing_team = db.query(Team).filter(Team.team_name == team_data.team_name).first()
    if existing_team:
        raise HTTPException(status_code=400, detail="Team with this name already exists")

    # Buscar técnicos associados (filtrar apenas técnicos)
    users = db.query(User).filter(User.id.in_(team_data.technical_ids), User.role == "tecnico").all()
    if len(users) != len(team_data.technical_ids):
        raise HTTPException(status_code=404, detail="One or more technicals not found or not a technician")

    # Criar o time
    new_team = Team(
        team_name=team_data.team_name,
        technical_count=len(users),
        users=users  # Associa os usuários encontrados
    )
    db.add(new_team)
    db.commit()
    db.refresh(new_team)

    return {"message": "Team created successfully", "team_id": new_team.id, "creation_date": new_team.creation_date}


@router.get("/{team_id}", response_model=dict)
def get_team_by_id(team_id: int, db: Session = Depends(get_db)):
    # Buscar o time no banco de dados
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    # Montar a lista de nomes dos técnicos associados
    technical_names = [user.username for user in team.users]

    return {
        "team_id": team.id,
        "team_name": team.team_name,
        "technical_count": team.technical_count,
        "technical_names": technical_names,
        "quant_maintenanc_realized": team.quant_maintenanc_realized,
        "quant_maintenanc_finalized": team.quant_maintenanc_finalized,
        "creation_date": team.creation_date
    }


@router.put("/{team_id}", response_model=dict)
def update_team(team_id: int, team_data: TeamUpdate, db: Session = Depends(get_db)):
    # Buscar o time no banco de dados
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    # Atualizar o nome do time, se fornecido
    if team_data.team_name:
        team.team_name = team_data.team_name

    # Atualizar os técnicos associados, se fornecidos
    if team_data.technical_ids is not None:
        users = db.query(User).filter(User.id.in_(team_data.technical_ids), User.role == "tecnico").all()
        if len(users) != len(team_data.technical_ids):
            raise HTTPException(status_code=404, detail="One or more technicals not found or not a technician")
        team.users = users
        team.technical_count = len(users)

    db.commit()
    db.refresh(team)

    return {"message": "Team updated successfully", "team_id": team.id}


@router.delete("/{team_id}", response_model=dict)
def delete_team(team_id: int, db: Session = Depends(get_db)):
    # Buscar o time no banco de dados
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    # Remover o time do banco de dados
    db.delete(team)
    db.commit()

    return {"message": "Team deleted successfully", "team_id": team_id}
