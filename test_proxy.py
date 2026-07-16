import urllib.request
import json

data = json.dumps({
    "username": "TestProxyUser",
    "email": "proxy@test.com",
    "password": "securepassword",
    "role": "student"
}).encode('utf-8')

req = urllib.request.Request("http://localhost:5173/api/auth/signup", data=data, headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as res:
        print("Status:", res.status)
        print("Response:", res.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print("Response:", e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
