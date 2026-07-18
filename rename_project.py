import os

files_to_update = [
    r"backend\database\models.py",
    r"backend\app.py",
    r"frontend\src\components\Sidebar.jsx",
    r"frontend\src\pages\AICareer.jsx",
    r"frontend\src\pages\JobPortal.jsx",
    r"frontend\src\pages\Login.jsx",
    r"frontend\src\pages\Signup.jsx",
    r"frontend\src\App.jsx",
    r"frontend\src\index.css",
    r"frontend\index.html",
    r"src\components\Sidebar.jsx",
    r"src\pages\AICareer.jsx",
    r"src\pages\JobPortal.jsx",
    r"src\pages\Login.jsx",
    r"src\pages\Signup.jsx",
    r"src\App.jsx",
    r"src\index.css",
    r"app.py",
    r"index.html",
    r"models.py",
    r"README.md",
    r"run.py"
]

for file_path in files_to_update:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content.replace("FutureHire", "CareerBoost").replace("Future Hire", "Career Boost").replace("futurehire", "careerboost")
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {file_path}")

print("Replacement complete.")
