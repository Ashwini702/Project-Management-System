import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from database.db import execute, query


def migrate():
    row = query("SELECT payload,updated_by FROM module_state WHERE module_key='settings'", one=True)
    if not row:
        print('No legacy settings record found')
        return
    payload = json.loads(row['payload']) if isinstance(row['payload'], str) else row['payload']
    for section, section_data in payload.items():
        execute('''INSERT INTO settings(section,setting_data,updated_by) VALUES(%s,%s,%s) ON DUPLICATE KEY UPDATE setting_data=VALUES(setting_data),updated_by=VALUES(updated_by)''', (section, json.dumps(section_data), row.get('updated_by')))
    execute("DELETE FROM module_state WHERE module_key='settings'")
    print(f'Migrated {len(payload)} settings sections')


if __name__ == '__main__':
    migrate()
