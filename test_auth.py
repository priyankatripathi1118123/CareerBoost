import requests
import sqlite3
import json

base_url = "http://localhost:5000/api/auth"

def run_tests():
    print("--- STARTING TESTS ---")
    
    # 1. User Registration
    print("\n[TEST 1] User Registration")
    reg_payload = {
        "username": "PriyankaTripathi",
        "email": "priyanka.t2@example.com",
        "password": "securepassword123",
        "role": "student"
    }
    r = requests.post(f"{base_url}/signup", json=reg_payload)
    print(f"Status: {r.status_code}")
    print(f"Response: {r.json()}")
    assert r.status_code == 201, "Registration failed"
    
    # 2. Duplicate Registration
    print("\n[TEST 2] Duplicate Registration")
    r2 = requests.post(f"{base_url}/signup", json=reg_payload)
    print(f"Status: {r2.status_code}")
    print(f"Response: {r2.json()}")
    assert r2.status_code == 400, "Duplicate registration should fail with 400"
    
    # 3. User Login
    print("\n[TEST 3] User Login")
    login_payload = {
        "email": "priyanka.t2@example.com",
        "password": "securepassword123"
    }
    r3 = requests.post(f"{base_url}/login", json=login_payload)
    print(f"Status: {r3.status_code}")
    print(f"Response: {r3.json()}")
    assert r3.status_code == 200, "Login failed"
    access_token = r3.json().get('access_token')
    
    # 4. Invalid Login
    print("\n[TEST 4] Invalid Login")
    invalid_login = {
        "email": "priyanka.t2@example.com",
        "password": "wrongpassword"
    }
    r4 = requests.post(f"{base_url}/login", json=invalid_login)
    print(f"Status: {r4.status_code}")
    print(f"Response: {r4.json()}")
    assert r4.status_code == 401, "Invalid login should fail with 401"
    
    # 5. Access Protected Route (Simulating session/JWT auth)
    print("\n[TEST 5] Access Protected Route using JWT")
    headers = {"Authorization": f"Bearer {access_token}"}
    r5 = requests.get(f"{base_url}/profile", headers=headers)
    print(f"Status: {r5.status_code}")
    print(f"Response: {r5.json()}")
    assert r5.status_code == 200, "Profile access failed"

    # 6. Database Verification
    print("\n[TEST 6] Database Storage Verification")
    conn = sqlite3.connect('backend/instance/database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, email, password_hash, role FROM users WHERE email='priyanka.t2@example.com'")
    user = cursor.fetchone()
    print(f"Database Record: {user}")
    assert user is not None, "User not found in database"
    assert user[3].startswith('scrypt:'), "Password is not securely hashed!"
    print("Password is securely hashed in the database.")
    
    print("\n--- ALL TESTS PASSED SUCCESSFULLY ---")

if __name__ == "__main__":
    run_tests()
