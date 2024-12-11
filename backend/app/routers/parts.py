from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.models import Part
from app.schemas import PartCreate, PartResponse
from app.database import get_db

router = APIRouter(prefix="/inventory", tags=["Estoque"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

@router.post("/parts", response_model=PartResponse)
def create_part(part: PartCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    """
    Cria uma nova peça no estoque com a quantidade de entrada especificada.
    """
    db_part = Part(
        name=part.name,
        code=part.code,
        entry_quantity=part.entry_quantity,
        exit_quantity=0,
        date_entry=part.date_entry,
        current_stock=part.entry_quantity,
    )
    db.add(db_part)
    db.commit()
    db.refresh(db_part)
    return db_part


@router.put("/parts/{part_id}", response_model=PartResponse)
def update_part(
    part_id: int,
    part: PartCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    """
    Atualiza os detalhes de uma peça no estoque pelo ID.
    """
    # Busca a peça pelo ID
    db_part = db.query(Part).filter(Part.id == part_id).first()
    if not db_part:
        raise HTTPException(status_code=404, detail="Peça não encontrada")

    # Atualiza apenas os campos fornecidos
    db_part.name = part.name
    db_part.code = part.code
    db_part.entry_quantity = part.entry_quantity
    db_part.exit_quantity = part.exit_quantity
    db_part.date_entry = part.date_entry

    # Atualiza o estoque atual com base na lógica definida
    db_part.current_stock = part.entry_quantity - part.exit_quantity

    # Salva as alterações no banco de dados
    db.commit()
    db.refresh(db_part)

    return db_part



@router.get("/parts", response_model=list[PartResponse])
def list_parts(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    """
    Lista todas as peças no estoque, incluindo o cálculo do estoque atual.
    """
    parts = db.query(Part).all()
    for part in parts:
        part.current_stock = part.calculate_stock
    return parts



@router.delete("/parts/{part_id}", response_model=dict)
def delete_part(part_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    """
    Deleta uma peça do estoque pelo ID.
    """
    # Busca a peça pelo ID
    part = db.query(Part).filter(Part.id == part_id).first()
    if not part:
        raise HTTPException(status_code=404, detail="Peça não encontrada")

    # Deleta a peça
    db.delete(part)
    db.commit()

    return {"detail": f"Peça com ID {part_id} deletada com sucesso."}

