from pydantic import BaseModel

class Replacement(BaseModel):
    source_text: str
    replacement: str
    
class Translate(BaseModel):
    source_content: str
    source_language: str
    target_language: str
    prompt_version: str
    replacement: list[Replacement]

