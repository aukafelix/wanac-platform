"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaLightbulb } from "react-icons/fa";

/**
 * JournalingTipsPanel - Collapsible tips panel with rotating, veteran-safe guidance
 * 
 * Shows one random or daily-rotated tip to encourage positive journaling habits.
 * Tone is supportive and non-clinical.
 */
const journalingTips = [
  "There's no 'right' way to journal. Write what feels true for you.",
  "Even a few sentences count. Quality over quantity.",
  "Your journal is private. Be honest.",
  "Journaling can help you process thoughts without judgment.",
  "Notice small wins. They matter more than you might think.",
  "It's okay to repeat yourself. Patterns emerge over time.",
  "Use your own voice. This isn't for anyone else.",
  "Stuck? Try: 'Today I felt...' or 'I'm thinking about...'",
  "Your past is part of your story, not your identity.",
  "Take your time. There's no deadline.",
];

export default function JournalingTipsPanel() {
  const [isOpen, setIsOpen] = useState(true);

  // Get a consistent daily tip based on the date
  const getTodaysTip = () => {
    const today = new Date().toDateString();
    const hash = today.split("").reduce((h, c) => h + c.charCodeAt(0), 0);
    return journalingTips[hash % journalingTips.length];
  };

  const todaysTip = getTodaysTip();

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between hover:bg-amber-100/50 rounded px-2 py-1 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FaLightbulb className="text-amber-600" size={12} />
          <span className="text-xs font-semibold text-amber-900">Journaling Tip</span>
        </div>
        {isOpen ? (
          <FaChevronUp className="text-amber-600" size={10} />
        ) : (
          <FaChevronDown className="text-amber-600" size={10} />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 pl-5 pr-2 py-2 border-l-3 border-amber-300">
          <p className="text-xs text-amber-900 leading-relaxed italic">{todaysTip}</p>
        </div>
      )}
    </div>
  );
}
