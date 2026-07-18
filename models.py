from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='student')  # student, company, admin
    
    # Progress & Metrics
    xp = db.Column(db.Integer, default=150)
    streak = db.Column(db.Integer, default=3)
    resume_score = db.Column(db.Integer, default=0)
    interview_score = db.Column(db.Integer, default=0)
    profile_pic = db.Column(db.String(250), default='')
    resume_name = db.Column(db.String(250), default='')
    
    # Relationships
    applications = db.relationship('Application', backref='user', lazy=True, cascade="all, delete-orphan")
    saved_jobs = db.relationship('SavedJob', backref='user', lazy=True, cascade="all, delete-orphan")
    certificates = db.relationship('Certificate', backref='user', lazy=True, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role,
            "xp": self.xp,
            "streak": self.streak,
            "resume_score": self.resume_score,
            "interview_score": self.interview_score,
            "profile_pic": self.profile_pic,
            "resume_name": self.resume_name,
            "certificates_count": len(self.certificates)
        }

class Job(db.Model):
    __tablename__ = 'jobs'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    salary = db.Column(db.String(50), nullable=False)
    experience = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    requirements = db.Column(db.Text, nullable=False)  # Stored as newline separated string
    type = db.Column(db.String(50), default='Full-time')  # Full-time, Internship
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "location": self.location,
            "salary": self.salary,
            "experience": self.experience,
            "description": self.description,
            "requirements": self.requirements.split('\n') if self.requirements else [],
            "type": self.type,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }

class Application(db.Model):
    __tablename__ = 'applications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    resume_name = db.Column(db.String(250), nullable=False)
    status = db.Column(db.String(50), default='Applied')  # Applied, Review, Interview, Offered, Rejected
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship to load job info
    job = db.relationship('Job', backref='applications')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "job_id": self.job_id,
            "job_title": self.job.title,
            "company": self.job.company,
            "resume_name": self.resume_name,
            "status": self.status,
            "applied_at": self.applied_at.strftime("%Y-%m-%d %H:%M:%S")
        }

class SavedJob(db.Model):
    __tablename__ = 'saved_jobs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    saved_at = db.Column(db.DateTime, default=datetime.utcnow)

    job = db.relationship('Job', backref='saved_by_users')

    def to_dict(self):
        return {
            "id": self.id,
            "job": self.job.to_dict(),
            "saved_at": self.saved_at.strftime("%Y-%m-%d")
        }

class Certificate(db.Model):
    __tablename__ = 'certificates'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    platform = db.Column(db.String(100), default='CareerBoost AI Academy')
    date_earned = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "platform": self.platform,
            "date_earned": self.date_earned.strftime("%Y-%m-%d")
        }
