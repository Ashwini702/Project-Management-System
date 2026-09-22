from datetime import datetime, timedelta, timezone
import jwt
from config import Config
def create_token(user):
    hours = int(Config.JWT_EXPIRES_IN.removesuffix('h'))
    return jwt.encode({'sub': str(user['id']), 'role': user['role'], 'exp': datetime.now(timezone.utc) + timedelta(hours=hours)}, Config.JWT_SECRET_KEY, algorithm='HS256')
def decode_token(token): return jwt.decode(token, Config.JWT_SECRET_KEY, algorithms=['HS256'])
