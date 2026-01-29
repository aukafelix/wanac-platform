"use client";

import { FaToggleOn, FaToggleOff } from "react-icons/fa";

/**
 * JournalModeToggle - Switch between "Free Write" and "Guided (365)" modes
 * 
 * Provides a clean toggle UI that respects user autonomy and clarity.
 * No pressure or gamification language.
 */
export default function JournalModeToggle({ mode, setMode }) {
  const isGuided = mode === "guided";

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
      <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
        {isGuided ? "📚" : "✍️"}
        <span className="hidden sm:inline">Mode:</span>
      </span>
      
      <button
        onClick={() => setMode("free")}
        className={`px-3 py-1.5 rounded-lg border-2 transition-all font-semibold text-xs ${
          !isGuided
            ? "bg-[#002147] text-white border-[#002147] shadow-sm"
            : "bg-white text-gray-700 border-gray-300 hover:border-orange-500"
        }`}
      >
        Free Write
      </button>

      <button
        onClick={() => setMode("guided")}
        className={`px-3 py-1.5 rounded-lg border-2 transition-all font-semibold text-xs ${
          isGuided
            ? "bg-[#002147] text-white border-[#002147] shadow-sm"
            : "bg-white text-gray-700 border-gray-300 hover:border-orange-500"
        }`}
      >
        Guided (365)
      </button>

      <div className="ml-auto text-[9px] text-gray-500 hidden sm:inline-block px-2 py-1 bg-gray-50 rounded">
        {isGuided ? "Self-paced prompts" : "Your own words"}
      </div>
    </div>
  );
}
