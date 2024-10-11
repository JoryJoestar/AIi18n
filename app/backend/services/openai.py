import os
import time
import openai
import logging

from fastapi import Depends
from sqlalchemy.orm import Session  # 导入 Session
from database.cruds.settings import get_api_key
from database.main import get_db

# 配置 logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

os.environ['HTTP_PROXY'] = 'http://127.0.0.1:7890'
os.environ['HTTPS_PROXY'] = 'http://127.0.0.1:7890'

openai_api_key = ''

class ClientOpenAI:
    def query(self, messages):
        try:
            start_time = time.time()  # 记录查询开始时间
            completion = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages
            )

            end_time = time.time()  # 记录查询结束时间
            elapsed_time = f'{round(end_time - start_time, 1)}s' # 计算查询耗时
            return {
                "completion":completion, 
                "elapsed_time":elapsed_time
            }
        except Exception as e:
            logger.error("Error querying OpenAI: %s", e)
            raise
        
    def get_completion_tokens(self, completion):
        return completion.usage.completion_tokens

    def get_prompt_tokens(self, completion):
        return completion.usage.prompt_tokens

    def get_total_tokens(self,completion):
        return completion.usage.total_tokens

    def get_content(self, completion):
        return completion.choices[0].message.content
    
    def __init__(self):
        global openai_api_key
        
        self.client = openai.OpenAI()
 
        # OPENAI 配置

        # OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
        
        # 获取数据库会话
        db: Session = next(get_db())  # 获取数据库会话
        
        if not openai_api_key:
            api_key_record = get_api_key(db, 'OpenAI')
            if api_key_record:
                openai_api_key = api_key_record.value
            else:
                raise ValueError("API key not found in the database.")

        logger.info(f"Using OpenAI API key: {openai_api_key}")
        
        # cloudflare worker
        # OPENAI_HOST = 'snowy-cell-d826.1120659490.workers.dev'
        
        # deno
        OPENAI_HOST = 'openai-proxy-0920.deno.dev'

        OPENAI_BASE_API_URL = f'https://{OPENAI_HOST}/v1/'
        
        self.client.api_key = openai_api_key
        # self.client.base_url = OPENAI_BASE_API_URL
