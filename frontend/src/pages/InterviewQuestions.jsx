import React, { useState, useEffect, useMemo } from 'react';
import interviewData from '../data/interview_questions.json';

const categories = [
  'All Categories',
  'HR Interview Questions',
  'Technical Interview Questions',
  'OOPs',
  'DBMS',
  'Operating System',
  'Computer Networks',
  'SQL Interview Questions',
  'Java/Python Basics',
  'Aptitude & Logical Reasoning'
];

export default function InterviewQuestions() {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [bookmarks, setBookmarks] = useState({});
  const [readStatus, setReadStatus] = useState({});

  // Load state from localStorage
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('interview_bookmarks');
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      
      const savedRead = localStorage.getItem('interview_read');
      if (savedRead) setReadStatus(JSON.parse(savedRead));
    } catch (e) {
      console.error("Failed to parse local storage", e);
    }
  }, []);

  // Save state to localStorage
  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarks(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('interview_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleRead = (id, e) => {
    e.stopPropagation();
    setReadStatus(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('interview_read', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  // Flatten and filter questions
  const filteredQuestions = useMemo(() => {
    let allQ = [];
    Object.keys(interviewData).forEach(cat => {
      const questions = interviewData[cat] || [];
      questions.forEach(q => {
        allQ.push({ ...q, category: cat });
      });
    });

    if (activeCategory !== 'All Categories') {
      allQ = allQ.filter(q => q.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      allQ = allQ.filter(q => 
        q.question.toLowerCase().includes(query) || 
        q.companies?.some(c => c.toLowerCase().includes(query)) ||
        q.detailed_answer.toLowerCase().includes(query)
      );
    }

    return allQ;
  }, [activeCategory, searchQuery]);

  const readCount = Object.values(readStatus).filter(Boolean).length;
  const totalCount = useMemo(() => {
    let count = 0;
    Object.values(interviewData).forEach(arr => count += arr.length);
    return count;
  }, []);

  return (
    <div className="page-container fade-in-section">
      {/* Header & Stats */}
      <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>Interview Questions Database</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
              Master your interviews with {totalCount > 0 ? totalCount : '250+'} real questions from top companies.
            </p>
          </div>
          <div style={{ textAlign: 'right', background: 'rgba(124, 58, 237, 0.1)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
              {readCount} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ {totalCount}</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Questions Mastered</div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search questions, answers, or companies (e.g., 'Amazon', 'Polymorphism')..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1.2rem 1rem 1.2rem 3rem',
              borderRadius: '12px',
              border: '1px solid var(--card-border)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '1.1rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            className="focus-ring"
          />
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid var(--card-border)',
                background: activeCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: activeCategory === cat ? 600 : 400,
                transition: 'all 0.2s ease',
                fontSize: '0.9rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '4rem' }}>
        {filteredQuestions.length === 0 ? (
          <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>No questions found matching your search.</h3>
          </div>
        ) : (
          filteredQuestions.map((q, index) => {
            const isExpanded = expandedId === q.id;
            const isRead = !!readStatus[q.id];
            const isBookmarked = !!bookmarks[q.id];

            return (
              <div 
                key={q.id} 
                className="glass-card hover-effect" 
                style={{ 
                  padding: 0, 
                  overflow: 'hidden', 
                  border: isRead ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--card-border)',
                  opacity: isRead && !isExpanded ? 0.8 : 1,
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Header (Always Visible) */}
                <div 
                  onClick={() => toggleExpand(q.id)}
                  style={{ 
                    padding: '1.5rem', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    gap: '1.5rem',
                    background: isRead ? 'rgba(16, 185, 129, 0.02)' : 'transparent'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                      <span className={`badge ${q.difficulty === 'Easy' ? 'badge-easy' : q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}>
                        {q.difficulty}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {q.category}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: isRead ? 'var(--text-secondary)' : 'var(--text-primary)', lineHeight: 1.4, margin: 0 }}>
                      <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>Q{index + 1}.</span> 
                      {q.question}
                    </h3>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button 
                      onClick={(e) => toggleBookmark(q.id, e)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', opacity: isBookmarked ? 1 : 0.4, transition: 'transform 0.2s' }}
                      title="Bookmark Question"
                    >
                      {isBookmarked ? '⭐' : '☆'}
                    </button>
                    <div style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease', color: 'var(--text-muted)' }}>
                      ▼
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '0.5rem' }}>
                    <div style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      
                      {/* Tags */}
                      {q.companies && q.companies.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>Asked in:</span>
                          {q.companies.map((c, i) => (
                            <span key={i} className="badge" style={{ background: 'rgba(255,255,255,0.05)' }}>{c}</span>
                          ))}
                        </div>
                      )}

                      {/* Detailed Answer */}
                      <div>
                        <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Ideal Answer</h4>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid var(--primary)', color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                          {q.detailed_answer}
                        </div>
                      </div>

                      {/* Explanation */}
                      {q.explanation && (
                        <div>
                          <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Explanation</h4>
                          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{q.explanation}</p>
                        </div>
                      )}

                      {/* Tips */}
                      {q.tips && (
                        <div style={{ background: 'rgba(234, 179, 8, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                          <h4 style={{ color: '#eab308', marginBottom: '0.5rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            💡 Pro Tip
                          </h4>
                          <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{q.tips}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <button 
                          className={`btn ${isRead ? 'btn-secondary' : 'btn-primary'}`}
                          onClick={(e) => {
                            toggleRead(q.id, e);
                            if (!isRead && index < filteredQuestions.length - 1) {
                              setExpandedId(filteredQuestions[index + 1].id);
                            } else if (isRead) {
                              setExpandedId(null);
                            }
                          }}
                        >
                          {isRead ? '✓ Marked as Read' : 'Mark as Read & Next ➔'}
                        </button>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
