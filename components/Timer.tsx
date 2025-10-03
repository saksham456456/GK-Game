import React from 'react';

interface TimerProps {
  duration: number;
  timeLeft: number;
  isAnswered: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, timeLeft, isAnswered }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (timeLeft / duration) * circumference;

  let strokeColor = 'stroke-cyan-400';
  if (!isAnswered) {
    if (timeLeft <= 3) {
      strokeColor = 'stroke-red-500';
    } else if (timeLeft <= 6) {
      strokeColor = 'stroke-yellow-500';
    }
  }

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg className="absolute w-full h-full transform -rotate-90">
        <circle
          className="stroke-slate-700"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
        <circle
          className={`${strokeColor} transition-all duration-500`}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={isAnswered ? offset : offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <span className={`font-bold text-lg ${isAnswered ? 'text-slate-500' : 'text-slate-200'}`}>
        {timeLeft}
      </span>
    </div>
  );
};

export default Timer;