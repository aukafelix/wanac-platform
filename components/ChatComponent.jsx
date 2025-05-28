"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function ChatComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);
  
  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setMessages([...messages, { text: inputValue, sender: "user" }]);
    setInputValue('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! Our team will get back to you soon.", 
        sender: "bot" 
      }]);
    }, 1000);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={toggleChat}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-[#002147] text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">Chat with us</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={18} />
            </button>
          </div>
          
          <div ref={chatContainerRef} className="flex-1 p-3 overflow-y-auto max-h-80 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user" 
                    ? "bg-orange-500 text-white rounded-tr-none" 
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <button 
              type="submit"
              className="bg-orange-500 text-white px-4 rounded-r-lg hover:bg-orange-600 flex items-center justify-center"
              disabled={!inputValue.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}