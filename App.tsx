import React, { useState, useCallback, useEffect } from 'react';
import { GameState, Question, Difficulty } from './types';
import { generateQuizQuestions } from './services/geminiService';
import StartScreen from './components/StartScreen';
import DifficultyScreen from './components/DifficultyScreen';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';
import Loader from './components/Loader';
import SplashScreen from './components/SplashScreen';
import GyaanInstructionsScreen from './components/GyaanInstructionsScreen';

const ClassicLogo = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 9.5C16 10.8807 14.8807 12 13.5 12C12.1193 12 11 10.8807 11 9.5C11 8.11929 12.1193 7 13.5 7C14.8807 7 16 8.11929 16 9.5Z" stroke="#22d3ee" strokeWidth="1.5"/>
    <path d="M12.5 12.5C12.5 13.8807 11.3807 15 10 15C8.61929 15 7.5 13.8807 7.5 12.5C7.5 11.1193 8.61929 10 10 10C11.3807 10 12.5 11.1193 12.5 12.5Z" stroke="#22d3ee" strokeWidth="1.5"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.92969 19.07C3.33969 16.32 2.67969 13.06 3.49969 10C4.31969 6.94 6.48969 4.5 9.49969 3.5" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19.0703 4.92993C20.6603 7.67993 21.3203 10.9399 20.5003 13.9999C19.6803 17.0599 17.5103 19.4999 14.5003 20.4999" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);


const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty | null>(null);

   useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleTopicSelect = (topic: string) => {
    if (!topic) return;
    setCurrentTopic(topic);
    setError(null);
    if (topic === "Saksham's Brain") {
      setGameState(GameState.GYAAN_INSTRUCTIONS);
    } else {
      setGameState(GameState.SELECT_DIFFICULTY);
    }
  };

  const handleProceedFromInstructions = () => {
    setGameState(GameState.SELECT_DIFFICULTY);
  };
  
  const startQuiz = useCallback(async (difficulty: Difficulty) => {
    if (!currentTopic) return;
    setCurrentDifficulty(difficulty);
    setGameState(GameState.LOADING);
    try {
      const questionCount = difficulty === "Saksham's Level" ? 10 : 5;
      const newQuestions = await generateQuizQuestions(currentTopic, questionCount, difficulty);
      if (newQuestions && newQuestions.length > 0) {
        setQuestions(newQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setGameState(GameState.PLAYING);
      } else {
        throw new Error("Failed to generate quiz questions. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setGameState(GameState.START);
    }
  }, [currentTopic]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setGameState(GameState.FINISHED);
    }
  };

  const restartQuiz = () => {
    setGameState(GameState.START);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setError(null);
    setCurrentTopic('');
    setCurrentDifficulty(null);
  };
  
  const backToTopicSelect = () => {
    setGameState(GameState.START);
    setError(null);
  }

  const backToInstructions = () => {
    setGameState(GameState.GYAAN_INSTRUCTIONS);
    setError(null);
  }

  const renderContent = () => {
    switch (gameState) {
      case GameState.LOADING:
        return <Loader topic={currentTopic} difficulty={currentDifficulty} />;
      case GameState.GYAAN_INSTRUCTIONS:
        return <GyaanInstructionsScreen onProceed={handleProceedFromInstructions} onBack={backToTopicSelect} />;
      case GameState.SELECT_DIFFICULTY:
         const handleBack = currentTopic === "Saksham's Brain" ? backToInstructions : backToTopicSelect;
         return <DifficultyScreen topic={currentTopic} onSelect={startQuiz} onBack={handleBack} />;
      case GameState.PLAYING:
        return (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
          />
        );
      case GameState.FINISHED:
        return (
          <ResultScreen
            score={score}
            totalQuestions={questions.length}
            onRestart={restartQuiz}
          />
        );
      case GameState.START:
      default:
        return <StartScreen onTopicSelect={handleTopicSelect} error={error} />;
    }
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2">
            <ClassicLogo />
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              AI Quiz Generator
            </h1>
          </div>
          <p className="text-slate-500 text-sm">Powered by Saksham</p>
        </header>
        <main className="bg-slate-800/30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border-2 gradient-border transition-all duration-500 min-h-[600px] flex flex-col justify-center">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;