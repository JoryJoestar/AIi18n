import os

# 获取目录下的子目录
def get_subdirectories(directory):
    return [d for d in os.listdir(directory) 
            if os.path.isdir(os.path.join(directory, d)) and d != '__pycache__']

# 返回目录下所有的文件名
def get_subfiles(directory):
    return [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]

