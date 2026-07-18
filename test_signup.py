import urllib.request
import json

data = json.dumps({
    "username": "Priyanka",
    "email": "priyanka.t@test.com",
    "password": "securepassword",
    "role": "student"
}).encode('utf-8')

req = urllib.request.Request("http://localhost:5000/api/auth/signup", data=data, headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as res:
        print(res.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
