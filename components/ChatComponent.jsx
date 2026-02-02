"use client";

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send } from 'lucide-react';

const AI_AVATAR = (
  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full mr-2">
    🤖
  </span>
);
const USER_AVATAR = (
  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-400 text-white rounded-full ml-2">
    🧑
  </span>
);

function LoadingDots() {
  return (
    <span className="inline-block w-6 text-gray-400">
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-75">.</span>
      <span className="animate-bounce delay-150">.</span>
    </span>
  );
}

export default function ChatComponent({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const toggleChat = () => setIsOpen(!isOpen);

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wanacChatHistory");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem("wanacChatHistory", JSON.stringify(messages));
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/chat",
        {
          message: input,
          userId: user?.id,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: data.reply || "No response." },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: "Error: " + (err?.response?.data?.error || err.message) },
      ]);
    }
    setInput("");
    setLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button 
        onClick={toggleChat}
        className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white rounded-full p-3 sm:p-3 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:absolute sm:bottom-16 sm:right-0 sm:w-96 sm:max-h-[85vh] sm:rounded-lg sm:shadow-xl flex flex-col overflow-hidden border-0 sm:border border-gray-200 bg-white z-40">
          <div className="bg-[#002147] text-white p-4 sm:p-3 flex justify-between items-center shrink-0">
            <h3 className="font-semibold text-lg sm:text-base">Chat with us</h3>
            <button 
              onClick={toggleChat} 
              className="text-white hover:text-gray-200 p-2 -m-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation rounded-lg active:bg-white/10"
              aria-label="Close chat"
            >
              <X size={22} />
            </button>
          </div>
          
          <div ref={chatContainerRef} className="flex-1 p-4 sm:p-3 overflow-y-auto min-h-0 max-h-[calc(100vh-180px)] sm:max-h-80 space-y-3 overscroll-contain">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && AI_AVATAR}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 sm:py-2 rounded-2xl shadow-sm text-base sm:text-sm break-words ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && USER_AVATAR}
              </div>
            ))}
            {loading && (
              <div className="flex items-end justify-start">
                {AI_AVATAR}
                <div className="bg-gray-100 text-gray-400 px-4 py-3 sm:py-2 rounded-2xl shadow-sm text-base sm:text-sm">
                  <LoadingDots />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="border-t border-gray-200 p-3 sm:p-3 flex gap-2 shrink-0 pb-[env(safe-area-inset-bottom,0px)]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 border-2 border-gray-300 rounded-xl sm:rounded-l-lg px-4 py-3 sm:px-3 sm:py-2 text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              disabled={loading}
            />
            <button 
              type="submit"
              className="bg-orange-500 text-white px-5 sm:px-4 rounded-xl sm:rounded-r-lg hover:bg-orange-600 active:bg-orange-700 flex items-center justify-center min-w-[48px] min-h-[44px] touch-manipulation"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}