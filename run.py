import subprocess
import sys
import os
import time

def run():
    print("Initializing CareerBoost AI Development Environment...")

    # Boot flask backend in a separate process
    print("Starting Flask Backend on http://localhost:5000/ ...")
    backend_process = subprocess.Popen(
        [sys.executable, "-m", "backend.app"],
        cwd=os.getcwd(),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1
    )

    # Let the backend initialize
    time.sleep(2)

    # Boot vite frontend
    print("Starting Vite Frontend on http://localhost:5173/ ...")
    
    # Use shell=True for windows to invoke npm.cmd properly
    frontend_process = subprocess.Popen(
        ["npm.cmd", "run", "dev"],
        cwd=os.path.join(os.getcwd(), "frontend"),
        shell=True
    )

    try:
        # Keep orchestrator alive, print backend logs if any error occurs
        while True:
            line = backend_process.stdout.readline()
            if line:
                print(f"[Backend]: {line.strip()}")
            if backend_process.poll() is not None:
                print("Backend crashed! Exiting.")
                break
            time.sleep(0.1)
    except KeyboardInterrupt:
        print("\nTerminating CareerBoost AI services...")
        backend_process.terminate()
        frontend_process.terminate()

if __name__ == "__main__":
    run()
