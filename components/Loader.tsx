
import React from 'react';

interface LoaderProps {
  topic: string;
}

const Loader: React.FC<LoaderProps> = ({ topic }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400 mb-4"></div>
      <p className="text-lg text-slate-300">Generating your quiz on...</p>
      <p className="text-2xl font-bold text-cyan-300 my-2">{topic}</p>
      <p className="text-sm text-slate-500">This might take a moment.</p>
    </div>
  );
};

export default Loader;
