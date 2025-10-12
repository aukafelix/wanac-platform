import React from 'react';
import { FaChalkboard, FaVideo, FaClock, FaRobot, FaSpinner } from 'react-icons/fa';

/**
 * Minimal control bar with only WANAC-specific features
 * (Jitsi handles mic, camera, etc.)
 */
export default function WanacControlBar({
  showSlide,
  onToggleView,
  isRecording,
  onProcessRecording,
  recordingBlob,
  processingRecording,
  currentStepTitle,
  timeLeft,
}) {
  return (
    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-4 border-2 border-yellow-400">
        
        {/* Toggle Slide/Video View */}
        <button
          onClick={onToggleView}
          className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
            showSlide
              ? 'bg-yellow-400 text-black hover:bg-yellow-500'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title="Toggle between slides and video"
        >
          {showSlide ? (
            <>
              <FaVideo className="text-lg" />
              <span>Show Video</span>
            </>
          ) : (
            <>
              <FaChalkboard className="text-lg" />
              <span>Show Slides</span>
            </>
          )}
        </button>

        {/* Divider */}
        {(timeLeft > 0 || recordingBlob) && <div className="w-px h-8 bg-gray-300"></div>}

        {/* Timer Display */}
        {timeLeft > 0 && (
          <div className="flex items-center gap-2 px-3">
            <FaClock className="text-yellow-600" />
            <div>
              <div className="text-xs text-gray-500">Current Step</div>
              <div className="text-sm font-bold">{currentStepTitle}</div>
              <div className="text-xs text-gray-600">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} remaining
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        {recordingBlob && !processingRecording && <div className="w-px h-8 bg-gray-300"></div>}

        {/* Process Recording with AI */}
        {recordingBlob && !processingRecording && (
          <button
            onClick={onProcessRecording}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:from-purple-600 hover:to-purple-800 transition-all flex items-center gap-2 shadow-lg"
            title="Generate AI summary"
          >
            <FaRobot className="text-lg" />
            <span>Generate AI Summary</span>
          </button>
        )}

        {/* Processing Indicator */}
        {processingRecording && (
          <div className="flex items-center gap-2 px-4 py-2 text-purple-600">
            <FaSpinner className="text-lg animate-spin" />
            <span className="text-sm font-medium">Processing...</span>
          </div>
        )}

      </div>
    </div>
  );
}

