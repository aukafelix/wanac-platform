"use client";

import { useState, useEffect } from "react";
import Sidebar from '../../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';
import CommunityFeedWidget from '../../../../../components/dashboardcomponents/widgets/CommunityFeedWidget';

const PROMPT_TYPES = [
  { key: "morning", label: "Morning Prompts" },
  { key: "evening", label: "Evening Reviews" },
  { key: "weekly", label: "Weekly Review" },
  { key: "monthly", label: "Monthly Review" },
  { key: "ai", label: "AI-driven Prompt" },
];

const PROMPTS = {
  morning: [
    "What is your main intention for today?",
    "What are you grateful for this morning?",
    "What will make today great?",
  ],
  evening: [
    "What went well today?",
    "What did you learn today?",
    "What could you improve tomorrow?",
  ],
  weekly: [
    "What was your biggest win this week?",
    "What challenges did you overcome?",
    "What will you focus on next week?",
  ],
  monthly: [
    "What are you most proud of this month?",
    "What did you learn this month?",
    "What are your goals for next month?",
  ],
};

function getRandomPrompt(type) {
  if (type === "ai") {
    // Stub AI-driven prompt
    const aiPrompts = [
      "Reflect on a recent challenge and how you handled it.",
      "Describe a moment you felt truly present.",
      "What is something you want to ask your future self?",
    ];
    return aiPrompts[Math.floor(Math.random() * aiPrompts.length)];
  }
  const arr = PROMPTS[type];
  return arr ? arr[Math.floor(Math.random() * arr.length)] : "";
}

function JournalEntryForm({ onAdd, prompt, setPrompt }) {
  const [entry, setEntry] = useState("");
  useEffect(() => {
    setEntry(prompt || "");
  }, [prompt]);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (entry.trim()) {
          onAdd(entry);
          setEntry("");
          setPrompt("");
        }
      }}
      className="mb-6"
    >
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
        placeholder="Write your thoughts, reflections, or progress..."
        value={entry}
        onChange={e => setEntry(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-primary text-white px-5 py-2 rounded hover:bg-primary/90 transition font-semibold"
      >
        Add Entry
      </button>
    </form>
  );
}

function JournalEntriesList({ entries, filter }) {
  const filtered = entries.filter(e =>
    e.text.toLowerCase().includes(filter.toLowerCase())
  );
  if (filtered.length === 0) {
    return <div className="text-gray-500 text-sm">No journal entries found.</div>;
  }
  return (
    <ul className="space-y-4">
      {filtered.map((entry, idx) => (
        <li key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-gray-800 whitespace-pre-line">{entry.text}</div>
          <div className="text-xs text-gray-400 mt-2">{entry.date}</div>
        </li>
      ))}
    </ul>
  );
}

export default function JournalPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([
    {
      text: "Had a great session with my coach today. Feeling motivated!",
      date: "2024-06-01 09:30 AM",
    },
    {
      text: "Reflected on my goals and made a plan for the week.",
      date: "2024-05-29 07:15 PM",
    },
  ]);
  const [selectedTab, setSelectedTab] = useState("morning");
  const [prompt, setPrompt] = useState(getRandomPrompt("morning"));
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    setPrompt(getRandomPrompt(selectedTab));
  }, [selectedTab]);

  const handleAddEntry = (text) => {
    setEntries([
      { text, date: new Date().toLocaleString() },
      ...entries,
    ]);
  };

  const handleAIPrompt = () => {
    setPrompt(getRandomPrompt("ai"));
    setSelectedTab("ai");
  };

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 space-y-8">
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <h1 className="text-2xl font-bold mb-2 text-primary">Journal</h1>
                  <p className="text-gray-600 mb-6">Reflect, record your thoughts, and track your progress on your journey.</p>
                  {/* Prompt Tabs */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {PROMPT_TYPES.map(tab => (
                      <button
                        key={tab.key}
                        className={`px-4 py-2 rounded font-medium border transition-all text-sm ${selectedTab === tab.key ? 'bg-accent text-white border-accent' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-accent/10 hover:border-accent'} `}
                        onClick={() => setSelectedTab(tab.key)}
                        type="button"
                      >
                        {tab.label}
                      </button>
                    ))}
                    <button
                      className="ml-auto px-4 py-2 rounded font-medium border bg-accent text-white border-accent hover:bg-accent/80 transition-all text-sm"
                      onClick={handleAIPrompt}
                      type="button"
                    >
                      Generate AI Prompt
                    </button>
                  </div>
                  {/* Prompt Display */}
                  {prompt && (
                    <div className="mb-4 p-4 bg-blue-50 border-l-4 border-primary rounded text-primary font-medium">
                      {prompt}
                    </div>
                  )}
                  <JournalEntryForm onAdd={handleAddEntry} prompt={prompt} setPrompt={setPrompt} />
                  {/* Search/filter for historical entries */}
                  <div className="mb-4">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder="Search your journal history..."
                      value={filter}
                      onChange={e => setFilter(e.target.value)}
                    />
                  </div>
                  <JournalEntriesList entries={entries} filter={filter} />
                </section>
              </div>
              {/* Right Sidebar */}
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
