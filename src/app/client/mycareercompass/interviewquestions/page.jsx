"use client";

import React, { useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const COMMON_QUESTIONS = [
  "Tell me about yourself.",
  "Why do you want to work here?",
  "What are your greatest strengths?",
  "What is your greatest weakness?",
  "Where do you see yourself in five years?",
  "Why are you leaving your current role?",
  "Describe a challenge you overcame.",
  "How do you handle conflict in a team?",
  "What do you know about our company?",
  "Do you have any questions for us?",
];

export default function InterviewQuestionsPage() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2
          className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <FaQuestionCircle className="text-[#002147]" />
          Interview Questions
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Practice common interview questions and add your talking points below.
        </p>
        <div className="space-y-2">
          {COMMON_QUESTIONS.map((q, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 text-sm">{q}</span>
                {expanded === i ? (
                  <FaChevronUp className="text-gray-400 shrink-0" />
                ) : (
                  <FaChevronDown className="text-gray-400 shrink-0" />
                )}
              </button>
              {expanded === i && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Your notes</label>
                  <textarea
                    placeholder="Add your talking points or example answers..."
                    className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg p-3 min-h-[80px] placeholder:text-gray-400 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
                    rows={3}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
