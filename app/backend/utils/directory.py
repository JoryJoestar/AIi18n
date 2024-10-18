import os

# 获取目录下的子目录
def get_subdirectories(directory):
    return [d for d in os.listdir(directory) 
            if os.path.isdir(os.path.join(directory, d)) and d != '__pycache__']

# 返回目录下所有的文件名
def get_subfiles(directory):
    return [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]

# 获取绝对路径上一级的函数
def get_parent_directory(path, levels=1):
    if levels < 1:
        raise ValueError("levels 必须大于或等于 1")
    
    for _ in range(levels):
        path = os.path.abspath(os.path.join(path, os.pardir))
    
    return path