from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
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
    status = Column(String, default="active")
    last_maintenance_date = Column(DateTime, nullable=True)
    maintenance_count = Column(Integer, default=0)
    
    maintenances = relationship("Maintenance", back_populates="machine")
    parts_used = relationship("PartUsage", back_populates="machine")

class Maintenance(Base):
    __tablename__ = "maintenances"
    
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    priority = Column(String)
    status = Column(String, default="pending")
    requested_date = Column(DateTime, default=func.now())
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    machine_id = Column(Integer, ForeignKey("machines.id"))
    technician_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    estimated_duration = Column(Integer, nullable=True)
    
    machine = relationship("Machine", back_populates="maintenances")
    technician = relationship("User")
    parts_used = relationship("PartUsage", back_populates="maintenance")

class Part(Base):
    __tablename__ = "parts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    code = Column(String, unique=True)
    quantity = Column(Integer)
    min_quantity = Column(Integer, nullable=True)
    unit_price = Column(Float, nullable=True)
    last_updated = Column(DateTime, default=func.now(), onupdate=func.now())
    
    usages = relationship("PartUsage", back_populates="part")

class PartUsage(Base):
    __tablename__ = "part_usages"
    
    id = Column(Integer, primary_key=True, index=True)
    maintenance_id = Column(Integer, ForeignKey("maintenances.id"))
    part_id = Column(Integer, ForeignKey("parts.id"))
    quantity_used = Column(Integer)
    date_used = Column(DateTime, default=func.now())
    
    maintenance = relationship("Maintenance", back_populates="parts_used")
    part = relationship("Part", back_populates="usages")
    machine_id = Column(Integer, ForeignKey("machines.id"))
    machine = relationship("Machine", back_populates="parts_used")

class Team(Base):
    __tablename__ = "teams"
    
    id = Column(Integer, primary_key=True, index=True)
    team_name = Column(String, nullable=False, index=True)
    technical_count = Column(Integer, default=0)
    creation_date = Column(DateTime, default=func.now())
    maintenance_realized = Column(Integer, default=0)
    maintenance_finalized = Column(Integer, default=0)
    
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
    last_login = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    
    teams = relationship("Team", secondary="team_users", back_populates="users")
    maintenances = relationship("Maintenance", back_populates="technician")