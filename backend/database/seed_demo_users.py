import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.db import query, execute
from utils.password_utils import hash_password

USERS=[('Admin User','admin@pms.com','Admin@123','Admin'),('Project Manager','manager@pms.com','Manager@123','Project Manager'),('Team Member','team@pms.com','Team@123','Team Member'),('Client User','client@pms.com','Client@123','Client')]
for name,email,password,role in USERS:
    if not query('SELECT id FROM users WHERE email=%s',(email,),one=True):
        execute('INSERT INTO users(name,email,password_hash,role,status) VALUES(%s,%s,%s,%s,%s)',(name,email,hash_password(password),role,'Active'))
print('Demo users are ready.')

