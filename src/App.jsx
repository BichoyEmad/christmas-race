import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './index.css';
import { GAME_CONSTANTS, INITIAL_STATE, advancePosition } from './utils/gameLogic';
import SetupScreen from './components/SetupScreen';
import RaceTrack2D from './components/RaceTrack2D';
import QuestionModal from './components/QuestionModal';
import SnowEffect from './components/SnowEffect';
import FullScreenToggle from './components/FullScreenToggle';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [gameState, setGameState] = useState('setup'); // setup, racing, victory

  const [teams, setTeams] = useState({
    teamA: { name: 'Red', questions: [] },
    teamB: { name: 'Green', questions: [] },
  });

  const [positions, setPositions] = useState({
    teamA: 0,
    teamB: 0
  });

  /* New State for used questions */
  const [usedQuestions, setUsedQuestions] = useState({
    teamA: new Set(),
    teamB: new Set()
  });

  const [isTurnReady, setIsTurnReady] = useState(false); // New state to wait for user click

  const [currentTurn, setCurrentTurn] = useState('teamA');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleStartGame = (teamData) => {
    setTeams(teamData);
    setGameState('racing');
    // Initial turn setup, but wait for user to click "Ready"
    setCurrentTurn('teamA');
    setIsTurnReady(true);
  };

  // This function is no longer used directly for starting a turn,
  /* Feedback State */
  const [questionFeedback, setQuestionFeedback] = useState(null); // { isCorrect: bool, showAnswer: bool }

  const toggleTurn = () => {
    setCurrentTurn(prev => prev === 'teamA' ? 'teamB' : 'teamA');
  };

  // Revised startTurn for Set<Object> logic
  const triggerQuestion = () => {
    setQuestionFeedback(null); // Reset feedback
    setIsTurnReady(false);
    const teamQuestions = teams[currentTurn].questions;
    const used = usedQuestions[currentTurn];

    const availableQuestions = teamQuestions.filter(q => !used.has(q));

    if (availableQuestions.length === 0) {
      alert("Reshuffling questions!");
      setUsedQuestions(prev => ({ ...prev, [currentTurn]: new Set() }));
      // Using setTimeout to allow state update to process before re-triggering? 
      // Actually just resetting and picking immediately is fine.
      const randomIndex = Math.floor(Math.random() * teamQuestions.length);
      setCurrentQuestion(teamQuestions[randomIndex]);
      setShowQuestion(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    setCurrentQuestion(availableQuestions[randomIndex]);
    setShowQuestion(true);
  };

  const handleAnswer = (answer) => {
    // Don't close immediately. Show feedback.

    // Normalize inputs
    const cleanAnswerRef = String(currentQuestion.correctAnswer).trim().toUpperCase(); // From Excel
    const cleanUserLetter = String(answer).trim().toUpperCase(); // "A", "B", "C"

    // Get the actual text of the selected option
    const optionIndex = cleanUserLetter.charCodeAt(0) - 65;
    const selectedOptionText = currentQuestion.options[optionIndex] ? String(currentQuestion.options[optionIndex]).trim().toUpperCase() : "";

    // Check match: Either the letter matches OR the text matches
    const isCorrect = (cleanAnswerRef === cleanUserLetter) || (cleanAnswerRef === selectedOptionText);

    console.log(`User Picked: ${cleanUserLetter} ("${selectedOptionText}"), Expected: "${cleanAnswerRef}", Result: ${isCorrect}`);

    setQuestionFeedback({ isCorrect, showAnswer: false });

    // Mark question as used
    setUsedQuestions(prev => {
      const newSet = new Set(prev[currentTurn]);
      newSet.add(currentQuestion);
      return { ...prev, [currentTurn]: newSet };
    });

    if (isCorrect) {
      // Wait 1.5s then move
      setTimeout(() => {
        const newPos = advancePosition(positions[currentTurn]);
        setPositions(prev => ({ ...prev, [currentTurn]: newPos }));

        if (newPos >= GAME_CONSTANTS.TOTAL_STEPS) {
          setShowQuestion(false);
          setWinner(teams[currentTurn].name);
          setGameState('victory');
          confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
          return;
        }

        // End turn
        setShowQuestion(false);
        const nextTurn = currentTurn === 'teamA' ? 'teamB' : 'teamA';
        setCurrentTurn(nextTurn);
        setIsTurnReady(true);
      }, 1500);
    } else {
      // If wrong, wait for user to click "Show Answer" or just wait?
      // User asked for "create a button to show correct answer".
      // So we stay in modal until they act or we auto-close?
      // Let's rely on the "Show Answer" button or a timeout if they don't click it?
      // Actually, let's keep it open until they click "Show Answer" (which reveals it),
      // AND THEN after a delay close it? Or just close it after delay if they don't?

      // Let's implement onShowAnswer to reveal it, then close after 2s.
    }
  };

  const handleShowAnswer = () => {
    setQuestionFeedback(prev => ({ ...prev, showAnswer: true }));
    // Close after 3 seconds so they can read it
    setTimeout(() => {
      setShowQuestion(false);
      const nextTurn = currentTurn === 'teamA' ? 'teamB' : 'teamA';
      setCurrentTurn(nextTurn);
      setIsTurnReady(true);
    }, 3000);
  };

  const adjustPosition = (team, delta) => {
    setPositions(prev => {
      const currentPos = prev[team];
      const newPos = Math.max(0, Math.min(GAME_CONSTANTS.TOTAL_STEPS, currentPos + delta));

      if (newPos >= GAME_CONSTANTS.TOTAL_STEPS && gameState !== 'victory') {
        setWinner(teams[team].name);
        setGameState('victory');
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      }

      return { ...prev, [team]: newPos };
    });
  };

  const resetGame = () => {
    setGameState('setup');
    setPositions({ teamA: 0, teamB: 0 });
    setWinner(null);
    setUsedQuestions({ teamA: new Set(), teamB: new Set() });
  };

  return (
    <div className="app-container" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <SnowEffect />
      <FullScreenToggle />

      {/* Helper UI Layer for Turn Info & Manual Trigger */}
      {gameState === 'racing' && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexDirection: 'column'
        }}>
          <div
            onClick={toggleTurn}
            style={{
              padding: '1rem 2rem',
              borderRadius: '50px',
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            title="Click to switch turn"
          >
            <h2 style={{ margin: 0, color: currentTurn === 'teamA' ? '#D42426' : '#2F5233' }} dir="auto">
              Turn: {teams[currentTurn].name}
            </h2>
          </div>

          {isTurnReady && (
            <motion.button
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={triggerQuestion}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '50px',
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
              }}
            >
              🎲 Open Question
            </motion.button>
          )}
        </div>
      )}

      {/* 2D Race Track */}
      {(gameState === 'racing' || gameState === 'victory') && (
        <RaceTrack2D
          positions={positions}
          teamA={teams.teamA}
          teamB={teams.teamB}
          onAdjustPosition={adjustPosition}
        />
      )}

      {/* UI Overlays */}
      <AnimatePresence>
        {gameState === 'setup' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 20, background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' }}
          >
            <SetupScreen onStartGame={handleStartGame} />
          </motion.div>
        )}
        {showQuestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.4)' }}
          >
            <QuestionModal
              question={currentQuestion}
              teamName={teams[currentTurn].name}
              teamColor={currentTurn === 'teamA' ? '#D42426' : '#2F5233'}
              onAnswer={handleAnswer}
              feedback={questionFeedback}
              onShowAnswer={handleShowAnswer}
            />
          </motion.div>
        )}

        {gameState === 'victory' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }}
          >
            <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
              <h1 style={{ fontSize: '4rem', color: '#D42426', margin: '0 0 1rem 0' }}>🎉 Victory! 🎉</h1>
              <h2 style={{ fontSize: '2.5rem', color: '#2F5233' }}>{winner} Wins!</h2>
              <button onClick={resetGame} style={{
                marginTop: '2rem', padding: '1rem 3rem', fontSize: '1.5rem',
                background: 'linear-gradient(to right, #D42426, #FF5252)', color: 'white',
                border: 'none', borderRadius: '50px', boxShadow: '0 10px 20px rgba(212, 36, 38, 0.4)'
              }}>
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
