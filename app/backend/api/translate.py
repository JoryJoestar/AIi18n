import json
from fastapi import APIRouter

from schemas.translate import TranslateParams
from services.translate import translate_query

translate_router = APIRouter()

@translate_router.post("/translate")
def translate(translate_params: TranslateParams):
    print(type(translate_params))
    response = translate_query(translate_params)
    return {
        'code': 200,
        'data': response
    }