import os, uuid
from flask import Blueprint, request, g, current_app, send_from_directory
from werkzeug.utils import secure_filename
from database.db import query, execute
from middleware.auth_middleware import auth_required
from utils.response_utils import ok, fail

misc_bp = Blueprint('misc', __name__, url_prefix='/api')

@misc_bp.get('/dashboard/<role>')
@auth_required
def dashboard(role):
    scalar=lambda sql: query(sql, one=True)['value']
    data={'totalProjects':scalar('SELECT COUNT(*) value FROM projects'),'activeProjects':scalar("SELECT COUNT(*) value FROM projects WHERE status='In Progress'"),'pendingProjects':scalar("SELECT COUNT(*) value FROM projects WHERE status='Not Started'"),'completedProjects':scalar("SELECT COUNT(*) value FROM projects WHERE status='Completed'"),'totalUsers':scalar('SELECT COUNT(*) value FROM users'),'totalClients':scalar('SELECT COUNT(*) value FROM clients'),'upcomingDeadlines':query('SELECT * FROM tasks WHERE deadline>=CURDATE() ORDER BY deadline LIMIT 5'),'taskSummary':query('SELECT status,COUNT(*) count FROM tasks GROUP BY status'),'recentActivities':query('SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 10'),'recentProjects':query('SELECT * FROM projects ORDER BY created_at DESC LIMIT 5'),'projectStatusSummary':query('SELECT status,COUNT(*) count FROM projects GROUP BY status')}
    return ok(data)

@misc_bp.get('/reports/<kind>')
@auth_required
def reports(kind):
    if kind == 'dashboard-summary': return dashboard('admin')
    if kind == 'project-summary': return ok(query('SELECT status,COUNT(*) count,SUM(budget) budget FROM projects GROUP BY status'))
    if kind == 'task-summary': return ok(query('SELECT status,COUNT(*) count FROM tasks GROUP BY status'))
    if kind == 'employee-performance': return ok(query("SELECT u.id,u.name,COUNT(t.id) total_tasks,SUM(t.status='Completed') completed_tasks FROM users u LEFT JOIN tasks t ON t.assigned_to=u.id GROUP BY u.id,u.name"))
    return fail('Report not found',404)

@misc_bp.post('/documents/upload')
@auth_required
def upload():
    file = request.files.get('file')
    project_id = request.form.get('project_id')
    if not file or not file.filename: return fail('File is required')
    if not project_id: return fail('Project is required', 400)
    project = query('SELECT id,title,client_id FROM projects WHERE id=%s', (project_id,), one=True)
    if not project: return fail('Project not found', 404)
    if g.auth.get('role') == 'Client':
        client = query('SELECT id FROM clients WHERE user_id=%s', (g.auth['sub'],), one=True)
        if not client or project.get('client_id') != client['id']:
            return fail('You can upload files only to your assigned projects', 403)
    name = f'{uuid.uuid4().hex}_{secure_filename(file.filename)}'
    path = os.path.join(current_app.config['UPLOAD_FOLDER'], name)
    file.save(path)
    item_id = execute('INSERT INTO documents(project_id,task_id,uploaded_by,file_name,file_path,file_type,file_size) VALUES(%s,%s,%s,%s,%s,%s,%s)', (project_id, request.form.get('task_id'), g.auth['sub'], file.filename, name, file.mimetype, os.path.getsize(path)))
    if g.auth.get('role') == 'Client':
        sender = query('SELECT name FROM users WHERE id=%s', (g.auth['sub'],), one=True)
        recipient_role = request.form.get('recipient_role') or 'Admin'
        if recipient_role == 'Project Manager':
            recipients = query("SELECT id,name FROM users WHERE role='Project Manager' AND status='Active' AND name=%s", (project.get('manager_name'),))
            if not recipients: return fail('No active project manager is assigned to this project', 400)
        else:
            recipient_role = 'Admin'
            recipients = query("SELECT id,name FROM users WHERE role='Admin' AND status='Active'")
        for recipient in recipients:
            execute('''INSERT INTO notifications(user_id,title,message,type,recipient_role,recipient_user,priority,status,sender_id,sender_name,sender_role,is_read) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,0)''', (recipient['id'], 'Client File: ' + file.filename, f"{sender.get('name') if sender else 'Client'} shared {file.filename} for {project['title']}", 'File Shared', recipient_role, recipient['name'], 'Medium', 'Sent', int(g.auth['sub']), sender.get('name') if sender else 'Client', 'Client'))
    return ok({'id':item_id,'file_name':file.filename,'file_path':name,'project_id':int(project_id),'project_name':project['title']}, 'Uploaded and sent to Admin', 201)
@misc_bp.get('/documents/<int:document_id>/file')
@auth_required
def document_file(document_id):
    document = query('''SELECT d.*, p.client_id FROM documents d
                        LEFT JOIN projects p ON p.id=d.project_id
                        WHERE d.id=%s''', (document_id,), one=True)
    if not document:
        return fail('Document not found', 404)
    if g.auth.get('role') == 'Client':
        client = query('SELECT id FROM clients WHERE user_id=%s', (g.auth['sub'],), one=True)
        if not client or document.get('client_id') != client['id']:
            return fail('Document not found', 404)
    if g.auth.get('role') == 'Team Member':
        permitted = query('''SELECT t.id FROM tasks t WHERE t.project_id=%s AND t.assigned_to=%s LIMIT 1''', (document.get('project_id'), g.auth['sub']), one=True)
        if not permitted:
            return fail('Document not found', 404)
    filename = document.get('file_path')
    if not filename or not os.path.isfile(os.path.join(current_app.config['UPLOAD_FOLDER'], filename)):
        return fail('The stored file is not available on the server', 404)
    return send_from_directory(
        current_app.config['UPLOAD_FOLDER'], filename,
        mimetype=document.get('file_type') or None,
        as_attachment=request.args.get('download') == '1',
        download_name=document.get('file_name') or filename
    )