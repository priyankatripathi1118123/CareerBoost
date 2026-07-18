import { useContext, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AuthContext, AuthProvider } from './context/AuthContext';
import AICareer from './pages/AICareer';
import AIInterview from './pages/AIInterview';
import Companies from './pages/Companies';
import Dashboard from './pages/Dashboard';
import DSASheet from './pages/DSASheet';
import InterviewQuestions from './pages/InterviewQuestions';
import JobPortal from './pages/JobPortal';
import Login from './pages/Login';
import Playground from './pages/Playground';
import PrepHub from './pages/PrepHub';
import ResumeBuilder from './pages/ResumeBuilder';
import Signup from './pages/Signup';

function AppContent() {
  const { user, token, loading, logout, theme, toggleTheme, toasts } = useContext(AuthContext);
  const [activePage, setActivePage] = useState('dashboard');
  const [authView, setAuthView] = useState('login'); // login or signup

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: '1rem',
        background: 'var(--bg-app)',
        color: 'var(--text-primary)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid var(--card-border)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mounting FutureHire AI Workspace...</span>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Render authentications if token is missing
  if (!token) {
    return (
      <div style={{ background: 'var(--bg-app)', minHeight: '100vh', color: 'var(--text-primary)' }}>
        <div className="toast-container">
          {toasts.map((t) => (
            <div key={t.id} className={`toast toast-${t.type}`}>
              {t.type === 'success' ? '🟢' : t.type === 'error' ? '❌' : 'ℹ️'}
              <span>{t.message}</span>
            </div>
          ))}
        </div>
        {authView === 'login' ? (
          <Login onRegisterRedirect={() => setAuthView('signup')} />
        ) : (
          <Signup onLoginRedirect={() => setAuthView('login')} />
        )}
      </div>
    );
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard user={user} setActivePage={setActivePage} />;
      case 'jobs':
        return <JobPortal />;
      case 'prep':
        return <PrepHub />;
      case 'playground':
        return <Playground />;
      case 'interview':
        return <AIInterview />;
      case 'resume':
        return <ResumeBuilder />;
      case 'career':
        return <AICareer />;
      case 'companies':
        return <Companies />;
      case 'dsasheet':
        return <DSASheet />;
      case 'interviewquestions':
        return <InterviewQuestions />;
      default:
        return <Dashboard user={user} setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="app-container">
      {/* Toast Alert Popups */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.type === 'success' ? '🟢' : t.type === 'error' ? '❌' : 'ℹ️'}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Sidebar navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} user={user} logout={logout} />

      {/* Main Page Area */}
      <div className="main-content">
        <Navbar user={user} theme={theme} toggleTheme={toggleTheme} />
        
        <main className="content-body">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
