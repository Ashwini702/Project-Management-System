import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = int(os.getenv('DB_PORT', '3306'))
    DB_NAME = os.getenv('DB_NAME', 'project_management_db')
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'change_this_secret_key')
    JWT_EXPIRES_IN = os.getenv('JWT_EXPIRES_IN', '24h')
    FRONTEND_URLS = [url.strip() for url in os.getenv('FRONTEND_URLS', 'http://localhost:5175,http://127.0.0.1:5175,http://localhost:8081,http://127.0.0.1:8081').split(',') if url.strip()]
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024

