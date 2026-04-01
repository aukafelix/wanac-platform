import React, { useState, useEffect } from "react";

export default function Slide({ step, participants = [], experienceTitle = "" }) {
  if (!step) return null;

  // Video slide - plays embedded HTML5 or iframe video
  if (step.slideType === "video" || step.breakout?.slideType === "video") {
    const videoData = step.breakout || step.slideData || {};
    const videoURL = videoData.videoURL || videoData.url || "";
    const title = step.title || videoData.title || "Video";
    const duration = videoData.duration || videoData.durationSeconds || "0:00";
    const isYouTube = videoURL?.includes("youtube.com") || videoURL?.includes("youtu.be");
    const isVimeo = videoURL?.includes("vimeo.com");

    return (
      <div className="w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-lg p-6 overflow-hidden">
        <h2 className="text-white text-xl font-bold mb-4">{title}</h2>
        <div className="w-full flex-1 bg-black rounded-lg overflow-hidden flex items-center justify-center">
          {isYouTube ? (
            <iframe
              src={videoURL.includes("?") ? videoURL + "&autoplay=1" : videoURL + "?autoplay=1"}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : isVimeo ? (
            <iframe
              src={videoURL.includes("?") ? videoURL + "&autoplay=1" : videoURL + "?autoplay=1"}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : videoURL ? (
            <video
              src={videoURL}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No video URL provided</p>
            </div>
          )}
        </div>
        <div className="text-gray-400 text-sm mt-4">
          Duration: {duration}
        </div>
      </div>
    );
  }

  // Discussion slide - shows discussion prompt with timer and animated border
  if (step.slideType === "discussion" || step.breakout?.slideType === "discussion") {
    const discussionData = step.breakout || step.slideData || {};
    const prompt = step.title || discussionData.prompt || "Discussion Prompt";
    const backgroundImage = discussionData.backgroundImage || discussionData.imageURL || "";
    const timeLimit = discussionData.timeLimit || discussionData.durationSeconds || 300;
    const [timeRemaining, setTimeRemaining] = useState(timeLimit);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
      <div
        className="w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px] flex items-center justify-center rounded-2xl shadow-lg overflow-hidden relative"
        style={{
          backgroundImage: backgroundImage ? \`url(\${backgroundImage})\` : "linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 text-center px-8">
          <div className="inline-block border-2 border-blue-500 rounded-full p-8 mb-6 animate-pulse shadow-lg">
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6">
              {prompt}
            </h2>
          </div>
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
            <p className="text-white text-sm mb-2">Time Remaining</p>
            <p className="text-white text-4xl font-bold font-mono">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Quiz slide - multiple choice quiz during session
  if (step.slideType === "quiz" || step.breakout?.slideType === "quiz") {
    const quizData = step.breakout || step.slideData || {};
    const question = step.title || quizData.question || "Quiz Question";
    const options = quizData.options || quizData.answers || [];
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit || quizData.durationSeconds || 30);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    const handleSubmit = () => {
      setSubmitted(true);
    };

    return (
      <div className="w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-lg p-8 overflow-hidden">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl md:text-3xl font-bold">{question}</h2>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
              {Math.max(0, timeRemaining)}s
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = submitted && option.isCorrect;
              const isWrong = submitted && isSelected && !option.isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => !submitted && setSelectedAnswer(index)}
                  disabled={submitted}
                  className={`w-full p-4 rounded-lg text-left font-medium transition-all text-lg border-2 \${
                    isCorrect
                      ? "bg-green-600 border-green-500 text-white"
                      : isWrong
                      ? "bg-red-600 border-red-500 text-white"
                      : isSelected
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-200 hover:border-blue-500"
                  }\`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.text || option}</span>
                    {isCorrect && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {isWrong && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          )}

          {submitted && (
            <div className="bg-green-600/20 border border-green-600 text-green-200 p-4 rounded-lg text-center">
              <p className="font-bold">Answer submitted!</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Exhibit slide - shows supplementary material (PDF or image) with description
  if (step.slideType === "exhibit" || step.breakout?.slideType === "exhibit") {
    const exhibitData = step.breakout || step.slideData || {};
    const title = step.title || exhibitData.title || "Exhibit";
    const description = exhibitData.description || exhibitData.caption || "";
    const mediaURL = exhibitData.mediaURL || exhibitData.url || exhibitData.imageURL || "";
    const isPDF = mediaURL?.toLowerCase().endsWith(".pdf");

    return (
      <div className="w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px] flex gap-6 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-lg p-6 overflow-hidden">
        <div className="flex-1 bg-black rounded-lg overflow-hidden flex items-center justify-center">
          {isPDF ? (
            <embed
              src={mediaURL}
              type="application/pdf"
              width="100%"
              height="100%"
              className="w-full h-full"
            />
          ) : mediaURL ? (
            <img
              src={mediaURL}
              alt={title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No media URL provided</p>
            </div>
          )}
        </div>

        <div className="w-80 flex flex-col justify-center text-white">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    );
  }

  // Breakout deck slide rendering (image-first, as in Breakout UI)
  if (step.breakout?.slideImageURL) {
    const firstCaption = step.breakout.captions?.[0]?.caption;
    return (
      <div className="w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px] flex items-center justify-center">
        {/* Deck slides render as a clean white Breakout-style card. */}
        <div className="w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center relative border border-breakout-border">
          <div className="w-full h-full flex items-center justify-center p-6">
            <img
              src={step.breakout.slideImageURL}
              alt={step.breakout.slideImageAltText || step.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {firstCaption && (
            <div className="absolute left-6 right-6 bottom-5 bg-black/80 text-white px-4 py-3 rounded-lg text-sm leading-snug">
              {firstCaption}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Example: custom content for the first step (Waiting Room)
  if (step.title === "Waiting Room" || step.isWaitingRoom) {
    return (
      <div className="bg-breakout-accent rounded-xl shadow-lg p-10 text-center w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px] flex flex-col justify-center">
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
      <div className="bg-breakout-accent rounded-xl shadow-lg p-10 text-center w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px]">
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
    <div className="bg-breakout-accent rounded-xl shadow-lg p-10 text-center w-full mx-auto h-[420px] md:h-[520px] lg:h-[620px]">
      <h1 className="text-3xl font-black leading-tight mb-4">{step.title}</h1>
      <p className="text-md font-medium mb-4">{step.subtitle}</p>
      <p className="text-sm text-gray-700">Duration: {step.duration}</p>
      <div className="mt-4">
        <span className="inline-block text-3xl">🎓</span>
      </div>
    </div>
  );
}
