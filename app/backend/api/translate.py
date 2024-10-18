import logging

from fastapi import APIRouter

from schemas.translate import TranslateParams
from services.translate import translate_query

translate_router = APIRouter()

# 配置 logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@translate_router.post("/translate")
def translate(translate_params: TranslateParams):
    
    logger.info('params: %s', translate_params)  # 使用 logging
    
    response = translate_query(translate_params)
    
    return {
        'code': 200,
        'data': response
    }