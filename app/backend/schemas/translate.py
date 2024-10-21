from pydantic import BaseModel

class ReplacementParams(BaseModel):
    source_text: str
    replacement: str
    
class TranslateParams(BaseModel):
    source_content: str
    source_language: str
    target_language: str
    replacement: list

class Translate(BaseModel):
    source_content: str
    result_content: str
    source_language: str
    target_language: str
    replacement: list

