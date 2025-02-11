import sys
import os
import subprocess


def main():
    os.chdir("./frontend")
    react_process = subprocess.Popen(["npm", "start"])

    os.chdir("./backend")
    server_process = subprocess.Popen(["py", "manage.py", "runserver"])

    react_process.wait()
    server_process.wait()


if __name__ == "__main__":
    main()
