import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';
import Timer from './Timer';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full bg-slate-700/50 rounded-full h-2.5 mb-4">
      <div
        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const DURATION = 10;

const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, totalQuestions, onAnswer, onNext }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(DURATION);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [question]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      handleTimeUp();
    }
  }, [timeLeft]);

  const handleTimeUp = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    onAnswer(false);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAnswer(option);
    setIsAnswered(true);
    onAnswer(option === question.correctAnswer);
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-slate-700/50 hover:bg-slate-700 border-slate-600 hover:border-cyan-400';
    }
    if (option === question.correctAnswer) {
      return 'bg-green-800/50 border-green-500 text-white animate-pulse-correct';
    }
    if (option === selectedAnswer && option !== question.correctAnswer) {
      return 'bg-red-800/50 border-red-500 text-white animate-pulse-wrong';
    }
    return 'bg-slate-800/30 border-slate-700 opacity-60';
  };

  return (
    <div className="animate-fade-in-fast flex flex-col items-center">
       <div className="w-full max-w-2xl mb-4">
        <div className="mb-2 flex justify-between items-center">
            <span className="text-sm font-semibold text-cyan-300">Question {questionNumber} of {totalQuestions}</span>
        </div>
        <ProgressBar current={questionNumber} total={totalQuestions} />
      </div>

      <div className="relative my-4 flex items-center justify-center w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
        <Timer duration={DURATION} timeLeft={timeLeft} isAnswered={isAnswered} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <span className={`text-6xl font-bold transition-colors ${isAnswered ? 'text-slate-600' : 'text-slate-200'}`}>{timeLeft}</span>
          <h2 className="text-lg md:text-xl font-semibold text-slate-300 mt-2" dangerouslySetInnerHTML={{ __html: question.question }}></h2>
        </div>
      </div>


      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:cursor-not-allowed ${getButtonClass(option)}`}
          >
            <span className="font-bold mr-3 text-cyan-300">{String.fromCharCode(65 + index)}.</span>
            <span dangerouslySetInnerHTML={{ __html: option }}></span>
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="w-full max-w-2xl mt-6 animate-fade-in text-center">
          <div className="w-full p-4 bg-slate-900/50 border-l-4 border-cyan-400 rounded-r-lg text-left">
            <h3 className="font-bold text-lg text-cyan-300 mb-2">Explanation</h3>
            <p className="text-slate-300" dangerouslySetInnerHTML={{ __html: question.explanation }}></p>
          </div>
          <button
            onClick={onNext}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 glow-on-hover"
          >
            {questionNumber < totalQuestions ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;