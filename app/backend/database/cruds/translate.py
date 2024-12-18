from sqlalchemy.orm import Session

import database.models.translate as TranslateModel

import logging
# 配置 logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_translate(db: Session, translate_params: TranslateModel.Translate, translate_response: dict):
    logger.info(translate_params)
    logger.info(translate_response)
    db_translate = TranslateModel.Translate(**translate_params.dict(), **{k: v for k, v in translate_response.items() if k != 'total_tokens'})
    db.add(db_translate)
    db.commit()
    db.refresh(db_translate)
    return db_translate

def update_translate(db: Session, translate: TranslateModel.Translate):
    db_translate = db.query(TranslateModel.Translate).filter(TranslateModel.Translate.id == translate.id).first()
    db_translate.result_content = translate.result_content
    db_translate.replacement = translate.replacement
    db.commit()
    
def get_translate_by_content(db: Session, content: str):
    return db.query(TranslateModel.Translate).filter(TranslateModel.Translate.source_content == content).first()

def get_translates_by_project_item_id(db: Session, project_item_id: int):
    return db.query(TranslateModel.Translate).filter(TranslateModel.Translate.project_item_id == project_item_id).all()