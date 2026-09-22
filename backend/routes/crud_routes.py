import base64
import binascii
import os
import re
import uuid
from flask import Blueprint, request, g, current_app
from datetime import date, datetime, time, timedelta
from decimal import Decimal
from database.db import query, execute
from database.team_repository import (
    create_team_member, delete_team_member, get_team_member,
    list_team_members, update_team_member
)
from middleware.auth_middleware import auth_required
from middleware.role_middleware import roles_required
from utils.password_utils import hash_password
from utils.response_utils import ok, fail

TABLES = {
 'users': ('users', ['name','email','password','role','phone','department','designation','status','avatar','assigned_projects','profile_image_name','assigned_tasks','completed_tasks','pending_tasks']),
 'projects': ('projects', ['title','description','category','priority','status','start_date','end_date','progress','manager_id','manager_name','client_id','client_name','budget','team_members','total_tasks']),
 'tasks': ('tasks', ['project_id','project_name','title','description','assigned_to','assignee_name','start_date','deadline','priority','status','progress','estimated_hours']),
 'clients': ('clients', ['user_id','company_name','contact_person','email','phone','address','city','industry','status','payment_status','project_value','paid_amount','assigned_projects','notes','company_logo']),
 'calendar': ('calendar_events', ['title','description','event_type','project_name','related_task','assigned_to_name','event_date','start_time','end_time','priority','status','reminder','notes']),
 'meetings': ('meetings', ['title','description','meeting_type','project_name','client_name','agenda','meeting_date','meeting_time','end_time','meeting_mode','location','meeting_link','participants','status','notes','created_by']),
 'attendance': ('attendance', ['user_id','attendance_date','check_in','check_out','work_hours','status']),
 'daily-reports': ('daily_reports', ['user_id','report_date','report_title','project_name','task_name','work_type','today_tasks','work_summary','completed_work','pending_work','blockers','tomorrow_plan','start_time','end_time','break_minutes','work_hours','productive_hours','overtime_hours','task_progress','task_status','productivity_score','productivity_level','status','submitted_at','reviewed_by','reviewer_comment','attachments']),
 'budget': ('budgets', ['project_id','project_name','client_name','total_budget','used_budget','remaining_budget','payment_status','profit_loss','start_date','end_date','notes']),
 'expenses': ('expenses', ['project_id','project_name','client_name','team_member_name','title','amount','expense_date','category','payment_method','status','notes','receipt']),
 'invoices': ('invoices', ['invoice_number','project_name','client_name','invoice_date','due_date','total_amount','paid_amount','pending_amount','tax_amount','discount_amount','final_amount','invoice_status','payment_status','description','payment_terms','notes']),
 'payments': ('payments', ['invoice_id','payment_id','invoice_number','project_name','client_name','payment_date','payment_method','paid_amount','transaction_id','status','receipt']),
 'notifications': ('notifications', ['user_id','title','message','type','recipient_role','recipient_user','related_project','related_task','channels','priority','status','scheduled_at','sender_id','sender_name','sender_role','is_read']),
 'team': ('team_members', ['user_id','department','designation','joining_date','workload','performance','skills','assigned_projects','profile_image_name','assigned_tasks','completed_tasks','pending_tasks']),
 'work-reports': ('daily_reports', ['user_id','report_date','report_title','project_name','task_name','work_type','today_tasks','work_summary','completed_work','pending_work','blockers','tomorrow_plan','start_time','end_time','break_minutes','work_hours','productive_hours','overtime_hours','task_progress','task_status','productivity_score','productivity_level','status','submitted_at','reviewed_by','reviewer_comment','attachments']),
 'backups': ('backups', ['name','type','size','status','created_by_id','created_by','storage_location','included_data','restore_count','last_restored','notes','scheduled_at']),
 'restore-history': ('restore_history', ['backup_id','restored_by_id','restore_type','notes','status']),
 'documents': ('documents', ['project_id','task_id','uploaded_by','file_name','file_path','file_type','file_size']),
 'feedback': ('client_feedback', ['title','message','client_name','company_name','client_email','project_name','category','rating','priority','status','submitted_date','assigned_manager','last_response_date']),
 'feedback-responses': ('feedback_responses', ['feedback_id','message','status_update','internal_note','notify_client','responder_id','responder_name']),
}

crud_bp = Blueprint('crud', __name__, url_prefix='/api')

def ensure_notification_columns():
    columns = {row['Field'] for row in query('SHOW COLUMNS FROM notifications')}
    additions = {
        'recipient_role': 'VARCHAR(80) NULL', 'recipient_user': 'VARCHAR(120) NULL',
        'related_project': 'VARCHAR(200) NULL', 'related_task': 'VARCHAR(200) NULL',
        'channels': 'VARCHAR(120) NULL', 'priority': 'VARCHAR(30) NULL',
        'status': 'VARCHAR(40) NULL', 'scheduled_at': 'DATETIME NULL',
        'sender_id': 'INT NULL', 'sender_name': 'VARCHAR(120) NULL',
        'sender_role': 'VARCHAR(80) NULL', 'feedback_id': 'INT NULL'
    }
    for column, definition in additions.items():
        if column not in columns: execute(f'ALTER TABLE notifications ADD COLUMN `{column}` {definition}')
