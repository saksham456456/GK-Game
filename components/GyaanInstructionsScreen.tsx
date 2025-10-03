import React from 'react';

interface GyaanInstructionsScreenProps {
  onProceed: () => void;
  onBack: () => void;
}

const GyaanInstructionsScreen: React.FC<GyaanInstructionsScreenProps> = ({ onProceed, onBack }) => {
  return (
    <div className="animate-fade-in text-center flex flex-col items-center justify-center p-4">
      <button onClick={onBack} className="absolute top-4 left-4 text-slate-400 hover:text-cyan-300 transition-colors">
        &larr; Back to Topics
      </button>
      <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
        Welcome to the Arena 🔥
      </h2>
      <p className="text-slate-300 mb-8 max-w-xl">
        You've chosen the ultimate challenge. Here's what you need to know before you test your limits.
      </p>

      <div className="text-left max-w-lg w-full space-y-6 bg-slate-900/40 p-6 rounded-lg border border-slate-700">
        <div>
          <h3 className="text-2xl font-semibold mb-3 text-cyan-300">📜 Rules Simple Hai:</h3>
          <ul className="list-none space-y-2 text-slate-200">
            <li><span className="font-bold text-white">🧠 10 Questions:</span> Dimaag ke liye mazedaar sawal! Har jagah se gyaan aayega.</li>
            <li><span className="font-bold text-white">⏳ 10 Seconds per Question:</span> Jaldi socho! Time rukta nahi, soch-te-soch-te miss mat karna.</li>
            <li><span className="font-bold text-white">🎯 No Second Chances:</span> Sirf ek chance! Achha karna ya fir… next time try karna.</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-3 text-yellow-400">⚠️ Warning:</h3>
          <ul className="list-none space-y-2 text-slate-200">
            <li>Ye quiz koi halwa nahi hai.</li>
            <li>Tough, unpredictable, aur thoda aukaat🔥 se bahar ke questions bhi ho sakte hai.</li>
            <li>Sawalon ka generator hai ek chaotic AI Expert-Saksham🤖 isliye safe rahe and satark rahe🛡️</li>
            <li>Sirf asli 🧠 hi yahan survive kar payenge</li>
          </ul>
        </div>
      </div>

      <p className="mt-8 text-xl text-slate-300 font-semibold">
        Chalo, prove karo!
      </p>

      <button
        onClick={onProceed}
        className="mt-6 px-10 py-4 bg-gradient-to-r from-red-500 to-purple-600 text-white font-bold text-lg rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 glow-on-hover"
      >
        I'm Ready!
      </button>
    </div>
  );
};

export default GyaanInstructionsScreen;