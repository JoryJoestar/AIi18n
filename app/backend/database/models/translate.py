
import datetime
from database.main import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from enum import Enum 
from sqlalchemy.types import Enum as SQLAEnum

from database.models.projects import ProjectItem

class LanguageEnum(Enum):
    SIMPLIFY_CHINESE = "zh-CN"
    TRADITIONAL_CHINESE_HONGKONG = "zh-HK"
    TRADITIONAL_CHINESE_TAIWAN = "zh-TW"
    ENGLISH = "en-US"
    JAPANESE = "ja-JP"
    KOREAN = "ko-KR"
    FRENCH = "fr-FR"
    GERMAN = "de-DE"
    SPANISH = "es-ES"
    ITALIAN = "it-IT"
    PORTUGUESE = "pt-PT"
    PORTUGUESE_BRASIL = "pt-BR"
    RUSSIAN = "ru-RU"
    THAI = "th-TH"
    ARABIC = "ar"
    TURKISH = "tr-TR"
    VIETNAMESE = "vi-VN"
    INDONESIAN = "id-ID"
    CATALAN = "ca"
    
class Translate(Base):
    __tablename__ = "translate"
    
    id = Column(Integer, primary_key=True)
    source_content = Column(String, nullable=False)
    translate_content = Column(String, nullable=False)
    source_language = Column(String, nullable=False)  # 使用枚举类型
    translate_language = Column(String, nullable=False)  # 使用枚举类型
    prompt_version = Column(String)
    translate_elapsed_time = Column(Integer)
    prompt_tokens = Column(Integer)
    output_tokens = Column(Integer)
    
    created_at = Column(String, default=datetime.datetime.now(datetime.timezone.utc), nullable=False)
    updated_at = Column(String, default=datetime.datetime.now(datetime.timezone.utc), onupdate=datetime.datetime.now(datetime.timezone.utc), nullable=False)
    
    project_item_id = Column(Integer, ForeignKey('project_item.id'), nullable=True)
    project_item = relationship("ProjectItem", back_populates="translate")
    replacement = relationship('Replacement', back_populates="translate")
    
class Replacement(Base):
    __tablename__ = "replacement"
    
    id = Column(Integer, primary_key=True)
    source_content = Column(String, nullable=False)
    replacement = Column(String, nullable=False)
    created_at = Column(String, default=datetime.datetime.now(datetime.timezone.utc), nullable=False)
    updated_at = Column(String, default=datetime.datetime.now(datetime.timezone.utc), onupdate=datetime.datetime.now(datetime.timezone.utc), nullable=False)
    
    translate_id = Column(Integer, ForeignKey('translate.id'))
    translate = relationship('Translate', back_populates="replacement")
    