from pydantic import BaseModel

class TranslateParams(BaseModel):
    source_text: str
    source_language: str
    target_language: str
    prompt_version: str
    replacement: list

class ReplacementParams(BaseModel):
    source_text: str
    replacement: str
    
