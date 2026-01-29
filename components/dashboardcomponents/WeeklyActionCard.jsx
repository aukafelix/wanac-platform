"use client";

import { useState } from "react";
import { FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

/**
 * WeeklyActionCard - Optional weekly reflection prompt
 * 
 * Shows once per week with a checkbox and optional reflection textarea.
 * No pressure—completion is voluntary and reflection is optional.
 */
export default function WeeklyActionCard({ weeklyAction, onComplete, isCompleted }) {
  const [isExpanded, setIsExpanded] = useState(!isCompleted);
  const [reflection, setReflection] = useState("");

  const handleComplete = () => {
    onComplete(reflection);
    setIsExpanded(false);
  };

  if (!weeklyAction) return null;

  return (
    <div className={`border-2 rounded-xl p-3 shadow-sm mb-4 transition-all ${
      isCompleted
        ? "bg-green-50 border-green-300"
        : "bg-white border-orange-300"
    }`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between hover:bg-black/5 rounded px-2 py-1 transition-colors"
      >
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <FaCheckCircle className="text-green-600" size={14} />
          ) : (
            <div className="w-3.5 h-3.5 border-2 border-orange-500 rounded-full" />
          )}
          <span className={`text-xs font-semibold ${isCompleted ? "text-green-700" : "text-orange-700"}`}>
            Weekly Action
          </span>
          {isCompleted && <span className="text-[9px] text-green-600">✓ Completed</span>}
        </div>
        {isExpanded ? (
          <FaChevronUp className="text-gray-600" size={10} />
        ) : (
          <FaChevronDown className="text-gray-600" size={10} />
        )}
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2">
          <p className="text-xs text-gray-700 leading-relaxed">{weeklyAction.prompt}</p>
          {!isCompleted && (
            <>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Optional: Share your reflection..."
                className="w-full p-2 text-xs border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none resize-none min-h-[60px]"
              />
              <button
                onClick={handleComplete}
                className="w-full px-3 py-1.5 text-xs font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all shadow-sm"
              >
                Mark Complete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
