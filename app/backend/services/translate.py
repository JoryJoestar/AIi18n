import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import importlib
import logging

from services import openai
from schemas.translate import TranslateParams

# 配置 logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def translate_query(translateParams: TranslateParams):
    # 获取 openAI
    client = openai.ClientOpenAI()
    
    logger.info('OpenAI: %s',client.client.base_url)
    # 获取 prompt 版本模块
    prompt_module_path = f'services.prompt.{ translateParams.prompt_version }.prompt'
    prompt = importlib.import_module(prompt_module_path)
    # 获取 prompt
    translate_prompt = prompt.get_prompt(translateParams)
    # 构建 messages
    messages = [
            {"role": "system", "content": translate_prompt['system_prompt']},
            {"role": "user", "content": translate_prompt['user_prompt']},
        ]
    
    # 获取翻译结果
    translate_res = client.query(messages)
    translate_completion = translate_res['completion']
    
    # 获取翻译内容
    translate_content = client.get_content(translate_completion)
    translate_elapsed_time = translate_res['elapsed_time']

    # 获取 token 数量
    prompt_tokens = client.get_prompt_tokens(translate_completion)
    total_tokens = client.get_total_tokens(translate_completion)
    output_tokens = total_tokens - prompt_tokens
    
    return {
        'translate_elapsed_time':translate_elapsed_time,
        'prompt_tokens':prompt_tokens,
        'output_tokens':output_tokens,
        'total_tokens':total_tokens,
        'translate_content':translate_content
    }

