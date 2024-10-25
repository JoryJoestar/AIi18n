import datetime
from database.main import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
now = datetime.datetime.now(datetime.timezone.utc)

class Project(Base):
    __tablename__ = "project"
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)  # 项目名
    description = Column(String) # 项目描述
    created_at = Column(String, default=now, nullable=False)  # 创建时间
    updated_at = Column(String, default=now, onupdate=now, nullable=False)  # 更新时间
    
    # 项目数据
    project_item = relationship("ProjectItem", back_populates="project")

class ProjectItem(Base):
    __tablename__ = "project_item"

    id = Column(Integer, primary_key=True)
    position = Column(String, default="default", nullable=False)

    created_at = Column(String, default=now, nullable=False)  # 创建时间
    updated_at = Column(String, default=now, onupdate=now, nullable=False)  # 更新时间
    
    project_id = Column(Integer, ForeignKey('project.id'))  # 添加 project_id 字段
    project = relationship("Project", back_populates="project_item")
    translate = relationship("Translate", back_populates="project_item")
    