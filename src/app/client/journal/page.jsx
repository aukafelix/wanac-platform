"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Sidebar from "../../../../components/dashboardcomponents/sidebar";
import ClientTopbar from "../../../../components/dashboardcomponents/clienttopbar";
import JournalModeToggle from "../../../../components/dashboardcomponents/JournalModeToggle";
import GuidedPromptCard from "../../../../components/dashboardcomponents/GuidedPromptCard";
import JournalingTipsPanel from "../../../../components/dashboardcomponents/JournalingTipsPanel";
import WeeklyActionCard from "../../../../components/dashboardcomponents/WeeklyActionCard";
import {
  FaSearch,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaDownload,
  FaTh,
  FaList,
  FaBook,
  FaSave,
  FaLock,
} from "react-icons/fa";
import { journalService } from "../../../services/api/journal.service";
import useGuidedJournalState from "../../../../hooks/useGuidedJournalState";
import { getWeeklyAction, shouldShowWeeklyAction, markWeeklyActionCompleted } from "../../../../lib/weeklyActions";

const tabs = [
  { key: "morning", label: "Morning Mindset" },
  { key: "evening", label: "Evening Review" },
  { key: "growth", label: "Growth Prompts" },
  { key: "weekly", label: "Weekly Review" },
  { key: "monthly", label: "Monthly Review" },
];

