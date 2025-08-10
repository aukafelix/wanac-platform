"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import AgendaSidebar from "../components/AgendaSidebar";
import Slide from "../components/SlideComponent";
import MeetControlBar from "../components/MeetControlBar";
import PeersGrid from "../components/PeersGrid";
import Sidebar from "../../../../../../components/dashboardcomponents/sidebar.jsx";

export default function ExperienceModule() {
  // Hard-coded agenda items — pull these from props or context if you like
  const agenda = [
    { title: "Waiting Room", subtitle: "Welcome to your Breakout Room.", duration: "1 min" },
    { title: "Learning Objectives", subtitle: "Learning Objectives", duration: "2 mins" },
    { title: "Intro Video", subtitle: "Intro Video", duration: "2 mins" },
    { title: "Grading", subtitle: "Grading", duration: "1 min" },
    { title: "Agenda", subtitle: "Agenda", duration: "1 min" },
    { title: "Discussion segment 1, part 1", subtitle: "Discussion segment 1, part 1", duration: "5 mins" },
    { title: "Discussion segment 1, part 2", subtitle: "Discussion segment 1, part 2", duration: "5 mins" },
    { title: "Discussion segment 1, part 3", subtitle: "Discussion segment 1, part 3", duration: "5 mins" },
    { title: "Discussion segment 2, part 1", subtitle: "Discussion segment 2, part 1", duration: "5 mins" },
    { title: "Discussion segment 2, part 2", subtitle: "Discussion segment 2, part 2", duration: "5 mins" },
    { title: "Discussion segment 3, part 1", subtitle: "Discussion segment 3, part 1", duration: "5 mins" },
    { title: "Discussion segment 3, part 2", subtitle: "Discussion segment 3, part 2", duration: "5 mins" },
    { title: "Professor Feedback Video", subtitle: "Professor Feedback Video", duration: "1 min" },
    { title: "Professor Feedback Discussion", subtitle: "Professor Feedback Discussion", duration: "5 mins" },
    { title: "Session Processing", subtitle: "Session Processing", duration: "3 mins" },
    { title: "AI-generated Results", subtitle: "AI-generated Results", duration: "—" },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [showSlide, setShowSlide] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const handleNext = () => {
    if (currentStep < agenda.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-sm font-semibold">Fire Team Learning</h2>
          <button className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800" onClick={handleNext}>
            Next Slide →
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          {/* Middle slide area (main content) */}
          <section className="flex-1 flex flex-col justify-center items-center p-12">
            {showSlide ? (
              <Slide step={agenda[currentStep]} />
            ) : (
              <PeersGrid peers={["Alice", "Bob", "Charlie", "Dana"]} />
            )}
            <MeetControlBar
              onLeave={() => alert('Leaving the call...')}
              isManager={true}
              onToggleLayout={() => setShowSlide((v) => !v)}
            />
          </section>
          <section>
            {/* Reserved for future use */}
          </section>
          {/* Agenda Sidebar */}
          <AgendaSidebar
            agenda={agenda.map(({ title, duration }) => [title, duration])}
            moduleTitle="Customer Discovery"
            moduleDescription="In this module, students will discuss the essential practices of customer discovery and validation for…"
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>
        {/* Footer */}
        <footer className="p-4 border-t text-xs text-gray-500 flex justify-end">
          Time Left in Session:
          <span className="ml-2 text-black font-medium">49 mins</span>
        </footer>
      </div>
    </div>
  );
}
