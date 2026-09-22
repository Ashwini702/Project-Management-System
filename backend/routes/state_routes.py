import json
from flask import Blueprint, g, request
from database.db import execute, query
from middleware.auth_middleware import auth_required
from utils.response_utils import fail, ok

state_bp = Blueprint('state', __name__, url_prefix='/api/state')


def ensure_table():
    execute('''CREATE TABLE IF NOT EXISTS module_state (module_key VARCHAR(80) PRIMARY KEY,payload JSON NOT NULL,updated_by INT NULL,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,CONSTRAINT fk_module_state_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL)''')


def ensure_settings_table():
    execute('''CREATE TABLE IF NOT EXISTS settings (id INT AUTO_INCREMENT PRIMARY KEY,section VARCHAR(80) NOT NULL UNIQUE,setting_data JSON NOT NULL,updated_by INT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,CONSTRAINT fk_settings_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL)''')


def parse_json(value):
    return json.loads(value) if isinstance(value, str) else value


@state_bp.get('/<module_key>')
@auth_required
def get_state(module_key):
    if module_key == 'settings':
        ensure_settings_table()
        rows = query('SELECT section,setting_data FROM settings ORDER BY id')
        return ok({row['section']: parse_json(row['setting_data']) for row in rows})
    ensure_table()
    row = query('SELECT payload,updated_at FROM module_state WHERE module_key=%s', (module_key,), one=True)
    if not row:
        return ok(None, 'No saved state')
    return ok(parse_json(row['payload']))


@state_bp.put('/<module_key>')
@auth_required
def save_state(module_key):
    payload = request.get_json(silent=True)
    if payload is None:
        return fail('A JSON payload is required')
    if module_key == 'settings':
        if not isinstance(payload, dict):
            return fail('Settings payload must be a JSON object')
        ensure_settings_table()
        sections = list(payload.keys())
        for section, section_data in payload.items():
            execute('''INSERT INTO settings(section,setting_data,updated_by) VALUES(%s,%s,%s) ON DUPLICATE KEY UPDATE setting_data=VALUES(setting_data),updated_by=VALUES(updated_by)''', (section, json.dumps(section_data), g.auth['sub']))
        if sections:
            placeholders = ','.join(['%s'] * len(sections))
            execute(f'DELETE FROM settings WHERE section NOT IN ({placeholders})', tuple(sections))
        else:
            execute('DELETE FROM settings')
        execute('INSERT INTO activity_logs(user_id,action,module,description) VALUES(%s,%s,%s,%s)', (g.auth['sub'], 'Update', 'settings', 'Saved settings sections to dedicated table'))
        return ok(payload, 'Saved')
    ensure_table()
    execute('''INSERT INTO module_state(module_key,payload,updated_by) VALUES(%s,%s,%s) ON DUPLICATE KEY UPDATE payload=VALUES(payload),updated_by=VALUES(updated_by)''', (module_key, json.dumps(payload), g.auth['sub']))
    execute('INSERT INTO activity_logs(user_id,action,module,description) VALUES(%s,%s,%s,%s)', (g.auth['sub'], 'Update', module_key, f'Saved {module_key} module data'))
    return ok(payload, 'Saved')
