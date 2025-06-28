"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../../../../components/dashboardcomponents/sidebar";
import ClientTopbar from "../../../../../components/dashboardcomponents/clienttopbar";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaMinus,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { journalService } from "../../../../services/api/journal.service";

const tabs = [
  { key: "morning", label: "\u2600\ufe0f Morning Mindset" },
  { key: "evening", label: "\ud83c\udf1c Evening Review" },
  { key: "growth", label: "\ud83c\udf3f Growth Prompts" },
  { key: "weekly", label: "\ud83d\udcd3 Weekly Review" },
  { key: "monthly", label: "\ud83d\udcc5 Monthly Review" },
];

export default function JournalUI() {
  const [selectedTab, setSelectedTab] = useState("morning");
  const [entry, setEntry] = useState("");
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [reflectionDraft, setReflectionDraft] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpenReflection = () => {
    setReflectionDraft("");
    setShowReflectionModal(true);
  };
  const handleCloseReflection = () => {
    setShowReflectionModal(false);
  };
  const handleSubmitReflection = () => {
    setEntry(reflectionDraft);
    setShowReflectionModal(false);
  };

  // Fetch journals on tab change
  useEffect(() => {
    setLoading(true);
    setError("");
    journalService.getJournals()
      .then((data) => {
        // Filter by tab label (title)
        const tabLabel = tabs.find((t) => t.key === selectedTab)?.label;
        setEntries(data.filter((j) => j.title === tabLabel));
      })
      .catch(() => setError("Failed to load journal entries."))
      .finally(() => setLoading(false));
  }, [selectedTab]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const tabLabel = tabs.find((t) => t.key === selectedTab)?.label;
      await journalService.addJournal({ title: tabLabel, content: entry });
      setEntry("");
      // Refresh entries
      const data = await journalService.getJournals();
      setEntries(data.filter((j) => j.title === tabLabel));
    } catch {
      setError("Failed to submit journal entry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <ClientTopbar user={user} />
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-10">
                <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4 tracking-tight">Journal</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedTab(tab.key)}
                      className={`relative px-4 py-1.5 text-sm rounded-full border transition-all font-medium flex items-center gap-2
                        ${selectedTab === tab.key
                          ? "bg-white border-primary-500 text-primary-600 shadow-sm"
                          : "bg-gray-100 text-gray-600 border-transparent hover:bg-white hover:text-primary-500"}
                      `}
                      style={{
                        borderBottom: selectedTab === tab.key ? "3px solid #3b82f6" : "none",
                      }}
                    >
                      {tab.key === "morning" && <span className="text-lg"></span>}
                      {tab.key === "evening" && <span className="text-lg"></span>}
                      {tab.key === "growth" && <span className="text-lg"></span>}
                      {tab.key === "weekly" && <span className="text-lg"></span>}
                      {tab.key === "monthly" && <span className="text-lg"></span>}
                      {tab.label}
                    </button>
                  ))}
                </div>
                {/* Entry Form Section */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <form onSubmit={handleSubmit}>
                    <textarea
                      value={entry}
                      onChange={(e) => setEntry(e.target.value)}
                      placeholder="Write your thoughts..."
                      className="w-full p-4 min-h-[120px] resize-none border-b border-gray-100 focus:outline-none rounded-t-lg"
                    ></textarea>
                    {/* Formatting Bar */}
                    <div className="flex items-center gap-3 px-4 py-2 text-gray-500 text-sm border-b border-gray-100">
                      <span className="hover:text-primary-500 cursor-pointer" data-tooltip-id="bold-tip"><FaBold /></span>
                      <Tooltip id="bold-tip" content="Bold" />
                      <span className="hover:text-primary-500 cursor-pointer" data-tooltip-id="italic-tip"><FaItalic /></span>
                      <Tooltip id="italic-tip" content="Italic" />
                      <span className="hover:text-primary-500 cursor-pointer" data-tooltip-id="underline-tip"><FaUnderline /></span>
                      <Tooltip id="underline-tip" content="Underline" />
                      <span className="hover:text-primary-500 cursor-pointer" data-tooltip-id="ul-tip"><FaListUl /></span>
                      <Tooltip id="ul-tip" content="Bullet List" />
                      <span className="hover:text-primary-500 cursor-pointer" data-tooltip-id="ol-tip"><FaListOl /></span>
                      <Tooltip id="ol-tip" content="Numbered List" />
                      <span className="hover:text-primary-500 cursor-pointer" data-tooltip-id="link-tip"><FaLink /></span>
                      <Tooltip id="link-tip" content="Insert Link" />
                      <span className="hover:text-primary-500 cursor-pointer" data-tooltip-id="minus-tip"><FaMinus /></span>
                      <Tooltip id="minus-tip" content="Divider" />
                    </div>
                    {/* Upload */}
                    <div className="px-4 py-3 text-sm text-gray-500 border-b border-gray-100 flex items-center gap-2">
                      <label className="underline cursor-pointer hover:text-primary-500 transition-colors">
                        Drop your image here, or <span className="font-semibold">Browse</span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>
                    {/* Submit Button */}
                    <div className="px-4 py-3 flex justify-end">
                      <button
                        type="submit"
                        disabled={!entry.trim() || loading}
                        className={`px-4 py-1.5 text-sm rounded-md transition-all duration-150 font-medium
                          ${entry.trim() && !loading
                            ? "bg-orange-500 text-white hover:bg-primary/90 cursor-pointer shadow"
                            : "bg-accent text-white opacity-60 cursor-not-allowed"}
                        `}
                      >
                        {loading ? "Submitting..." : entry.trim() ? "Submit" : "Write something to submit"}
                      </button>
                    </div>
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                  </form>
                </section>
                {/* Activity Section */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <h2 className="text-xl font-bold mb-4 text-primary">Activity</h2>
                  {/* Search bar */}
                  <div className="flex items-center mb-4 gap-2">
                    <input
                      type="text"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                    <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                      <option>All</option>
                      <option>Mindset</option>
                      <option>Review</option>
                    </select>
                  </div>
                  {/* Entries List */}
                  {loading ? (
                    <div className="text-center text-gray-400 py-8">Loading...</div>
                  ) : entries.length > 0 ? (
                    <ul className="space-y-4">
                      {entries
                        .filter((j) =>
                          search.trim() ? j.content?.toLowerCase().includes(search.toLowerCase()) : true
                        )
                        .map((j) => (
                          <li key={j.id} className="border-b pb-2">
                            <div className="font-semibold text-gray-700">{j.title}</div>
                            <div className="text-gray-600 text-sm whitespace-pre-line">{j.content}</div>
                            <div className="text-xs text-gray-400 mt-1">{j.created_at ? new Date(j.created_at).toLocaleString() : ""}</div>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <div className="text-center text-gray-400 border border-dashed border-gray-300 rounded-xl py-12 px-6 bg-gray-50">
                      <div className="flex justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-16 h-16 text-gray-200"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M3 3h18v18H3V3zm2 2v14h14V5H5z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-gray-500 text-lg">Ready to reflect?</p>
                      <p className="text-sm mt-1 text-gray-400">
                        Fill this space with your private observations, thoughts, and dreams.
                      </p>
                      <button
                        className="mt-6 px-5 py-2 bg-accent text-white rounded-full shadow hover:bg-primary transition-all"
                        onClick={handleOpenReflection}
                      >
                        Start your first entry
                      </button>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Reflection Modal */}
      {showReflectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={handleCloseReflection}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-primary">New Reflection</h2>
            <textarea
              value={reflectionDraft}
              onChange={e => setReflectionDraft(e.target.value)}
              placeholder="Write your reflection..."
              className="w-full border border-gray-300 rounded-md p-3 min-h-[120px] mb-4 focus:outline-none"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md"
                onClick={handleCloseReflection}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-primary/90 disabled:opacity-60"
                onClick={handleSubmitReflection}
                disabled={!reflectionDraft.trim()}
              >
                Add Reflection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
