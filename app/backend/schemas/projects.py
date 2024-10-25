from pydantic import BaseModel
from schemas.translate import Translate

class ProjectItem(BaseModel):
    position: str

class Project(BaseModel):
    name: str
    description: str