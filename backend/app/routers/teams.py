from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import Team, User
from app.schemas import TeamCreate, TeamUpdate, TeamResponse
from app.database import get_db

router = APIRouter(prefix="/teams", tags=["Times"])

# Criar Time
@router.post("/register", response_model=TeamResponse)
def create_team(team_data: TeamCreate, db: Session = Depends(get_db)):
    existing_team = db.query(Team).filter(Team.team_name == team_data.team_name).first()
    if existing_team:
        raise HTTPException(status_code=400, detail="Team with this name already exists")

    users = db.query(User).filter(User.id.in_(team_data.technical_ids), User.role == "tecnico").all()
    if len(users) != len(team_data.technical_ids):
        raise HTTPException(status_code=404, detail="One or more technicals not found or not a technician")

    new_team = Team(
        team_name=team_data.team_name,
        technical_count=len(users),
        users=users,
        quant_maintenanc_realized=team_data.quant_maintenanc_realized,
        quant_maintenanc_finalized=team_data.quant_maintenanc_finalized,
    )
    db.add(new_team)
    db.commit()
    db.refresh(new_team)

    return TeamResponse(
        id=new_team.id,
        team_name=new_team.team_name,
        technical_count=new_team.technical_count,
        technical_names=[user.username for user in users],
        quant_maintenanc_realized=new_team.quant_maintenanc_realized,
        quant_maintenanc_finalized=new_team.quant_maintenanc_finalized,
        creation_date=new_team.creation_date,
    )

# Listar Times
@router.get("/", response_model=list[TeamResponse])
def list_teams(db: Session = Depends(get_db)):
    teams = db.query(Team).all()
    return [
        TeamResponse(
            id=team.id,
            team_name=team.team_name,
            technical_count=team.technical_count,
            technical_names=[user.username for user in team.users],
            quant_maintenanc_realized=team.quant_maintenanc_realized,
            quant_maintenanc_finalized=team.quant_maintenanc_finalized,
            creation_date=team.creation_date,
        )
        for team in teams
    ]

# Atualizar Time
@router.put("/{team_id}", response_model=TeamResponse)
def update_team(team_id: int, team_data: TeamUpdate, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    if team_data.team_name:
        team.team_name = team_data.team_name

    if team_data.technical_ids is not None:
        users = db.query(User).filter(User.id.in_(team_data.technical_ids), User.role == "tecnico").all()
        if len(users) != len(team_data.technical_ids):
            raise HTTPException(
                status_code=404,
                detail="One or more technicals not found or not a technician",
            )
        team.users = users
        team.technical_count = len(users)

    if team_data.quant_maintenanc_realized is not None:
        team.quant_maintenanc_realized = team_data.quant_maintenanc_realized

    if team_data.quant_maintenanc_finalized is not None:
        team.quant_maintenanc_finalized = team_data.quant_maintenanc_finalized

    db.commit()
    db.refresh(team)

    return TeamResponse(
        id=team.id,
        team_name=team.team_name,
        technical_count=team.technical_count,
        technical_names=[user.username for user in team.users],
        quant_maintenanc_realized=team.quant_maintenanc_realized,
        quant_maintenanc_finalized=team.quant_maintenanc_finalized,
        creation_date=team.creation_date,
    )

# Excluir Time
@router.delete("/{team_id}", response_model=dict)
def delete_team(team_id: int, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    db.delete(team)
    db.commit()

    return {"message": "Team deleted successfully", "id": team_id}
