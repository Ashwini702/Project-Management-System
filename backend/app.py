import os
import re
from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
from database.db import query
from routes.auth_routes import auth_bp
from routes.crud_routes import crud_bp
from routes.misc_routes import misc_bp
from routes.state_routes import state_bp
from utils.response_utils import ok, fail

def create_app():
    app = Flask(__name__); app.config.from_object(Config)
    app.url_map.strict_slashes = False
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    allowed_origins = Config.FRONTEND_URLS + [
        re.compile(r'^http://192\.168\.\d{1,3}\.\d{1,3}:(5175|8081)$'),
        re.compile(r'^http://10\.\d{1,3}\.\d{1,3}\.\d{1,3}:(5175|8081)$'),
        re.compile(r'^http://172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}:(5175|8081)$')
    ]
    CORS(app, resources={r'/api/*': {'origins': allowed_origins}}, supports_credentials=True)
    app.register_blueprint(auth_bp); app.register_blueprint(crud_bp); app.register_blueprint(misc_bp); app.register_blueprint(state_bp)
    @app.get('/')
    def index():
        return ok({
            'name': 'Project Management System API',
            'status': 'running',
            'health': '/api/health'
        }, 'Backend is running')
    @app.get('/uploads/profiles/<path:filename>')
    def profile_upload(filename):
        return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'], 'profiles'), filename)
    @app.get('/uploads/attendance/<path:filename>')
    def attendance_upload(filename):
        return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'], 'attendance'), filename)
    @app.get('/api/health')
    def health():
        query('SELECT 1 value', one=True); return ok({'status':'healthy'}, 'API is healthy')
    @app.errorhandler(404)
    def not_found(error): return fail('Route not found',404)
    @app.errorhandler(Exception)
    def server_error(error):
        app.logger.exception(error); return fail('Internal server error',500)
    return app

app = create_app()
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)






