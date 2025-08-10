import React from "react";

export default function Slide({ step }) {
  if (!step) return null;

  // Example: custom content for the first step (Waiting Room)
  if (step.title === "Waiting Room") {
    return (
      <div className="bg-yellow-400 rounded-xl shadow-lg p-10 text-center w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px]">
        <h1 className="text-3xl font-black leading-tight mb-4">
          Welcome to your <br /> Fireteam Experience.
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
          The WANAC Team
        </p>
        <div className="mt-4">
          {/* Replace with your logo or icon */}
          <span className="inline-block text-3xl"></span>
        </div>
      </div>
    );
  }

  // Placeholder for other steps
  return (
    <div className="bg-yellow-400 rounded-xl shadow-lg p-10 text-center w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px]">
      <h1 className="text-3xl font-black leading-tight mb-4">{step.title}</h1>
      <p className="text-md font-medium mb-4">{step.subtitle}</p>
      <p className="text-sm text-gray-700">Duration: {step.duration}</p>
      <div className="mt-4">
        <span className="inline-block text-3xl">🎓</span>
      </div>
    </div>
  );
}