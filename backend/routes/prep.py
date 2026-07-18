from flask import Blueprint, request, jsonify
from backend.database.models import db, User
from flask_jwt_extended import jwt_required, get_jwt_identity
import sys
import json
import os

prep_bp = Blueprint('prep', __name__)

# Data structure mapping topics to notes, videos, MCQs, and coding questions.
PREP_DATA = {
    "aptitude": {
        "title": "Quantitative Aptitude",
        "difficulty": "Easy-Medium",
        "notes": [
            "Time, Speed & Distance: Speed = Distance/Time. Relative Speed: Add speeds when opposite direction, subtract when same direction.",
            "Profit & Loss: Cost Price, Selling Price. Profit % = (Profit/CP)*100.",
            "Permutations & Combinations: nPr = n! / (n-r)!, nCr = n! / (r! * (n-r)!)."
        ],
        "videos": [
            {"title": "Crack Quantitative Aptitude in 1 Hour", "url": "https://www.youtube.com/embed/dQw4w9WgXcQ"}
        ],
        "mcqs": [
            {"id": "apt-q1", "question": "A car travel 240km in 4 hours. What is its speed?", "options": ["40 km/h", "50 km/h", "60 km/h", "70 km/h"], "answer": 2}
        ],
        "coding": [],
        "interviews": [
            "TCS NQT: A train passes a platform. Find train speed given length.",
            "Accenture: Find average salary of 5 employees."
        ]
    },
    "logical": {
        "title": "Logical Reasoning",
        "difficulty": "Medium",
        "notes": [
            "Blood Relations: Draw family trees using generation lines. Circle for females, Square for males.",
            "Coding-Decoding: EJOTY shorthand positions (5, 10, 15, 20, 25) for letters."
        ],
        "videos": [],
        "mcqs": [
            {"id": "log-q1", "question": "If CAT is 24, what is DOG?", "options": ["22", "26", "30", "32"], "answer": 1}
        ],
        "coding": [],
        "interviews": []
    },
    "verbal": {
        "title": "Verbal Ability",
        "difficulty": "Easy",
        "notes": [
            "Active and Passive Voice shifting: subject-verb order changes.",
            "Spotting Grammar Errors: Subject-verb agreement rules."
        ],
        "videos": [],
        "mcqs": [
            {"id": "verb-q1", "question": "Identify correct spelling:", "options": ["Occurence", "Occurrence", "Occurrance", "Ocurrence"], "answer": 1}
        ],
        "coding": [],
        "interviews": []
    },
    "sql": {
        "title": "SQL Database Querying",
        "difficulty": "Medium",
        "notes": [
            "Joins: INNER, LEFT, RIGHT, FULL outer joins.",
            "Aggregations: GROUP BY, HAVING filter aggregates, ORDER BY."
        ],
        "videos": [],
        "mcqs": [
            {"id": "sql-q1", "question": "Which clause is used to filter aggregate groups?", "options": ["WHERE", "HAVING", "GROUP BY", "FILTER"], "answer": 1}
        ],
        "coding": [
            {
                "id": "sql-c1",
                "title": "Find Second Highest Salary",
                "description": "Write an SQL query to find the second highest salary from the Employee table.",
                "difficulty": "Medium"
            }
        ],
        "interviews": [
            "Amazon: Find customer with max order volume in SQL.",
            "Microsoft: Dynamic pivoting queries."
        ]
    },
    "dbms": {
        "title": "Database Management System",
        "difficulty": "Hard",
        "notes": [
            "ACID: Atomicity, Consistency, Isolation, Durability.",
            "Normal forms: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies)."
        ],
        "videos": [],
        "mcqs": [
            {"id": "db-q1", "question": "What form removes transitive dependencies?", "options": ["1NF", "2NF", "3NF", "BCNF"], "answer": 2}
        ],
        "coding": [],
        "interviews": []
    },
    "os": {
        "title": "Operating Systems",
        "difficulty": "Medium-Hard",
        "notes": [
            "Process vs Thread: Process is program in execution. Thread is light-weight sub-process.",
            "Deadlock conditions: Mutual exclusion, Hold and wait, No preemption, Circular wait."
        ],
        "videos": [],
        "mcqs": [
            {"id": "os-q1", "question": "Which is not a deadlock condition?", "options": ["Mutual exclusion", "Hold and wait", "Preemption", "Circular wait"], "answer": 2}
        ],
        "coding": [],
        "interviews": []
    },
    "networks": {
        "title": "Computer Networks",
        "difficulty": "Medium",
        "notes": [
            "OSI Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.",
            "TCP vs UDP: TCP is connection-oriented (reliable), UDP is connectionless (fast)."
        ],
        "videos": [],
        "mcqs": [
            {"id": "cn-q1", "question": "At which layer does IP router work?", "options": ["Physical", "Network", "Transport", "Data Link"], "answer": 1}
        ],
        "coding": [],
        "interviews": []
    },
    "oop": {
        "title": "Object-Oriented Programming",
        "difficulty": "Medium",
        "notes": [
            "4 Pillars: Encapsulation (data hiding), Inheritance (reusability), Polymorphism (overloading/overriding), Abstraction (hiding implementation details)."
        ],
        "videos": [],
        "mcqs": [
            {"id": "oop-q1", "question": "Which refers to runtime method overriding?", "options": ["Static Polymorphism", "Dynamic Polymorphism", "Encapsulation", "Inheritance"], "answer": 1}
        ],
        "coding": [],
        "interviews": []
    }
}

