import React from 'react';
import { FaChalkboard, FaVideo, FaSignOutAlt } from 'react-icons/fa';

/**
 * Inline control bar for top navigation
 * (Jitsi handles mic, camera, etc.)
 */
export default function WanacControlBar({
  showSlide,
  onToggleView,
  onLeaveMeeting,
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

