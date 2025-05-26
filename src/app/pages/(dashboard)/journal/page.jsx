"use client";

import { useState } from 'react';
import { FaPlus, FaSearch, FaCalendarAlt, FaTag, FaEllipsisH, FaTrash, FaEdit, FaLock, FaSave, FaTimes } from 'react-icons/fa';

export default function JournalPage() {
  const [activeEntry, setActiveEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editContent, setEditContent] = useState('');
  
  // Sample data - replace with actual data fetching in production
  const journalEntries = [
    {
      id: 1,
      title: "First Week After Transition",
      date: "2023-11-10",
      content: "Today marks one week since I left active duty. The transition has been both exciting and challenging. I've been focusing on establishing a new routine and reconnecting with family and friends. My coach suggested I start each day with a mindfulness practice, which has been helping with the adjustment.\n\nGoals for next week:\n- Finalize my resume\n- Reach out to 3 contacts in my target industry\n- Schedule a follow-up session with my career coach",
      mood: "hopeful",
      tags: ["transition", "goals", "routine"]
    },
    {
      id: 2,
      title: "Job Interview Preparation",
      date: "2023-11-08",
      content: "I have my first civilian job interview next week. Today I practiced common interview questions with my coach and worked on translating my military experience into terms that civilian employers will understand. I'm feeling more confident but still nervous.\n\nKey points to remember:\n- Focus on leadership examples\n- Emphasize teamwork and adaptability\n- Prepare questions about company culture\n- Remember the STAR method for behavioral questions",
      mood: "nervous",
      tags: ["career", "interview", "preparation"]
    },
    {
      id: 3,
      title: "Reflections on Today's Coaching Session",
      date: "2023-11-05",
      content: "Had a breakthrough during today's coaching session. We discussed my tendency to downplay my accomplishments and how that might affect my job search. My coach helped me identify specific achievements that demonstrate my skills and experience.\n\nInsights:\n- I need to be more comfortable discussing my successes\n- My experience leading a team of 12 is directly relevant to the management positions I'm applying for\n- The challenges I overcame during deployment showcase my problem-solving abilities",
      mood: "inspired",
      tags: ["coaching", "self-awareness", "growth"]
    },
    {
      id: 4,
      title: "Financial Planning Progress",
      date: "2023-11-01",
      content: "Met with the financial advisor recommended by WANAC. We reviewed my current financial situation and created a six-month plan to transition from military to civilian finances. I feel much more in control now that I have a clear roadmap.\n\nAction items:\n- Set up automatic transfers to emergency fund\n- Research health insurance options\n- Review VA loan eligibility for future home purchase\n- Adjust budget for civilian life expenses",
      mood: "organized",
      tags: ["finance", "planning", "benefits"]
    }
  ];

  // Filter entries based on search query
  const filteredEntries = journalEntries.filter(entry => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query) ||
      entry.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const handleNewEntry = () => {
    // In a real app, you would create a new entry in the database
    console.log("Creating new journal entry");
    // Then set it as active and enable editing
  };

  const handleEditEntry = () => {
    if (!activeEntry) return;
    setEditContent(activeEntry.content);
    setIsEditing(true);
  };

  const handleSaveEntry = () => {
    // In a real app, you would save the edited content to the database
    console.log(`Saving changes to entry ${activeEntry.id}`);
    setIsEditing(false);
  };

  const handleDeleteEntry = () => {
    // In a real app, you would delete the entry from the database
    console.log(`Deleting entry ${activeEntry.id}`);
    setActiveEntry(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-[#002147]">Journal</h1>
            <button 
              onClick={handleNewEntry}
              className="bg-[#002147] text-white p-2 rounded-full hover:bg-blue-800 transition-colors"
            >
              <FaPlus />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-y-auto">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  activeEntry?.id === entry.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setActiveEntry(entry)}
              >
                <h3 className="font-semibold text-[#002147] line-clamp-1">{entry.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <FaCalendarAlt className="mr-1" /> {formatDate(entry.date)}
                </div>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">{entry.content}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {entry.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-xs flex items-center">
                      <FaTag className="mr-1 text-gray-400" size={10} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No entries found</p>
              <p className="text-sm mt-2">Try adjusting your search or create a new entry</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="hidden md:flex flex-col flex-1 bg-gray-50">
        {activeEntry ? (
          <>
            {/* Entry Header */}
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-[#002147]">{activeEntry.title}</h2>
                  <div className="flex items-center text-gray-500 mt-1">
                    <FaCalendarAlt className="mr-2" /> {formatDate(activeEntry.date)}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={() => setIsEditing(false)} 
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <FaTimes />
                      </button>
                      <button 
                        onClick={handleSaveEntry} 
                        className="p-2 text-green-600 hover:text-green-800"
                      >
                        <FaSave />
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={handleEditEntry} 
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={handleDeleteEntry} 
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <FaTrash />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700">
                        <FaLock />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700">
                        <FaEllipsisH />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {activeEntry.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <FaTag className="mr-1 text-gray-400" size={12} /> {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Entry Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                  placeholder="Write your thoughts here..."
                />
              ) : (
                <div className="prose max-w-none">
                  {activeEntry.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < paragraph.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              )}
            </div>
            
            {/* Entry Footer */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Last edited: {formatDate(activeEntry.date)}
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Mood:</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {activeEntry.mood.charAt(0).toUpperCase() + activeEntry.mood.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEdit className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700">Select an entry</h3>
              <p className="text-gray-500 mt-2">Choose a journal entry from the list or create a new one</p>
              <button 
                onClick={handleNewEntry}
                className="mt-6 px-4 py-2 bg-[#002147] text-white rounded-md hover:bg-blue-800"
              >
                <FaPlus className="inline mr-2" /> New Entry
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile: No entry selected */}
      <div className="flex-1 md:hidden flex items-center justify-center bg-gray-50">
        {!activeEntry && (
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEdit className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Your Journal</h3>
            <p className="text-gray-500 mt-2">Select an entry to view or edit</p>
            <button 
              onClick={handleNewEntry}
              className="mt-6 px-4 py-2 bg-[#002147] text-white rounded-md hover:bg-blue-800"
            >
              <FaPlus className="inline mr-2" /> New Entry
            </button>
          </div>
        )}
      </div>
      
      {/* Mobile: Entry View (shown when an entry is selected) */}
      {activeEntry && (
        <div className="fixed inset-0 bg-white z-50 md:hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center">
            <button 
              className="mr-4 text-gray-600"
              onClick={() => setActiveEntry(null)}
            >
              &larr;
            </button>
            
            <div className="flex-1">
              <h2 className="font-semibold text-[#002147]">{activeEntry.title}</h2>
              <div className="text-sm text-gray-500">{formatDate(activeEntry.date)}</div>
            </div>
            
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <button 
                  onClick={handleSaveEntry} 
                  className="p-2 text-green-600 hover:text-green-800"
                >
                  <FaSave />
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleEditEntry} 
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <FaEdit />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <FaEllipsisH />
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full h-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                placeholder="Write your thoughts here..."
              />
            ) : (
              <div className="prose max-w-none">
                {activeEntry.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < paragraph.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {activeEntry.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-xs flex items-center">
                  <FaTag className="mr-1 text-gray-400" size={10} /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}