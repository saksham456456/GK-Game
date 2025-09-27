import React, { useState, useCallback } from 'react';
import { GameState, Question } from './types';
import { generateQuizQuestions } from './services/geminiService';
import StartScreen from './components/StartScreen';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';
import Loader from './components/Loader';

const popularTopics = [
    'General Knowledge', 
    'World History', 
    'Science & Nature', 
    'Movies & Pop Culture', 
    'Geography', 
    'Art and Literature', 
    'Technology', 
    'Sports Trivia'
];

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-cyan-400">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 1 1h.3a1 1 0 0 0 .9-.6 2.5 2.5 0 0 1 4.3 1.9 2.5 2.5 0 0 1 0 4.2 1 1 0 0 0-.5 1.7 2.5 2.5 0 0 1-4.2 2.1 1 1 0 0 0-1.4 0 2.5 2.5 0 0 1-4.2-2.1 1 1 0 0 0-.5-1.7 2.5 2.5 0 0 1 0-4.2A2.5 2.5 0 0 1 7.2 6a1 1 0 0 0 .9.6h.3a1 1 0 0 0 1-1V4.5A2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M12 14v1a2 2 0 0 0 2 2h.5a2 2 0 0 1 1.8 1.2 2 2 0 0 0 1.9 1.3 2 2 0 0 0 1.9-1.3 2 2 0 0 1 1.8-1.2H20a2 2 0 0 0 2-2v-1"/>
    <path d="M12 14v1a2 2 0 0 1-2 2h-.5a2 2 0 0 0-1.8 1.2 2 2 0 0 1-1.9 1.3 2 2 0 0 1-1.9-1.3A2 2 0 0 0 4.2 17H4a2 2 0 0 1-2-2v-1"/>
  </svg>
);


const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string>('');

  const startQuiz = useCallback(async (topic: string) => {
    if (!topic) return;
    setGameState(GameState.LOADING);
    setError(null);
    setCurrentTopic(topic);
    try {
      const newQuestions = await generateQuizQuestions(topic, 5);
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
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
      } else {
        setGameState(GameState.FINISHED);
      }
    }, 1500); // Wait 1.5 seconds to show feedback
  };

  const restartQuiz = () => {
    setGameState(GameState.START);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setError(null);
    setCurrentTopic('');
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.LOADING:
        return <Loader topic={currentTopic} />;
      case GameState.PLAYING:
        return (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
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
        return <StartScreen onStart={startQuiz} error={error} popularTopics={popularTopics} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2">
            <BrainIcon />
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              AI Quiz Generator
            </h1>
          </div>
          <p className="text-slate-500 text-sm">Powered by Saksham</p>
        </header>
        <main className="bg-slate-800/30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border-2 gradient-border transition-all duration-500">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;