from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class Machine(Base):
    __tablename__ = "machines"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)
    model = Column(String)
    serial_number = Column(String, unique=True)
    location = Column(String)
    manufacture_date = Column(DateTime)
    maintenances = relationship("Maintenance", back_populates="machine")

class environment(Base):
    __tablename__ = "environment"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True, nullable=False)
    tipo_ambiente = Column(String, nullable=False)
    localizacao = Column(String, nullable=False)
    condicao_ambiente = Column(String, default="normal")
    equipe_manutencao = Column(String, nullable=True)
    manutencoes_realizadas = Column(Integer, default=0)

class Maintenance(Base):
    __tablename__ = "maintenances"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    priority = Column(String)
    status = Column(String, default="pending")
    requested_date = Column(DateTime, default=datetime.utcnow)
    machine_id = Column(Integer, ForeignKey("machines.id"))
    machine = relationship("Machine", back_populates="maintenances")

class Part(Base):
    __tablename__ = "parts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    code = Column(String, unique=True)
    quantity = Column(Integer)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True)
    role = Column(String, default="user")
