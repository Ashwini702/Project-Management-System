import pymysql
from dbutils.pooled_db import PooledDB
from config import Config

_pool = None

def get_pool():
    global _pool
    if _pool is None:
        _pool = PooledDB(creator=pymysql, maxconnections=10, mincached=1, maxcached=5, blocking=True, host=Config.DB_HOST, port=Config.DB_PORT, database=Config.DB_NAME, user=Config.DB_USER, password=Config.DB_PASSWORD, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor, autocommit=False)
    return _pool

def get_connection(): return get_pool().connection()

def query(sql, params=(), one=False):
    conn = get_connection(); cursor = conn.cursor()
    try:
        cursor.execute(sql, params)
        return cursor.fetchone() if one else cursor.fetchall()
    finally: cursor.close(); conn.close()

def execute(sql, params=()):
    conn = get_connection(); cursor = conn.cursor()
    try:
        cursor.execute(sql, params); conn.commit(); return cursor.lastrowid
    except Exception:
        conn.rollback(); raise
    finally: cursor.close(); conn.close()
