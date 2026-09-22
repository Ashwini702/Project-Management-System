from database.db import execute, query
from utils.password_utils import hash_password

PROFILE_FIELDS = [
    'department', 'designation', 'joining_date', 'workload', 'performance',
    'skills', 'assigned_projects', 'profile_image_name', 'assigned_tasks',
    'completed_tasks', 'pending_tasks'
]
ACCOUNT_FIELDS = ['name', 'email', 'phone', 'status', 'avatar']


def ensure_team_members_table():
    execute('''CREATE TABLE IF NOT EXISTS team_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL UNIQUE,
        department VARCHAR(100),
        designation VARCHAR(100),
        joining_date DATE,
        workload INT DEFAULT 0,
        performance INT DEFAULT 0,
        skills JSON,
        assigned_projects JSON,
        profile_image_name VARCHAR(255),
        assigned_tasks INT DEFAULT 0,
        completed_tasks INT DEFAULT 0,
        pending_tasks INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_team_members_user FOREIGN KEY (user_id)
            REFERENCES users(id) ON DELETE CASCADE
    )''')
    execute('''INSERT INTO team_members (
        user_id, department, designation, joining_date, workload, performance,
        skills, assigned_projects, profile_image_name, assigned_tasks,
        completed_tasks, pending_tasks
    )
    SELECT u.id, u.department, u.designation, u.joining_date, u.workload,
           u.performance, u.skills, u.assigned_projects, u.profile_image_name,
           u.assigned_tasks, u.completed_tasks, u.pending_tasks
    FROM users u
    WHERE u.role='Team Member'
      AND NOT EXISTS (SELECT 1 FROM team_members tm WHERE tm.user_id=u.id)''')
    execute('''UPDATE users u
        JOIN team_members tm ON tm.user_id=u.id
        SET u.department=NULL, u.designation=NULL, u.joining_date=NULL,
            u.workload=0, u.performance=0, u.skills=NULL,
            u.assigned_projects=NULL, u.profile_image_name=NULL,
            u.assigned_tasks=0, u.completed_tasks=0, u.pending_tasks=0
        WHERE u.role='Team Member' ''')


def get_team_member(user_id):
    ensure_team_members_table()
    return query('''SELECT
        u.id, u.name, u.email, u.role, u.phone, u.status, u.avatar,
        tm.id AS team_member_id, tm.department, tm.designation,
        tm.joining_date, tm.workload, tm.performance, tm.skills,
        tm.assigned_projects, tm.profile_image_name, tm.assigned_tasks,
        tm.completed_tasks, tm.pending_tasks, tm.created_at, tm.updated_at
    FROM users u
    JOIN team_members tm ON tm.user_id=u.id
    WHERE u.id=%s AND u.role='Team Member' ''', (user_id,), one=True)


def list_team_members():
    ensure_team_members_table()
    return query('''SELECT
        u.id, u.name, u.email, u.role, u.phone, u.status, u.avatar,
        tm.id AS team_member_id, tm.department, tm.designation,
        tm.joining_date, tm.workload, tm.performance, tm.skills,
        tm.assigned_projects, tm.profile_image_name, tm.assigned_tasks,
        tm.completed_tasks, tm.pending_tasks, tm.created_at, tm.updated_at
    FROM team_members tm
    JOIN users u ON u.id=tm.user_id
    WHERE u.role='Team Member'
    ORDER BY tm.id DESC''')


def create_team_member(data):
    ensure_team_members_table()
    email = (data.get('email') or '').lower().strip()
    password = data.get('password')
    if not data.get('name') or not email or not password:
        raise ValueError('Name, email, and login password are required')
    if query('SELECT id FROM users WHERE email=%s', (email,), one=True):
        raise ValueError('A login account with this email already exists')
    user_id = execute('''INSERT INTO users
        (name,email,password_hash,role,phone,status,avatar)
        VALUES(%s,%s,%s,'Team Member',%s,%s,%s)''', (
        data.get('name'), email, hash_password(password), data.get('phone'),
        data.get('status') or 'Active', data.get('avatar')
    ))
    try:
        selected = [field for field in PROFILE_FIELDS if field in data]
        columns = ['user_id'] + selected
        values = [user_id] + [data[field] for field in selected]
        execute(f"INSERT INTO team_members ({','.join(f'`{field}`' for field in columns)}) VALUES ({','.join(['%s'] * len(columns))})", tuple(values))
    except Exception:
        execute('DELETE FROM users WHERE id=%s', (user_id,))
        raise
    return get_team_member(user_id)


def update_team_member(user_id, data):
    ensure_team_members_table()
    existing = get_team_member(user_id)
    if not existing:
        return None
    if data.get('email'):
        email = data['email'].lower().strip()
        duplicate = query('SELECT id FROM users WHERE email=%s AND id<>%s', (email, user_id), one=True)
        if duplicate:
            raise ValueError('A login account with this email already exists')
        data['email'] = email
    account_data = {field: data[field] for field in ACCOUNT_FIELDS if field in data}
    account_data['role'] = 'Team Member'
    if data.get('password'):
        account_data['password_hash'] = hash_password(data['password'])
    if account_data:
        fields = list(account_data)
        execute(f"UPDATE users SET {','.join(f'`{field}`=%s' for field in fields)} WHERE id=%s", tuple(account_data[field] for field in fields) + (user_id,))
    profile_data = {field: data[field] for field in PROFILE_FIELDS if field in data}
    if profile_data:
        fields = list(profile_data)
        execute(f"UPDATE team_members SET {','.join(f'`{field}`=%s' for field in fields)} WHERE user_id=%s", tuple(profile_data[field] for field in fields) + (user_id,))
    return get_team_member(user_id)


def delete_team_member(user_id):
    ensure_team_members_table()
    existing = get_team_member(user_id)
    if not existing:
        return False
    execute("DELETE FROM users WHERE id=%s AND role='Team Member'", (user_id,))
    return True