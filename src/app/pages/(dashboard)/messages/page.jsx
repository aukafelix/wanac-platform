"use client";

import { useState } from 'react';
import { FaSearch, FaEllipsisV, FaPaperPlane, FaPaperclip, FaSmile, FaUser, FaCircle } from 'react-icons/fa';

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  
  // Sample data - replace with actual data fetching in production
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/avatars/coach1.jpg",
      role: "Career Coach",
      status: "online",
      lastMessage: "Let's discuss your resume updates before our next session.",
      timestamp: "10:30 AM",
      unread: 2
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      avatar: "/avatars/coach2.jpg",
      role: "Life Skills Coach",
      status: "offline",
      lastMessage: "I've shared some resources on financial planning in our shared folder.",
      timestamp: "Yesterday",
      unread: 0
    },
    {
      id: 3,
      name: "David Thompson",
      avatar: "/avatars/coach3.jpg",
      role: "Personal Growth Coach",
      status: "away",
      lastMessage: "How did those stress management techniques work for you?",
      timestamp: "Nov 10",
      unread: 0
    },
    {
      id: 4,
      name: "WANAC Support",
      avatar: "/avatars/support.jpg",
      role: "Support Team",
      status: "online",
      lastMessage: "Your next coaching session has been confirmed.",
      timestamp: "Nov 8",
      unread: 0
    }
  ];

  const messages = {
    1: [
      {
        id: 1,
        sender: "Sarah Johnson",
        senderAvatar: "/avatars/coach1.jpg",
        content: "Hi there! How are you doing today?",
        timestamp: "10:15 AM",
        isMe: false
      },
      {
        id: 2,
        sender: "Me",
        content: "I'm doing well, thanks for asking! Just preparing for our session tomorrow.",
        timestamp: "10:18 AM",
        isMe: true
      },
      {
        id: 3,
        sender: "Sarah Johnson",
        senderAvatar: "/avatars/coach1.jpg",
        content: "That's great to hear! I was thinking we should go over your resume updates before our session.",
        timestamp: "10:22 AM",
        isMe: false
      },
      {
        id: 4,
        sender: "Sarah Johnson",
        senderAvatar: "/avatars/coach1.jpg",
        content: "Do you have time to share the latest version with me today?",
        timestamp: "10:23 AM",
        isMe: false
      },
      {
        id: 5,
        sender: "Me",
        content: "Yes, I can definitely do that. I'll send it over in a few hours after I make some final edits.",
        timestamp: "10:25 AM",
        isMe: true
      },
      {
        id: 6,
        sender: "Sarah Johnson",
        senderAvatar: "/avatars/coach1.jpg",
        content: "Perfect! I'll keep an eye out for it. Let's discuss your resume updates before our next session.",
        timestamp: "10:30 AM",
        isMe: false
      }
    ],
    2: [
      {
        id: 1,
        sender: "Michael Rodriguez",
        senderAvatar: "/avatars/coach2.jpg",
        content: "Hello! Following up on our last session about financial planning.",
        timestamp: "Yesterday, 2:15 PM",
        isMe: false
      },
      {
        id: 2,
        sender: "Me",
        content: "Hi Michael, I've been working on the budget template you shared.",
        timestamp: "Yesterday, 3:20 PM",
        isMe: true
      },
      {
        id: 3,
        sender: "Michael Rodriguez",
        senderAvatar: "/avatars/coach2.jpg",
        content: "That's excellent progress! I've shared some additional resources on financial planning in our shared folder.",
        timestamp: "Yesterday, 4:05 PM",
        isMe: false
      }
    ],
    3: [
      {
        id: 1,
        sender: "David Thompson",
        senderAvatar: "/avatars/coach3.jpg",
        content: "I hope you've had a chance to try those stress management techniques we discussed.",
        timestamp: "Nov 10, 11:30 AM",
        isMe: false
      },
      {
        id: 2,
        sender: "Me",
        content: "I've been practicing the breathing exercises daily and they're really helping!",
        timestamp: "Nov 10, 12:45 PM",
        isMe: true
      },
      {
        id: 3,
        sender: "David Thompson",
        senderAvatar: "/avatars/coach3.jpg",
        content: "How did those stress management techniques work for you?",
        timestamp: "Nov 10, 3:20 PM",
        isMe: false
      }
    ],
    4: [
      {
        id: 1,
        sender: "WANAC Support",
        senderAvatar: "/avatars/support.jpg",
        content: "Thank you for scheduling a coaching session with Sarah Johnson.",
        timestamp: "Nov 8, 9:15 AM",
        isMe: false
      },
      {
        id: 2,
        sender: "WANAC Support",
        senderAvatar: "/avatars/support.jpg",
        content: "Your session is confirmed for November 15th at 10:00 AM. You'll receive a reminder 24 hours before the session.",
        timestamp: "Nov 8, 9:16 AM",
        isMe: false
      },
      {
        id: 3,
        sender: "Me",
        content: "Thank you for the confirmation. I'm looking forward to the session!",
        timestamp: "Nov 8, 10:30 AM",
        isMe: true
      },
      {
        id: 4,
        sender: "WANAC Support",
        senderAvatar: "/avatars/support.jpg",
        content: "Your next coaching session has been confirmed.",
        timestamp: "Nov 8, 10:35 AM",
        isMe: false
      }
    ]
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    // In a real app, you would send this to your backend
    console.log(`Sending message to conversation ${activeConversation}: ${messageInput}`);
    
    // Clear input after sending
    setMessageInput('');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'text-green-500';
      case 'away': return 'text-yellow-500';
      case 'offline': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col">
      <div className="flex h-full">
        {/* Conversations Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  activeConversation === conversation.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                      {conversation.avatar ? (
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#002147] text-white text-xl">
                          {conversation.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(conversation.status)} rounded-full border-2 border-white`}></span>
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-[#002147]">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-500">{conversation.role}</p>
                    <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                  
                  {conversation.unread > 0 && (
                    <div className="ml-2 bg-[#002147] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="hidden md:flex flex-col flex-1 bg-gray-50">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                      {conversations.find(c => c.id === activeConversation)?.avatar ? (
                        <img
                          src={conversations.find(c => c.id === activeConversation)?.avatar}
                          alt={conversations.find(c => c.id === activeConversation)?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#002147] text-white">
                          {conversations.find(c => c.id === activeConversation)?.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${
                      getStatusColor(conversations.find(c => c.id === activeConversation)?.status)
                    } rounded-full border-2 border-white`}></span>
                  </div>
                  
                  <div className="ml-3">
                    <h3 className="font-semibold text-[#002147]">
                      {conversations.find(c => c.id === activeConversation)?.name}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        getStatusColor(conversations.find(c => c.id === activeConversation)?.status)
                      } mr-1`}></span>
                      {conversations.find(c => c.id === activeConversation)?.status.charAt(0).toUpperCase() + 
                       conversations.find(c => c.id === activeConversation)?.status.slice(1)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="text-gray-500 hover:text-[#002147]">
                    <FaEllipsisV />
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages[activeConversation]?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isMe && (
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                        {message.senderAvatar ? (
                          <img
                            src={message.senderAvatar}
                            alt={message.sender}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#002147] text-white">
                            {message.sender.charAt(0)}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className={`max-w-[70%] ${message.isMe ? 'bg-[#002147] text-white' : 'bg-white text-gray-800'} rounded-lg px-4 py-2 shadow`}>
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center">
                  <button className="text-gray-500 hover:text-[#002147] mr-2">
                    <FaPaperclip />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <button className="text-gray-500 hover:text-[#002147] mx-2">
                    <FaSmile />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={messageInput.trim() === ''}
                    className={`ml-2 p-2 rounded-full ${
                      messageInput.trim() === '' ? 'bg-gray-200 text-gray-400' : 'bg-[#002147] text-white'
                    }`}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700">Select a conversation</h3>
                <p className="text-gray-500 mt-2">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile: No conversation selected */}
        <div className="flex-1 md:hidden flex items-center justify-center bg-gray-50">
          {!activeConversation && (
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700">Your Messages</h3>
              <p className="text-gray-500 mt-2">Select a conversation to view messages</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile: Chat View (shown when a conversation is selected) */}
      {activeConversation && (
        <div className="fixed inset-0 bg-white z-50 md:hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center">
            <button 
              className="mr-4 text-gray-600"
              onClick={() => setActiveConversation(null)}
            >
              &larr;
            </button>
            
            <div className="flex items-center flex-1">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                  {conversations.find(c => c.id === activeConversation)?.avatar ? (
                    <img
                      src={conversations.find(c => c.id === activeConversation)?.avatar}
                      alt={conversations.find(c => c.id === activeConversation)?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#002147] text-white">
                      {conversations.find(c => c.id === activeConversation)?.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${
                  getStatusColor(conversations.find(c => c.id === activeConversation)?.status)
                } rounded-full border-2 border-white`}></span>
              </div>
              
              <div className="ml-3">
                <h3 className="font-semibold text-[#002147]">
                  {conversations.find(c => c.id === activeConversation)?.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {conversations.find(c => c.id === activeConversation)?.status.charAt(0).toUpperCase() + 
                   conversations.find(c => c.id === activeConversation)?.status.slice(1)}
                </p>
              </div>
            </div>
            
            <button className="text-gray-500">
              <FaEllipsisV />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages[activeConversation]?.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isMe && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    {message.senderAvatar ? (
                      <img
                        src={message.senderAvatar}
                        alt={message.sender}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#002147] text-white">
                        {message.sender.charAt(0)}
                      </div>
                    )}
                  </div>
                )}
                
                <div className={`max-w-[70%] ${message.isMe ? 'bg-[#002147] text-white' : 'bg-white text-gray-800'} rounded-lg px-4 py-2 shadow`}>
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <button className="text-gray-500 hover:text-[#002147] mr-2">
                <FaPaperclip />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
              />
              <button className="text-gray-500 hover:text-[#002147] mx-2">
                <FaSmile />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={messageInput.trim() === ''}
                className={`ml-2 p-2 rounded-full ${
                  messageInput.trim() === '' ? 'bg-gray-200 text-gray-400' : 'bg-[#002147] text-white'
                }`}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}