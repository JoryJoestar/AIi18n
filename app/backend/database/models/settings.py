from database.main import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

class General(Base):
    __tablename__ = "general"
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    value = Column(String)

class ApiKey(Base):
    __tablename__ = "api_key"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    value = Column(String)
