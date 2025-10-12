import React, { useState, useEffect } from 'react';
import { FaClock, FaPlay, FaPause } from 'react-icons/fa';

/**
 * Compact timer component for the top navigation bar
 * Designed to match the size of navigation buttons
 */
export default function CompactTimer({ 
  duration, 
  isActive = false, 
  onTimeUp,
  stepTitle = "Current Step"
}) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  // Parse duration string and set initial time
  useEffect(() => {
    if (!duration || duration === "—" || duration === "-") {
      setTimeLeft(0);
      setTotalSeconds(0);
      setIsRunning(false);
      setIsPaused(false);
      return;
    }

    const match = duration.match(/(\d+)/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = minutes * 60;
      setTimeLeft(seconds);
      setTotalSeconds(seconds);
      setIsRunning(false);
      setIsPaused(false);
    }
  }, [duration]);

  // Start timer when step becomes active
  useEffect(() => {
    if (isActive && timeLeft > 0 && !isPaused) {
      setIsRunning(true);
    }
  }, [isActive, timeLeft, isPaused]);

  // Countdown logic
  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft === 0) return 'text-gray-500';
    const percentage = (timeLeft / totalSeconds) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleTogglePause = (e) => {
    e.stopPropagation();
    setIsPaused(!isPaused);
    setIsRunning(!isPaused);
  };

  if (!duration || duration === "—" || duration === "-") {
    return null;
  }

  return (
    <div 
      className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg border border-gray-300"
      role="timer"
      aria-label={`Step timer: ${formatTime(timeLeft)} remaining`}
    >
      <FaClock className="text-gray-600 text-sm" aria-hidden="true" />
      
      <div className="flex flex-col min-w-[80px]">
        <div className={`text-lg font-bold leading-tight ${getTimeColor()}`}>
          {formatTime(timeLeft)}
        </div>
        <div className="text-xs text-gray-500 leading-tight">
          {timeLeft === 0 ? 'Complete' : `of ${duration}`}
        </div>
      </div>

      <button
        onClick={handleTogglePause}
        className="p-1.5 rounded-full hover:bg-gray-200 transition"
        title={isPaused ? 'Resume timer' : 'Pause timer'}
        aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
      >
        {isPaused || !isRunning ? (
          <FaPlay className="text-green-600 w-3 h-3" aria-hidden="true" />
        ) : (
          <FaPause className="text-yellow-600 w-3 h-3" aria-hidden="true" />
        )}
      </button>

      {/* Minimal progress indicator */}
      <div className="w-1 h-8 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`w-full transition-all duration-1000 ${
            timeLeft === 0 
              ? 'bg-gray-400' 
              : (timeLeft / totalSeconds) * 100 > 75 
              ? 'bg-red-500' 
              : (timeLeft / totalSeconds) * 100 > 50
              ? 'bg-yellow-500'
              : 'bg-green-500'
          }`}
          style={{ height: `${((totalSeconds - timeLeft) / totalSeconds) * 100}%` }}
          role="progressbar"
          aria-valuenow={totalSeconds - timeLeft}
          aria-valuemin="0"
          aria-valuemax={totalSeconds}
        />
      </div>
    </div>
  );
}

