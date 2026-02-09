"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Sidebar from "../../../../components/dashboardcomponents/sidebar";
import ClientTopbar from "../../../../components/dashboardcomponents/clienttopbar";
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
  FaLightbulb,
  FaTasks,
  FaEye,
  FaLock,
  FaClock,
  FaCamera,
} from "react-icons/fa";
import { journalService } from "../../../services/api/journal.service";
import journalPrompts from "../../../data/journalPrompts.json";
import weeklyActions from "../../../data/weeklyActions.json";

// Helpers for 365 Journal Writing Ideas (Rossi Fox)
function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 864e5;
  return Math.min(365, Math.max(1, Math.floor(diff / oneDay) + 1));
}
function getWeekOfYear() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.min(52, Math.max(1, Math.ceil((((d - yearStart) / 864e5) + 1) / 7)));
}
function formatTimeRemaining(hours) {
  if (hours === null) return "";
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  return `${h}h ${m}m`;
}
function formatDaysRemaining(days) {
  if (days === null) return "";
  const d = Math.floor(days);
  const h = Math.floor((days - d) * 24);
  if (d > 0) {
    return `${d}d ${h}h`;
  }
  return `${h}h`;
}

const tabs = [
  { key: "growth", label: "365 Growth Journal" },
  { key: "weekly", label: "Weekly Actions" },
  { key: "selfie", label: "100 Day Selfie Journal" },
];

