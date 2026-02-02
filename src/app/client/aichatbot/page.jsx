"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "../../../../components/dashboardcomponents/sidebar";
import ClientTopbar from "../../../../components/dashboardcomponents/clienttopbar";
import { FaRobot, FaPaperPlane, FaLightbulb, FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function AIChatbotPage() {
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [showMobileTips, setShowMobileTips] = useState(false); // Collapsed by default on mobile
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm your AI Assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("wanacUser");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const aiMessage = {
        sender: "ai",
        text: data.reply || data.error || "Sorry, I couldn't get a response.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "There was an error connecting to the AI service.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "How do I book a coaching session?",
    "What are my upcoming sessions?",
    "Tell me about the fireteam feature",
    "How can I track my progress?"
  ];

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
  };

  return (
    <div className="h-screen flex bg-white font-body">
      {/* Sidebar */}
      <Sidebar 
        className="w-56 bg-white border-r border-gray-200" 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
      />
      
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-3 sm:px-4 md:px-6 py-3 bg-gray-50" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="max-w-7xl mx-auto h-full">
            <div className="flex flex-col lg:flex-row gap-3 md:gap-4 h-full">
              {/* Main Content */}
              <div className="flex-1 flex flex-col space-y-2 md:space-y-3 min-h-0">
                {/* Header Section - more compact on mobile */}
                <section className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-xl p-3 sm:p-4 shadow-lg relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src="/veterancommunity.png" 
                      alt="Background" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full shrink-0">
                      <FaRobot className="text-white text-lg sm:text-xl" />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-base sm:text-xl font-bold text-white mb-0.5 sm:mb-1">AI Assistant</h1>
                      <p className="text-white/90 text-xs sm:text-sm">Get instant guidance and support 24/7</p>
                    </div>
                  </div>
                </section>

                {/* Quick Prompts - larger touch targets on mobile */}
                <section className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm shrink-0">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 flex items-center gap-1.5">
                    <FaLightbulb className="text-orange-500 shrink-0" size={14} />
                    Quick prompts to get started:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickPrompt(prompt)}
                        className="text-xs sm:text-sm px-3 py-2.5 sm:px-2.5 sm:py-1.5 min-h-[44px] sm:min-h-0 bg-gray-50 hover:bg-blue-50 active:bg-blue-100 border border-gray-200 hover:border-blue-300 rounded-lg transition-all text-gray-700 hover:text-[#002147] font-medium touch-manipulation"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Chat Container */}
                <section className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col min-h-[200px] sm:min-h-[280px]">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-2.5 bg-gradient-to-r from-[#002147] to-[#003875] text-white border-b border-gray-200 shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <FaRobot className="text-sm" />
                      </div>
                      <span className="font-semibold text-sm sm:text-base truncate">AI Assistant</span>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0"></span>
                    </div>
                    {user && user.name && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
                          {user.name[0]}
                        </span>
                        <span className="text-xs sm:text-sm text-white/90 hidden sm:inline truncate max-w-[80px]">{user.name}</span>
                      </div>
                    )}
                  </div>

                {/* Messages */}
                  <div className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-4 py-3 flex flex-col gap-2 sm:gap-3 bg-gray-50">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-end`}
                    >
                      {msg.sender === "ai" && (
                        <div className="flex flex-col items-center mr-2 shrink-0">
                          <span className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#002147] to-[#003875] flex items-center justify-center shadow-sm">
                            <FaRobot className="text-white text-xs" />
                          </span>
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] px-3 py-2.5 sm:px-3 sm:py-2 rounded-lg text-sm sm:text-xs shadow-sm whitespace-pre-line break-words ${
                          msg.sender === "user"
                            ? "bg-orange-500 text-white rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                        }`}
                      >
                        {msg.text}
                        <div className={`text-[10px] sm:text-[8px] mt-1 ${msg.sender === "user" ? "text-white/70" : "text-gray-400"}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {msg.sender === "user" && user && (
                        <div className="flex flex-col items-center ml-2 shrink-0">
                          <span className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-orange-100 flex items-center justify-center shadow-sm text-orange-600 font-bold text-xs">
                            {user.name ? user.name[0] : "U"}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-gray-800 shadow-sm border border-gray-200">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 sm:w-1.5 sm:h-1.5 bg-[#002147] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 sm:w-1.5 sm:h-1.5 bg-[#002147] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 sm:w-1.5 sm:h-1.5 bg-[#002147] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs sm:text-[10px] text-gray-600">AI is typing...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Area - larger touch targets on mobile, safe area for keyboard */}
                <form
                  className="flex gap-2 px-3 py-3 sm:py-2.5 bg-white border-t border-gray-200 shrink-0"
                  style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
                  onSubmit={e => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
                  <textarea
                    className="flex-1 resize-none rounded-xl sm:rounded-lg border-2 border-gray-300 px-4 py-3 sm:px-3 sm:py-2 focus:outline-none focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 transition text-base sm:text-sm bg-white shadow-sm min-h-[44px] sm:min-h-[36px] max-h-[120px]"
                    placeholder="Type your message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    rows={1}
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold px-4 py-3 sm:px-4 sm:py-2 rounded-xl sm:rounded-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] touch-manipulation"
                    disabled={loading || !input.trim()}
                    aria-label="Send message"
                  >
                    <FaPaperPlane size={18} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline text-sm">Send</span>
                  </button>
                </form>
                </section>
              </div>
              
              {/* Right Sidebar - collapsible on mobile */}
              <aside className="lg:w-64 space-y-3 shrink-0">
                {/* Mobile toggle for tips - only visible on small screens */}
                <button
                  onClick={() => setShowMobileTips(!showMobileTips)}
                  className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 active:bg-gray-100 touch-manipulation min-h-[44px]"
                  aria-expanded={showMobileTips}
                  aria-controls="mobile-tips-panel"
                >
                  <span className="text-sm font-medium text-[#002147] flex items-center gap-2">
                    <FaLightbulb className="text-orange-500" size={16} />
                    Tips & Common Topics
                  </span>
                  {showMobileTips ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
                </button>
                <div id="mobile-tips-panel" className={`space-y-3 ${showMobileTips ? 'block' : 'hidden'} lg:block`}>
                {/* Tips Card */}
                <div className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-xl shadow-sm p-3 text-white">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <FaLightbulb />
                    How to Use
                  </h3>
                  <ul className="space-y-2 text-[10px] text-white/90">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Ask questions about your account and sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Get guidance on using platform features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Request help with tasks and goals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Get instant 24/7 support</span>
                    </li>
                  </ul>
                </div>

                {/* FAQ Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-3">
                  <h3 className="text-sm font-semibold text-[#002147] mb-3 flex items-center gap-1.5">
                    <FaQuestionCircle className="text-orange-500" />
                    Common Topics
                  </h3>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded text-[10px] text-gray-700">
                      <strong>Sessions:</strong> Book, reschedule, or view upcoming sessions
                    </div>
                    <div className="p-2 bg-green-50 rounded text-[10px] text-gray-700">
                      <strong>Fireteam:</strong> Join groups and collaborate
                    </div>
                    <div className="p-2 bg-yellow-50 rounded text-[10px] text-gray-700">
                      <strong>Progress:</strong> Track life scores and journal entries
                    </div>
                    <div className="p-2 bg-orange-50 rounded text-[10px] text-gray-700">
                      <strong>Account:</strong> Update profile and preferences
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-3">
                  <h3 className="text-sm font-semibold text-[#002147] mb-3">Chat Stats</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-[10px] font-medium text-gray-700">Messages</span>
                      <span className="text-sm font-bold text-[#002147]">{messages.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-[10px] font-medium text-gray-700">Status</span>
                      <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        Online
                      </span>
                    </div>
                  </div>
                </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
