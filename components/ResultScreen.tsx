import React from 'react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  let feedbackMessage = '';
  let emoji = '';

  if (percentage === 100) {
    feedbackMessage = "Perfect Score! You're a true mastermind!";
    emoji = '🏆';
  } else if (percentage >= 75) {
    feedbackMessage = "Excellent work! You have some serious knowledge.";
    emoji = '✨';
  } else if (percentage >= 50) {
    feedbackMessage = "Good job! A solid performance.";
    emoji = '😊';
  } else {
    feedbackMessage = "Nice try! Every quiz is a chance to learn.";
    emoji = '🧠';
  }

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-4 text-cyan-300">Quiz Complete!</h2>
      <p className="text-6xl font-bold my-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        {score} / {totalQuestions}
      </p>
      <div className="text-xl mb-8">
        <span className="text-4xl mr-2">{emoji}</span>
        <span className="text-slate-300">{feedbackMessage}</span>
      </div>
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 glow-on-hover"
      >
        Play Another
      </button>
    </div>
  );
};

export default ResultScreen;