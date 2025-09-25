"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "../../../../components/dashboardcomponents/sidebar";
import ClientTopbar from "../../../../components/dashboardcomponents/clienttopbar";

export default function AIChatbotPage() {
  const [user, setUser] = useState(null);
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

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-white to-orange-100 font-serif">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-screen max-h-screen transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-2 md:px-8 py-4 md:py-8">
          <div className="w-full max-w-2xl mx-auto h-full flex flex-col">
            <div className="mb-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">AI Chatbot Assistant</h2>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                Get instant guidance and support from your AI assistant. Ask anything about your account, sessions, or how to use the platform!
              </p>
            </div>
            {/* Chat UI */}
            <section className="flex flex-col items-center justify-center w-full flex-1">
              <div className="relative w-full flex flex-col h-full min-h-[400px] max-h-[70vh] md:max-h-[65vh] bg-white/90 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Chat Header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-400/80 to-blue-600/80 text-white shadow-md sticky top-0 z-10">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <span className="font-semibold text-lg tracking-wide">AI Assistant</span>
                  {user && user.name && (
                    <span className="ml-auto flex items-center gap-2 text-base font-medium text-white/80">
                      <span className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">
                        {user.name[0]}
                      </span>
                      {user.name}
                    </span>
                  )}
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-2 py-4 flex flex-col gap-2 bg-gradient-to-b from-white/80 to-blue-50/60">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender === "ai" && (
                        <div className="flex flex-col items-center mr-2">
                          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow text-2xl">🤖</span>
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] px-4 py-2 rounded-2xl text-base shadow-md whitespace-pre-line transition-all duration-300 animate-fade-in ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        {msg.sender === "user" && user && user.name && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
                              {user.name[0]}
                            </span>
                            <span className="text-xs font-semibold text-blue-900">{user.name}</span>
                          </div>
                        )}
                        {msg.text}
                        <div className="text-xs text-gray-400 mt-1 text-right">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="max-w-[75%] px-4 py-2 rounded-2xl bg-gray-100 text-gray-800 shadow-md animate-pulse">
                        AI is typing...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                {/* Input Area */}
                <form
                  className="flex w-full gap-2 px-3 py-3 bg-white/95 border-t border-gray-200 sticky bottom-0 z-10"
                  onSubmit={e => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
                  <textarea
                    className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base bg-white shadow-sm min-h-[44px] max-h-[120px]"
                    placeholder="Type your message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    rows={1}
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    disabled={loading || !input.trim()}
                  >
                    Send
                  </button>
                </form>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// Tailwind animation for fade-in
// Add this to your global CSS if not present:
// @keyframes fade-in { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: none;} }
// .animate-fade-in { animation: fade-in 0.4s ease; }