export default function JournalUI() {
  const [selectedTab, setSelectedTab] = useState("growth");
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
  const [growthPromptOverride, setGrowthPromptOverride] = useState(null); // { number, text } when user picks "Another prompt"
  const [currentUserDay, setCurrentUserDay] = useState(1); // Track user's current day for growth prompts
  const [viewingEntry, setViewingEntry] = useState(null); // For viewing full entry details
  const [canWriteToday, setCanWriteToday] = useState(true); // Check if 24 hours have passed (growth)
  const [timeUntilNext, setTimeUntilNext] = useState(null); // Time remaining until next prompt (growth)
  const [showGrowthCooldownProminent, setShowGrowthCooldownProminent] = useState(true); // Full toast for 5s, then small text
  const growthCooldownToastCollapsedRef = useRef(false); // So toast shows only once per cooldown
  const [canWriteWeekly, setCanWriteWeekly] = useState(true); // Check if 7 days have passed (weekly)
  const [timeUntilNextWeek, setTimeUntilNextWeek] = useState(null); // Time remaining until next weekly
  const [currentUserWeek, setCurrentUserWeek] = useState(1); // Track user's current week for weekly review
  const [showWeeklyCooldownProminent, setShowWeeklyCooldownProminent] = useState(true);
  const weeklyCooldownToastCollapsedRef = useRef(false);
  // 100 Day Selfie Journal
  const [currentUserSelfieDay, setCurrentUserSelfieDay] = useState(1);
  const [canWriteSelfieToday, setCanWriteSelfieToday] = useState(true);
  const [timeUntilNextSelfie, setTimeUntilNextSelfie] = useState(null);
  const [showSelfieCooldownProminent, setShowSelfieCooldownProminent] = useState(true);
  const selfieCooldownToastCollapsedRef = useRef(false);
  const [selfieImage, setSelfieImage] = useState(null); // data URL for current form

  // 365 prompts: today's prompt or override; weekly action for this week
  const dayOfYear = getDayOfYear();
  const weekOfYear = getWeekOfYear();
  
  // Calculate day numbers for growth entries based on created_at order (frontend workaround)
  // Since backend doesn't store day_number, we calculate it from chronological order
  const entriesWithDayNumbers = useMemo(() => {
    if (selectedTab !== "growth") return entries;
    
    // Sort entries by created_at (oldest first) to assign day numbers
    const sortedByDate = [...entries].sort((a, b) => 
      new Date(a.created_at) - new Date(b.created_at)
    );
    
    // Assign day numbers based on order
    return sortedByDate.map((entry, index) => ({
      ...entry,
      day_number: index + 1,
      prompt_number: ((index) % journalPrompts.length) + 1 // Cycle through 365 prompts
    }));
  }, [entries, selectedTab]);

  // Calculate current user day based on growth entries count
  useEffect(() => {
    if (selectedTab === "growth") {
      // Next day is simply entries count + 1
      const totalGrowthEntries = entries.length;
      setCurrentUserDay(totalGrowthEntries + 1);
    }
  }, [selectedTab, entries]);

  // Check if 24 hours have passed since last growth entry
  useEffect(() => {
    if (selectedTab === "growth" && entries.length > 0) {
      // Sort to get the most recent entry
      const sortedEntries = [...entries].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      
      const lastEntry = sortedEntries[0];
      const lastEntryTime = new Date(lastEntry.created_at);
      const now = new Date();
      const hoursSinceLastEntry = (now - lastEntryTime) / (1000 * 60 * 60);
      
      if (hoursSinceLastEntry < 24) {
        setCanWriteToday(false);
        const hoursLeft = 24 - hoursSinceLastEntry;
        setTimeUntilNext(hoursLeft);
      } else {
        setCanWriteToday(true);
        setTimeUntilNext(null);
      }
    } else if (selectedTab === "growth") {
      setCanWriteToday(true);
      setTimeUntilNext(null);
    }
  }, [selectedTab, entries]);

  // Update countdown timer every minute (growth prompts)
  useEffect(() => {
    if (selectedTab === "growth" && !canWriteToday && timeUntilNext !== null) {
      const timer = setInterval(() => {
        setTimeUntilNext(prev => {
          if (prev <= 0) {
            setCanWriteToday(true);
            return null;
          }
          return prev - (1/60); // Subtract 1 minute in hours
        });
      }, 60000); // Update every minute

      return () => clearInterval(timer);
    }
  }, [selectedTab, canWriteToday, timeUntilNext]);

  // Growth cooldown: show full "toast" for 5s once per cooldown, then collapse to small text
  useEffect(() => {
    if (canWriteToday) {
      growthCooldownToastCollapsedRef.current = false;
      setShowGrowthCooldownProminent(true);
      return;
    }
    if (selectedTab === "growth" && !canWriteToday && timeUntilNext !== null && !growthCooldownToastCollapsedRef.current) {
      setShowGrowthCooldownProminent(true);
      const t = setTimeout(() => {
        setShowGrowthCooldownProminent(false);
        growthCooldownToastCollapsedRef.current = true;
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [selectedTab, canWriteToday, timeUntilNext]);

  // ===== WEEKLY REVIEW TRACKING =====
  
  // Calculate week numbers for weekly entries based on created_at order (frontend workaround)
  const weeklyEntriesWithWeekNumbers = useMemo(() => {
    if (selectedTab !== "weekly") return entries;
    
    // Sort entries by created_at (oldest first) to assign week numbers
    const sortedByDate = [...entries].sort((a, b) => 
      new Date(a.created_at) - new Date(b.created_at)
    );
    
    // Assign week numbers based on order
    return sortedByDate.map((entry, index) => ({
      ...entry,
      week_number: index + 1
    }));
  }, [entries, selectedTab]);

  // Calculate current user week based on weekly entries count
  useEffect(() => {
    if (selectedTab === "weekly") {
      const totalWeeklyEntries = entries.length;
      setCurrentUserWeek(totalWeeklyEntries + 1);
    }
  }, [selectedTab, entries]);

  // Check if 7 days have passed since last weekly entry
  useEffect(() => {
    if (selectedTab === "weekly" && entries.length > 0) {
      // Sort to get the most recent entry
      const sortedEntries = [...entries].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      
      const lastEntry = sortedEntries[0];
      const lastEntryTime = new Date(lastEntry.created_at);
      const now = new Date();
      const daysSinceLastEntry = (now - lastEntryTime) / (1000 * 60 * 60 * 24);
      
      if (daysSinceLastEntry < 7) {
        setCanWriteWeekly(false);
        const daysLeft = 7 - daysSinceLastEntry;
        setTimeUntilNextWeek(daysLeft);
      } else {
        setCanWriteWeekly(true);
        setTimeUntilNextWeek(null);
      }
    } else if (selectedTab === "weekly") {
      setCanWriteWeekly(true);
      setTimeUntilNextWeek(null);
    }
  }, [selectedTab, entries]);

  // Update countdown timer every hour (weekly review)
  useEffect(() => {
    if (selectedTab === "weekly" && !canWriteWeekly && timeUntilNextWeek !== null) {
      const timer = setInterval(() => {
        setTimeUntilNextWeek(prev => {
          if (prev <= 0) {
            setCanWriteWeekly(true);
            return null;
          }
          return prev - (1/24); // Subtract 1 hour in days
        });
      }, 3600000); // Update every hour

      return () => clearInterval(timer);
    }
  }, [selectedTab, canWriteWeekly, timeUntilNextWeek]);

  // Weekly cooldown: show full toast for 5s once per cooldown, then small text
  useEffect(() => {
    if (canWriteWeekly) {
      weeklyCooldownToastCollapsedRef.current = false;
      setShowWeeklyCooldownProminent(true);
      return;
    }
    if (selectedTab === "weekly" && !canWriteWeekly && timeUntilNextWeek !== null && !weeklyCooldownToastCollapsedRef.current) {
      setShowWeeklyCooldownProminent(true);
      const t = setTimeout(() => {
        setShowWeeklyCooldownProminent(false);
        weeklyCooldownToastCollapsedRef.current = true;
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [selectedTab, canWriteWeekly, timeUntilNextWeek]);

  // ===== 100 DAY SELFIE JOURNAL TRACKING =====
  const selfieEntriesWithDayNumbers = useMemo(() => {
    if (selectedTab !== "selfie") return entries;
    const sortedByDate = [...entries].sort((a, b) =>
      new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedByDate.map((entry, index) => ({
      ...entry,
      day_number: index + 1,
    }));
  }, [entries, selectedTab]);

  useEffect(() => {
    if (selectedTab === "selfie") {
      setCurrentUserSelfieDay(entries.length + 1);
    }
  }, [selectedTab, entries]);

  useEffect(() => {
    if (selectedTab === "selfie" && entries.length > 0) {
      const sortedEntries = [...entries].sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      );
      const lastEntry = sortedEntries[0];
      const lastEntryTime = new Date(lastEntry.created_at);
      const now = new Date();
      const hoursSinceLastEntry = (now - lastEntryTime) / (1000 * 60 * 60);
      if (hoursSinceLastEntry < 24) {
        setCanWriteSelfieToday(false);
        setTimeUntilNextSelfie(24 - hoursSinceLastEntry);
      } else {
        setCanWriteSelfieToday(true);
        setTimeUntilNextSelfie(null);
      }
    } else if (selectedTab === "selfie") {
      setCanWriteSelfieToday(true);
      setTimeUntilNextSelfie(null);
    }
  }, [selectedTab, entries]);

  useEffect(() => {
    if (selectedTab === "selfie" && !canWriteSelfieToday && timeUntilNextSelfie !== null) {
      const timer = setInterval(() => {
        setTimeUntilNextSelfie((prev) => {
          if (prev <= 0) {
            setCanWriteSelfieToday(true);
            return null;
          }
          return prev - 1 / 60;
        });
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [selectedTab, canWriteSelfieToday, timeUntilNextSelfie]);

  // Selfie cooldown: show full toast for 5s once per cooldown, then small text
  useEffect(() => {
    if (canWriteSelfieToday) {
      selfieCooldownToastCollapsedRef.current = false;
      setShowSelfieCooldownProminent(true);
      return;
    }
    if (selectedTab === "selfie" && !canWriteSelfieToday && timeUntilNextSelfie !== null && !selfieCooldownToastCollapsedRef.current) {
      setShowSelfieCooldownProminent(true);
      const t = setTimeout(() => {
        setShowSelfieCooldownProminent(false);
        selfieCooldownToastCollapsedRef.current = true;
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [selectedTab, canWriteSelfieToday, timeUntilNextSelfie]);

  // Reset selfie image when switching away from selfie tab
  useEffect(() => {
    if (selectedTab !== "selfie") setSelfieImage(null);
  }, [selectedTab]);

  const todayPrompt = useMemo(() => {
    if (growthPromptOverride) return growthPromptOverride;
    const idx = (currentUserDay - 1) % journalPrompts.length;
    const p = journalPrompts[idx];
    return p ? { number: p.number, text: p.text, dayNumber: currentUserDay } : null;
  }, [growthPromptOverride, currentUserDay]);
  
  // Use user's current week instead of calendar week
  const thisWeekAction = useMemo(() => {
    const idx = (currentUserWeek - 1) % weeklyActions.length;
    const action = weeklyActions[idx];
    return action ? { ...action, weekNumber: currentUserWeek } : null;
  }, [currentUserWeek]);

  const handleAnotherPrompt = () => {
    // Only allow advancing if current entry is filled
    if (!entry.trim()) return;
    
    // Get the next sequential prompt
    const nextDay = growthPromptOverride ? growthPromptOverride.dayNumber + 1 : currentUserDay + 1;
    const idx = (nextDay - 1) % journalPrompts.length;
    const p = journalPrompts[idx];
    if (p) {
      // Clear the entry when moving to next prompt
      if (window.confirm('Moving to the next prompt will clear your current entry. Make sure to save first if you want to keep it. Continue?')) {
        setEntry("");
        setWordCount(0);
        setGrowthPromptOverride({ number: p.number, text: p.text, dayNumber: nextDay });
      }
    }
  };

  // Reset prompt override when switching away from Growth Prompts
  useEffect(() => {
    if (selectedTab !== "growth") setGrowthPromptOverride(null);
  }, [selectedTab]);

  // Calculate word count
  useEffect(() => {
    const words = entry.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  }, [entry]);

  // Fetch journals on tab change
  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await journalService.getJournals();
      const tabLabel = tabs.find((t) => t.key === selectedTab)?.label;
      const filtered = data.filter((j) => {
        if (selectedTab === "weekly") return j.title === "Weekly Actions" || j.title === "Weekly Review";
        if (selectedTab === "growth") return j.title === "365 Growth Journal" || j.title === "Growth Prompts";
        return j.title === tabLabel;
      });
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
    if (selectedTab === "selfie" && !selfieImage && !entry.trim()) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const tabLabel = tabs.find((t) => t.key === selectedTab)?.label;

      let content = entry;
      let day_number;
      if (selectedTab === "growth" && todayPrompt) {
        day_number = todayPrompt.dayNumber;
      }
      if (selectedTab === "selfie") {
        content = JSON.stringify({ note: entry.trim() || "", selfie: selfieImage || "" });
        day_number = currentUserSelfieDay;
      }

      const journalData = {
        title: tabLabel,
        content,
        ...(day_number != null && { day_number }),
        ...(selectedTab === "growth" && todayPrompt && { prompt_number: todayPrompt.number }),
      };

      if (editingEntry) {
        await journalService.updateJournal(editingEntry.id, journalData);
        setSuccess("Entry updated successfully!");
        setEditingEntry(null);
      } else {
        await journalService.addJournal(journalData);
        setSuccess("Entry saved successfully!");
      }
      setEntry("");
      setWordCount(0);
      setGrowthPromptOverride(null);
      setSelfieImage(null);
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
    if (selectedTab === "selfie") {
      try {
        const parsed = typeof entryToEdit.content === "string" && entryToEdit.content.startsWith("{")
          ? JSON.parse(entryToEdit.content)
          : { note: entryToEdit.content || "", selfie: "" };
        setEntry(parsed.note || "");
        setSelfieImage(parsed.selfie || null);
      } catch {
        setEntry(entryToEdit.content || "");
        setSelfieImage(null);
      }
    } else {
      setEntry(entryToEdit.content);
      setSelfieImage(null);
    }
    setEditingEntry(entryToEdit);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEntry("");
    setEditingEntry(null);
    setWordCount(0);
    if (selectedTab === "selfie") setSelfieImage(null);
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

  // Group entries by date (use calculated numbers for growth, weekly, selfie tabs)
  const entriesToDisplay = selectedTab === "growth"
    ? entriesWithDayNumbers
    : selectedTab === "weekly"
      ? weeklyEntriesWithWeekNumbers
      : selectedTab === "selfie"
        ? selfieEntriesWithDayNumbers
        : entries;
  
  const groupedEntries = entriesToDisplay.reduce((acc, entry) => {
    const date = new Date(entry.created_at).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  // Filter entries by search
  const filteredGroupedEntries = Object.entries(groupedEntries).reduce((acc, [date, dateEntries]) => {
    const filtered = dateEntries.filter((j) => {
      if (!search.trim()) return true;
      if (selectedTab === "selfie") {
        try {
          const parsed = typeof j.content === "string" && j.content.startsWith("{") ? JSON.parse(j.content) : { note: j.content || "" };
          return (parsed.note || "").toLowerCase().includes(search.toLowerCase());
        } catch {
          return (j.content || "").toLowerCase().includes(search.toLowerCase());
        }
      }
      return (j.content || "").toLowerCase().includes(search.toLowerCase());
    });
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
                      <p className="text-white/90 text-xs">Reflect, grow, and track your journey</p>
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

                {/* Tabs */}
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

                {/* 365 Journal: Daily prompt (Growth Prompts) */}
                {selectedTab === "growth" && (
                  <>
                    {/* Progress Indicator */}
                    {entries.length > 0 && (
                      <section className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-green-100">
                              <FaTasks className="text-green-600" size={14} />
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-green-800 uppercase tracking-wide">
                                Your Progress
                              </p>
                              <p className="text-sm font-bold text-[#002147]">
                                {entries.length} {entries.length === 1 ? 'day' : 'days'} completed
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-gray-600">Next up</p>
                            <p className="text-sm font-bold text-orange-600">Day {currentUserDay}</p>
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Locked State - Waiting for 24 hours */}
                    {!canWriteToday && timeUntilNext !== null ? (
                      showGrowthCooldownProminent ? (
                        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 shadow-sm text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 rounded-full bg-blue-100">
                              <FaLock className="text-blue-600" size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-[#002147] mb-1">
                                Great Work on Day {currentUserDay - 1}! 🎉
                              </h3>
                              <p className="text-sm text-gray-700 mb-3">
                                You&apos;ve completed today&apos;s prompt. Come back tomorrow to continue your journey.
                              </p>
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <FaClock className="text-orange-500" size={16} />
                                <p className="text-lg font-bold text-orange-600">
                                  Next prompt available in: {formatTimeRemaining(timeUntilNext)}
                                </p>
                              </div>
                              <p className="text-xs text-gray-500">
                                Journaling daily builds consistency and helps you reflect on your growth.
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                const pastEntriesSection = document.querySelector('[data-section="past-entries"]');
                                if (pastEntriesSection) {
                                  pastEntriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }}
                              className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-semibold shadow-sm"
                            >
                              <FaBook size={12} />
                              View Your Past Entries
                            </button>
                          </div>
                        </section>
                      ) : (
                        <section className="bg-blue-50/80 border border-blue-200 rounded-lg px-3 py-2">
                          <p className="text-xs text-gray-600">
                            The next prompt will appear here after the 24-hour cooldown.
                          </p>
                        </section>
                      )
                    ) : todayPrompt ? (
                      /* Unlocked State - Ready to write */
                      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-xl p-3 shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 min-w-0">
                            <div className="p-1.5 rounded-lg bg-orange-100 shrink-0">
                              <FaLightbulb className="text-orange-600" size={14} />
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-orange-800 uppercase tracking-wide mb-0.5">
                                Day {todayPrompt.dayNumber} · 365 Days of Journaling 
                              </p>
                              <p className="text-[11px] font-semibold text-[#002147] mb-1">
                                Prompt #{todayPrompt.number}
                              </p>
                              <p className="text-gray-800 text-sm leading-relaxed">
                                {todayPrompt.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    ) : null}
                  </>
                )}

                {/* 365 Journal: Weekly action (Weekly Review) */}
                {selectedTab === "weekly" && (
                  <>
                    {/* Weekly Progress Indicator */}
                    {entries.length > 0 && (
                      <section className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-purple-100">
                              <FaTasks className="text-purple-600" size={14} />
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-purple-800 uppercase tracking-wide">
                                Your Progress
                              </p>
                              <p className="text-sm font-bold text-[#002147]">
                                {entries.length} {entries.length === 1 ? 'week' : 'weeks'} completed
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-gray-600">Next up</p>
                            <p className="text-sm font-bold text-blue-600">Week {currentUserWeek}</p>
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Locked State - Waiting for 7 days */}
                    {!canWriteWeekly && timeUntilNextWeek !== null ? (
                      showWeeklyCooldownProminent ? (
                        <section className="bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-300 rounded-xl p-6 shadow-sm text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 rounded-full bg-purple-100">
                              <FaLock className="text-purple-600" size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-[#002147] mb-1">
                                Great Work on Week {currentUserWeek - 1}! 🎉
                              </h3>
                              <p className="text-sm text-gray-700 mb-3">
                                You&apos;ve completed this week&apos;s action. Come back next week to continue your journey.
                              </p>
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <FaClock className="text-blue-500" size={16} />
                                <p className="text-lg font-bold text-blue-600">
                                  Next action available in: {formatDaysRemaining(timeUntilNextWeek)}
                                </p>
                              </div>
                              <p className="text-xs text-gray-500">
                                Weekly reflection builds long-term habits and helps you track your growth over time.
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                const pastEntriesSection = document.querySelector('[data-section="past-entries"]');
                                if (pastEntriesSection) {
                                  pastEntriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }}
                              className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors text-sm font-semibold shadow-sm"
                            >
                              <FaBook size={12} />
                              View Your Past Entries
                            </button>
                          </div>
                        </section>
                      ) : (
                        <section className="bg-purple-50/80 border border-purple-200 rounded-lg px-3 py-2">
                          <p className="text-xs text-gray-600">
                            The next action will appear here after the 7-day cooldown.
                          </p>
                        </section>
                      )
                    ) : thisWeekAction ? (
                      /* Unlocked State - Ready to write weekly action */
                      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="p-1.5 rounded-lg bg-blue-100 shrink-0">
                            <FaTasks className="text-blue-600" size={14} />
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-blue-800 uppercase tracking-wide mb-0.5">
                              Week {thisWeekAction.weekNumber} · 52 Weeks of Journal Writing 
                            </p>
                            <p className="text-[11px] font-semibold text-[#002147] mb-1">
                              Action #{thisWeekAction.week}
                            </p>
                            <p className="text-gray-800 text-sm leading-relaxed">
                              {thisWeekAction.text}
                            </p>
                          </div>
                        </div>
                      </section>
                    ) : null}
                  </>
                )}

                {/* 100 Day Selfie Journal */}
                {selectedTab === "selfie" && (
                  <>
                    {entries.length > 0 && (
                      <section className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-rose-100">
                              <FaCamera className="text-rose-600" size={14} />
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-rose-800 uppercase tracking-wide">
                                Your Progress
                              </p>
                              <p className="text-sm font-bold text-[#002147]">
                                {entries.length} of 100 days
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-gray-600">Next up</p>
                            <p className="text-sm font-bold text-rose-600">Day {currentUserSelfieDay}</p>
                          </div>
                        </div>
                      </section>
                    )}

                    {!canWriteSelfieToday && timeUntilNextSelfie !== null ? (
                      showSelfieCooldownProminent ? (
                        <section className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-xl p-6 shadow-sm text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 rounded-full bg-rose-100">
                              <FaLock className="text-rose-600" size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-[#002147] mb-1">
                                Great selfie on Day {currentUserSelfieDay - 1}! 🎉
                              </h3>
                              <p className="text-sm text-gray-700 mb-3">
                                Come back in 24 hours for your next day.
                              </p>
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <FaClock className="text-rose-500" size={16} />
                                <p className="text-lg font-bold text-rose-600">
                                  Next selfie in: {formatTimeRemaining(timeUntilNextSelfie)}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                const pastEntriesSection = document.querySelector('[data-section="past-entries"]');
                                if (pastEntriesSection) pastEntriesSection.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                              className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors text-sm font-semibold shadow-sm"
                            >
                              <FaBook size={12} />
                              View Your Past Selfies
                            </button>
                          </div>
                        </section>
                      ) : (
                        <section className="bg-rose-50/80 border border-rose-200 rounded-lg px-3 py-2">
                          <p className="text-xs text-gray-600">
                            The next selfie day will appear here after the 24-hour cooldown.
                          </p>
                        </section>
                      )
                    ) : currentUserSelfieDay <= 100 ? (
                      <section className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-3 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="p-1.5 rounded-lg bg-rose-100 shrink-0">
                            <FaCamera className="text-rose-600" size={14} />
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-rose-800 uppercase tracking-wide mb-0.5">
                              Day {currentUserSelfieDay} of 100 · 100 Day Selfie Journal
                            </p>
                            <p className="text-gray-800 text-sm leading-relaxed">
                              Add a selfie and an optional note to track your journey.
                            </p>
                          </div>
                        </div>
                      </section>
                    ) : (
                      <section className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm text-center">
                        <h3 className="text-lg font-bold text-[#002147] mb-1">🎉 You completed 100 days!</h3>
                        <p className="text-sm text-gray-700">View your past selfies below.</p>
                      </section>
                    )}
                  </>
                )}

                {/* Entry Form Section */}
                {((selectedTab !== "growth" || canWriteToday) && (selectedTab !== "weekly" || canWriteWeekly) && (selectedTab !== "selfie" || (canWriteSelfieToday && currentUserSelfieDay <= 100))) && (
                  <section className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
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
                    {selectedTab === "selfie" && (
                      <div className="mb-3">
                        <label className="block text-[10px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Selfie (optional note below)</label>
                        <div className="flex flex-col sm:flex-row gap-2 items-start">
                          <label className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-gray-300 hover:border-rose-400 bg-white text-gray-700 text-[11px] font-semibold transition-colors">
                            <FaCamera className="text-rose-500" size={14} />
                            {selfieImage ? "Change photo" : "Choose photo"}
                            <input
                              type="file"
                              accept="image/*"
                              capture="user"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = () => setSelfieImage(reader.result);
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          {selfieImage && (
                            <div className="relative">
                              <img src={selfieImage} alt="Selfie preview" className="h-20 w-20 object-cover rounded-lg border-2 border-rose-200" />
                              <button
                                type="button"
                                onClick={() => setSelfieImage(null)}
                                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="relative">
                    <textarea
                      value={entry}
                      onChange={(e) => setEntry(e.target.value)}
                        placeholder={
                          selectedTab === "growth" && todayPrompt
                            ? `Reflect on today's prompt above...`
                            : selectedTab === "weekly" && thisWeekAction
                            ? `Reflect on this week's action above...`
                            : selectedTab === "selfie"
                            ? `Add an optional note for today's selfie...`
                            : `What's on your mind for ${tabs.find(t => t.key === selectedTab)?.label}?`
                        }
                        className="w-full p-3 min-h-[100px] resize-none border-2 border-gray-300 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none rounded-lg text-gray-900 leading-relaxed text-sm"
                    ></textarea>
                      {selectedTab !== "selfie" && (
                        <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 bg-white px-1.5 py-0.5 rounded">
                          {wordCount} {wordCount === 1 ? "word" : "words"}
                        </div>
                      )}
                      {selectedTab === "selfie" && (
                        <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 bg-white px-1.5 py-0.5 rounded">
                          {wordCount} words
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-[10px] text-gray-600 flex items-center gap-1.5">
                        <FaCalendarAlt className="text-orange-500" size={10} />
                        <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
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
                          disabled={(selectedTab === "selfie" ? !selfieImage && !entry.trim() : !entry.trim()) || loading}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] rounded-lg transition-all font-semibold shadow-sm
                            ${(selectedTab === "selfie" ? (selfieImage || entry.trim()) : entry.trim()) && !loading
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
                )}
                {/* Activity Section */}
                <section className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow" data-section="past-entries">
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
                                    <div 
                                      className="flex-1 cursor-pointer"
                                      onClick={() => setViewingEntry(j)}
                                    >
                                      {/* Show day/prompt info for growth entries */}
                                      {selectedTab === "growth" && j.day_number && (
                                        <div className="mb-1.5 flex items-center gap-2">
                                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-orange-100 text-orange-700">
                                            Day {j.day_number}
                                          </span>
                                          <span className="text-[9px] text-gray-500 font-medium">
                                            Prompt #{j.prompt_number || j.day_number}
                                          </span>
                                        </div>
                                      )}
                                      {/* Show week info for weekly entries */}
                                      {selectedTab === "weekly" && j.week_number && (
                                        <div className="mb-1.5 flex items-center gap-2">
                                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-100 text-purple-700">
                                            Week {j.week_number}
                                          </span>
                                          <span className="text-[9px] text-gray-500 font-medium">
                                            Action #{j.week_number}
                                          </span>
                                        </div>
                                      )}
                                      {/* Show day + thumbnail for selfie entries */}
                                      {selectedTab === "selfie" && j.day_number && (() => {
                                        let parsed = { note: "", selfie: "" };
                                        try {
                                          if (typeof j.content === "string" && j.content.startsWith("{")) parsed = JSON.parse(j.content);
                                          else parsed = { note: j.content || "", selfie: "" };
                                        } catch {}
                                        return (
                                          <div className="mb-1.5 flex items-center gap-2 flex-wrap">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700">
                                              Day {j.day_number}
                                            </span>
                                            {parsed.selfie && (
                                              <img src={parsed.selfie} alt={`Day ${j.day_number}`} className="h-10 w-10 object-cover rounded border border-rose-200" />
                                            )}
                                          </div>
                                        );
                                      })()}
                                      {selectedTab !== "selfie" && (
                                        <div className="text-gray-900 text-[11px] whitespace-pre-line leading-relaxed mb-1.5">
                                          {j.content?.length > 150 ? j.content.substring(0, 150) + "..." : j.content}
                                        </div>
                                      )}
                                      {selectedTab === "selfie" && (() => {
                                        let parsed = { note: "" };
                                        try {
                                          if (typeof j.content === "string" && j.content.startsWith("{")) parsed = JSON.parse(j.content);
                                          else parsed = { note: j.content || "" };
                                        } catch {}
                                        return parsed.note ? (
                                          <div className="text-gray-900 text-[11px] whitespace-pre-line leading-relaxed mb-1.5">
                                            {parsed.note.length > 150 ? parsed.note.substring(0, 150) + "..." : parsed.note}
                                          </div>
                                        ) : null;
                                      })()}
                                      <div className="text-[9px] text-gray-500 font-medium">
                                        {j.created_at ? new Date(j.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                                      </div>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button
                                        onClick={() => setViewingEntry(j)}
                                        className="p-1.5 text-[#002147] hover:bg-blue-100 rounded transition-colors"
                                        title="View"
                                      >
                                        <FaEye size={10} />
                                      </button>
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
                                    <div className="flex-1">
                                      {/* Show day/prompt info for growth entries */}
                                      {selectedTab === "growth" && j.day_number && (
                                        <div className="mb-1.5 flex items-center gap-2">
                                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-orange-100 text-orange-700">
                                            Day {j.day_number}
                                          </span>
                                          <span className="text-[9px] text-gray-500 font-medium">
                                            Prompt #{j.prompt_number || j.day_number}
                                          </span>
                                        </div>
                                      )}
                                      {/* Show week info for weekly entries */}
                                      {selectedTab === "weekly" && j.week_number && (
                                        <div className="mb-1.5 flex items-center gap-2">
                                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-100 text-purple-700">
                                            Week {j.week_number}
                                          </span>
                                          <span className="text-[9px] text-gray-500 font-medium">
                                            Action #{j.week_number}
                                          </span>
                                        </div>
                                      )}
                                      {/* Show day + thumbnail for selfie (card) */}
                                      {selectedTab === "selfie" && j.day_number && (() => {
                                        let parsed = { note: "", selfie: "" };
                                        try {
                                          if (typeof j.content === "string" && j.content.startsWith("{")) parsed = JSON.parse(j.content);
                                          else parsed = { note: j.content || "", selfie: "" };
                                        } catch {}
                                        return (
                                          <div className="mb-1.5 flex items-center gap-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700">
                                              Day {j.day_number}
                                            </span>
                                            {parsed.selfie && (
                                              <img src={parsed.selfie} alt={`Day ${j.day_number}`} className="h-8 w-8 object-cover rounded border border-rose-200" />
                                            )}
                                          </div>
                                        );
                                      })()}
                                      <div className="text-[9px] text-gray-500 font-medium">
                                        {j.created_at ? new Date(j.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                                      </div>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button
                                        onClick={() => setViewingEntry(j)}
                                        className="p-1 text-[#002147] hover:bg-blue-100 rounded transition-colors"
                                        title="View"
                                      >
                                        <FaEye size={9} />
                                      </button>
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
                                  <div
                                    className="text-gray-900 text-[11px] whitespace-pre-line leading-relaxed cursor-pointer"
                                    onClick={() => setViewingEntry(j)}
                                  >
                                    {selectedTab === "selfie"
                                      ? (() => {
                                          let parsed = { note: "" };
                                          try {
                                            if (typeof j.content === "string" && j.content.startsWith("{")) parsed = JSON.parse(j.content);
                                            else parsed = { note: j.content || "" };
                                          } catch {}
                                          return parsed.note ? (parsed.note.length > 100 ? parsed.note.substring(0, 100) + "..." : parsed.note) : "Selfie";
                                        })()
                                      : (j.content?.length > 100 ? j.content.substring(0, 100) + "..." : j.content)}
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

      {/* View Entry Modal */}
      {viewingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <FaBook className="text-[#002147]" size={12} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#002147]">Journal Entry</h2>
                  <p className="text-[10px] text-gray-500">
                    {viewingEntry.created_at ? new Date(viewingEntry.created_at).toLocaleString() : ""}
                  </p>
                </div>
              </div>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setViewingEntry(null)}
              >
                <span className="text-gray-500 text-xl">&times;</span>
              </button>
            </div>

            {/* Show prompt for growth entries */}
            {(viewingEntry.title === "Growth Prompts" || viewingEntry.title === "365 Growth Journal") && viewingEntry.day_number && (
              <div className="mb-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <div className="p-1.5 rounded-lg bg-orange-100 shrink-0">
                    <FaLightbulb className="text-orange-600" size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-orange-100 text-orange-700">
                        Day {viewingEntry.day_number}
                      </span>
                      <span className="text-[11px] font-semibold text-[#002147]">
                        Prompt #{viewingEntry.prompt_number || viewingEntry.day_number}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {journalPrompts[(viewingEntry.day_number - 1) % journalPrompts.length]?.text || "Prompt not found"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Show action for weekly entries */}
            {(viewingEntry.title === "Weekly Actions" || viewingEntry.title === "Weekly Review") && viewingEntry.week_number && (
              <div className="mb-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-100 shrink-0">
                    <FaTasks className="text-purple-600" size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-100 text-purple-700">
                        Week {viewingEntry.week_number}
                      </span>
                      <span className="text-[11px] font-semibold text-[#002147]">
                        Action #{viewingEntry.week_number}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {weeklyActions[(viewingEntry.week_number - 1) % weeklyActions.length]?.text || "Action not found"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 100 Day Selfie Journal entry */}
            {viewingEntry.title === "100 Day Selfie Journal" && viewingEntry.day_number && (() => {
              let parsed = { note: "", selfie: "" };
              try {
                if (typeof viewingEntry.content === "string" && viewingEntry.content.startsWith("{")) parsed = JSON.parse(viewingEntry.content);
                else parsed = { note: viewingEntry.content || "", selfie: "" };
              } catch {}
              return (
                <div className="mb-4 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700">
                      Day {viewingEntry.day_number}
                    </span>
                  </div>
                  {parsed.selfie && (
                    <div className="mb-3">
                      <img src={parsed.selfie} alt={`Day ${viewingEntry.day_number} selfie`} className="max-w-full max-h-80 object-contain rounded-lg border-2 border-rose-200" />
                    </div>
                  )}
                  {parsed.note && (
                    <div className="text-gray-800 text-sm leading-relaxed">{parsed.note}</div>
                  )}
                </div>
              );
            })()}

            {/* Entry content (for growth and weekly; selfie uses block above) */}
            {viewingEntry.title !== "100 Day Selfie Journal" && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Your Response</h3>
                <div className="text-gray-900 text-sm whitespace-pre-line leading-relaxed">
                  {viewingEntry.content}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-3 py-1.5 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold text-[11px] transition-all"
                onClick={() => setViewingEntry(null)}
              >
                Close
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold text-[11px] transition-all shadow-sm"
                onClick={() => {
                  handleEdit(viewingEntry);
                  setViewingEntry(null);
                }}
              >
                <FaEdit size={10} />
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
