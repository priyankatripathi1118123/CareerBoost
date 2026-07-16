from flask import Blueprint, request, jsonify
from backend.database.models import db, User
from flask_jwt_extended import jwt_required, get_jwt_identity
import random

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('/ats-scan', methods=['POST'])
@jwt_required()
def scan_ats():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    resume_text = data.get('resume_text', '')
    job_description = data.get('job_description', '')

    if not resume_text or not job_description:
        return jsonify({"error": "Please provide both resume text and job description"}), 400

    # Mock ATS Algorithm
    # Look for overlaps in keywords
    job_words = set(job_description.lower().split())
    resume_words = set(resume_text.lower().split())
    
    # Calculate dummy match score
    common = job_words.intersection(resume_words)
    match_percentage = int((len(common) / len(job_words)) * 100) if job_words else 0
    # Bound match percentage for realistic feel
    match_percentage = min(max(match_percentage, 45), 95)
    
    # Key suggestions
    missing_keywords = ["REST APIs", "SQL Database", "Vite", "JWT Auth", "Unit Testing", "System Design"]
    suggestions = [
        "Include more active verb phrasing (e.g. 'Optimized database schema' instead of 'responsible for database').",
        "Add a Dedicated Skills matrix separating Frontend, Backend, and Languages.",
        "Ensure dates are formatted uniformly (e.g. 'MM/YYYY - Present').",
        "Explain project metrics with impact parameters (e.g. 'improved performance by 20%')."
    ]

    # Save the score to the profile
    user.resume_score = match_percentage
    user.xp += 30
    db.session.commit()

    return jsonify({
        "match_percentage": match_percentage,
        "missing_keywords": missing_keywords[:random.randint(2, 5)],
        "suggestions": suggestions,
        "xp_gained": 30
    }), 200
