from sqlalchemy.orm import Session

import database.models.projects as ProjectsModel

import logging
# 配置 logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ===Project===

# 创建项目
def create_project(db: Session, project: ProjectsModel.Project):
    db_project = ProjectsModel.Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

# 更新项目
def update_project(db: Session, project: ProjectsModel.Project):
    db_project = db.query(ProjectsModel.Project).filter(ProjectsModel.Project.id == project.id).first()
    db_project.name = project.name
    db_project.description = project.description
    db.commit()
    db.refresh(db_project)
    return db_project

def delete_project(db: Session, project_id: int):
    db.query(ProjectsModel.Project).filter(ProjectsModel.Project.id == project_id).delete()
    db.commit()

def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(ProjectsModel.Project).order_by(ProjectsModel.Project.updated_at.desc()).offset(skip).limit(limit).all()

def get_project_by_id(db: Session, project_id: int):
    return db.query(ProjectsModel.Project).filter(ProjectsModel.Project.id == project_id).first()




# ===ProjectItem===

def create_project_item(db: Session, project_item: ProjectsModel.ProjectItem, project_id: int):
    db_project_item = ProjectsModel.ProjectItem(**project_item.dict(), project_id=project_id)
    db.add(db_project_item)
    db.commit()
    db.refresh(db_project_item)
    return db_project_item

def update_project_item(db: Session, project_item: ProjectsModel.ProjectItem):
    db_project_item = db.query(ProjectsModel.ProjectItem).filter(ProjectsModel.ProjectItem.id == project_item.id).first()
    db_project_item.position = project_item.position
    db.commit()
    db.refresh(db_project_item)
    return db_project_item

# 返回 Project 其中一个item
def get_project_item_by_id(db: Session, project_item_id: int):
    return db.query(ProjectsModel.ProjectItem).filter(ProjectsModel.ProjectItem.id == project_item_id).first()

# 返回 Project 所有item
def get_project_items_by_project_id(db: Session, project_id: int):
    return db.query(ProjectsModel.ProjectItem).filter(ProjectsModel.ProjectItem.project_id == project_id).all()
