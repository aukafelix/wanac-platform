import React from 'react';
import { FaChalkboard, FaVideo, FaCircle, FaStop, FaSignOutAlt, FaRobot, FaSpinner } from 'react-icons/fa';

/**
 * Inline control bar for top navigation
 * (Jitsi handles mic, camera, etc.)
 */
export default function WanacControlBar({
  showSlide,
  onToggleView,
  isRecording,
  onToggleRecording,
  onLeaveMeeting,
  recordingBlob,
  processingRecording,
  onProcessRecording,
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Toggle Slide/Video View */}
      <button
        onClick={onToggleView}
        className={`px-3 py-2 text-sm font-medium transition-all flex items-center gap-1.5 rounded-lg ${
          showSlide
            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        title="Toggle between slides and video"
      >
        {showSlide ? (
          <>
            <FaVideo className="text-sm" />
            <span>Show Video</span>
          </>
        ) : (
          <>
            <FaChalkboard className="text-sm" />
            <span>Show Slides</span>
          </>
        )}
      </button>

      {/* Record Button */}
      <button
        onClick={onToggleRecording}
        className={`px-3 py-2 text-sm font-medium transition-all flex items-center gap-1.5 rounded-lg ${
          isRecording
            ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        title={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isRecording ? (
          <>
            <FaStop className="text-sm" />
            <span>Stop</span>
          </>
        ) : (
          <>
            <FaCircle className="text-sm text-red-500" />
            <span>Record</span>
          </>
        )}
      </button>

      {/* Generate AI Summary Button */}
      {recordingBlob && !processingRecording && (
        <button
          onClick={onProcessRecording}
          className="px-3 py-2 text-sm font-medium transition-all flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 rounded-lg shadow-md"
          title="Generate AI summary"
        >
          <FaRobot className="text-sm" />
          <span>AI Summary</span>
        </button>
      )}

      {/* Processing Indicator */}
      {processingRecording && (
        <div className="flex items-center gap-1.5 px-3 py-2 text-purple-600 bg-purple-50 rounded-lg">
          <FaSpinner className="text-sm animate-spin" />
          <span className="text-xs font-medium">Processing...</span>
        </div>
      )}

      {/* End Meeting Button */}
      <button
        onClick={onLeaveMeeting}
        className="px-3 py-2 text-sm font-medium transition-all flex items-center gap-1.5 bg-red-600 text-white hover:bg-red-700 rounded-lg"
        title="End meeting and leave"
      >
        <FaSignOutAlt className="text-sm" />
        <span>End</span>
      </button>
    </div>
  );
}

