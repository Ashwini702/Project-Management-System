from functools import wraps
from flask import g
from utils.response_utils import fail
def roles_required(*roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            if g.auth.get('role') not in roles: return fail('Forbidden', 403)
            return fn(*args, **kwargs)
        return wrapper
    return decorator
