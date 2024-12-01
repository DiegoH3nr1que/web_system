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

class Environment(Base):
    __tablename__ = "environments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    type = Column(String, nullable=False)
    location = Column(String, nullable=False)
    condition = Column(String, default="normal")
    maintenance_team = Column(String, nullable=True)
    maintenances_done = Column(Integer, default=0)

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
class Team(Base):
    __tablename__ = "teams"
    id = Column(Integer, primary_key=True, index=True)
    team_name = Column(String, nullable=False, index=True)
    technical_count = Column(Integer, default=0)
    creation_date = Column(DateTime, default=datetime.utcnow)
    quant_maintenanc_realized = Column(Integer, default=0)  
    quant_maintenanc_finalized = Column(Integer, default=0)  

    # Relacionamento com a tabela User
    users = relationship("User", secondary="team_users", back_populates="teams")

class TeamUser(Base):
    __tablename__ = "team_users"
    team_id = Column(Integer, ForeignKey("teams.id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    role = Column(String, default="user")
    
    # Relacionamento com times
    teams = relationship("Team", secondary="team_users", back_populates="users")

