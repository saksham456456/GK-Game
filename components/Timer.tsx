import React from 'react';

interface TimerProps {
  duration: number;
  timeLeft: number;
  isAnswered: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, timeLeft, isAnswered }) => {
  const size = "100%"; // Use percentage to be responsive to parent
  const strokeWidth = 12;
  // These values are based on a 320x320 viewbox for calculation
  const viewBoxSize = 320;
  const radius = (viewBoxSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (timeLeft / duration) * circumference;

  let strokeColor = 'stroke-cyan-400';
  let pulseClass = '';

  if (!isAnswered) {
    if (timeLeft <= 3) {
      strokeColor = 'stroke-red-500';
      pulseClass = 'animate-pulse-timer';
    } else if (timeLeft <= 6) {
      strokeColor = 'stroke-yellow-500';
    }
  } else {
    strokeColor = 'stroke-slate-700';
  }


  return (
    <div className="absolute w-full h-full">
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        <circle
          className="stroke-slate-700/50"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
        />
        <circle
          className={`${strokeColor} ${pulseClass}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
        />
      </svg>
    </div>
  );
};

export default Timer;