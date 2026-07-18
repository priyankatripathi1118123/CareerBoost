from flask import Blueprint, request, jsonify
from backend.database.models import db, User
from flask_jwt_extended import jwt_required, get_jwt_identity
import random

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/recommendation', methods=['POST'])
@jwt_required()
def get_career_recommendation():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    skills = data.get('skills', [])
    interests = data.get('interests', [])

    if not skills:
        return jsonify({"error": "Provide at least one skill"}), 400

    # Career Recommendation simulator
    primary_interest = interests[0] if interests else "Software Engineering"
    
    roles = {
        "frontend": {"role": "Frontend Developer", "roadmap": ["HTML/CSS/JS", "React & Vite", "State management", "CSS frameworks"], "gaps": ["TailwindCSS", "Next.js"]},
        "backend": {"role": "Backend Engineer", "roadmap": ["Python/Flask or Node.js", "SQL & Database Design", "Redis Caching", "Docker Containerization"], "gaps": ["PostgreSQL", "System Design"]},
        "fullstack": {"role": "Full Stack Developer", "roadmap": ["MERN or Flask+React", "Database migrations", "REST APIs", "AWS deployment"], "gaps": ["CI/CD pipelines", "Microservices"]}
    }

    # Match based on skills
    skills_joined = " ".join(skills).lower()
    selected = roles["fullstack"]
    if "python" in skills_joined or "sql" in skills_joined:
        selected = roles["backend"]
    elif "react" in skills_joined or "javascript" in skills_joined:
        selected = roles["frontend"]

    return jsonify({
        "recommended_role": selected["role"],
        "roadmap": selected["roadmap"],
        "skill_gaps": selected["gaps"]
    }), 200

@ai_bp.route('/interview-feedback', methods=['POST'])
@jwt_required()
def score_mock_interview():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    question = data.get('question', '')
    response_text = data.get('response_text', '')

    if not response_text:
        return jsonify({"error": "Provide response transcript"}), 400

    # Calculate simulated metrics
    comm_score = random.randint(70, 92)
    relevance_score = random.randint(75, 95)
    overall_score = int((comm_score + relevance_score) / 2)

    feedback = [
        "Good structural flow. You introduced the Situation clearly.",
        "To improve, emphasize the Actions you took individually rather than saying 'we did'.",
        "Explain numerical results if possible (e.g. 'reduced latency by 15%')."
    ]

    # Save to user stats
    user.interview_score = overall_score
    user.xp += 40
    db.session.commit()

    return jsonify({
        "communication_score": comm_score,
        "relevance_score": relevance_score,
        "overall_score": overall_score,
        "feedback": feedback,
        "xp_gained": 40
    }), 200

@ai_bp.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    message = data.get('message', '').lower()

    if not message:
        return jsonify({"response": "I'm listening! Ask me anything about career preparation, resume score, or coding sheets."}), 200

    # Match queries
    if "resume" in message or "ats" in message:
        response = "To score high on the ATS scan, make sure your resume includes key job terms such as 'REST APIs', 'SQL Database', or 'React' and avoid graphics or complex columns that scanner bots fail to parse."
    elif "interview" in message or "hr" in message:
        response = "When answering HR questions, always use the STAR method: Situation, Task, Action, and Result. Make sure your vocal pitch remains calm and structured."
    elif "dsa" in message or "playground" in message:
        response = "Solve the questions topic-wise on our DSA Sheet! You can code in JavaScript, Python, or C++ and test your answers live."
    else:
        response = "That's a great question! For placements, focus on a solid mix of Data Structures, CS Fundamentals (DBMS, OS), and build a high-match resume to secure interviews."

    return jsonify({"response": response}), 200
