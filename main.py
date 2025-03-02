import os
import subprocess

# Define paths for frontend and backend
FOLDERS = {
    "frontend": os.path.join(os.getcwd(), "frontend"),
    "backend": os.path.join(os.getcwd(), "backend"),
}

# Print the current working directory
print(f"Current Working Directory: {os.getcwd()}")


def start_servers():
    try:
        # Start the frontend server
        frontend_path = FOLDERS["frontend"]
        if os.path.exists(frontend_path):
            subprocess.Popen(["npm", "run", "dev"], cwd=frontend_path, shell=True)
            print(f"Frontend server started at {frontend_path}")
        else:
            print(f"Frontend directory not found: {frontend_path}")

        # Start the backend server
        backend_path = FOLDERS["backend"]
        if os.path.exists(backend_path):
            subprocess.Popen(
                ["python", "manage.py", "runserver"], cwd=backend_path, shell=True
            )
            print(f"Backend server started at {backend_path}")
        else:
            print(f"Backend directory not found: {backend_path}")

    except Exception as e:
        print(f"An error occurred: {e}")


# Run the function to start servers
start_servers()
