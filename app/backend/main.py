import multiprocessing
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.translate import translate_router  # 导入 api 模块
from api.settings import settings_router  # 导入 api 模块

app = FastAPI()

# 设置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 前端来源
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有头部
)

app.include_router(translate_router)  # 包含 api 路由
app.include_router(settings_router)  # 包含 api 路由
    
if __name__ == "__main__":
    multiprocessing.freeze_support()
    uvicorn.run("__main__:app",
                host="127.0.0.1",
                port=10001
                # reload=True，
                # log_config="uvicorn_log.ini"
                )