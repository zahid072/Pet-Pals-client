import React from 'react';

const RadialProgressBar = ({size, progress, max }) => {
  const strokeDasharray = 283; // 2 * Math.PI * 45 (radius is 45)
  const normalizedProgress = (progress / max) * 100;
  const strokeDashoffset = strokeDasharray - (normalizedProgress / 100) * strokeDasharray;

  return (
    <div className="flex items-center justify-center">
      <svg
        className={`size-${size}`}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#3b82f6"
          strokeWidth="10"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
        <text
          x="50"
          y="50"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-xl font-semibold fill-current text-blue-600"
        >
          {Math.round(normalizedProgress)}%
        </text>
      </svg>
    </div>
  );
};

export default RadialProgressBar;

