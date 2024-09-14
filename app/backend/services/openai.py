import os
from dotenv import load_dotenv
import time
import openai

class ClientOpenAI:
    def query(self, messages):
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
        
    def get_completion_tokens(self, completion):
        return completion.usage.completion_tokens

    def get_prompt_tokens(self, completion):
        return completion.usage.prompt_tokens

    def get_total_tokens(self,completion):
        return completion.usage.total_tokens

    def get_content(self, completion):
        return completion.choices[0].message.content
    
    def __init__(self):
        
        load_dotenv()
        
        # OPENAI 配置

        OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

        # cloudflare worker
        # OPENAI_HOST = 'snowy-cell-d826.1120659490.workers.dev'
        # deno
        OPENAI_HOST = 'openai-proxy-0709.deno.dev'

        OPENAI_BASE_API_URL = f'https://{OPENAI_HOST}/v1'

        openai.api_key = OPENAI_API_KEY
        openai.base_url = OPENAI_BASE_API_URL
        
        self.client = openai.OpenAI()
    