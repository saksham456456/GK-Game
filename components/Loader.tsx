
import React from 'react';
import { Difficulty } from '../types';

interface LoaderProps {
  topic: string;
  difficulty: Difficulty | null;
}

const Loader: React.FC<LoaderProps> = ({ topic, difficulty }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400 mb-4"></div>
      <p className="text-lg text-slate-300">Generating your {difficulty && <span className="font-bold">{difficulty}</span>} quiz on...</p>
      <p className="text-2xl font-bold text-cyan-300 my-2">{topic}</p>
      <p className="text-sm text-slate-500">This might take a moment.</p>
    </div>
  );
};

export default Loader;