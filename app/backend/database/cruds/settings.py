from sqlalchemy.orm import Session

import database.models.settings as SettingsModel
import schemas.settings as SettingsSchemas 

def get_api_key(db: Session, name: str):
    return db.query(SettingsModel.ApiKey).filter(SettingsModel.ApiKey.name == name).first()

def get_api_keys(db: Session, skip: int = 0, limit: int = 100):
    return db.query(SettingsModel.ApiKey).offset(skip).limit(limit).all()

def create_api_key(db: Session, api_key: SettingsSchemas.ApiKeyParams):
    db_apikey = SettingsModel.ApiKey(name=api_key.name, value=api_key.value)
    db.add(db_apikey)
    db.commit()
    db.refresh(db_apikey)
    return db_apikey

def update_api_key(db: Session, api_key: SettingsSchemas.ApiKeyParams):
    db_apikey = db.query(SettingsModel.ApiKey).filter(SettingsModel.ApiKey.name == api_key.name).first()
    if db_apikey:
        db_apikey.value = api_key.value  # 更新值
        db.commit()
        db.refresh(db_apikey)
        return db_apikey
    return None  # 如果未找到，则返回 None

def get_api_key_status(db: Session):
    api_keys = db.query(SettingsModel.ApiKey).all()  # 获取所有 API 密钥
    return [api_key.name for api_key in api_keys]  # 返回 API 密钥的名称列表