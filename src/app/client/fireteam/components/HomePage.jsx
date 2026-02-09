"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

// Chat Modal Component
function ChatModal({ isOpen, onClose, experience }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Coach",
      text: "Welcome to the experience chat! Feel free to ask any questions.",
      time: "10:30 AM",
      isCoach: true
    }
  ]);

  const backdropRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // focus input when modal opens
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }

      if (e.key === 'Tab') {
        // simple focus trap
        const focusable = backdropRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: "You",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCoach: false
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      inputRef.current?.focus();
    }
  };

  return (
    <div
      ref={backdropRef}
      onMouseDown={(e) => {
        // close when clicking on backdrop (outside modal content)
        if (e.target === backdropRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[600px] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002147] to-[#003875] p-4 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FaComments className="text-white text-lg" />
            </div>
            <div>
              <h3 id="chat-title" className="text-white font-bold text-sm">Experience Chat</h3>
              <p className="text-white/80 text-xs">{experience?.title || 'Discussion'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
            aria-label="Close chat"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isCoach ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.isCoach
                    ? 'bg-white border border-gray-200'
                    : 'bg-[#002147] text-white'
                }`}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`font-semibold text-xs ${msg.isCoach ? 'text-[#002147]' : 'text-white'}`}>
                    {msg.sender}
                  </span>
                  <span className={`text-[9px] ${msg.isCoach ? 'text-gray-500' : 'text-white/70'}`}>
                    {msg.time}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                message.trim()
                  ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FaPaperPlane className="text-xs" />
              Send
            </button>
          </form>
          <p className="text-[9px] text-gray-500 mt-2">
            Chat with your instructor and team members about this experience
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ assignments = [], loading = false, error = "", onRetry }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Assignments");
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const router = useRouter();

  // Filter assignments based on search and filter
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.experience.title.toLowerCase().includes(search.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(search.toLowerCase()) ||
                         assignment.instructor.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === "All Assignments" || 
                         (filter === "Upcoming" && assignment.status === "Upcoming") ||
                         (filter === "Completed" && assignment.status === "Completed");
    
    return matchesSearch && matchesFilter;
  });

  return (
    <>
        {/* Error Message */}
        {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-between text-xs">
          <span className="flex items-center gap-2">
            <span>⚠</span>
            {error}
          </span>
            <button 
              onClick={onRetry}
              className="text-red-600 hover:text-red-800 underline font-semibold"
            >
              Retry
            </button>
          </div>
        )}
        
      {/* Search and Filter Section */}
      <section className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2">
          <div className="relative flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          <input
            type="text"
              placeholder="Search experiences, programs, or instructors..."
            value={search}
            onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border-2 border-gray-300 rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] transition-all"
          />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-600 font-medium">Filter:</span>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-2.5 py-1.5 border-2 border-gray-300 rounded-lg text-[11px] bg-white focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] font-semibold"
            >
              <option>All Assignments</option>
              <option>Upcoming</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
      </section>
        
        {/* Loading State */}
        {loading ? (
        <section className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002147] mx-auto mb-3"></div>
          <p className="text-gray-600 text-xs">Loading experiences...</p>
        </section>
      ) : (
        /* Experiences Table */
        <section className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow overflow-x-auto">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-[#002147]">All Experiences</h3>
            <p className="text-[10px] text-gray-600">
              {filteredAssignments.length} {filteredAssignments.length === 1 ? 'experience' : 'experiences'} found
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="text-[10px] text-gray-600 border-b-2 border-gray-200 bg-gray-50">
                  <th className="py-2 px-3 font-semibold">Program</th>
                  <th className="px-3 font-semibold">Instructor</th>
                  <th className="px-3 font-semibold">Experience</th>
                  <th className="px-3 font-semibold">Due Date</th>
                  <th className="px-3 font-semibold">Session Date</th>
                  <th className="px-3 font-semibold">Status</th>
                  <th className="px-3 font-semibold text-center">Chat</th>
                  <th className="px-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 font-semibold text-sm mb-1">
                          {assignments.length === 0 ? 'No Experiences Found' : 'No Matching Experiences'}
                        </p>
                        <p className="text-gray-400 text-[10px]">
                      {assignments.length === 0 
                            ? "Join a fireteam to see experiences here."
                            : "Try adjusting your search or filter criteria."
                      }
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAssignments.map(a => {
                    const buildUrl = () => {
                      const baseUrl = `/client/fireteam/experience/${a.experienceId}?id=${a.experienceId}&fireteamId=${a.fireteamId}`;
                      return a.meetingLink ? `${baseUrl}&link=${encodeURIComponent(a.meetingLink)}` : baseUrl;
                    };
                    const handleRowNavigate = () => router.push(buildUrl());
                    const onRowKeyDown = (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleRowNavigate();
                      }
                    };

                    return (
                    <tr
                      key={a.id}
                      role="button"
                      tabIndex={0}
                      onClick={handleRowNavigate}
                      onKeyDown={onRowKeyDown}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-blue-50/50 transition-colors group cursor-pointer"
                    >
                      <td className="py-3 px-3 align-middle">
                        <div className="font-semibold text-[11px] text-gray-900">{a.course}</div>
                        <div className="text-[9px] text-gray-500">ID: {a.fireteamId}</div>
                      </td>
                      <td className="px-3 align-middle text-[11px] text-gray-700">{a.instructor}</td>
                      <td className="px-3 align-middle">
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-[11px] text-gray-900">{a.experience.title}</div>
                            <div className="text-[9px] text-gray-500">{a.experience.subtitle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 align-middle">
                        <div className="font-semibold text-[11px] text-gray-900">{a.dueDate}</div>
                        <div className="text-[9px] text-gray-500">{a.dueTime}</div>
                      </td>
                      <td className="px-3 align-middle">
                        <div className="font-semibold text-[11px] text-gray-900">{a.sessionDate}</div>
                        <div className="text-[9px] text-gray-500">{a.sessionTime}</div>
                      </td>
                      <td className="px-3 align-middle">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          a.status === 'Upcoming' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-3 align-middle text-center">
                        {a.chat ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedExperience(a);
                              setChatModalOpen(true);
                            }}
                            className="inline-flex items-center justify-center w-7 h-7 bg-blue-500 hover:bg-blue-600 rounded-full transition-all hover:scale-110 group"
                            title="Open Chat"
                            aria-label={`Open chat for ${a.experience?.title || 'experience'}`}
                          >
                            <FaComments className="text-white text-xs" />
                          </button>
                        ) : (
                          <span className="inline-block w-3 h-3 border-2 border-gray-300 rounded-full opacity-50" title="Chat Not Available" />
                        )}
                      </td>
                      <td className="px-3 align-middle">
                        <button
                          className="text-[11px] text-[#002147] font-bold hover:text-orange-500 group-hover:underline transition-colors flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(buildUrl());
                          }}
                          aria-label={`Open ${a.action} for ${a.experience?.title}`}
                        >
                          {a.action}
                          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                        </button>
                      </td>
                    </tr>
                  )})
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Chat Modal */}
      <ChatModal 
        isOpen={chatModalOpen} 
        onClose={() => {
          setChatModalOpen(false);
          setSelectedExperience(null);
        }}
        experience={selectedExperience?.experience}
      />
    </>
  );
}