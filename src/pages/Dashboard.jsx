import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

export default function Dashboard({ user, setActivePage }) {
  // Mock charts dataset
  const weeklyData = [
    { name: 'Mon', XP: 30 },
    { name: 'Tue', XP: 80 },
    { name: 'Wed', XP: 140 },
    { name: 'Thu', XP: 180 },
    { name: 'Fri', XP: 250 },
    { name: 'Sat', XP: 320 },
    { name: 'Sun', XP: 450 }
  ];

  const skillData = [
    { subject: 'Aptitude', A: 75, fullMark: 100 },
    { subject: 'DBMS/SQL', A: 90, fullMark: 100 },
    { subject: 'OS/Networks', A: 65, fullMark: 100 },
    { subject: 'Coding', A: 85, fullMark: 100 },
    { subject: 'Languages', A: 80, fullMark: 100 },
    { subject: 'HR/STAR', A: 70, fullMark: 100 }
  ];

  const applicationData = [
    { name: 'Applied', value: 4, color: '#7c3aed' },
    { name: 'Review', value: 2, color: '#f59e0b' },
    { name: 'Interview', value: 1, color: '#06b6d4' },
    { name: 'Offered', value: 1, color: '#10b981' }
  ];

  const completionData = [
    { name: 'Aptitude', Done: 80, Todo: 20 },
    { name: 'Core CS', Done: 70, Todo: 30 },
    { name: 'Languages', Done: 95, Todo: 5 },
    { name: 'DSA Sheet', Done: 40, Todo: 60 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="fade-in-section">
      {/* Personalized Welcome Banner */}
      <div className="glass-panel" style={{
        padding: '2.5rem',
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Placement Preparation dashboard
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem 0' }}>
            Welcome back, {user ? user.username : 'User'}!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px', lineHeight: '1.6' }}>
            Keep up your coding streak to earn badges. Practice aptitude tests, dry run DSA problems in our online editor, and scan your resume against job criteria.
          </p>
        </div>
        
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'var(--primary-glow)',
          filter: 'blur(70px)'
        }}></div>
      </div>

      {/* Grid of Key Metrics Cards */}
      <div className="grid-4">
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Milestones</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>{user ? user.xp : 150} XP</h3>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginTop: '0.5rem' }}>
            <div style={{ width: '60%', height: '100%', background: 'var(--primary)' }}></div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Daily Streak</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--warning)' }}>{user ? user.streak : 3} Days</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>🔥 Solve 1 challenge to maintain</p>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>ATS Resume Match</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)' }}>{user && user.resume_score ? `${user.resume_score}%` : '85%'}</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>📄 Uploaded: {user && user.resume_name ? user.resume_name : 'demo_resume.pdf'}</p>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>AI Interview Prep</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success)' }}>{user && user.interview_score ? `${user.interview_score}%` : '80%'}</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>🎤 Grade: Ready for technical round</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid-2">
        {/* Weekly Activity Line Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '340px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1.25rem' }}>Weekly activity tracker</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weeklyData}>
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={11} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', borderColor: 'var(--card-border)' }} />
              <Line type="monotone" dataKey="XP" stroke="var(--primary)" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Radar Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '340px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1.25rem' }}>Core Placement Skills</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
              <PolarGrid stroke="var(--card-border)" />
              <PolarAngleAxis dataKey="subject" stroke="var(--text-secondary)" fontSize={10} />
              <PolarRadiusAxis stroke="var(--card-border)" angle={30} domain={[0, 100]} />
              <Radar name="Student" dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2">
        {/* Prep Module Progress Bar Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '340px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1.25rem' }}>Preparation Progress Rate</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={completionData}>
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={11} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', borderColor: 'var(--card-border)' }} />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="Done" stackId="a" fill="var(--success)" />
              <Bar dataKey="Todo" stackId="a" fill="rgba(255,255,255,0.03)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Applications Status Pie Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1.25rem' }}>Application Pipeline Status</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '2rem' }}>
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={applicationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {applicationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--bg-surface)', borderColor: 'var(--card-border)' }} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Status Legend labels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '40%' }}>
              {applicationData.map((entry) => (
                <div key={entry.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: entry.color }}></div>
                    <span style={{ color: 'var(--text-secondary)' }}>{entry.name}</span>
                  </div>
                  <strong style={{ color: 'var(--text-primary)' }}>{entry.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
