import React from "react";

export default function Slide({ step, participants = [], experienceTitle = "" }) {
  if (!step) return null;

  // Example: custom content for the first step (Waiting Room)
  if (step.title === "Waiting Room" || step.isWaitingRoom) {
    return (
      <div className="bg-yellow-400 rounded-xl shadow-lg p-10 text-center w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px] flex flex-col justify-center">
        <h1 className="text-3xl font-black leading-tight mb-4">
          Welcome to your <br /> Fireteam Experience
        </h1>
        <p className="text-sm mb-4 text-gray-800">
          When your entire group has arrived, your group leader will advance
          to the next slide to begin the experience!
        </p>
        <hr className="border-t border-black w-1/2 mx-auto my-4" />
        
        {/* Participant Count */}
        <div className="my-4">
          <div className="inline-flex items-center justify-center bg-white rounded-full px-6 py-3 shadow-md">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="font-bold text-lg">
              {participants.length} {participants.length === 1 ? 'Participant' : 'Participants'} Joined
            </span>
          </div>
        </div>

        {experienceTitle && (
          <>
            <p className="text-sm mb-2">We hope you enjoy</p>
            <h2 className="font-bold text-lg">{experienceTitle}</h2>
          </>
        )}
        
        <div className="mt-4">
          <p className="text-sm text-gray-700">Sincerely,</p>
          <p className="text-sm font-medium text-gray-800">
            The WANAC Team
          </p>
        </div>
        
        {/* Waiting animation */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    );
  }

  // Introduction slide content
  if (step.title === "Introduction" || step.isIntroduction) {
    return (
      <div className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-xl shadow-lg p-10 text-center w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px] flex flex-col justify-center text-white">
        <h1 className="text-3xl font-black leading-tight mb-6">
          What is the Fireteam Experience?
        </h1>
        
        <div className="space-y-4 mb-6">
          <p className="text-lg leading-relaxed">
            Fireteam is a collaborative learning environment where you work alongside fellow veterans to complete experiences, share insights, and grow together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-2">🎯 Collaborative Learning</h3>
              <p className="text-sm">Work together with your team to achieve common goals and share knowledge</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-2">💬 Interactive Sessions</h3>
              <p className="text-sm">Participate in group discussions and hands-on activities</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-2">📚 Structured Content</h3>
              <p className="text-sm">Follow a guided agenda with clear objectives and outcomes</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-2">🤝 Peer Support</h3>
              <p className="text-sm">Learn from and support your fellow veterans throughout the journey</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-white/80">
            Ready to begin your collaborative learning experience?
          </p>
        </div>
      </div>
    );
  }

  // Session Processing slide content
  if (step.title === "Session Processing" || step.isProcessing) {
    return (
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg p-10 text-center w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px] flex flex-col justify-center text-white">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
            <svg className="w-10 h-10 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-black leading-tight mb-4">
            Processing Session Data
          </h1>
          <p className="text-lg mb-6 text-white/90">
            {step.subtitle || "Analyzing your session and generating AI insights..."}
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3 text-white/80">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm">Stopping recording...</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/80">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span className="text-sm">Transcribing audio...</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/80">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span className="text-sm">Generating AI summaries...</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/80">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <span className="text-sm">Preparing results...</span>
          </div>
        </div>
        
        <div className="text-sm text-white/70">
          This may take a few moments. Please wait...
        </div>
      </div>
    );
  }

  // AI Summary Report slide content
  if (step.title === "AI Summary Report" || step.isSummary) {
    return (
      <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl shadow-lg p-10 text-center w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px] flex flex-col justify-center text-white">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black leading-tight mb-4">
            AI Summary Report
          </h1>
          <p className="text-lg mb-6 text-white/90">
            {step.subtitle || "Your session analysis is complete!"}
          </p>
        </div>
        
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-center gap-3 text-white/80">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <span className="text-sm">Session transcribed successfully</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/80">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <span className="text-sm">AI insights generated</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/80">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <span className="text-sm">Summary report ready</span>
          </div>
        </div>
        
        <div className="text-sm text-white/70">
          Your detailed AI analysis is now available for review.
        </div>
      </div>
    );
  }

  // Custom content for AI-generated Results step
  if (step.title === "AI-generated Results") {
    return (
      <div className="bg-yellow-400 rounded-xl shadow-lg p-10 text-center w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px]">
        <h1 className="text-3xl font-black leading-tight mb-4">{step.title}</h1>
        <p className="text-md font-medium mb-4">{step.subtitle}</p>
        <p className="text-sm text-gray-700 mb-6">Duration: {step.duration}</p>
        <button
          className="bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
          onClick={() => alert('Detailed AI Report coming soon!')}
        >
          View Detailed AI Report
        </button>
        <div className="mt-6">
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