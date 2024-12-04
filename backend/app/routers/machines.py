from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.models import Machine
from app.schemas import MachineCreate, MachineResponse
from app.database import get_db
from datetime import datetime

router = APIRouter(prefix="/machines", tags=["Máquinas"])

@router.post("/", response_model=MachineResponse)
async def create_machine(
    name: str = Form(...),
    type: str = Form(...),
    model: str = Form(...),
    serial_number: str = Form(...),
    location: str = Form(...),
    manufacture_date: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    image_data = await image.read()

    try:
        manufacture_date = datetime.strptime(manufacture_date, "%Y-%m-%dT%H:%M:%S.%fZ")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Expected format: 'YYYY-MM-DDTHH:MM:SS.sssZ'")

    db_machine = Machine(
        name=name,
        type=type,
        model=model,
        serial_number=serial_number,
        location=location,
        manufacture_date=manufacture_date,
        image=image_data
    )
    db.add(db_machine)
    db.commit()
    db.refresh(db_machine)
    return db_machine
