import React, { useState } from 'react';

interface StartScreenProps {
  onTopicSelect: (topic: string) => void;
  error: string | null;
}

const categorizedTopics = {
  'Academia': ['World History', 'Science & Nature', 'Geography', 'Art and Literature', 'Technology'],
  'Culture & Fun': ['General Knowledge', 'Movies & Pop Culture', 'Sports Trivia']
};
const categoryNames = Object.keys(categorizedTopics);


const StartScreen: React.FC<StartScreenProps> = ({ onTopicSelect, error }) => {
  const [topic, setTopic] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryNames[0]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onTopicSelect(topic.trim());
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-8 items-center">
        {/* Part 1: Custom Generator */}
        <div className="w-full text-center">
          <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Craft Your Challenge
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">Enter any topic, and our AI will instantly generate a unique quiz for you.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
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
              <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mt-4 text-sm max-w-lg mx-auto">
                {error}
              </div>
            )}
        </div>
        
        {/* Divider */}
        <div className="w-full max-w-md h-px bg-slate-700/50"></div>

        {/* Part 2: Gyaan Ki Batti Jalao */}
        <div className="w-full text-center">
             <h2 className="text-4xl font-black mb-3 uppercase tracking-wider text-shadow-fire flex items-baseline justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">Gyaan Ki</span>
                <span className="mx-1">💡</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">Jalao</span>
            </h2>
            <p className="text-slate-300 mb-6 max-w-lg mx-auto font-semibold italic">Taiyar ho,Aukaat ki baat karne ke liye?</p>
            <button
                onClick={() => onTopicSelect("Saksham's Brain")}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 glow-on-hover"
            >
                Enter the Arena
            </button>
        </div>

        {/* Divider */}
        <div className="w-full max-w-md h-px bg-slate-700/50"></div>
        
        {/* Part 3: Inspired Topics */}
        <div className="w-full text-center">
          <h3 className="text-lg font-semibold mb-4 text-slate-300">Or get inspired:</h3>
           <div className="flex justify-center border-b border-slate-700 mb-4">
            {categoryNames.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 -mb-px border-b-2 font-semibold transition-colors duration-300 ${
                  activeCategory === category 
                    ? 'border-cyan-400 text-cyan-300' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categorizedTopics[activeCategory as keyof typeof categorizedTopics].map((popularTopic) => (
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