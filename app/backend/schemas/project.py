from pydantic import BaseModel
from .translate import Translate

class ProjectItem(BaseModel):
    position: str
    translate: Translate
    

class Project(BaseModel):
    name: str
    description: str
    projectItem: ProjectItem
    