"use client";

import { FaSkull, FaArrowRight } from "react-icons/fa";

/**
 * GuidedPromptCard - Display a single guided journal prompt
 * 
 * Shows prompt number, category, and text in a highlighted card.
 * Emphasizes self-paced, non-judgmental approach.
 */
export default function GuidedPromptCard({ prompt, onSkip, onSaveForLater }) {
  if (!prompt) return null;

  const categoryColors = {
    Identity: "bg-blue-100 text-blue-900 border-blue-300",
    Transition: "bg-purple-100 text-purple-900 border-purple-300",
    Purpose: "bg-green-100 text-green-900 border-green-300",
    Resilience: "bg-red-100 text-red-900 border-red-300",
    Connection: "bg-pink-100 text-pink-900 border-pink-300",
    Growth: "bg-yellow-100 text-yellow-900 border-yellow-300",
    Reflection: "bg-indigo-100 text-indigo-900 border-indigo-300",
    Gratitude: "bg-orange-100 text-orange-900 border-orange-300",
  };

  const categoryStyle = categoryColors[prompt.category] || categoryColors.Reflection;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-4 shadow-md mb-4">
      {/* Header: Prompt number and category */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-blue-900 bg-blue-200 px-2.5 py-1 rounded-full">
            Prompt #{prompt.number}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryStyle}`}>
            {prompt.category}
          </span>
        </div>
      </div>

      {/* Prompt text */}
      <p className="text-sm text-blue-950 leading-relaxed mb-3 font-medium">
        {prompt.text}
      </p>

      {/* Supportive copy */}
      <div className="bg-white/70 border border-blue-200 rounded-lg p-2 text-[10px] text-blue-800 italic mb-3">
        ✓ You can start anywhere. This is self-paced. No right or wrong.
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-2 border-t border-blue-200">
        <button
          onClick={onSkip}
          className="flex-1 px-2 py-1.5 text-[11px] rounded-lg border-2 border-blue-300 text-blue-700 hover:bg-blue-100 transition-all font-medium"
        >
          Skip
        </button>
        <button
          onClick={onSaveForLater}
          className="flex-1 px-2 py-1.5 text-[11px] rounded-lg border-2 border-blue-300 text-blue-700 hover:bg-blue-100 transition-all font-medium"
        >
          Save for Later
        </button>
      </div>
    </div>
  );
}
