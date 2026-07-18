from flask import Blueprint, request, jsonify
from backend.database.models import db, Job, Application, SavedJob, User
from flask_jwt_extended import jwt_required, get_jwt_identity

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/', methods=['GET'])
def get_all_jobs():
    category = request.args.get('category')  # Full-time, Internship
    query = request.args.get('query')
    location = request.args.get('location')

    jobs_query = Job.query
    if category:
        jobs_query = jobs_query.filter_by(type=category)
    if location:
        jobs_query = jobs_query.filter(Job.location.ilike(f"%{location}%"))
    if query:
        jobs_query = jobs_query.filter(
            (Job.title.ilike(f"%{query}%")) | 
            (Job.company.ilike(f"%{query}%"))
        )

    jobs = jobs_query.all()
    return jsonify([job.to_dict() for job in jobs]), 200

@jobs_bp.route('/<int:job_id>', methods=['GET'])
def get_job_detail(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify(job.to_dict()), 200

@jobs_bp.route('/post', methods=['POST'])
@jwt_required()
def post_job():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user or user.role not in ['company', 'admin']:
        return jsonify({"error": "Unauthorized action"}), 403

    data = request.get_json()
    required = ['title', 'company', 'location', 'salary', 'experience', 'description', 'requirements']
    if not data or not all(k in data for k in required):
        return jsonify({"error": "Missing required fields"}), 400

    new_job = Job(
        title=data['title'],
        company=data['company'],
        location=data['location'],
        salary=data['salary'],
        experience=data['experience'],
        description=data['description'],
        requirements=data['requirements'],
        type=data.get('type', 'Full-time')
    )
    db.session.add(new_job)
    db.session.commit()
    return jsonify({"message": "Job posted successfully", "job": new_job.to_dict()}), 201

@jobs_bp.route('/apply/<int:job_id>', methods=['POST'])
@jwt_required()
def apply_job(job_id):
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    # Check if already applied
    existing = Application.query.filter_by(user_id=user_id, job_id=job_id).first()
    if existing:
        return jsonify({"error": "Already applied to this job"}), 400

    # Ensure user has a resume uploaded
    resume_name = user.resume_name if user.resume_name else "Priyanka_Resume.pdf"
    
    app = Application(
        user_id=user_id,
        job_id=job_id,
        resume_name=resume_name,
        status="Applied"
    )
    db.session.add(app)
    
    # Track gamified XP
    user.xp += 20
    db.session.commit()

    return jsonify({
        "message": "Application submitted successfully",
        "application": app.to_dict()
    }), 201

@jobs_bp.route('/applications', methods=['GET'])
@jwt_required()
def get_user_applications():
    user_id = int(get_jwt_identity())
    apps = Application.query.filter_by(user_id=user_id).all()
    return jsonify([app.to_dict() for app in apps]), 200

@jobs_bp.route('/save/<int:job_id>', methods=['POST'])
@jwt_required()
def toggle_save_job(job_id):
    user_id = int(get_jwt_identity())
    
    saved = SavedJob.query.filter_by(user_id=user_id, job_id=job_id).first()
    if saved:
        db.session.delete(saved)
        db.session.commit()
        return jsonify({"message": "Job unsaved successfully", "saved": False}), 200
    
    new_saved = SavedJob(user_id=user_id, job_id=job_id)
    db.session.add(new_saved)
    db.session.commit()
    return jsonify({"message": "Job saved successfully", "saved": True}), 201

@jobs_bp.route('/saved', methods=['GET'])
@jwt_required()
def get_saved_jobs():
    user_id = int(get_jwt_identity())
    saved = SavedJob.query.filter_by(user_id=user_id).all()
    return jsonify([s.to_dict() for s in saved]), 200
