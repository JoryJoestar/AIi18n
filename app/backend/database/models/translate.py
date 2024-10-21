
import datetime
from database.main import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from enum import Enum

now = datetime.datetime.now(datetime.timezone.utc)
    
class LanguageEnum(Enum):
    SIMPLIFY_CHINESE = "zh-CN"
    TRADITIONAL_CHINESE_HONGKONG = "zh-HK"
    TRADITIONAL_CHINESE_TAIWAN = "zh-TW"
    ENGLISH = "en-US"
    JAPANESE = "ja-JP"
    KOREAN = "Ko-KR"
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
    source_language = Column(Enum(LanguageEnum), nullable=False)
    target_language = Column(Enum(LanguageEnum), nullable=False)
    replacement = Column(String)
    created_at = Column(String, default=now, nullable=False)
    updated_at = Column(String, default=now, onupdate=now, nullable=False)
    
    project_item = relationship("ProjectItem", back_populates="translate_data")