from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from backend.config import Config
from backend.database.models import db, User, Job, Certificate
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for frontend communication
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Setup JWT Manager
    jwt = JWTManager(app)

    @app.route('/')
    def home():
        return "Welcome to CareerBoost! App is running successfully."
    # Initialize Database
    db.init_app(app)

    # Register Blueprints
    from backend.routes.auth import auth_bp
    from backend.routes.jobs import jobs_bp
    from backend.routes.prep import prep_bp
    from backend.routes.resume import resume_bp
    from backend.routes.ai import ai_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(jobs_bp, url_prefix='/api/jobs')
    app.register_blueprint(prep_bp, url_prefix='/api/prep')
    app.register_blueprint(resume_bp, url_prefix='/api/resume')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')

    # Ensure uploads directory exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    # Database seed setup
    with app.app_context():
        db.create_all()
        seed_data()

    return app

def seed_data():
    # Only seed if no jobs exist
    if Job.query.first() is None:
        jobs = [
            Job(
                title="Frontend Developer (React)",
                company="Google",
                location="Bangalore, India",
                salary="₹18 - ₹24 LPA",
                experience="Entry Level",
                description="Join Google's core design systems team. Build fluid, accessible web tools using modern Javascript and React.",
                requirements="React.js experience\nSemantic HTML & CSS\nFamiliarity with REST APIs",
                type="Full-time"
            ),
            Job(
                title="Software Engineer - Backend (Python)",
                company="Amazon",
                location="Hyderabad, India",
                salary="₹20 - ₹26 LPA",
                experience="Mid Level",
                description="Scale retail logistics backend services using Flask, microservice designs, and high volume SQL databases.",
                requirements="Python & Flask/Django\nSQL database systems\nAWS Cloud Services",
                type="Full-time"
            ),
            Job(
                title="Software Engineering Intern",
                company="Microsoft",
                location="Remote",
                salary="₹50,000 / month",
                experience="Internship",
                description="Work alongside MS Azure team helping test, modularize, and deploy dashboard panels.",
                requirements="Currently pursuing CS degree\nJava or Python proficiency\nBasic git understanding",
                type="Internship"
            ),
            Job(
                title="Associate Systems Engineer",
                company="TCS",
                location="Pune, India",
                salary="₹4.5 - ₹7.2 LPA",
                experience="Entry Level",
                description="Develop, verify, and maintain business systems for enterprise global clients.",
                requirements="Graduation in CS/IT/ECE\nStrong logical thinking\nBasic SQL queries",
                type="Full-time"
            )
        ]
        for job in jobs:
            db.session.add(job)
        
        # Add a default admin/mock user for demo login convenience
        demo_user = User(
            username="Demo Student",
            email="demo@careerboost.com",
            role="student",
            xp=450,
            streak=5,
            resume_score=85,
            interview_score=80
        )
        demo_user.set_password("password123")
        db.session.add(demo_user)
        db.session.commit()

        # Give demo user a sample certificate
        cert = Certificate(user_id=demo_user.id, title="DBMS Core Certification")
        db.session.add(cert)
        db.session.commit()
        
        print("🌱 Database seeded with mock jobs and demo user (demo@careerboost.com / password123)")

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=False)