def ensure_feedback_tables():
    execute('''CREATE TABLE IF NOT EXISTS client_feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        client_name VARCHAR(120),
        company_name VARCHAR(160),
        client_email VARCHAR(190),
        project_name VARCHAR(200),
        category VARCHAR(100),
        rating TINYINT UNSIGNED,
        priority VARCHAR(30) DEFAULT 'Medium',
        status VARCHAR(50) DEFAULT 'Pending',
        submitted_date DATE,
        assigned_manager VARCHAR(120),
        last_response_date DATE NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )''')
    execute('''CREATE TABLE IF NOT EXISTS feedback_responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        feedback_id INT NOT NULL,
        message TEXT NOT NULL,
        status_update VARCHAR(50),
        internal_note TEXT,
        notify_client BOOLEAN DEFAULT TRUE,
        responder_id INT NULL,
        responder_name VARCHAR(120),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(responder_id) REFERENCES users(id) ON DELETE SET NULL
    )''')
def clean(value):
    """Convert database values into JSON-safe response values."""
    if isinstance(value, list):
        return [clean(item) for item in value]
    if isinstance(value, dict):
        value.pop('password_hash', None)
        return {key: clean(item) for key, item in value.items()}
    if isinstance(value, (datetime, date, time)):
        return value.isoformat()
    if isinstance(value, timedelta):
        total_seconds = int(value.total_seconds())
        hours, remainder = divmod(total_seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        return f'{hours:02d}:{minutes:02d}:{seconds:02d}'
    if isinstance(value, Decimal):
        return float(value)
    return value

def ensure_attendance_capture_columns():
    columns = {row['Field'] for row in query('SHOW COLUMNS FROM attendance')}
    additions = {
        'check_in_latitude': 'DECIMAL(10,7) NULL',
        'check_in_longitude': 'DECIMAL(10,7) NULL',
        'check_in_accuracy': 'DECIMAL(10,2) NULL',
        'check_in_photo': 'VARCHAR(255) NULL',
        'check_out_latitude': 'DECIMAL(10,7) NULL',
        'check_out_longitude': 'DECIMAL(10,7) NULL',
        'check_out_accuracy': 'DECIMAL(10,2) NULL',
        'check_out_photo': 'VARCHAR(255) NULL'
    }
    for column, definition in additions.items():
        if column not in columns:
            execute(f'ALTER TABLE attendance ADD COLUMN `{column}` {definition}')


def save_attendance_photo(data_url, user_id, action):
    match = re.fullmatch(r'data:image/(jpeg|png|webp);base64,(.+)', data_url or '', re.DOTALL)
    if not match:
        raise ValueError('A valid camera photo is required')
    try:
        image_bytes = base64.b64decode(match.group(2), validate=True)
    except (ValueError, binascii.Error):
        raise ValueError('Camera photo data is invalid')
    if len(image_bytes) > 5 * 1024 * 1024:
        raise ValueError('Camera photo must be smaller than 5 MB')
    extension = {'jpeg': 'jpg', 'png': 'png', 'webp': 'webp'}[match.group(1)]
    folder = os.path.join(current_app.config['UPLOAD_FOLDER'], 'attendance')
    os.makedirs(folder, exist_ok=True)
    filename = f'user_{user_id}_{action}_{uuid.uuid4().hex}.{extension}'
    with open(os.path.join(folder, filename), 'wb') as image_file:
        image_file.write(image_bytes)
    return filename

def sync_project_budget(project_id):
    project = query('SELECT id,title,client_name,budget,start_date,end_date FROM projects WHERE id=%s', (project_id,), one=True)
    if not project: return
    existing = query('SELECT id,used_budget FROM budgets WHERE project_id=%s', (project_id,), one=True)
    total = project.get('budget') or 0
    if existing:
        used = existing.get('used_budget') or 0
        execute('UPDATE budgets SET project_name=%s,client_name=%s,total_budget=%s,remaining_budget=%s,start_date=%s,end_date=%s WHERE id=%s', (project.get('title'),project.get('client_name'),total,total-used,project.get('start_date'),project.get('end_date'),existing['id']))
    else:
        execute('INSERT INTO budgets(project_id,project_name,client_name,total_budget,used_budget,remaining_budget,payment_status,start_date,end_date) VALUES(%s,%s,%s,%s,0,%s,%s,%s,%s)', (project_id,project.get('title'),project.get('client_name'),total,total,'Pending',project.get('start_date'),project.get('end_date')))

def sync_expense_total(project_id):
    if not project_id: return
    total = query('SELECT COALESCE(SUM(amount),0) total FROM expenses WHERE project_id=%s', (project_id,), one=True)['total']
    execute('UPDATE budgets SET used_budget=%s,remaining_budget=GREATEST(total_budget-%s,0) WHERE project_id=%s', (total,total,project_id))

def log(action, module, description):
    execute('INSERT INTO activity_logs(user_id,action,module,description) VALUES(%s,%s,%s,%s)', (g.auth['sub'], action, module, description))
def current_client():
    return query('SELECT * FROM clients WHERE user_id=%s', (g.auth['sub'],), one=True)


def client_scoped_rows(resource, client):

    if resource == 'clients':
        return query('SELECT * FROM clients WHERE id=%s', (client['id'],))
    if resource == 'projects':
        return query("SELECT p.*,COUNT(DISTINCT t.id) total_tasks_count,SUM(CASE WHEN t.status='Completed' THEN 1 ELSE 0 END) completed_tasks_count,COUNT(DISTINCT d.id) shared_files_count FROM projects p LEFT JOIN tasks t ON t.project_id=p.id LEFT JOIN documents d ON d.project_id=p.id WHERE p.client_id=%s GROUP BY p.id ORDER BY p.id DESC", (client['id'],))
    if resource == 'tasks':
        return query('SELECT t.* FROM tasks t JOIN projects p ON p.id=t.project_id WHERE p.client_id=%s ORDER BY t.id DESC', (client['id'],))
    if resource == 'budget':
        return query('SELECT b.* FROM budgets b JOIN projects p ON p.id=b.project_id WHERE p.client_id=%s ORDER BY b.id DESC', (client['id'],))
    if resource == 'expenses':
        return query('SELECT e.* FROM expenses e JOIN projects p ON p.id=e.project_id WHERE p.client_id=%s ORDER BY e.id DESC', (client['id'],))
    if resource == 'invoices':
        return query('SELECT * FROM invoices WHERE client_name=%s OR client_name=%s ORDER BY id DESC', (client.get('contact_person') or '', client.get('company_name') or ''))
    if resource == 'payments':
        return query('SELECT * FROM payments WHERE client_name=%s OR client_name=%s ORDER BY id DESC', (client.get('contact_person') or '', client.get('company_name') or ''))
    if resource == 'documents':
        return query('SELECT d.* FROM documents d JOIN projects p ON p.id=d.project_id WHERE p.client_id=%s ORDER BY d.id DESC', (client['id'],))
    if resource == 'calendar':
        return query('SELECT ce.* FROM calendar_events ce JOIN projects p ON p.title=ce.project_name WHERE p.client_id=%s ORDER BY ce.id DESC', (client['id'],))
    if resource == 'meetings':
        return query('SELECT * FROM meetings WHERE client_name=%s ORDER BY id DESC', (client['company_name'],))
    return None

@crud_bp.route('/<resource>', methods=['GET','POST'])
@auth_required
def collection(resource):
    if resource == 'expenses':
        try: execute('ALTER TABLE expenses ADD COLUMN team_member_name VARCHAR(255) NULL')
        except Exception: pass
    if resource == 'invoices':
        execute('''CREATE TABLE IF NOT EXISTS invoices (id INT AUTO_INCREMENT PRIMARY KEY, invoice_number VARCHAR(100) NOT NULL, project_name VARCHAR(255), client_name VARCHAR(255), invoice_date DATE, due_date DATE, total_amount DECIMAL(14,2) DEFAULT 0, paid_amount DECIMAL(14,2) DEFAULT 0, pending_amount DECIMAL(14,2) DEFAULT 0, tax_amount DECIMAL(14,2) DEFAULT 0, discount_amount DECIMAL(14,2) DEFAULT 0, final_amount DECIMAL(14,2) DEFAULT 0, invoice_status VARCHAR(50) DEFAULT 'Generated', payment_status VARCHAR(50) DEFAULT 'Pending', description TEXT, payment_terms VARCHAR(100), notes TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    if resource == 'payments':
        execute('''CREATE TABLE IF NOT EXISTS payments (id INT AUTO_INCREMENT PRIMARY KEY, invoice_id INT, payment_id VARCHAR(100), invoice_number VARCHAR(100), project_name VARCHAR(255), client_name VARCHAR(255), payment_date DATE, payment_method VARCHAR(100), paid_amount DECIMAL(14,2) DEFAULT 0, transaction_id VARCHAR(255), status VARCHAR(50) DEFAULT 'Completed', receipt VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    if g.auth.get('role') == 'Team Member' and resource != 'notifications':
        if request.method == 'GET':
            if resource == 'tasks': rows = query('SELECT t.*,p.title project_name FROM tasks t LEFT JOIN projects p ON p.id=t.project_id WHERE t.assigned_to=%s ORDER BY t.id DESC', (g.auth['sub'],))
            elif resource == 'projects': rows = query("SELECT p.*,COUNT(t.id) my_task_count,SUM(CASE WHEN t.status='Completed' THEN 1 ELSE 0 END) my_completed_count,COALESCE(AVG(t.progress),0) my_progress FROM projects p JOIN tasks t ON t.project_id=p.id AND t.assigned_to=%s GROUP BY p.id ORDER BY p.id DESC", (g.auth['sub'],))
            elif resource in ('daily-reports', 'work-reports'): rows = query('SELECT * FROM daily_reports WHERE user_id=%s ORDER BY id DESC', (g.auth['sub'],))
            elif resource == 'attendance': rows = query('SELECT * FROM attendance WHERE user_id=%s ORDER BY attendance_date DESC', (g.auth['sub'],))
            elif resource == 'documents': rows = query('SELECT DISTINCT d.* FROM documents d JOIN tasks t ON t.project_id=d.project_id WHERE t.assigned_to=%s ORDER BY d.id DESC', (g.auth['sub'],))
            elif resource == 'calendar':
                user = query('SELECT name FROM users WHERE id=%s', (g.auth['sub'],), one=True)
                rows = query('SELECT * FROM calendar_events WHERE assigned_to_name=%s OR project_name IN (SELECT DISTINCT p.title FROM projects p JOIN tasks t ON t.project_id=p.id WHERE t.assigned_to=%s) ORDER BY id DESC', (user.get('name') if user else '', g.auth['sub']))
            elif resource == 'meetings':
                user = query('SELECT name FROM users WHERE id=%s', (g.auth['sub'],), one=True)
                rows = query('SELECT * FROM meetings WHERE JSON_SEARCH(participants, %s, %s) IS NOT NULL OR project_name IN (SELECT DISTINCT p.title FROM projects p JOIN tasks t ON t.project_id=p.id WHERE t.assigned_to=%s) ORDER BY id DESC', ('one', user.get('name') if user else '', g.auth['sub']))
            else: return fail('Resource is not available for team member accounts', 403)
            return ok([clean(row) for row in rows])
        if resource not in ('daily-reports', 'work-reports', 'attendance'):
            return fail('Team members cannot create this resource', 403)
    if g.auth.get('role') in ('Client', 'Team Member') and resource == 'attendance':
        ensure_attendance_capture_columns()
        if request.method == 'GET':
            rows = query('SELECT * FROM attendance WHERE user_id=%s ORDER BY attendance_date DESC', (g.auth['sub'],))
            return ok([clean(row) for row in rows])
        data = request.get_json(silent=True) or {}
        attendance_date = data.get('attendance_date') or date.today().isoformat()
        existing = query('SELECT id FROM attendance WHERE user_id=%s AND attendance_date=%s', (g.auth['sub'], attendance_date), one=True)
        if existing:
            return fail('Attendance is already recorded for this date', 409)
        try:
            photo_name = save_attendance_photo(data.get('photo_data'), g.auth['sub'], 'checkin')
        except ValueError as error:
            return fail(str(error), 400)
        if data.get('latitude') is None or data.get('longitude') is None:
            return fail('Live location is required', 400)
        fields = ['user_id','attendance_date','check_in','check_out','work_hours','status','check_in_latitude','check_in_longitude','check_in_accuracy','check_in_photo']
        values = {
            'user_id': int(g.auth['sub']), 'attendance_date': attendance_date,
            'check_in': data.get('check_in'), 'check_out': data.get('check_out'),
            'work_hours': data.get('work_hours'), 'status': data.get('status') or 'Present',
            'check_in_latitude': data.get('latitude'), 'check_in_longitude': data.get('longitude'),
            'check_in_accuracy': data.get('accuracy'), 'check_in_photo': photo_name
        }
        selected = [field for field in fields if values.get(field) is not None]
        new_id = execute(f"INSERT INTO attendance ({','.join(f'{field}' for field in selected)}) VALUES ({','.join(['%s'] * len(selected))})", tuple(values[field] for field in selected))
        log('Create', 'attendance', f'Client checked in (attendance #{new_id})')
        return ok(clean(query('SELECT * FROM attendance WHERE id=%s', (new_id,), one=True)), 'Attendance recorded', 201)
    if g.auth.get('role') == 'Client' and resource in ('feedback', 'feedback-responses') and request.method == 'GET':
        ensure_feedback_tables()
        client = current_client()
        if not client:
            return fail('Client account is not linked to a client record', 403)
        if resource == 'feedback':
            rows = query('SELECT cf.* FROM client_feedback cf JOIN projects p ON p.title=cf.project_name WHERE p.client_id=%s ORDER BY cf.id DESC', (client['id'],))
        else:
            rows = query('SELECT fr.* FROM feedback_responses fr JOIN client_feedback cf ON cf.id=fr.feedback_id JOIN projects p ON p.title=cf.project_name WHERE p.client_id=%s ORDER BY fr.id DESC', (client['id'],))
        return ok([clean(row) for row in rows])
    if g.auth.get('role') == 'Client' and resource not in ('notifications', 'feedback', 'feedback-responses'):
        if request.method != 'GET':
            return fail('Clients have read-only access to this resource', 403)
        client = current_client()
        if not client:
            return fail('Client account is not linked to a client record', 403)
        rows = client_scoped_rows(resource, client)
        if rows is None:
            return fail('Resource is not available for client accounts', 403)
        return ok([clean(row) for row in rows])
    if resource == 'team':
        if request.method == 'GET':
            return ok([clean(row) for row in list_team_members()])
        if g.auth.get('role') != 'Admin':
            return fail('Only admins can create team members', 403)
        data = request.get_json(silent=True) or {}
        try:
            member = create_team_member(data)
        except ValueError as error:
            return fail(str(error), 409 if 'already exists' in str(error) else 400)
        log('Create', 'team', f"Created team member account #{member['id']}")
        return ok(clean(member), 'Team member and login account created', 201)
    if resource == 'clients':
        if request.method == 'GET':
            return ok([clean(row) for row in query('SELECT c.*,u.email login_email,u.status login_status FROM clients c LEFT JOIN users u ON u.id=c.user_id ORDER BY c.id DESC')])
        data = request.get_json(silent=True) or {}
        email = (data.get('login_email') or data.get('email') or '').lower().strip()
        password = data.pop('password', None)
        if not email or not password:
            return fail('Client login email and password are required', 400)
        if query('SELECT id FROM users WHERE email=%s', (email,), one=True):
            return fail('A login account with this email already exists', 409)
        user_id = execute('INSERT INTO users(name,email,password_hash,role,phone,status) VALUES(%s,%s,%s,%s,%s,%s)', (data.get('contact_person'), email, hash_password(password), 'Client', data.get('phone'), 'Active' if data.get('status') == 'Active' else 'Inactive'))
        try:
            data['user_id'] = user_id
            table, fields = TABLES['clients']
            selected = [field for field in fields if field in data]
            client_id = execute(f"INSERT INTO `{table}` ({','.join(f'`{field}`' for field in selected)}) VALUES ({','.join(['%s'] * len(selected))})", tuple(data[field] for field in selected))
        except Exception:
            execute('DELETE FROM users WHERE id=%s', (user_id,))
            raise
        log('Create', 'clients', f'Created client #{client_id} with login account #{user_id}')
        return ok(clean(query('SELECT c.*,u.email login_email,u.status login_status FROM clients c LEFT JOIN users u ON u.id=c.user_id WHERE c.id=%s', (client_id,), one=True)), 'Client and login account created', 201)
    if resource == 'notifications':
        ensure_notification_columns()
        if request.method == 'GET':
            if g.auth.get('role') == 'Admin':
                return ok([clean(row) for row in query('SELECT * FROM notifications ORDER BY created_at DESC')])
            return ok([clean(row) for row in query('SELECT * FROM notifications WHERE user_id=%s OR sender_id=%s ORDER BY created_at DESC', (g.auth['sub'], g.auth['sub']))])
        data = request.get_json(silent=True) or {}
        feedback_id = data.get('feedback_id') or data.get('feedbackId')
        sender = query('SELECT name,role FROM users WHERE id=%s', (g.auth['sub'],), one=True)
        role = data.get('recipient_role') or data.get('recipientRole') or 'All Users'
        recipient = data.get('recipient_user') or data.get('recipientUser') or 'All'
        sql = "SELECT id,name FROM users WHERE status='Active'"
        params = []
        if role != 'All Users': sql += ' AND role=%s'; params.append(role)
        if recipient != 'All': sql += ' AND name=%s'; params.append(recipient)
        recipients = query(sql, tuple(params))
        if not recipients: return fail('No active recipients found', 400)
        created = []
        for user in recipients:
            notification_id = execute('''INSERT INTO notifications(user_id,title,message,type,recipient_role,recipient_user,related_project,related_task,channels,priority,status,scheduled_at,sender_id,sender_name,sender_role,is_read,feedback_id) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,0,%s)''', (user['id'],data.get('title'),data.get('message'),data.get('type'),role,user['name'],data.get('related_project') or data.get('relatedProject'),data.get('related_task') or data.get('relatedTask'),data.get('channels'),data.get('priority'),data.get('status') or 'Sent',data.get('scheduled_at') or data.get('scheduledAt') or None,int(g.auth['sub']),sender.get('name') if sender else 'System',sender.get('role') if sender else 'System',feedback_id))
            created.append(clean(query('SELECT * FROM notifications WHERE id=%s',(notification_id,),one=True)))
        if feedback_id and g.auth.get('role') in ('Admin', 'Project Manager'):
            ensure_feedback_tables()
            response_id = execute('INSERT INTO feedback_responses(feedback_id,message,status_update,internal_note,notify_client,responder_id,responder_name) VALUES(%s,%s,%s,%s,%s,%s,%s)', (feedback_id, data.get('message'), data.get('status_update') or '', '', 1, int(g.auth['sub']), sender.get('name') if sender else 'Admin'))
            execute('UPDATE client_feedback SET last_response_date=%s WHERE id=%s', (date.today().isoformat(), feedback_id))
        log('Create','notifications',f'Sent notification to {len(created)} recipient(s)')
        result = created[0]; result['delivered_count'] = len(created)
        return ok(result, f'Notification sent to {len(created)} recipient(s)', 201)
    if resource == 'activity-logs': return ok(query('SELECT al.*,u.name user_name,u.role user_role FROM activity_logs al LEFT JOIN users u ON u.id=al.user_id ORDER BY al.created_at DESC'))
    if resource in ('feedback', 'feedback-responses'): ensure_feedback_tables()
    if resource == 'feedback' and g.auth.get('role') == 'Client':
        client = current_client()
        if not client:
            return fail('Client account is not linked to a client record', 403)
        data = request.get_json(silent=True) or {}
        project = query('SELECT id,title FROM projects WHERE title=%s AND client_id=%s', (data.get('project_name'), client['id']), one=True)
        if not project:
            return fail('Please select one of your assigned projects', 400)
        data.update({
            'client_name': client.get('contact_person') or '',
            'company_name': client.get('company_name') or '',
            'client_email': client.get('email') or '',
            'project_name': project['title'],
            'status': 'Pending',
            'submitted_date': date.today().isoformat()
        })
    if resource not in TABLES: return fail('Resource not found', 404)
    table, fields = TABLES[resource]
    if request.method == 'GET':
        sql = f'SELECT * FROM `{table}`'
        if resource == 'team':
            sql += " WHERE role='Team Member'"
        return ok([clean(x) for x in query(sql + ' ORDER BY id DESC')])
    data = request.get_json(silent=True) or {}
    if resource == 'expenses' and not data.get('project_id') and data.get('project_name'):
        project = query('SELECT id FROM projects WHERE title=%s', (data['project_name'],), one=True)
        if project: data['project_id'] = project['id']
    if resource == 'feedback-responses':
        data['responder_id'] = int(g.auth['sub'])
        responder = query('SELECT name FROM users WHERE id=%s', (g.auth['sub'],), one=True)
        data['responder_name'] = responder.get('name') if responder else 'Project Manager'
    if resource in ('daily-reports', 'work-reports'):
        data['user_id'] = int(g.auth['sub'])
    if resource == 'attendance' and g.auth.get('role') == 'Team Member':
        data['user_id'] = int(g.auth['sub'])
    if resource == 'tasks':
        if not data.get('project_id') and data.get('project_name'):
            project = query('SELECT id FROM projects WHERE title=%s', (data['project_name'],), one=True)
            if project: data['project_id'] = project['id']
        if not data.get('assigned_to') and data.get('assignee_name'):
            assignee = query("SELECT id FROM users WHERE name=%s AND role='Team Member'", (data['assignee_name'],), one=True)
            if assignee: data['assigned_to'] = assignee['id']
    if resource == 'backups':
        data['created_by_id'] = int(g.auth['sub'])
        creator = query('SELECT name FROM users WHERE id=%s', (g.auth['sub'],), one=True)
        data['created_by'] = creator.get('name') if creator else 'Admin'
    if resource in ('users', 'team') and data.get('password'):
        data['password_hash'] = hash_password(data.pop('password')); fields = [f for f in fields if f != 'password'] + ['password_hash']
    selected = [f for f in fields if f in data]
    if not selected: return fail('No valid fields supplied')
    new_id = execute(f"INSERT INTO `{table}` ({','.join(f'`{f}`' for f in selected)}) VALUES ({','.join(['%s']*len(selected))})", tuple(data[f] for f in selected))
    if resource == 'projects': sync_project_budget(new_id)
    if resource == 'expenses': sync_expense_total(data.get('project_id'))
    if resource == 'feedback' and g.auth.get('role') == 'Client':
        ensure_notification_columns()
        sender = query('SELECT name FROM users WHERE id=%s', (g.auth['sub'],), one=True)
        for admin in query("SELECT id,name FROM users WHERE role='Admin' AND status='Active'"):
            execute('''INSERT INTO notifications(user_id,title,message,type,recipient_role,recipient_user,related_task,priority,status,sender_id,sender_name,sender_role,is_read,feedback_id) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,0,%s)''', (admin['id'], 'Client Feedback: ' + (data.get('title') or 'New feedback'), data.get('message'), 'Client Feedback', 'Admin', admin['name'], 'feedback:' + str(new_id), data.get('priority') or 'Medium', 'Sent', int(g.auth['sub']), sender.get('name') if sender else 'Client', 'Client', new_id))
    if resource == 'feedback' and g.auth.get('role') == 'Client':
        manager = query("SELECT u.id,u.name FROM projects p JOIN users u ON u.name=p.manager_name WHERE p.title=%s AND u.role='Project Manager' AND u.status='Active' LIMIT 1", (data.get('project_name'),), one=True)
        if manager:
            execute('''INSERT INTO notifications(user_id,title,message,type,recipient_role,recipient_user,priority,status,sender_id,sender_name,sender_role,is_read,feedback_id) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,0,%s)''', (manager['id'], 'Client Feedback: ' + (data.get('title') or 'New feedback'), data.get('message'), 'Client Feedback', 'Project Manager', manager['name'], data.get('priority') or 'Medium', 'Sent', int(g.auth['sub']), sender.get('name') if sender else 'Client', 'Client', new_id))
    log('Create', resource, f'Created {resource} #{new_id}')
    return ok(clean(query(f'SELECT * FROM `{table}` WHERE id=%s', (new_id,), one=True)), 'Created', 201)

@crud_bp.route('/<resource>/<int:item_id>', methods=['GET','PUT','DELETE'])
@auth_required
def item(resource, item_id):
    if g.auth.get('role') == 'Team Member':
        if resource == 'tasks':
            if not query('SELECT id FROM tasks WHERE id=%s AND assigned_to=%s', (item_id, g.auth['sub']), one=True): return fail('Not found', 404)
            if request.method == 'DELETE': return fail('Team members cannot delete tasks', 403)
        elif resource in ('daily-reports', 'work-reports'):
            if not query('SELECT id FROM daily_reports WHERE id=%s AND user_id=%s', (item_id, g.auth['sub']), one=True): return fail('Not found', 404)
        elif resource == 'attendance':
            if not query('SELECT id FROM attendance WHERE id=%s AND user_id=%s', (item_id, g.auth['sub']), one=True): return fail('Not found', 404)
        elif resource == 'projects':
            if request.method != 'GET' or not query('SELECT p.id FROM projects p JOIN tasks t ON t.project_id=p.id WHERE p.id=%s AND t.assigned_to=%s', (item_id, g.auth['sub']), one=True): return fail('Not found', 404)
        elif resource == 'notifications':
            if not query('SELECT id FROM notifications WHERE id=%s AND user_id=%s', (item_id, g.auth['sub']), one=True): return fail('Not found', 404)
        elif resource == 'users':
            if item_id != int(g.auth['sub']) or request.method != 'PUT': return fail('Team members can only update their own profile', 403)
        else:
            return fail('Resource is not available for team member accounts', 403)
    if g.auth.get('role') in ('Client', 'Team Member') and resource == 'attendance':
        ensure_attendance_capture_columns()
        existing = query('SELECT * FROM attendance WHERE id=%s AND user_id=%s', (item_id, g.auth['sub']), one=True)
        if not existing:
            return fail('Attendance record not found', 404)
        if request.method == 'GET':
            return ok(clean(existing))
        if request.method == 'DELETE':
            return fail('Clients cannot delete attendance records', 403)
        data = request.get_json(silent=True) or {}
        allowed = ['check_in','check_out','work_hours','status']
        if 'check_out' in data:
            if data.get('latitude') is None or data.get('longitude') is None:
                return fail('Live location is required', 400)
            try:
                data['check_out_photo'] = save_attendance_photo(data.get('photo_data'), g.auth['sub'], 'checkout')
            except ValueError as error:
                return fail(str(error), 400)
            data['check_out_latitude'] = data.get('latitude')
            data['check_out_longitude'] = data.get('longitude')
            data['check_out_accuracy'] = data.get('accuracy')
            allowed += ['check_out_latitude','check_out_longitude','check_out_accuracy','check_out_photo']
        selected = [field for field in allowed if field in data]
        if not selected:
            return fail('No valid attendance fields supplied', 400)
        execute(f"UPDATE attendance SET {','.join(f'{field}=%s' for field in selected)} WHERE id=%s AND user_id=%s", tuple(data[field] for field in selected) + (item_id, g.auth['sub']))
        log('Update', 'attendance', f'Client updated attendance #{item_id}')
        return ok(clean(query('SELECT * FROM attendance WHERE id=%s', (item_id,), one=True)), 'Attendance updated')
    if g.auth.get('role') == 'Client':
        if request.method != 'GET':
            return fail('Clients have read-only access to this resource', 403)
        client = current_client()
        if not client:
            return fail('Client account is not linked to a client record', 403)
        allowed = False
        if resource == 'clients': allowed = item_id == client['id']
        elif resource == 'projects': allowed = bool(query('SELECT id FROM projects WHERE id=%s AND client_id=%s', (item_id, client['id']), one=True))
        elif resource == 'tasks': allowed = bool(query('SELECT t.id FROM tasks t JOIN projects p ON p.id=t.project_id WHERE t.id=%s AND p.client_id=%s', (item_id, client['id']), one=True))
        elif resource in ('budget', 'expenses', 'documents'):
            table = TABLES[resource][0]
            allowed = bool(query(f'SELECT x.id FROM `{table}` x JOIN projects p ON p.id=x.project_id WHERE x.id=%s AND p.client_id=%s', (item_id, client['id']), one=True))
        if not allowed:
            return fail('Not found', 404)
    if resource == 'team':
        if g.auth.get('role') != 'Admin':
            return fail('Only admins can manage team members', 403)
        if request.method == 'GET':
            member = get_team_member(item_id)
            return ok(clean(member)) if member else fail('Team member not found', 404)
        if request.method == 'DELETE':
            if not delete_team_member(item_id):
                return fail('Team member not found', 404)
            log('Delete', 'team', f'Deleted team member and login account #{item_id}')
            return ok(message='Team member and login account deleted')
        data = request.get_json(silent=True) or {}
        try:
            member = update_team_member(item_id, data)
        except ValueError as error:
            return fail(str(error), 409)
        if not member:
            return fail('Team member not found', 404)
        log('Update', 'team', f'Updated team member #{item_id}')
        return ok(clean(member), 'Team member and login account updated')
    if resource == 'clients' and g.auth.get('role') == 'Admin':
        existing = query('SELECT * FROM clients WHERE id=%s', (item_id,), one=True)
        if not existing:
            return fail('Not found', 404)
        if request.method == 'GET':
            return ok(clean(query('SELECT c.*,u.email login_email,u.status login_status FROM clients c LEFT JOIN users u ON u.id=c.user_id WHERE c.id=%s', (item_id,), one=True)))
        if request.method == 'DELETE':
            user_id = existing.get('user_id')
            execute('DELETE FROM clients WHERE id=%s', (item_id,))
            if user_id: execute('DELETE FROM users WHERE id=%s AND role=%s', (user_id, 'Client'))
            log('Delete', 'clients', f'Deleted client #{item_id} and its login account')
            return ok(message='Client and login account deleted')
        data = request.get_json(silent=True) or {}
        password = data.pop('password', None)
        login_email = (data.pop('login_email', None) or data.get('email') or '').lower().strip()
        user_id = existing.get('user_id')
        if user_id:
            duplicate = query('SELECT id FROM users WHERE email=%s AND id<>%s', (login_email, user_id), one=True) if login_email else None
            if duplicate: return fail('A login account with this email already exists', 409)
            user_updates = {'name': data.get('contact_person'), 'email': login_email, 'phone': data.get('phone'), 'status': 'Active' if data.get('status') == 'Active' else 'Inactive'}
            if password: user_updates['password_hash'] = hash_password(password)
            selected_user = [key for key, value in user_updates.items() if value is not None and value != '']
            execute(f"UPDATE users SET {','.join(f'`{key}`=%s' for key in selected_user)} WHERE id=%s", tuple(user_updates[key] for key in selected_user) + (user_id,))
        table, fields = TABLES['clients']
        selected = [field for field in fields if field in data and field != 'user_id']
        if selected:
            execute(f"UPDATE clients SET {','.join(f'`{field}`=%s' for field in selected)} WHERE id=%s", tuple(data[field] for field in selected) + (item_id,))
        log('Update', 'clients', f'Updated client #{item_id} and login account')
        return ok(clean(query('SELECT c.*,u.email login_email,u.status login_status FROM clients c LEFT JOIN users u ON u.id=c.user_id WHERE c.id=%s', (item_id,), one=True)), 'Client and login account updated')
    if resource in ('feedback', 'feedback-responses'): ensure_feedback_tables()
    if resource == 'feedback' and g.auth.get('role') == 'Client':
        client = current_client()
        if not client:
            return fail('Client account is not linked to a client record', 403)
        data = request.get_json(silent=True) or {}
        project = query('SELECT id,title FROM projects WHERE title=%s AND client_id=%s', (data.get('project_name'), client['id']), one=True)
        if not project:
            return fail('Please select one of your assigned projects', 400)
        data.update({
            'client_name': client.get('contact_person') or '',
            'company_name': client.get('company_name') or '',
            'client_email': client.get('email') or '',
            'project_name': project['title'],
            'status': 'Pending',
            'submitted_date': date.today().isoformat()
        })
    if resource not in TABLES: return fail('Resource not found', 404)
    table, fields = TABLES[resource]
    if request.method == 'GET':
        row = query(f'SELECT * FROM `{table}` WHERE id=%s', (item_id,), one=True)
        return ok(clean(row)) if row else fail('Not found', 404)
    if request.method == 'DELETE':
        expense_project_id = None
        if resource == 'expenses':
            expense = query('SELECT project_id FROM expenses WHERE id=%s', (item_id,), one=True)
            expense_project_id = expense.get('project_id') if expense else None
        execute(f'DELETE FROM `{table}` WHERE id=%s', (item_id,))
        if resource == 'expenses': sync_expense_total(expense_project_id)
        log('Delete',resource,f'Deleted {resource} #{item_id}')
        return ok(message='Deleted')
    data = request.get_json(silent=True) or {}
    if resource == 'expenses' and not data.get('project_id') and data.get('project_name'):
        project = query('SELECT id FROM projects WHERE title=%s', (data['project_name'],), one=True)
        if project: data['project_id'] = project['id']
    if resource == 'feedback-responses':
        data['responder_id'] = int(g.auth['sub'])
        responder = query('SELECT name FROM users WHERE id=%s', (g.auth['sub'],), one=True)
        data['responder_name'] = responder.get('name') if responder else 'Project Manager'
    if resource in ('daily-reports', 'work-reports'):
        data['user_id'] = int(g.auth['sub'])
    if resource == 'attendance' and g.auth.get('role') == 'Team Member':
        data['user_id'] = int(g.auth['sub'])
    if resource == 'tasks':
        if not data.get('project_id') and data.get('project_name'):
            project = query('SELECT id FROM projects WHERE title=%s', (data['project_name'],), one=True)
            if project: data['project_id'] = project['id']
        if not data.get('assigned_to') and data.get('assignee_name'):
            assignee = query("SELECT id FROM users WHERE name=%s AND role='Team Member'", (data['assignee_name'],), one=True)
            if assignee: data['assigned_to'] = assignee['id']
    if resource == 'backups':
        data['created_by_id'] = int(g.auth['sub'])
        creator = query('SELECT name FROM users WHERE id=%s', (g.auth['sub'],), one=True)
        data['created_by'] = creator.get('name') if creator else 'Admin'
    if resource in ('users', 'team') and data.get('password'):
        data['password_hash'] = hash_password(data.pop('password')); fields = fields + ['password_hash']
    selected = [f for f in fields if f in data and f != 'password']
    if not selected: return fail('No valid fields supplied')
    execute(f"UPDATE `{table}` SET {','.join(f'`{f}`=%s' for f in selected)} WHERE id=%s", tuple(data[f] for f in selected)+(item_id,))
    if resource == 'projects': sync_project_budget(item_id)
    if resource == 'expenses':
        row = query('SELECT project_id FROM expenses WHERE id=%s', (item_id,), one=True)
        sync_expense_total(row.get('project_id') if row else None)
    log('Update',resource,f'Updated {resource} #{item_id}')
    return ok(clean(query(f'SELECT * FROM `{table}` WHERE id=%s',(item_id,),one=True)), 'Updated')

@crud_bp.put('/notifications/<int:item_id>/read')
@auth_required
def read_notification(item_id):
    execute('UPDATE notifications SET is_read=1 WHERE id=%s AND user_id=%s',(item_id,g.auth['sub'])); return ok(message='Notification marked read')















@crud_bp.post('/backups/<int:item_id>/restore')
@auth_required
@roles_required('Admin')
def restore_backup(item_id):
    backup = query('SELECT * FROM backups WHERE id=%s', (item_id,), one=True)
    if not backup:
        return fail('Backup not found', 404)
    data = request.get_json(silent=True) or {}
    restore_type = data.get('restore_type') or 'Full Restore'
    history_id = execute('INSERT INTO restore_history(backup_id,restored_by_id,restore_type,notes,status) VALUES(%s,%s,%s,%s,%s)', (item_id, int(g.auth['sub']), restore_type, data.get('notes'), 'Completed'))
    execute('UPDATE backups SET status=%s,restore_count=restore_count+1,last_restored=NOW() WHERE id=%s', ('Restored', item_id))
    log('Restore', 'backups', f'Restored backup #{item_id} ({restore_type})')
    return ok(clean(query('SELECT * FROM restore_history WHERE id=%s', (history_id,), one=True)), 'Restore recorded successfully', 201)







