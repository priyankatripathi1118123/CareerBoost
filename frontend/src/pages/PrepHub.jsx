import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Mini helper to render basic markdown-style text safely without a library
const renderMarkdown = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    if (line.startsWith('### ')) return <h3 key={idx} style={{ marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 800 }}>{line.replace('### ', '')}</h3>;
    if (line.startsWith('## ')) return <h2 key={idx} style={{ marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 800 }}>{line.replace('## ', '')}</h2>;
    if (line.startsWith('- ')) {
      const boldParsed = line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <li key={idx} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: boldParsed }} />;
    }
    const boldParsed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
    if (line.trim() === '') return <br key={idx} />;
    return <p key={idx} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: boldParsed }} />;
  });
};

export default function PrepHub() {
  const { user, setUser, token, showToast } = useContext(AuthContext);
  const [activeTopic, setActiveTopic] = useState('quantitative');
  const [prepData, setPrepData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('notes'); // notes, quiz, interviews

  // Note State
  const [activeNoteIndex, setActiveNoteIndex] = useState(0);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({}); // { 0: { option: 2, checked: true, correct: false } }
  
  // Interview state
  const [currentInterviewIndex, setCurrentInterviewIndex] = useState(0);

  const topics = [
    { id: 'quantitative', name: 'Quantitative Aptitude' },
    { id: 'data', name: 'Data Aptitude' },
    { id: 'logical', name: 'Logical Reasoning' },
    { id: 'verbal', name: 'Verbal Ability' }
  ];

  const fetchPrepData = () => {
    setLoading(true);
    fetch(`/api/prep/${activeTopic}`)
      .then((res) => res.json())
      .then((data) => {
        setPrepData(data);
        setLoading(false);
        resetStates();
      })
      .catch(() => {
        showToast('Error loading preparation module data', 'error');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPrepData();
  }, [activeTopic]);

  const resetStates = () => {
    setActiveNoteIndex(0);
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setCurrentInterviewIndex(0);
  };

  const handleOptionSelect = (idx) => {
    const currentStatus = quizAnswers[currentQuestionIndex];
    if (currentStatus && currentStatus.checked) return; // locked
    setQuizAnswers({
      ...quizAnswers,
      [currentQuestionIndex]: { option: idx, checked: false, correct: false }
    });
  };

  const handleCheckAnswer = () => {
    const currentStatus = quizAnswers[currentQuestionIndex];
    if (!currentStatus || currentStatus.checked) return;

    const isCorrect = currentStatus.option === prepData.mcqs[currentQuestionIndex].answer;
    
    setQuizAnswers({
      ...quizAnswers,
      [currentQuestionIndex]: { ...currentStatus, checked: true, correct: isCorrect }
    });

    if (isCorrect) {
      if (user) {
        const updatedUser = { ...user, xp: user.xp + 10 };
        setUser(updatedUser);
        showToast('Correct Answer! +10 XP earned', 'success');
      }
    } else {
      showToast('Incorrect Answer. See explanation below.', 'error');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < prepData.mcqs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    setCurrentQuestionIndex(prepData.mcqs.length); // Push to summary view
  };

  const calculateScore = () => {
    let score = 0;
    Object.values(quizAnswers).forEach(ans => {
      if (ans.correct) score += 1;
    });
    return score;
  };

  return (
    <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Topics tab switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem' }}>
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTopic(t.id)}
            className="btn btn-sm btn-secondary"
            style={{
              borderColor: activeTopic === t.id ? 'var(--primary)' : 'var(--card-border)',
              background: activeTopic === t.id ? 'rgba(124, 58, 237, 0.08)' : 'transparent',
              color: activeTopic === t.id ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '0.35fr 1.65fr', alignItems: 'stretch' }}>
        
        {/* Left Info Panel */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PREPARATION CATEGORY</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.25rem' }}>{prepData ? prepData.title : 'Loading...'}</h3>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DIFFICULTY</span>
            <p style={{ marginTop: '0.25rem' }}>
              <span className={`badge ${
                prepData?.difficulty?.includes('Easy') ? 'badge-easy' : prepData?.difficulty?.includes('Hard') ? 'badge-hard' : 'badge-medium'
              }`}>
                {prepData ? prepData.difficulty : 'Medium'}
              </span>
            </p>
          </div>

          {/* Sub Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            <button
              onClick={() => setActiveSubTab('notes')}
              className="btn btn-secondary btn-sm"
              style={{
                justifyContent: 'flex-start',
                background: activeSubTab === 'notes' ? 'rgba(255,255,255,0.02)' : 'none',
                border: activeSubTab === 'notes' ? '1px solid var(--accent)' : '1px solid transparent'
              }}
            >
              📖 Lecture Notes
            </button>
            <button
              onClick={() => setActiveSubTab('quiz')}
              className="btn btn-secondary btn-sm"
              style={{
                justifyContent: 'flex-start',
                background: activeSubTab === 'quiz' ? 'rgba(255,255,255,0.02)' : 'none',
                border: activeSubTab === 'quiz' ? '1px solid var(--accent)' : '1px solid transparent'
              }}
            >
              📝 Practice MCQs
            </button>
            <button
              onClick={() => setActiveSubTab('interviews')}
              className="btn btn-secondary btn-sm"
              style={{
                justifyContent: 'flex-start',
                background: activeSubTab === 'interviews' ? 'rgba(255,255,255,0.02)' : 'none',
                border: activeSubTab === 'interviews' ? '1px solid var(--accent)' : '1px solid transparent'
              }}
            >
              🏢 Interview Questions
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="skeleton" style={{ height: '30px', width: '60%' }}></div>
              <div className="skeleton" style={{ height: '80px' }}></div>
              <div className="skeleton" style={{ height: '80px' }}></div>
            </div>
          ) : (
            <>
              {/* LECTURE NOTES */}
              {activeSubTab === 'notes' && prepData && (
                <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', minHeight: '400px' }}>
                  {/* Notes Navigation */}
                  <div style={{ flex: '0 0 220px', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderRight: '1px solid var(--card-border)', paddingRight: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Topics</h4>
                    {prepData.notes.map((note, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveNoteIndex(idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: activeNoteIndex === idx ? 'var(--primary)' : 'var(--text-secondary)',
                          fontWeight: activeNoteIndex === idx ? 700 : 500,
                          textAlign: 'left',
                          padding: '0.5rem',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          backgroundColor: activeNoteIndex === idx ? 'rgba(124,58,237,0.1)' : 'transparent'
                        }}
                      >
                        {note.topic}
                      </button>
                    ))}
                  </div>
                  
                  {/* Notes Content */}
                  <div style={{ flex: '1', overflowY: 'auto', paddingRight: '1rem' }}>
                    {prepData.notes[activeNoteIndex] && (
                      <div className="glass-card" style={{ padding: '2rem' }}>
                        {renderMarkdown(prepData.notes[activeNoteIndex].content)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PRACTICE MCQS */}
              {activeSubTab === 'quiz' && prepData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {currentQuestionIndex < prepData.mcqs.length ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                        <span>Question {currentQuestionIndex + 1} of {prepData.mcqs.length}</span>
                        <span>Score: {calculateScore()}</span>
                      </div>

                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: '1.5', marginBottom: '1.5rem' }}>
                        {prepData.mcqs[currentQuestionIndex].question}
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {prepData.mcqs[currentQuestionIndex].options.map((opt, oIdx) => {
                          const currentStatus = quizAnswers[currentQuestionIndex];
                          const isSelected = currentStatus && currentStatus.option === oIdx;
                          const isChecked = currentStatus && currentStatus.checked;
                          const isCorrectAns = oIdx === prepData.mcqs[currentQuestionIndex].answer;

                          let optStyle = {
                            border: '1px solid var(--card-border)',
                            background: 'rgba(255,255,255,0.01)'
                          };

                          if (isSelected && !isChecked) {
                            optStyle.border = '1px solid var(--primary)';
                            optStyle.background = 'rgba(124,58,237,0.05)';
                          }

                          if (isChecked) {
                            if (isCorrectAns) {
                              optStyle.border = '1px solid var(--success)';
                              optStyle.background = 'rgba(16,185,129,0.08)';
                            } else if (isSelected) {
                              optStyle.border = '1px solid var(--danger)';
                              optStyle.background = 'rgba(239,68,68,0.08)';
                            }
                          }

                          return (
                            <div
                              key={oIdx}
                              onClick={() => handleOptionSelect(oIdx)}
                              style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                cursor: isChecked ? 'default' : 'pointer',
                                ...optStyle
                              }}
                            >
                              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation Box */}
                      {quizAnswers[currentQuestionIndex]?.checked && (
                        <div style={{ padding: '1.25rem', background: quizAnswers[currentQuestionIndex].correct ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderLeft: quizAnswers[currentQuestionIndex].correct ? '4px solid var(--success)' : '4px solid var(--danger)', borderRadius: '4px', marginBottom: '1.5rem' }}>
                          
                          {quizAnswers[currentQuestionIndex].correct ? (
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--success)' }}>✅ Correct Answer!</h4>
                          ) : (
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--danger)' }}>❌ Incorrect Answer!</h4>
                          )}
                          
                          {!quizAnswers[currentQuestionIndex].correct && (
                            <div style={{ marginBottom: '0.75rem' }}>
                              <strong style={{ color: 'var(--text-primary)' }}>Correct Answer: </strong>
                              <span style={{ color: 'var(--success)', fontWeight: 700 }}>
                                {prepData.mcqs[currentQuestionIndex].options[prepData.mcqs[currentQuestionIndex].answer]}
                              </span>
                            </div>
                          )}

                          <h5 style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Explanation & Step-by-step Solution:</h5>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            {prepData.mcqs[currentQuestionIndex].explanation ? (
                              prepData.mcqs[currentQuestionIndex].explanation.split('\n').map((line, idx) => (
                                <p key={idx} style={{ marginBottom: '0.25rem' }}>{line}</p>
                              ))
                            ) : (
                              'No explanation provided.'
                            )}
                          </div>
                        </div>
                      )}

                      {/* Quiz Controls */}
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                        <button
                          className="btn btn-secondary"
                          onClick={handlePrevQuestion}
                          disabled={currentQuestionIndex === 0}
                          style={{ flex: 1 }}
                        >
                          Previous
                        </button>

                        {!quizAnswers[currentQuestionIndex]?.checked ? (
                          <button
                            className="btn btn-primary"
                            onClick={handleCheckAnswer}
                            disabled={!quizAnswers[currentQuestionIndex]}
                            style={{ flex: 1 }}
                          >
                            Check Answer
                          </button>
                        ) : (
                          <button
                            className="btn btn-accent"
                            onClick={currentQuestionIndex === prepData.mcqs.length - 1 ? finishQuiz : handleNextQuestion}
                            style={{ flex: 1 }}
                          >
                            {currentQuestionIndex === prepData.mcqs.length - 1 ? "Finish Quiz" : "Next Question"}
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Quiz End Summary
                    <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
                      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Quiz Completed!</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                        You scored <strong style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>{calculateScore()}</strong> out of <strong>{prepData.mcqs.length}</strong>.
                      </p>
                      
                      <div style={{ marginTop: '1.5rem' }}>
                        <button className="btn btn-primary" onClick={() => { setQuizAnswers({}); setCurrentQuestionIndex(0); }}>
                          🔄 Retake Quiz
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* INTERVIEW QUESTIONS */}
              {activeSubTab === 'interviews' && prepData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Corporate Interview Questions</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Question {currentInterviewIndex + 1} of {prepData.interviews?.length || 0}</span>
                  </div>
                  
                  {prepData.interviews && prepData.interviews.length > 0 ? (
                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      
                      {/* Question */}
                      <div>
                        <h4 style={{ fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Question</h4>
                        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1.5' }}>
                          {prepData.interviews[currentInterviewIndex].question}
                        </p>
                      </div>

                      {/* Answer */}
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                        <h4 style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Suggested Answer</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          {prepData.interviews[currentInterviewIndex].answer}
                        </p>
                      </div>

                      {/* Navigation Controls */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <button 
                          className="btn btn-secondary btn-sm"
                          disabled={currentInterviewIndex === 0}
                          onClick={() => setCurrentInterviewIndex(currentInterviewIndex - 1)}
                        >
                          &larr; Previous
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm"
                          disabled={currentInterviewIndex === prepData.interviews.length - 1}
                          onClick={() => setCurrentInterviewIndex(currentInterviewIndex + 1)}
                        >
                          Next &rarr;
                        </button>
                      </div>

                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No interview questions cataloged for this topic yet.</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