export default function JournalUI() {
  // Journal mode: "free" or "guided"
  const [journalMode, setJournalMode] = useState("free");
  
  // Free-write state
  const [selectedTab, setSelectedTab] = useState("morning");
  const [entry, setEntry] = useState("");
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'card'
  const [editingEntry, setEditingEntry] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  // Guided journal state
  const guidedState = useGuidedJournalState(user?.id || "anonymous");
  const [weeklyAction, setWeeklyAction] = useState(null);
  const [weeklyActionCompleted, setWeeklyActionCompleted] = useState(false);

  // Calculate word count
  useEffect(() => {
    const words = entry.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  }, [entry]);

  // Initialize weekly action on mount
  useEffect(() => {
    if (user?.id) {
      const action = getWeeklyAction();
      setWeeklyAction(action);
      setWeeklyActionCompleted(!shouldShowWeeklyAction(user.id));
    }
  }, [user]);

  // Fetch journals on tab change
  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await journalService.getJournals();
        const tabLabel = tabs.find((t) => t.key === selectedTab)?.label;
      const filtered = data.filter((j) => j.title === tabLabel);
      setEntries(filtered);
    } catch {
      setError("Failed to load journal entries.");
    } finally {
      setLoading(false);
    }
  }, [selectedTab]);

  useEffect(() => {
    fetchEntries();
  }, [selectedTab, fetchEntries]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const tabLabel = journalMode === "guided" 
        ? `Guided - Prompt #${guidedState.currentPromptNumber}`
        : tabs.find((t) => t.key === selectedTab)?.label;
      
      if (editingEntry) {
        // Update existing entry
        await journalService.updateJournal(editingEntry.id, { title: tabLabel, content: entry });
        setSuccess("Entry updated successfully!");
        setEditingEntry(null);
      } else {
        // Create new entry
        await journalService.addJournal({ title: tabLabel, content: entry });
        setSuccess("Entry saved successfully!");
        
        // If guided mode, mark prompt as complete and move to next
        if (journalMode === "guided") {
          guidedState.markPromptComplete();
        }
      }
      setEntry("");
      setWordCount(0);
      await fetchEntries();
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError(editingEntry ? "Failed to update entry." : "Failed to save entry.");
    } finally {
      setLoading(false);
    }
  };

  // Edit entry
  const handleEdit = (entryToEdit) => {
    setEntry(entryToEdit.content);
    setEditingEntry(entryToEdit);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEntry("");
    setEditingEntry(null);
    setWordCount(0);
  };

  // Delete entry
  const handleDelete = async (entryId) => {
    try {
      await journalService.deleteJournal(entryId);
      setSuccess("Entry deleted successfully!");
      setShowDeleteConfirm(null);
      await fetchEntries();
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to delete entry.");
    }
  };

  // Export entries
  const handleExport = () => {
    const tabLabel = tabs.find((t) => t.key === selectedTab)?.label;
    const exportData = entries.map(e => ({
      title: e.title,
      content: e.content,
      date: new Date(e.created_at).toLocaleString()
    }));
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `journal-${selectedTab}-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Handle guided mode prompt skip
  const handleSkipPrompt = () => {
    guidedState.skipPrompt();
    setEntry("");
  };

  // Handle guided mode save for later
  const handleSaveForLater = () => {
    guidedState.saveForLater();
    setEntry("");
  };

  // Handle weekly action completion
  const handleCompleteWeeklyAction = (reflection) => {
    markWeeklyActionCompleted(user?.id || "anonymous");
    setWeeklyActionCompleted(true);
    if (reflection) {
      setSuccess("Thank you for reflecting on this week's action!");
    } else {
      setSuccess("Weekly action marked complete!");
    }
    setTimeout(() => setSuccess(""), 3000);
  };

  // Group entries by date
  const groupedEntries = entries.reduce((acc, entry) => {
    const date = new Date(entry.created_at).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  // Filter entries by search
  const filteredGroupedEntries = Object.entries(groupedEntries).reduce((acc, [date, dateEntries]) => {
    const filtered = dateEntries.filter(j =>
      search.trim() ? j.content?.toLowerCase().includes(search.toLowerCase()) : true
    );
    if (filtered.length > 0) acc[date] = filtered;
    return acc;
  }, {});

  return (
    <div className="h-screen flex bg-white font-body">
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <ClientTopbar user={user} />
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-6 py-3 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 space-y-3">
                {/* Header Section */}
                <section className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-xl p-4 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src="/veterancommunity.png" 
                      alt="Background" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-white mb-1">Journal</h1>
                      <p className="text-white/90 text-xs">Reflect, grow, and track your journey • Your journal is private</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewMode(viewMode === "list" ? "card" : "list")}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white text-sm"
                        title={`Switch to ${viewMode === "list" ? "card" : "list"} view`}
                      >
                        {viewMode === "list" ? <FaTh /> : <FaList />}
                      </button>
                      {entries.length > 0 && (
                        <button
                          onClick={handleExport}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-xs font-medium text-white"
                        >
                          <FaDownload size={10} />
                          Export
                        </button>
                      )}
                    </div>
                  </div>
                </section>

                {/* Journal Mode Toggle */}
                <JournalModeToggle mode={journalMode} setMode={(mode) => {
                  setJournalMode(mode);
                  setEntry("");
                  setEditingEntry(null);
                }} />

                {/* Success/Error Messages */}
                {success && (
                  <div className="p-2 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2 text-xs">
                    <span>✓</span>
                    {success}
                  </div>
                )}
                {error && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2 text-xs">
                    <span>⚠</span>
                    {error}
                  </div>
                )}

                {/* Tabs - Show only for Free Write mode */}
                {journalMode === "free" && (
                  <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          setSelectedTab(tab.key);
                          setEntry("");
                          setEditingEntry(null);
                        }}
                        className={`px-3 py-1.5 rounded-lg border-2 transition-all font-semibold text-[11px]
                          ${selectedTab === tab.key
                            ? "bg-[#002147] text-white border-[#002147] shadow-sm"
                            : "bg-white text-gray-700 border-gray-300 hover:border-orange-500"}
                        `}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Entry Form Section */}
                <section className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                  {/* Weekly Action Card - Show in both modes if eligible */}
                  {weeklyAction && !weeklyActionCompleted && (
                    <WeeklyActionCard
                      weeklyAction={weeklyAction}
                      onComplete={handleCompleteWeeklyAction}
                      isCompleted={weeklyActionCompleted}
                    />
                  )}

                  {/* Guided Prompt Card - Show only in guided mode */}
                  {journalMode === "guided" && guidedState.isInitialized && guidedState.currentPrompt && (
                    <GuidedPromptCard
                      prompt={guidedState.currentPrompt}
                      onSkip={handleSkipPrompt}
                      onSaveForLater={handleSaveForLater}
                    />
                  )}

                  {/* Journaling Tips Panel - Show in both modes */}
                  <JournalingTipsPanel />

                  {editingEntry && (
                    <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[10px]">
                        <FaEdit size={10} />
                        Editing entry from {new Date(editingEntry.created_at).toLocaleString()}
                      </span>
                      <button
                        onClick={handleCancelEdit}
                        className="text-blue-600 hover:text-blue-800 underline text-[10px] font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="relative">
                    <textarea
                      value={entry}
                      onChange={(e) => setEntry(e.target.value)}
                        placeholder={journalMode === "guided" 
                          ? "Write your thoughts based on this prompt..."
                          : `What's on your mind for ${tabs.find(t => t.key === selectedTab)?.label}?`
                        }
                        className="w-full p-3 min-h-[100px] resize-none border-2 border-gray-300 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none rounded-lg text-gray-900 leading-relaxed text-sm"
                    ></textarea>
                      <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 bg-white px-1.5 py-0.5 rounded">
                        {wordCount} {wordCount === 1 ? 'word' : 'words'}
                      </div>
                    </div>
                    
                    {/* Action Bar */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-[10px] text-gray-600 flex items-center gap-1.5">
                        <FaCalendarAlt className="text-orange-500" size={10} />
                        <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                      <div className="flex gap-2">
                        {editingEntry && (
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-3 py-1.5 text-[11px] rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all font-semibold"
                          >
                            Cancel
                          </button>
                        )}
                      <button
                        type="submit"
                        disabled={!entry.trim() || loading}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] rounded-lg transition-all font-semibold shadow-sm
                          ${entry.trim() && !loading
                              ? "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                        `}
                      >
                          <FaSave size={10} />
                          {loading ? "Saving..." : editingEntry ? "Update" : "Save"}
                      </button>
                      </div>
                    </div>
                  </form>
                </section>
                {/* Activity Section */}
                <section className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-[#002147] flex items-center gap-1.5">
                      <FaBook className="text-orange-500" size={12} />
                      Past Entries
                      {entries.length > 0 && (
                        <span className="text-[10px] font-normal text-gray-500">({entries.length})</span>
                      )}
                    </h2>
                  </div>

                  {/* Search bar */}
                  <div className="mb-3">
                    <div className="relative">
                      <FaSearch className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={10} />
                    <input
                      type="text"
                        placeholder="Search your entries..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                        className="w-full border-2 border-gray-300 rounded-lg pl-8 pr-3 py-1.5 text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Entries List */}
                  {loading ? (
                    <div className="text-center text-gray-400 py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002147] mx-auto mb-2"></div>
                      <p className="text-[10px]">Loading entries...</p>
                    </div>
                  ) : Object.keys(filteredGroupedEntries).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(filteredGroupedEntries).map(([date, dateEntries]) => (
                        <div key={date}>
                          <h3 className="text-[10px] font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
                            <FaCalendarAlt className="text-orange-500" size={10} />
                            {date}
                          </h3>
                          {viewMode === "list" ? (
                            <div className="space-y-2">
                              {dateEntries.map((j) => (
                                <div key={j.id} className="border-l-3 border-[#002147] pl-3 py-2 bg-blue-50/50 rounded-lg hover:bg-blue-50 transition-all group">
                                  <div className="flex justify-between items-start gap-3">
                                    <div className="flex-1">
                                      <div className="text-gray-900 text-[11px] whitespace-pre-line leading-relaxed mb-1.5">
                                        {j.content?.length > 150 ? j.content.substring(0, 150) + '...' : j.content}
                                      </div>
                                      <div className="text-[9px] text-gray-500 font-medium">
                                        {j.created_at ? new Date(j.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                                      </div>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button
                                        onClick={() => handleEdit(j)}
                                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                        title="Edit"
                                      >
                                        <FaEdit size={10} />
                                      </button>
                                      <button
                                        onClick={() => setShowDeleteConfirm(j.id)}
                                        className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                                        title="Delete"
                                      >
                                        <FaTrash size={10} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {dateEntries.map((j) => (
                                <div key={j.id} className="border border-gray-200 rounded-lg p-2.5 hover:shadow-md transition-all group bg-white">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="text-[9px] text-gray-500 font-medium">
                                      {j.created_at ? new Date(j.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button
                                        onClick={() => handleEdit(j)}
                                        className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                        title="Edit"
                                      >
                                        <FaEdit size={9} />
                                      </button>
                                      <button
                                        onClick={() => setShowDeleteConfirm(j.id)}
                                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                                        title="Delete"
                                      >
                                        <FaTrash size={9} />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="text-gray-900 text-[11px] whitespace-pre-line leading-relaxed">
                                    {j.content?.length > 100 ? j.content.substring(0, 100) + '...' : j.content}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : entries.length === 0 ? (
                    <div className="text-center border-2 border-dashed border-gray-300 rounded-xl py-8 px-4 bg-gray-50">
                      <div className="flex justify-center mb-3">
                        <div className="p-3 bg-gray-200 rounded-full">
                          <FaBook className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <p className="font-semibold text-gray-700 text-sm mb-1">Start Your Journey</p>
                      <p className="text-[10px] text-gray-500">
                        Begin documenting your thoughts and experiences.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-6">
                      <FaSearch className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-600 text-[10px]">No entries match your search.</p>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-4 w-full max-w-sm shadow-2xl relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-red-100 rounded-full">
                <FaTrash className="text-red-500" size={12} />
              </div>
              <h2 className="text-sm font-bold text-[#002147]">Delete Entry</h2>
            </div>
            <p className="text-gray-600 mb-4 text-[11px]">
              Are you sure you want to delete this entry? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1.5 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold text-[11px] transition-all"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold text-[11px] transition-all shadow-sm"
                onClick={() => handleDelete(showDeleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
