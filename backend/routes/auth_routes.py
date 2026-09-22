import os
import uuid
from werkzeug.utils import secure_filename
from flask import Blueprint, request, g, current_app
from database.db import query, execute
from database.team_repository import ensure_team_members_table, get_team_member
from middleware.auth_middleware import auth_required
from utils.jwt_utils import create_token
from utils.password_utils import verify_password
from utils.response_utils import ok, fail

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
PATHS = {'Admin':'/admin/dashboard','Project Manager':'/manager/dashboard','Team Member':'/team/dashboard','Client':'/client/dashboard'}

def public_user(user):
    result = {k: user.get(k) for k in ('id','name','email','role','phone','department','designation','status','avatar','profile_image_name')} | {'dashboardPath': PATHS[user['role']]}
    if user.get('role') == 'Team Member':
        profile = get_team_member(user['id'])
        if profile:
            for field in ('department','designation','joining_date','workload','performance','skills','assigned_projects','profile_image_name','assigned_tasks','completed_tasks','pending_tasks'):
                result[field] = profile.get(field)
    if user.get('role') == 'Client':
        client = query('SELECT id,company_name,contact_person FROM clients WHERE user_id=%s', (user['id'],), one=True)
        result['client_id'] = client.get('id') if client else None
        result['company_name'] = client.get('company_name') if client else None
    return result

@auth_bp.post('/login')
def login():
    data = request.get_json(silent=True) or {}
    if not data.get('email') or not data.get('password'): return fail('Email and password are required', 400)
    user = query('SELECT * FROM users WHERE email=%s AND status=%s', (data['email'].lower().strip(), 'Active'), one=True)
    if not user: return fail('Invalid email or password', 401)
    try:
        password_matches = verify_password(data['password'], user.get('password_hash') or '')
    except (ValueError, TypeError, AttributeError):
        return fail('Invalid email or password', 401)
    if not password_matches: return fail('Invalid email or password', 401)
    result = public_user(user); result['token'] = create_token(user)
    return ok(result, 'Login successful')

@auth_bp.get('/me')
@auth_required
def me():
    user = query('SELECT * FROM users WHERE id=%s', (g.auth['sub'],), one=True)
    return ok(public_user(user)) if user else fail('User not found', 404)

@auth_bp.post('/logout')
@auth_required
def logout(): return ok(message='Logged out successfully')

@auth_bp.post('/profile-photo')
@auth_required
def upload_profile_photo():
    photo = request.files.get('photo')
    if not photo or not photo.filename:
        return fail('Profile photo is required', 400)
    extension = os.path.splitext(secure_filename(photo.filename))[1].lower()
    if extension not in ('.jpg', '.jpeg', '.png', '.gif', '.webp'):
        return fail('Only JPG, PNG, GIF, or WEBP images are allowed', 400)
    profile_folder = os.path.join(current_app.config['UPLOAD_FOLDER'], 'profiles')
    os.makedirs(profile_folder, exist_ok=True)
    filename = f"user_{g.auth['sub']}_{uuid.uuid4().hex}{extension}"
    photo.save(os.path.join(profile_folder, filename))
    if g.auth.get('role') == 'Team Member':
        ensure_team_members_table()
        previous = query('SELECT profile_image_name FROM team_members WHERE user_id=%s', (g.auth['sub'],), one=True)
        execute('UPDATE team_members SET profile_image_name=%s WHERE user_id=%s', (filename, g.auth['sub']))
    else:
        previous = query('SELECT profile_image_name FROM users WHERE id=%s', (g.auth['sub'],), one=True)
        execute('UPDATE users SET profile_image_name=%s WHERE id=%s', (filename, g.auth['sub']))
    old_name = previous.get('profile_image_name') if previous else None
    if old_name and old_name != filename:
        old_path = os.path.join(profile_folder, os.path.basename(old_name))
        if os.path.isfile(old_path):
            try:
                os.remove(old_path)
            except OSError:
                pass
    execute('INSERT INTO activity_logs(user_id,action,module,description) VALUES(%s,%s,%s,%s)', (g.auth['sub'], 'Update', 'profile', 'Updated profile photo'))
    return ok({'profile_image_name': filename}, 'Profile photo updated')

