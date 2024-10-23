
import datetime
from database.main import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from enum import Enum 
from sqlalchemy.types import Enum as SQLAEnum
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

now = datetime.datetime.now(datetime.timezone.utc)
    
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
    result_content = Column(String, nullable=False)
    source_language = Column(SQLAEnum(LanguageEnum), nullable=False)  # 使用枚举类型
    target_language = Column(SQLAEnum(LanguageEnum), nullable=False)  # 使用枚举类型
    prompt_version = Column(String)
    created_at = Column(String, default=now, nullable=False)
    updated_at = Column(String, default=now, onupdate=now, nullable=False)
    
    project_item_id = Column(Integer, ForeignKey('project_item.id'))
    project_item = relationship("ProjectItem", back_populates="translate")
    replacement = relationship('Replacement', back_populates="translate")
    
class Replacement(Base):
    __tablename__ = "replacement"
    
    id = Column(Integer, primary_key=True)
    source_content = Column(String, nullable=False)
    replacement = Column(String, nullable=False)
    created_at = Column(String, default=now, nullable=False)
    updated_at = Column(String, default=now, onupdate=now, nullable=False)
    
    translate_id = Column(Integer, ForeignKey('translate.id'))
    translate = relationship('Translate', back_populates="replacement")
    