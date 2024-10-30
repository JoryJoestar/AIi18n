from pydantic import BaseModel
from typing import Optional

class ProjectItem(BaseModel):
    position: str

class CreateProject(BaseModel):
    name: str
    description: str

class Project(BaseModel):
    id: int
    name: str
    description: str