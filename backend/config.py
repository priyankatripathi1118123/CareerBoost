import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "prepai-super-secret-key-12345")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "jwt-prepai-secret-key-6789")
    SQLALCHEMY_DATABASE_URI = "sqlite:///database.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.path.join(os.path.abspath(os.path.dirname(__file__)), "uploads")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload
