import json
import glob
import os

source_dir = r"C:\Users\Priyanka Tripathi\.gemini\antigravity\scratch\frontend\src\data"
dest_file = r"C:\Users\Priyanka Tripathi\.gemini\antigravity\scratch\prepai-platform\frontend\src\data\interview_questions.json"

combined_data = {
    "HR Interview Questions": [],
    "Technical Interview Questions": [],
    "OOPs": [],
    "DBMS": [],
    "Operating System": [],
    "Computer Networks": [],
    "SQL Interview Questions": [],
    "Java/Python Basics": [],
    "Aptitude & Logical Reasoning": []
}

for file in glob.glob(os.path.join(source_dir, "iq_*.json")):
    print(f"Reading {file}...")
    try:
        with open(file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for k, v in data.items():
                if k in combined_data:
                    combined_data[k].extend(v)
                else:
                    combined_data[k] = v
                print(f"Added {len(v)} questions to {k}")
    except Exception as e:
        print(f"Failed to read {file}: {e}")

# Sanity check: ensure no category is empty. If so, add a fallback (this shouldn't happen).
for category, questions in combined_data.items():
    if not questions:
        print(f"WARNING: Category {category} is empty. Generating fallback.")
        combined_data[category] = [{
            "id": f"{category.lower().replace(' ', '-')}-fallback",
            "question": f"Fallback question for {category}?",
            "detailed_answer": "Fallback detailed answer.",
            "explanation": "Fallback explanation.",
            "tips": "Fallback tips.",
            "difficulty": "Easy",
            "companies": ["General"]
        }]

os.makedirs(os.path.dirname(dest_file), exist_ok=True)
with open(dest_file, 'w', encoding='utf-8') as f:
    json.dump(combined_data, f, indent=4)

print(f"Successfully generated {dest_file}.")
