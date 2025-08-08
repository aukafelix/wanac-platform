"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";

export default function ExperienceModule({ onClose }) {
  // Hard-coded agenda items — pull these from props or context if you like
  const agenda = [
    ["Waiting Room", "1 min"],
    ["Learning Objectives", "2 mins"],
    ["Intro Video", "2 mins"],
    ["Grading", "1 min"],
    ["Agenda", "1 min"],
    ["Discussion segment 1, part 1", "5 mins"],
    ["Discussion segment 1, part 2", "5 mins"],
    ["Discussion segment 1, part 3", "5 mins"],
    ["Discussion segment 2, part 1", "5 mins"],
    ["Discussion segment 2, part 2", "5 mins"],
    ["Discussion segment 3, part 1", "5 mins"],
    ["Discussion segment 3, part 2", "5 mins"],
    ["Professor Feedback Video", "1 min"],
    ["Professor Feedback Discussion", "5 mins"],
    ["Session Processing", "3 mins"],
    ["AI-generated Results", "—"],
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-sm font-semibold">◇ Welcome</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 p-2 rounded"
        >
          <FaTimes size={14} />
        </button>
        <button className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800">
          Next Slide →
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Slide Area */}
        <div className="flex-1 flex justify-center items-center p-8">
          <div className="bg-yellow-400 rounded-xl shadow-lg p-10 text-center max-w-2xl">
            <h1 className="text-3xl font-black leading-tight mb-4">
              Welcome to your <br /> Breakout Room.
            </h1>
            <p className="text-sm mb-4 text-gray-800">
              When your entire group has arrived, your group leader will advance
              to the next slide to begin the experience!
            </p>
            <hr className="border-t border-black w-1/2 mx-auto my-4" />
            <p className="text-sm mb-2">We hope you enjoy</p>
            <h2 className="font-bold text-lg">Customer Discovery</h2>
            <p className="text-md font-medium mb-4">
              Practical Market Research for Startups
            </p>
            <p className="text-sm text-gray-700">Sincerely,</p>
            <p className="text-sm font-medium text-gray-800">
              The Breakout Learning Team
            </p>
            <div className="mt-4">
              {/* Replace with your logo or icon */}
              <span className="inline-block text-3xl">🎓</span>
            </div>
          </div>
        </div>

        {/* Agenda Sidebar */}
        <aside className="w-80 border-l p-6 overflow-y-auto">
          <div className="flex justify-between mb-4">
            <button className="text-sm font-semibold text-gray-600">
              Exhibits
            </button>
            <button className="text-sm font-semibold border-b-2 border-black">
              Agenda
            </button>
          </div>

          {/* Module Title */}
          <div className="mb-4">
            <h3 className="font-semibold">Customer Discovery</h3>
            <p className="text-xs text-gray-500">
              In this module, students will discuss the essential practices of
              customer discovery and validation for…
            </p>
          </div>

          <ul className="space-y-2 text-sm text-gray-800">
            {agenda.map(([label, time], i) => (
              <li key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span>{label}</span>
                </div>
                <span className="text-xs text-gray-500">{time}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Footer */}
      <footer className="p-4 border-t text-xs text-gray-500 flex justify-end">
        Time Left in Session:
        <span className="ml-2 text-black font-medium">49 mins</span>
      </footer>
    </div>
  );
}
