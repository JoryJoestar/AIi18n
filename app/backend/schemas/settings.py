from pydantic import BaseModel

class ApiKeyParams(BaseModel):
    name: str
    value: str