# CareerBoost AI - Placement Preparation & Job Portal Platform

CareerBoost AI is a modern, high-fidelity SaaS-style web platform designed to streamline student placement preparation and job tracking. It features an interactive, glassmorphic React frontend and a robust Flask RESTful API backend.

## Key Modules
1. **Interactive Dashboard**: Track streak, XP, weekly statistics via Recharts, resume ATS scores, and placement timeline progress.
2. **Job Portal**: Explore job and internship listings, filter, save, and quick apply with a visual status timeline tracker.
3. **Preparation Hub**: Complete study guides and interactive practice quizzes covering Aptitude, CS Fundamentals, and languages.
4. **DSA Sheet & Playground**: Topic-wise DSA questions integrated with a functional live code playground (C++, Python, JS).
5. **AI Simulation Suite**: Interactive AI resume ATS checker, Mock interview vocal recorder, and career roadmap generation.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)

### Installation
1. Install Python backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Install frontend packages:
   ```bash
   cd frontend
   npm install
   ```
3. Run the orchestration script to boot both servers concurrently:
   ```bash
   python run.py
   ```
   Or use:
   ```bash
   npm start
   ```

Open [http://localhost:5173/](http://localhost:5173/) on your browser.
