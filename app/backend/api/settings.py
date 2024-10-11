from fastapi import Depends, APIRouter
import logging

from sqlalchemy.orm import Session
from database.main import engine, get_db

import database.cruds.settings as SettingsCRUDs
import database.models.settings as SettingsModel
import schemas.settings as SettingsSchemas 

SettingsModel.Base.metadata.create_all(bind=engine)
        
# 配置 logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings_router = APIRouter()


@settings_router.get("/settings/apikey/{name}")
def get_api_key(name: str, db: Session = Depends(get_db)):
    logger.info(f"Fetching API key with Name: {name}")
    
    api_key = SettingsCRUDs.get_api_key(db, name)  # 查询 API 密钥
    
    if api_key:
        return {
            'code': 200,
            'data': api_key,
            'message': "API Key retrieved successfully"
        }
    else:
        return {
            'code': 404,
            'message': "API Key not found"
        }
        
@settings_router.post("/settings/apikey")
def set_api_key(data: SettingsSchemas.ApiKeyParams, db: Session = Depends(get_db)):
    logger.info(data)
    
    existing_key = SettingsCRUDs.get_api_key(db, data.name)  # 检查是否存在
    
    if existing_key:
        SettingsCRUDs.update_api_key(db, data)  # 更新现有密钥
        message = f"{data.name}: API Key updated successfully"
    else:
        SettingsCRUDs.create_api_key(db, data)  # 创建新密钥
        message = f"{data.name}: API Key set successfully"
        
    return {
        'code': 200,
        'message': message
    }
