from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from utils.directory import get_parent_directory

import os
import sys
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


if getattr(sys, 'frozen', False):
    base_dir = get_parent_directory(os.path.abspath(os.path.dirname(__file__)), 4)
    SQLALCHEMY_DATABASE_URL = f"sqlite:///{base_dir + '/database/prod.db'}"
else:
    # 如果是开发环境
    SQLALCHEMY_DATABASE_URL = f"sqlite:///../database/dev.db";
    
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": True}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()