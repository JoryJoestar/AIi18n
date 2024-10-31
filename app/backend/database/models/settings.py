import datetime
from database.main import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

class General(Base):
    __tablename__ = "general"
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    value = Column(String)
    created_at = Column(String, default=datetime.datetime.now(datetime.timezone.utc))  # 创建时间
    updated_at = Column(String, default=datetime.datetime.now(datetime.timezone.utc), onupdate=datetime.datetime.now(datetime.timezone.utc))  # 更新时间
    
class ApiKey(Base):
    __tablename__ = "api_key"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    value = Column(String)
    created_at = Column(String, default=datetime.datetime.now(datetime.timezone.utc))  # 创建时间
    updated_at = Column(String, default=datetime.datetime.now(datetime.timezone.utc), onupdate=datetime.datetime.now(datetime.timezone.utc))  # 更新时间
