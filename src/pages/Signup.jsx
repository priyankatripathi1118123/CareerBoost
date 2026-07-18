import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Signup({ onLoginRedirect }) {
  const { login, showToast } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Registration failed. Email might already exist.');
        return res.json();
      })
      .then((data) => {
        showToast('Account created successfully! Please sign in.', 'success');
        onLoginRedirect();
        setLoading(false);
      })
      .catch((err) => {
        showToast(err.message, 'error');
        setLoading(false);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Create Account</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Get started with CareerBoost AI placement system</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="form-label" style={{ marginBottom: '0.35rem', display: 'block' }}>Username</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Priyanka Tripathi"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label" style={{ marginBottom: '0.35rem', display: 'block' }}>Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="priyanka@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label" style={{ marginBottom: '0.35rem', display: 'block' }}>Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label" style={{ marginBottom: '0.35rem', display: 'block' }}>Account Purpose</label>
            <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Prepare & Apply (Student)</option>
              <option value="company">Hire Talents (Company)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <button
            onClick={onLoginRedirect}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 700, cursor: 'pointer' }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
