import React, { useRef, useEffect, useState } from 'react';

export default function CommunityChat({ messages = [], onSend, user, contacts = [], selectedContact, onSelectContact }) {
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSend && onSend(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex h-[60vh] md:h-[70vh] bg-white rounded-lg shadow border border-gray-200">
      {/* Chat area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="bg-[#002147] text-white px-6 py-4 rounded-tl-lg flex items-center gap-2 min-h-[56px]">
          {selectedContact ? (
            <>
              <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-900 text-lg">
                {selectedContact.name?.charAt(0) || '?'}
              </div>
              <span className="font-semibold text-lg">{selectedContact.name}</span>
            </>
          ) : (
            <span className="font-semibold text-lg">Community Chat</span>
          )}
        </div>
        {/* Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-400">No messages yet. Start the conversation!</div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-3 ${msg.sender === user?.name ? 'justify-end' : 'justify-start'}`}>  
              {msg.sender !== user?.name && (
                <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-900 text-lg">
                  {msg.sender?.charAt(0) || '?'}
                </div>
              )}
              <div>
                <div className={`px-4 py-2 rounded-2xl shadow-sm ${msg.sender === user?.name ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                  <div className="text-sm font-medium mb-1">{msg.sender || 'Anonymous'}</div>
                  <div className="text-base">{msg.text}</div>
                </div>
                <div className="text-xs text-gray-400 mt-1 ml-1">{msg.time || ''}</div>
              </div>
              {msg.sender === user?.name && (
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-lg">
                  {msg.sender?.charAt(0) || '?'}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 px-4 py-3 flex gap-2 bg-white rounded-b-lg">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-semibold"
            disabled={!inputValue.trim()}
          >
            Send
          </button>
        </form>
      </div>
      {/* Contact list panel */}
      <aside className="hidden md:flex flex-col w-64 border-l border-gray-200 rounded-tr-lg rounded-br-lg bg-gray-50">
        <div className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-700">Contacts</div>
        <div className="flex-1 overflow-y-auto">
          {contacts.length === 0 && <div className="text-gray-400 px-4 py-6">No contacts</div>}
          {contacts.map((contact) => (
            <button
              key={contact.id}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-100 focus:bg-blue-200 transition ${selectedContact?.id === contact.id ? 'bg-blue-50 font-bold text-blue-700' : ''}`}
              onClick={() => onSelectContact && onSelectContact(contact)}
            >
              <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-900 text-lg">
                {contact.name?.charAt(0) || '?'}
              </div>
              <span>{contact.name}</span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
} 