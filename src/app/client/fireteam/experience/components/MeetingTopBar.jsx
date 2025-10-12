import React from 'react';
import CompactTimer from './CompactTimer';

/**
 * Top navigation bar with title and slide navigation
 */
export default function MeetingTopBar({
  isAdmin,
  experienceTitle,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  duration,
  onTimerComplete,
}) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <div>
        <h2 className="text-lg font-semibold">
          Fireteam Learning Experience
          {isAdmin && (
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
              Admin View
            </span>
          )}
        </h2>
        <p className="text-sm text-gray-500">{experienceTitle || 'Loading...'}</p>
      </div>
      <div className="flex items-center gap-3">
        <CompactTimer
          duration={duration}
          isActive={true}
          onTimeUp={onTimerComplete}
          stepTitle={`Step ${currentStep + 1} of ${totalSteps}`}
        />
        <button
          className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
          onClick={onPrevious}
          disabled={currentStep === 0}
          aria-label="Go to previous slide"
        >
          ← Previous
        </button>
        <button
          className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          aria-label="Go to next slide"
        >
          Next Slide →
        </button>
      </div>
    </div>
  );
}

