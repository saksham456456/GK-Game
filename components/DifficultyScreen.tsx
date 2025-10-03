import React from 'react';
import { Difficulty } from '../types';

interface DifficultyScreenProps {
  topic: string;
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
const difficultyColors = {
  Easy: 'from-green-500 to-cyan-500',
  Medium: 'from-yellow-500 to-orange-500',
  Hard: 'from-red-500 to-purple-500'
}

const DifficultyScreen: React.FC<DifficultyScreenProps> = ({ topic, onSelect, onBack }) => {

  if (topic === "Saksham's Brain") {
    const disabledButtonClass = "px-5 py-3 bg-slate-800/60 border border-slate-700 rounded-lg flex items-center justify-center gap-2 text-slate-500 font-semibold cursor-not-allowed";
    
    return (
      <div className="animate-fade-in text-center flex flex-col items-center justify-center min-h-[400px]">
        <button onClick={onBack} className="absolute top-4 left-4 text-slate-400 hover:text-cyan-300 transition-colors">
          &larr; Back to Rules
        </button>
        <p className="text-4xl font-black mb-6 uppercase tracking-wide text-shadow-fire flex items-baseline justify-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">Sabke levels nikalne ka time aa gaya!</span>
          <span className="ml-2">🎮⚡</span>
        </p>

        <div className="relative w-96 h-64 flex items-center justify-center my-4">
          {/* Main button in the center */}
          <button
            onClick={() => onSelect("Saksham's Level")}
            className="z-10 w-48 h-48 flex items-center justify-center text-center bg-gradient-to-br from-red-500 to-purple-600 text-white font-bold text-2xl rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 glow-on-hover"
          >
            Saksham's Level
          </button>

          {/* Disabled buttons positioned in a triangle */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 ${disabledButtonClass}`}>
            <span>Easy</span>
            <span className="text-xl">🚫</span>
          </div>
          <div className={`absolute bottom-0 left-8 ${disabledButtonClass}`}>
            <span>Medium</span>
            <span className="text-xl">🚫</span>
          </div>
          <div className={`absolute bottom-0 right-8 ${disabledButtonClass}`}>
            <span>Hard</span>
            <span className="text-xl">🚫</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in text-center">
      <button onClick={onBack} className="absolute top-4 left-4 text-slate-400 hover:text-cyan-300 transition-colors">
        &larr; Back to Topics
      </button>
      <h2 className="text-2xl font-bold mb-2 text-slate-300">
        Select Difficulty for:
      </h2>
      <p className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        {topic}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {difficulties.map((level) => (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className={`w-full sm:w-auto px-8 py-4 bg-gradient-to-r ${difficultyColors[level]} text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 glow-on-hover`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultyScreen;