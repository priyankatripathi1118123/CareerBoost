import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [toasts, setToasts] = useState([]);

  // Toast notifier function
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    // Apply theme attribute to body
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Verify token on mount or change
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetch('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (!res.ok) throw new Error('Session expired');
          return res.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => {
          // Token expired or invalid
          setToken('');
          setUser(null);
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const login = (jwtToken, userData) => {
    setToken(jwtToken);
    setUser(userData);
    showToast(`Welcome back, ${userData.username}!`, 'success');
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    showToast('Logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loading,
        theme,
        toggleTheme,
        login,
        logout,
        toasts,
        showToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
