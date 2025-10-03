import React, { useState } from 'react';

interface StartScreenProps {
  onTopicSelect: (topic: string) => void;
  error: string | null;
  popularTopics: string[];
}

const StartScreen: React.FC<StartScreenProps> = ({ onTopicSelect, error, popularTopics }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onTopicSelect(topic.trim());
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Column: Generator */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Craft Your Challenge
          </h2>
          <p className="text-slate-400 mb-6">Enter any topic, and our AI will instantly generate a unique quiz for you.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., 'The Renaissance'"
              className="flex-grow px-4 py-3 bg-slate-900/50 border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              aria-label="Quiz topic"
            />
            <button
              type="submit"
              disabled={!topic.trim()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 disabled:from-slate-600 disabled:to-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed glow-on-hover"
            >
              Generate
            </button>
          </form>
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mt-4 text-sm">
                {error}
              </div>
            )}
        </div>
        
        {/* Right Column: Popular Topics */}
        <div className="border-t-2 md:border-t-0 md:border-l-2 border-slate-700/50 pt-8 md:pt-0 md:pl-8">
          <h3 className="text-lg font-semibold mb-4 text-center md:text-left text-slate-300">Or get inspired:</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {popularTopics.map((popularTopic) => (
              <button
                key={popularTopic}
                onClick={() => onTopicSelect(popularTopic)}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-full hover:bg-slate-700 hover:text-cyan-300 hover:border-cyan-400 transition-all"
              >
                {popularTopic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;