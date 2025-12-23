import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const QuestionModal = ({ question, teamName, onAnswer, teamColor, feedback, onShowAnswer }) => {
    if (!question) return null;

    const handleSelect = (index) => {
        if (feedback) return; // Prevent clicking while feedback is showing
        const optionLabel = String.fromCharCode(65 + index);
        onAnswer(optionLabel);
    };

    return (
        <div className="glass-panel" style={{
            padding: '3rem',
            width: '80%',
            maxWidth: '600px',
            border: `3px solid ${teamColor}`,
            boxShadow: 'var(--glass-shadow)',
        }}>
            {feedback ? (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.95)',
                    zIndex: 10,
                    borderRadius: '20px'
                }}>
                    <div style={{ marginBottom: '1rem' }}>
                        {feedback.isCorrect ? (
                            <CheckCircle size={100} color="#2F5233" strokeWidth={3} />
                        ) : (
                            <XCircle size={100} color="#D42426" strokeWidth={3} />
                        )}
                    </div>
                    <h2 style={{
                        fontSize: '3rem',
                        color: feedback.isCorrect ? '#2F5233' : '#D42426',
                        margin: 0
                    }}>
                        {feedback.isCorrect ? "Correct!" : "Wrong!"}
                    </h2>

                    {!feedback.isCorrect && feedback.showAnswer && (
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '1.2rem', color: '#666' }}>The correct answer was:</p>
                            <h3 style={{ fontSize: '2rem', color: '#2C3E50', marginTop: '0.5rem' }} dir="auto">
                                {question.correctAnswer}
                            </h3>
                        </div>
                    )}

                    {!feedback.isCorrect && !feedback.showAnswer && (
                        <button
                            onClick={onShowAnswer}
                            style={{
                                marginTop: '2rem',
                                padding: '1rem 3rem',
                                fontSize: '1.5rem',
                                background: '#FFD700',
                                border: 'none',
                                borderRadius: '50px',
                                fontWeight: 'bold',
                                color: '#333',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
                            }}
                        >
                            Show Answer
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <h2 style={{ color: teamColor, textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }} dir="auto">
                        {teamName}
                    </h2>
                    <h3 style={{ margin: '2rem 0', fontSize: '1.8rem', textAlign: 'center', color: '#2C3E50', fontWeight: 'bold' }} dir="auto">
                        {question.question}
                    </h3>
                </>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {question.options.map((opt, idx) => (
                    opt && (
                        <button
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            disabled={!!feedback}
                            style={{
                                padding: '1.2rem',
                                fontSize: '1.2rem',
                                backgroundColor: feedback
                                    ? (String.fromCharCode(65 + idx) === question.correctAnswer && (feedback.isCorrect || feedback.showAnswer) ? '#95D5B2' : 'rgba(255,255,255,0.5)')
                                    : 'rgba(255,255,255,0.5)',
                                border: feedback && String.fromCharCode(65 + idx) === question.correctAnswer ? '3px solid #2F5233' : '1px solid rgba(255,255,255,0.6)',
                                borderRadius: '15px',
                                cursor: feedback ? 'default' : 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                color: '#333',
                                opacity: feedback && String.fromCharCode(65 + idx) !== question.correctAnswer ? 0.6 : 1
                            }}
                            onMouseOver={(e) => {
                                if (!feedback) {
                                    e.currentTarget.style.backgroundColor = teamColor;
                                    e.currentTarget.style.color = 'white';
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!feedback) {
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)';
                                    e.currentTarget.style.color = '#333';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }
                            }}
                        >
                            <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>{String.fromCharCode(65 + idx)}.</span>
                            <span dir="auto">{opt}</span>
                        </button>
                    )
                ))}
            </div>

            {/* Button moved to overlay */}
        </div>
    );
};

export default QuestionModal;
