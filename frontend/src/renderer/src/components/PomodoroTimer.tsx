import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface PomodoroTimerProps {
  onComplete?: () => void;
}

export function PomodoroTimer({ onComplete }: PomodoroTimerProps) {
  const WORK_TIME = 25 * 60; // 25 minutes in seconds
  const BREAK_TIME = 5 * 60; // 5 minutes in seconds
  
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (!isBreak && onComplete) {
        onComplete();
      }
      // Auto-switch to break or work
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? WORK_TIME : BREAK_TIME);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
  };

  const switchMode = () => {
    setIsActive(false);
    setIsBreak(!isBreak);
    setTimeLeft(!isBreak ? BREAK_TIME : WORK_TIME);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const maxTime = isBreak ? BREAK_TIME : WORK_TIME;
  const progress = (timeLeft / maxTime) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Mode Tabs */}
      <div className="flex gap-2 bg-zinc-800 p-1 rounded-lg border-4 border-zinc-700">
        <button
          onClick={switchMode}
          className={`px-6 py-2 rounded transition-all ${
            !isBreak
              ? 'bg-red-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          POMODORO
        </button>
        <button
          onClick={switchMode}
          className={`px-6 py-2 rounded transition-all ${
            isBreak
              ? 'bg-blue-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          BREAK
        </button>
      </div>

      {/* Circular Timer */}
      <div className="relative flex flex-col items-center gap-6">
        <svg width="280" height="280" className="transform -rotate-90 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
          {/* Background circle */}
          <circle
            cx="140"
            cy="140"
            r="120"
            stroke="#18181b"
            strokeWidth="16"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="140"
            cy="140"
            r="120"
            stroke={isBreak ? '#3b82f6' : '#ef4444'}
            strokeWidth="16"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="butt"
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: isBreak 
                ? 'drop-shadow(0 0 10px #3b82f6)' 
                : 'drop-shadow(0 0 10px #ef4444)'
            }}
          />
        </svg>
        
        {/* Timer display below circle */}
        <div className="text-center">
          <div className="text-7xl font-bold text-white mb-2 tracking-wider pixel-font" style={{
            textShadow: isBreak 
              ? '4px 4px 0px #1e40af, 0 0 20px #3b82f6' 
              : '4px 4px 0px #991b1b, 0 0 20px #ef4444'
          }}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-zinc-400 uppercase tracking-[0.3em] pixel-font">
            {isBreak ? '>>> BREAK TIME <<<' : '>>> FOCUS TIME <<<'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className={`flex items-center gap-2 px-8 py-3 rounded font-medium transition-all border-4 ${
            isBreak
              ? 'bg-blue-500 hover:bg-blue-600 border-blue-700 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]'
              : 'bg-red-500 hover:bg-red-600 border-red-700 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]'
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-5 h-5" />
              PAUSE
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              START
            </>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 border-4 border-zinc-800 text-white rounded transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          <RotateCcw className="w-5 h-5" />
          RESET
        </button>
      </div>
    </div>
  );
}