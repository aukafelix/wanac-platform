"use client";

import { useState } from 'react';
import { FaRobot, FaPaperPlane, FaRegLightbulb, FaRegQuestionCircle, FaHistory, FaEllipsisH, FaRegBookmark, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

export default function AIChatbotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: "Hello! I'm your WANAC AI Assistant. I'm here to help with your transition journey, answer questions about veteran resources, or assist with career planning. How can I help you today?"
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Sample suggested questions
  const suggestedQuestions = [
    "What VA benefits am I eligible for?",
    "How do I translate my military skills to a civilian resume?",
    "What career paths match my military experience?",
    "How can I prepare for a job interview?",
    "What mental health resources are available for veterans?"
  ];

  // Sample conversation history
  const conversationHistory = [
    { id: 1, title: "Career Transition Questions", date: "Nov 10, 2023" },
    { id: 2, title: "VA Benefits Information", date: "Nov 5, 2023" },
    { id: 3, title: "Resume Help", date: "Oct 28, 2023" }
  ];

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'system',
        content: getAIResponse(inputValue)
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Simple function to generate AI responses based on keywords
  // In a real app, this would be replaced with actual AI service calls
  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('resume') || message.includes('cv')) {
      return "Creating a strong civilian resume is crucial. Here are some tips:\n\n1. Translate military jargon into civilian terms\n2. Focus on transferable skills like leadership and problem-solving\n3. Quantify your achievements when possible\n4. Consider a skills-based format rather than chronological\n\nWould you like me to help you translate specific military experiences into civilian terms?";
    }
    
    if (message.includes('interview') || message.includes('interviewing')) {
      return "Preparing for civilian job interviews is important. Here are some strategies:\n\n1. Research the company thoroughly\n2. Practice the STAR method for behavioral questions\n3. Prepare examples that showcase your leadership and adaptability\n4. Have questions ready to ask the interviewer\n\nWould you like to practice with some common interview questions?";
    }
    
    if (message.includes('benefits') || message.includes('va')) {
      return "The VA offers numerous benefits for veterans, including:\n\n• Healthcare services\n• Education and training (GI Bill)\n• Home loans\n• Life insurance\n• Disability compensation\n• Pension programs\n• Career counseling\n\nTo determine your specific eligibility, I recommend visiting va.gov or scheduling an appointment with a VA representative. Would you like information about a specific benefit?";
    }
    
    if (message.includes('mental health') || message.includes('ptsd') || message.includes('depression')) {
      return "Mental health support is available through multiple channels:\n\n• VA Mental Health Services\n• Veterans Crisis Line: 1-800-273-8255 (Press 1)\n• Vet Centers for community-based counseling\n• Make the Connection online resource\n• WANAC coaching sessions focused on mental wellness\n\nRemember, seeking help is a sign of strength. Would you like me to provide more specific resources?";
    }
    
    // Default response
    return "Thank you for your message. I'm here to help with your transition journey. Could you provide more details about what specific information or assistance you're looking for regarding veteran resources, career planning, or other aspects of your transition?";
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#002147] flex items-center justify-center text-white mr-3">
              <FaRobot />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-[#002147]">WANAC AI Assistant</h1>
              <p className="text-sm text-gray-500">Powered by advanced AI to support your transition</p>
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-[#002147] text-white' 
                    : 'bg-white border border-gray-200'
                }`}>
                  {message.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className={`${index > 0 ? 'mt-4' : ''}`}>
                      {paragraph.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < paragraph.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))}
                  
                  {message.type === 'system' && (
                    <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaRegThumbsUp />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaRegThumbsDown />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaRegBookmark />
                        </button>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FaEllipsisH />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                className={`px-4 py-2 rounded-r-lg ${
                  inputValue.trim() === '' 
                    ? 'bg-gray-300 text-gray-500' 
                    : 'bg-[#002147] text-white hover:bg-blue-800'
                }`}
              >
                <FaPaperPlane />
              </button>
            </div>
            
            <div className="mt-3">
              <p className="text-xs text-gray-500">
                WANAC AI provides general information. For personalized advice, please consult with a WANAC coach or VA representative.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="hidden lg:block w-80 border-l border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-[#002147] flex items-center">
            <FaRegLightbulb className="mr-2" /> Suggested Questions
          </h2>
        </div>
        
        <div className="p-4">
          <ul className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <li key={index}>
                <button
                  className="w-full text-left p-2 rounded hover:bg-gray-100 text-gray-700 text-sm"
                  onClick={() => {
                    setInputValue(question);
                  }}
                >
                  <FaRegQuestionCircle className="inline mr-2 text-gray-400" />
                  {question}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t border-b border-gray-200">
          <h2 className="font-semibold text-[#002147] flex items-center">
            <FaHistory className="mr-2" /> Recent Conversations
          </h2>
        </div>
        
        <div className="p-4">
          <ul className="space-y-2">
            {conversationHistory.map((conversation) => (
              <li key={conversation.id} className="border-b border-gray-100 pb-2 last:border-0">
                <button className="w-full text-left p-2 rounded hover:bg-gray-100">
                  <div className="font-medium text-sm text-gray-700">{conversation.title}</div>
                  <div className="text-xs text-gray-500">{conversation.date}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 mt-4">
          <button className="w-full bg-gray-100 text-[#002147] px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
            Start New Conversation
          </button>
          
          <button className="w-full mt-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Export Conversation
          </button>
        </div>
      </div>
    </div>
  );
}