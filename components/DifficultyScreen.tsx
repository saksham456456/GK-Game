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
  return (
    <div className="animate-fade-in text-center">
      <button onClick={onBack} className="absolute top-4 left-4 text-slate-400 hover:text-cyan-300 transition-colors">
        &larr; Back
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