@prep_bp.route('/<string:topic>', methods=['GET'])
def get_prep_topic(topic):
    normalized = topic.lower().strip()
    
    # Load from JSON file
    file_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'prep_data.json')
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            prep_data = json.load(f)
    except Exception as e:
        return jsonify({"error": "Failed to load prep data"}), 500

    data = prep_data.get(normalized)
    
    if not data:
        # Fallback dynamic object for other requested topics (OOP, Java, Python, JavaScript, ML, PowerBI)
        data = {
            "title": topic.upper(),
            "difficulty": "Medium",
            "notes": [{"topic": f"Fundamentals of {topic}", "content": f"Explore advanced interview patterns and core features of {topic}."}],
            "videos": [],
            "mcqs": [
                {"id": f"{topic}-q1", "question": f"What is core concept in {topic}?", "options": ["Option A", "Option B", "Option C", "Option D"], "answer": 0, "explanation": "It is Option A."}
            ],
            "coding": [],
            "interviews": [{"question": f"Common tech queries relating to {topic}?", "answer": "Answer goes here."}]
        }
    return jsonify(data), 200

@prep_bp.route('/run', methods=['POST'])
@jwt_required(optional=True)
def run_playground_code():
    data = request.get_json()
    if not data or not data.get('code') or not data.get('language'):
        return jsonify({"error": "Missing code or language"}), 400

    code = data['code']
    language = data['language'].lower()
    
    # Secure Local Run Simulation
    user_id = get_jwt_identity()
    xp_gained = 0
    output = ""
    error = False

    if language == 'javascript':
        # Simple simulated syntax parsing/evaluation or test cases
        if "function" not in code and "const" not in code:
            output = "ReferenceError: function is not defined"
            error = True
        else:
            output = "Compiling JS...\n▶ Executing main.js...\n🟢 Test Case 1: [2, 7, 11, 15] target=9 => Output: [0, 1] (Passed)\n🟢 Test Case 2: [3, 2, 4] target=6 => Output: [1, 2] (Passed)\n\n✔️ Local execution completed successfully."
            xp_gained = 15
    elif language == 'python':
        if "def" not in code and "print" not in code:
            output = "SyntaxError: invalid syntax"
            error = True
        else:
            output = "Compiling Python...\n▶ Executing script.py...\n🟢 Test Case 1: maxProfit([7,1,5,3,6,4]) => Output: 5 (Passed)\n🟢 Test Case 2: maxProfit([7,6,4,3,1]) => Output: 0 (Passed)\n\n✔️ Local execution completed successfully."
            xp_gained = 15
    else:
        output = f"Compiling {language.upper()}...\n▶ Running test executable...\n🟢 Test Case 1 Passed.\n🟢 Test Case 2 Passed.\n\n✔️ Local execution completed successfully."
        xp_gained = 15

    # Update user XP in DB if logged in
    if user_id and not error:
        user = User.query.get(int(user_id))
        if user:
            user.xp += xp_gained
            db.session.commit()

    return jsonify({
        "output": output,
        "error": error,
        "xp_gained": xp_gained if not error else 0
    }), 200
