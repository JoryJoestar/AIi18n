import logging

from fastapi import Depends, APIRouter

from sqlalchemy.orm import Session
from database.main import engine, get_db

import database.cruds.projects as ProjectCRUDs
import database.models.projects as ProjectModel
import schemas.projects as ProjectSchemas 

ProjectModel.Base.metadata.create_all(bind=engine)
       
projects_router = APIRouter()

# 配置 logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ===Project===
@projects_router.post("/project/create")
def create_project(project: ProjectSchemas.CreateProject, db: Session = Depends(get_db)):    
    return ProjectCRUDs.create_project(db=db, project=project)

@projects_router.post("/project/update")
def update_project(project: ProjectSchemas.Project, db: Session = Depends(get_db)):
    return ProjectCRUDs.update_project(db=db, project=project)

@projects_router.delete("/project/delete/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    return ProjectCRUDs.delete_project(db=db, project_id=project_id)

@projects_router.get("/project/get/{project_id}")
def get_project_by_id(project_id: int, db: Session = Depends(get_db)):
    return ProjectCRUDs.get_project_by_id(db=db, project_id=project_id)

@projects_router.get("/project/get_all")
def get_projects(db: Session = Depends(get_db)):
    return ProjectCRUDs.get_projects(db=db)

# ===ProjectItem===
@projects_router.post("/project/item/create")
def create_project_item(project_item: ProjectSchemas.ProjectItem, project_id: int, db: Session = Depends(get_db)):
    return ProjectCRUDs.create_project_item(db=db, project_item=project_item, project_id=project_id)

@projects_router.post("/project/item/update")
def update_project_item(project_item: ProjectSchemas.ProjectItem, db: Session = Depends(get_db)):
    return ProjectCRUDs.update_project_item(db=db, project_item=project_item)

@projects_router.delete("/project/item/delete/{project_item_id}")
def delete_project_item(project_item_id: int, db: Session = Depends(get_db)):
    return ProjectCRUDs.delete_project_item(db=db, project_item_id=project_item_id)

@projects_router.get("/project/item/get/{project_item_id}")
def get_project_item_by_id(project_item_id: int, db: Session = Depends(get_db)):
    return ProjectCRUDs.get_project_item_by_id(db=db, project_item_id=project_item_id)

@projects_router.get("/project/item/get_all/{project_id}")
def get_project_items_by_project_id(project_id: int, db: Session = Depends(get_db)):
    return ProjectCRUDs.get_project_items_by_project_id(db=db, project_id=project_id)