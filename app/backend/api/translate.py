import logging

from fastapi import Depends, APIRouter

from sqlalchemy.orm import Session
from database.main import engine, get_db

import database.cruds.translate as TranslateCRUDs
import database.models.translate as TranslateModel
import schemas.translate as TranslateSchemas 
from services.translate import translate_query

TranslateModel.Base.metadata.create_all(bind=engine)
       
translate_router = APIRouter()

# 配置 logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@translate_router.post("/translate")
def translate(translate_params: TranslateSchemas.Translate, db: Session = Depends(get_db)):
    
    logger.info('params: %s', translate_params)  # 使用 logging
    
    # 如果数据库里已经存有翻译记录，则直接返回
    translate_response = TranslateCRUDs.get_translate_by_content(db, translate_params.source_content)
    
    if translate_response:
        pass
    else:
        translate_response = translate_query(translate_params)
        TranslateCRUDs.create_translate(db, translate_params=translate_params, translate_response=translate_response)
        
    return {
        'code': 200,
        'data': translate_response
    }

@translate_router.get("/translate/get/{translate_id}")
def get_translate_by_id(translate_id: int, db: Session = Depends(get_db)):
    return TranslateCRUDs.get_translate_by_id(db, translate_id)