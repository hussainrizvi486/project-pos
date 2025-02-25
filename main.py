import sys
import os
import subprocess


FOLDERS = {
    "frontend": os.path.join(os.getcwd(), "frontend"),
    "backend": os.path.join(os.getcwd(), "backend"),
}


def start_development_servers():
    # django_server = subprocess.Popen(
    #     ["python", "manage.py", "runserver"], cwd=FOLDERS.get("backend")
    # )
    react_server = subprocess.Popen(["npm", "run", "dev"], cwd=FOLDERS.get("frontend"))

    # django_server.wait()
    react_server.wait()


if __name__ == "__main__":
    start_development_servers()
