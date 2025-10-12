import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Send, Download, ExternalLink, FileText, Link as LinkIcon } from "lucide-react";
import PropTypes from "prop-types";

// Helper function to validate URLs
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Helper function to get exhibit icon (memoized outside component)
const getExhibitIcon = (type) => {
  switch (type) {
    case 'pdf':
    case 'document':
      return <FileText className="w-5 h-5" />;
    case 'link':
    case 'url':
      return <LinkIcon className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

// Helper function to format time (memoized outside component)
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Empty State Component
const EmptyState = ({ icon, title, description }) => (
  <div className="text-center text-gray-500 py-12">
    <div className="mb-4">
      {icon}
    </div>
    <p className="text-sm font-medium">{title}</p>
    <p className="text-xs mt-2">{description}</p>
  </div>
);

EmptyState.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default function EnhancedAgendaSidebar({ 
  agenda, 
  moduleTitle, 
  moduleDescription, 
  peers = [], 
  onStepClick, 
  currentStep,
  exhibits = [],
  chatMessages = [],
  onSendMessage,
  isLoading = false
}) {
  const [activeTab, setActiveTab] = useState("Agenda");
  const [showPeersModal, setShowPeersModal] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const chatEndRef = useRef(null);
  const modalRef = useRef(null);
  const tabs = ["Agenda", "Peers", "Chat", "Exhibits"];

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current && activeTab === "Chat") {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, activeTab]);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showPeersModal) {
        setShowPeersModal(false);
      }
    };
    
    if (showPeersModal) {
      document.addEventListener('keydown', handleEscape);
      // Focus trap: focus first focusable element in modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showPeersModal]);

  const handleSendChat = useCallback(async () => {
    if (chatInput.trim() && onSendMessage && !isSendingMessage) {
      setIsSendingMessage(true);
      try {
        await onSendMessage(chatInput);
        setChatInput("");
      } catch (error) {
        console.error('Failed to send message:', error);
        // You could show an error toast here
      } finally {
        setIsSendingMessage(false);
      }
    }
  }, [chatInput, onSendMessage, isSendingMessage]);

  const handleChatKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendChat();
    }
  }, [handleSendChat]);

  const closeModal = useCallback(() => {
    setShowPeersModal(false);
  }, []);

  const handleModalBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, [closeModal]);

  return (
    <aside className="w-96 border-l bg-white flex flex-col overflow-hidden">
      {/* Tabs */}
      <div 
        className="flex justify-between border-b bg-gray-50 px-4 py-3" 
        role="tablist"
        aria-label="Sidebar navigation"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab.toLowerCase()}-panel`}
            id={`${tab.toLowerCase()}-tab`}
            tabIndex={activeTab === tab ? 0 : -1}
            className={`text-sm font-semibold px-3 py-2 rounded transition-colors ${
              activeTab === tab
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "Agenda" && (
          <div
            role="tabpanel"
            id="agenda-panel"
            aria-labelledby="agenda-tab"
          >
            {/* Module Title */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">{moduleTitle}</h3>
              <p className="text-sm text-gray-600">{moduleDescription}</p>
            </div>
            
            {/* Agenda Steps */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Session Agenda</h4>
              <ul className="space-y-2 text-sm text-gray-800" role="list">
                {agenda.map(([label, time], i) => {
                  const stepId = `agenda-step-${i}`;
                  return (
                    <li
                      key={stepId}
                      className={`flex justify-between items-center cursor-pointer rounded-lg px-3 py-2 transition-colors ${
                        currentStep === i 
                          ? "bg-yellow-200 font-semibold border-l-4 border-yellow-600" 
                          : "hover:bg-yellow-50 border-l-4 border-transparent"
                      }`}
                      onClick={onStepClick ? () => onStepClick(i) : undefined}
                      role="button"
                      tabIndex={0}
                      aria-current={currentStep === i ? "step" : undefined}
                      onKeyPress={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && onStepClick) {
                          e.preventDefault();
                          onStepClick(i);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            currentStep === i ? 'bg-yellow-600 text-white' : 'bg-gray-300 text-gray-600'
                          }`}
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        <span>{label}</span>
                      </div>
                      <span className="text-xs text-gray-500">{time}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "Peers" && (
          <div
            role="tabpanel"
            id="peers-panel"
            aria-labelledby="peers-tab"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Participants ({peers.length})</h3>
              {peers.length > 0 && (
                <button
                  className="text-xs px-3 py-1 border rounded-lg hover:bg-gray-100 transition"
                  onClick={() => setShowPeersModal(true)}
                  aria-label="Expand participants list"
                >
                  Expand
                </button>
              )}
            </div>
            
            {peers.length === 0 ? (
              <EmptyState
                icon={
                  <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }
                title="No participants yet"
                description="Waiting for others to join..."
              />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {peers.map((peer) => {
                  const peerId = peer.id || `peer-${peer.name}-${Math.random()}`;
                  return (
                    <div
                      key={peerId}
                      className={`flex flex-col items-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-sm border-2 transition-all ${
                        peer.speaking ? "border-green-400 shadow-green-200" : "border-transparent"
                      }`}
                      role="article"
                      aria-label={`${peer.name}${peer.speaking ? ' - currently speaking' : ''}`}
                    >
                      {/* Avatar */}
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 mb-3 flex items-center justify-center shadow-md">
                        {peer.avatarUrl ? (
                          <img 
                            src={peer.avatarUrl} 
                            alt={`${peer.name}'s avatar`} 
                            className="object-cover w-full h-full" 
                          />
                        ) : (
                          <span className="text-white text-2xl font-bold" aria-hidden="true">
                            {peer.name?.charAt(0)?.toUpperCase() || '?'}
                          </span>
                        )}
                      </div>
                      
                      {/* Name Badge */}
                      <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs font-medium">
                        <svg width="12" height="12" fill="currentColor" className="text-gray-600" aria-hidden="true">
                          <circle cx="6" cy="6" r="6" />
                        </svg>
                        <span className="truncate max-w-[90px]">{peer.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Modal for expanded peers view */}
            {showPeersModal && peers.length > 0 && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                onClick={handleModalBackdropClick}
                role="dialog"
                aria-modal="true"
                aria-labelledby="peers-modal-title"
              >
                <div 
                  ref={modalRef}
                  className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full relative max-h-[85vh] overflow-y-auto"
                >
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                    onClick={closeModal}
                    aria-label="Close participants modal"
                  >
                    &times;
                  </button>
                  <h2 id="peers-modal-title" className="text-2xl font-bold mb-6">
                    All Participants ({peers.length})
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {peers.map((peer) => {
                      const peerId = peer.id || `peer-modal-${peer.name}-${Math.random()}`;
                      return (
                        <div
                          key={peerId}
                          className={`flex flex-col items-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-sm border-2 ${
                            peer.speaking ? "border-green-400" : "border-transparent"
                          }`}
                          role="article"
                          aria-label={`${peer.name}${peer.speaking ? ' - currently speaking' : ''}`}
                        >
                          <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 mb-3 flex items-center justify-center">
                            {peer.avatarUrl ? (
                              <img 
                                src={peer.avatarUrl} 
                                alt={`${peer.name}'s avatar`} 
                                className="object-cover w-full h-full" 
                              />
                            ) : (
                              <span className="text-white text-3xl font-bold" aria-hidden="true">
                                {peer.name?.charAt(0)?.toUpperCase() || '?'}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow text-sm font-medium">
                            <span className="truncate max-w-[120px]">{peer.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Chat" && (
          <div 
            className="flex flex-col h-full"
            role="tabpanel"
            id="chat-panel"
            aria-labelledby="chat-tab"
            style={{ margin: '-1.5rem', height: 'calc(100% + 3rem)' }}
          >
            {/* Chat Header */}
            <div className="px-6 py-4 border-b bg-gray-50">
              <h3 className="font-bold text-lg">Team Chat</h3>
              <p className="text-xs text-gray-500">Collaborate with your fireteam</p>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {chatMessages.length === 0 ? (
                <EmptyState
                  icon={
                    <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                  title="No messages yet"
                  description="Start the conversation!"
                />
              ) : (
                <>
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-lg px-4 py-2 ${
                          msg.isOwn 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                          {!msg.isOwn && (
                            <p className="text-xs font-semibold mb-1">{msg.sender}</p>
                          )}
                          <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>
            
            {/* Chat Input */}
            <div className="border-t bg-white px-4 py-3">
              <div className="flex gap-2 items-end">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleChatKeyPress}
                  placeholder="Type a message... (Shift+Enter for new line)"
                  rows="1"
                  maxLength={500}
                  disabled={isSendingMessage}
                  aria-label="Chat message input"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    minHeight: '40px', 
                    maxHeight: '120px',
                    overflowY: 'auto'
                  }}
                />
                <button
                  onClick={handleSendChat}
                  disabled={!chatInput.trim() || isSendingMessage}
                  aria-label="Send message"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  style={{ minHeight: '40px', minWidth: '40px' }}
                >
                  {isSendingMessage ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              {chatInput.length > 400 && (
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {chatInput.length}/500 characters
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "Exhibits" && (
          <div
            role="tabpanel"
            id="exhibits-panel"
            aria-labelledby="exhibits-tab"
          >
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Session Exhibits</h3>
              <p className="text-sm text-gray-600">Resources and materials for this session</p>
            </div>
            
            {exhibits.length === 0 ? (
              <EmptyState
                icon={
                  <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                title="No exhibits available"
                description="Check back later for materials"
              />
            ) : (
              <div className="space-y-3">
                {exhibits.map((exhibit) => {
                  const validUrl = isValidUrl(exhibit.url);
                  return (
                    <div
                      key={exhibit.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                          {getExhibitIcon(exhibit.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1">{exhibit.title}</h4>
                          {exhibit.description && (
                            <p className="text-xs text-gray-600 mb-2">{exhibit.description}</p>
                          )}
                          {validUrl ? (
                            <div className="flex gap-2">
                              <a
                                href={exhibit.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                                aria-label={`Open ${exhibit.title} in new tab`}
                              >
                                <ExternalLink className="w-3 h-3" />
                                Open
                              </a>
                              {exhibit.type !== 'link' && exhibit.type !== 'url' && (
                                <a
                                  href={exhibit.url}
                                  download
                                  className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-800 font-medium"
                                  aria-label={`Download ${exhibit.title}`}
                                >
                                  <Download className="w-3 h-3" />
                                  Download
                                </a>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-red-600">Invalid URL</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

// PropTypes validation
EnhancedAgendaSidebar.propTypes = {
  agenda: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string)
  ).isRequired,
  moduleTitle: PropTypes.string.isRequired,
  moduleDescription: PropTypes.string,
  peers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string,
      speaking: PropTypes.bool,
    })
  ),
  onStepClick: PropTypes.func,
  currentStep: PropTypes.number,
  exhibits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['pdf', 'document', 'link', 'url']),
    })
  ),
  chatMessages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      sender: PropTypes.string,
      timestamp: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date)
      ]).isRequired,
      isOwn: PropTypes.bool,
    })
  ),
  onSendMessage: PropTypes.func,
  isLoading: PropTypes.bool,
};