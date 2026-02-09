"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "../../../../components/dashboardcomponents/adminsidebar";
import { Plus, Search, Edit, Trash2, Calendar, X, Loader2 } from "lucide-react";
import { sessionsService } from "../../../services/api/sessions.service";
import { normalizeSessions } from "../../../lib/sessions";

const emptyForm = { title: "", description: "", date: "", time: "" };

export default function SessionManagement() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSession, setNewSession] = useState(emptyForm);
  const [editSessionId, setEditSessionId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  useEffect(() => {
    async function fetchSessions() {
      setLoading(true);
      setFetchError("");
      try {
        const response = await sessionsService.getSessions();
        setSessions(normalizeSessions(response));
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
        setFetchError("Could not load sessions. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, []);

  useEffect(() => {
    if (!Array.isArray(sessions)) {
      setFilteredSessions([]);
      return;
    }
    const q = search.toLowerCase().trim();
    setFilteredSessions(
      q
        ? sessions.filter(
            (s) =>
              (s.title && s.title.toLowerCase().includes(q)) ||
              (s.description && (s.description + "").toLowerCase().includes(q))
          )
        : sessions
    );
  }, [search, sessions]);

  const handleInputChange = (e) => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
  };

  const handleEditClick = (session) => {
    setEditSessionId(session.id);
    setNewSession({
      title: session.title || "",
      description: session.description || "",
      date: session.date || "",
      time: session.time || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newSession.title.trim() || !newSession.date || !newSession.time) return;
    const scheduled_at = new Date(`${newSession.date}T${newSession.time}`).toISOString();
    const payload = {
      title: newSession.title.trim(),
      description: (newSession.description || "").trim(),
      scheduled_at,
    };
    setSubmitLoading(true);
    try {
      if (editSessionId) {
        const updated = await sessionsService.updateSession(editSessionId, payload);
        setSessions((prev) =>
          prev.map((s) => (s.id === editSessionId ? normalizeSessions([updated])[0] : s))
        );
      } else {
        const created = await sessionsService.addSession(payload);
        setSessions((prev) => [normalizeSessions([created])[0], ...prev]);
      }
      setShowModal(false);
      setNewSession(emptyForm);
      setEditSessionId(null);
    } catch (err) {
      console.error("Failed to save session:", err);
      alert("Failed to save session. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this session?")) return;
    setDeleteLoadingId(id);
    try {
      await sessionsService.deleteSession(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete session:", err);
      alert("Failed to delete session. Please try again.");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditSessionId(null);
    setNewSession(emptyForm);
  };

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[#002147] tracking-tight">Session Management</h1>
              <button
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => setShowModal(true)}
              >
                <Plus size={18} /> Add Session
              </button>
            </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={closeModal}
              >
                <X size={22} />
              </button>
              <h2 className="text-xl font-bold mb-4 text-[#002147]">
                {editSessionId ? "Edit Session" : "Add Session"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newSession.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newSession.description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newSession.date}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={newSession.time}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 flex items-center gap-2"
                  >
                    {submitLoading && <Loader2 size={16} className="animate-spin" />}
                    {editSessionId ? "Save" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading sessions…</div>
            ) : fetchError ? (
              <div className="text-center py-8 text-red-500">{fetchError}</div>
            ) : (
              <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
                <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                  <div className="relative w-full md:max-w-sm">
                    <input
                      type="text"
                      placeholder="Search by title or description..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full border border-gray-300 rounded py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <Calendar size={14} className="inline mr-1" /> Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredSessions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                          No sessions found.
                        </td>
                      </tr>
                    ) : (
                      filteredSessions.map((session) => (
                        <tr key={session.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{session.title || "—"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{session.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{session.description || "—"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{session.time || "—"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                session.status === "Scheduled"
                                  ? "bg-blue-100 text-blue-700"
                                  : session.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {session.status || "—"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm flex gap-2 justify-end">
                            <button
                              type="button"
                              className="p-2 rounded hover:bg-blue-100 text-blue-600"
                              title="Edit"
                              onClick={() => handleEditClick(session)}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              type="button"
                              className="p-2 rounded hover:bg-red-100 text-red-600 disabled:opacity-50"
                              title="Delete"
                              onClick={() => handleDelete(session.id)}
                              disabled={deleteLoadingId === session.id}
                            >
                              {deleteLoadingId === session.id ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}