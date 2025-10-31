
import React from 'react';
import { formatTime } from '../utils/formatTime.ts';
import PlayIcon from './icons/PlayIcon.tsx';
import StopIcon from './icons/StopIcon.tsx';
import ResetIcon from './icons/ResetIcon.tsx';

interface TimerProps {
  elapsedTime: number;
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const Timer: React.FC<TimerProps> = ({ elapsedTime, isActive, onStart, onStop, onReset }) => {
  return (
    <div className="flex flex-col items-center p-4 rounded-lg">
      <div className="text-6xl sm:text-7xl font-mono font-bold tracking-wider text-white mb-6 p-4 rounded-xl bg-gray-900/50 w-full text-center">
        {formatTime(elapsedTime)}
      </div>
      <div className="flex space-x-4 w-full">
        {!isActive ? (
          <button
            onClick={onStart}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-gray-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
          >
            <PlayIcon />
            Start
          </button>
        ) : (
          <button
            onClick={onStop}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            <StopIcon />
            Stop
          </button>
        )}
        <button
          onClick={onReset}
          disabled={isActive || elapsedTime === 0}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transform enabled:hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
        >
          <ResetIcon />
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;