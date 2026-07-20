from flask import Blueprint, request, jsonify
from backend.database.models import db, User, Certificate
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import os

auth_bp = Blueprint('auth', __name__)
@auth_bp.route('/')
def home():
    return "Welcome to CareerBoost! App is running successfully."

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 400

    user = User(
        username=data['username'],
        email=data['email'],
        role=data.get('role', 'student')
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()

    # Pre-populate a certificate for gamification
    cert = Certificate(user_id=user.id, title="Welcome to PrepAI Platform Certificate")
    db.session.add(cert)
    db.session.commit()

    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "message": "User registered successfully",
        "access_token": access_token,
        "user": user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": user.to_dict()
    }), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict()), 200

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        # Check uniqueness if changing email
        if data['email'] != user.email:
            if User.query.filter_by(email=data['email']).first():
                return jsonify({"error": "Email already in use"}), 400
            user.email = data['email']
    
    db.session.commit()
    return jsonify({
        "message": "Profile updated successfully",
        "user": user.to_dict()
    }), 200

@auth_bp.route('/upload-avatar', methods=['POST'])
@jwt_required()
def upload_avatar():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save mock filename to DB for simplicity
    user.profile_pic = f"/uploads/avatar_{user_id}_{file.filename}"
    db.session.commit()

    return jsonify({
        "message": "Avatar uploaded successfully",
        "profile_pic": user.profile_pic
    }), 200

@auth_bp.route('/upload-resume', methods=['POST'])
@jwt_required()
def upload_resume():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    user.resume_name = file.filename
    # Increase resume score upon resume upload
    user.resume_score = 78  # Set realistic initial score
    db.session.commit()

    return jsonify({
        "message": "Resume uploaded successfully",
        "resume_name": user.resume_name,
        "resume_score": user.resume_score
    }), 200

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    if not data or not data.get('email'):
        return jsonify({"error": "Missing email"}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({"error": "Email not registered"}), 404
        
    return jsonify({"message": "Password reset token sent to your email (simulated)"}), 200
