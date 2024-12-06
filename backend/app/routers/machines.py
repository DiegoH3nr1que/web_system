from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.models import Machine
from app.schemas import MachineCreate, MachineResponse
from app.database import get_db
from datetime import datetime

router = APIRouter(prefix="/machines", tags=["Máquinas"])

# Endpoint para criar uma máquina
@router.post("/", response_model=MachineResponse)
async def create_machine(
    name: str = Form(...),
    type: str = Form(...),
    model: str = Form(...),
    serial_number: str = Form(...),
    location: str = Form(...),
    manufacture_date: str = Form(...),
    image: UploadFile = File(None),  # Imagem opcional
    db: Session = Depends(get_db),
):
    """
    Endpoint para criar uma nova máquina.
    Aceita dados do formulário e uma imagem opcional.
    """
    try:
        # Validação e parsing da data
        manufacture_date_parsed = datetime.strptime(manufacture_date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Formato de data inválido. Use o formato 'YYYY-MM-DD'."
        )

    # Processar a imagem (se fornecida)
    image_data = None
    if image:
        image_data = await image.read()
        if len(image_data) > 2 * 1024 * 1024:  # Limitar a imagem a 2MB
            raise HTTPException(
                status_code=413, detail="A imagem é muito grande (máx. 2MB)."
            )

    # Criar a máquina no banco de dados
    db_machine = Machine(
        name=name,
        type=type,
        model=model,
        serial_number=serial_number,
        location=location,
        manufacture_date=manufacture_date_parsed,
        image=image_data,
    )
    db.add(db_machine)
    db.commit()
    db.refresh(db_machine)

    return db_machine


# Endpoint para listar máquinas
@router.get("/", response_model=list[MachineResponse])
def list_machines(db: Session = Depends(get_db)):
    """
    Endpoint para listar todas as máquinas.
    """
    machines = db.query(Machine).all()
    return machines


# Endpoint para deletar uma máquina
@router.delete("/{machine_id}", response_model=dict)
def delete_machine(machine_id: int, db: Session = Depends(get_db)):
    """
    Endpoint para deletar uma máquina pelo ID.
    """
    # Verificar se a máquina existe
    machine = db.query(Machine).filter(Machine.id == machine_id).first()
    if not machine:
        raise HTTPException(status_code=404, detail="Máquina não encontrada")

    # Deletar a máquina do banco de dados
    db.delete(machine)
    db.commit()

    return {"detail": "Máquina deletada com sucesso"}
