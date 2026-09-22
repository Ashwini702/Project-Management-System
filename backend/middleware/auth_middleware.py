from functools import wraps
from flask import request, g
import jwt
from utils.jwt_utils import decode_token
from utils.response_utils import fail
def auth_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        value = request.headers.get('Authorization', '')
        if not value.startswith('Bearer '): return fail('Authentication required', 401)
        try: g.auth = decode_token(value[7:])
        except (jwt.InvalidTokenError, ValueError): return fail('Invalid or expired token', 401)
        return fn(*args, **kwargs)
    return wrapper
