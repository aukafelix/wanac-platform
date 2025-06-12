"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "../../../../../components/dashboardcomponents/adminsidebar";
import { Plus, Search, Edit, Trash2, Users, User, Calendar, X } from "lucide-react";

export default function SessionManagement() {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSession, setNewSession] = useState({
    client: "",
    coach: "",
    date: "",
    time: "",
  });
  const [editSessionId, setEditSessionId] = useState(null);

  // Dummy data for demonstration
  useEffect(() => {
    setSessions([
      {
        id: 1,
        client: "Mary Johnson",
        coach: "Jane Doe",
        date: "2024-06-20",
        time: "10:00 AM",
        status: "Scheduled",
      },
      {
        id: 2,
        client: "Peter Lee",
        coach: "John Smith",
        date: "2024-06-21",
        time: "2:00 PM",
        status: "Completed",
      },
      {
        id: 3,
        client: "Grace Kim",
        coach: "Alice Brown",
        date: "2024-06-22",
        time: "11:00 AM",
        status: "Cancelled",
      },
    ]);
  }, []);

  useEffect(() => {
    setFilteredSessions(
      sessions.filter(
        (session) =>
          session.client.toLowerCase().includes(search.toLowerCase()) ||
          session.coach.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, sessions]);

  // Handle modal form input
  const handleInputChange = (e) => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
  };

  // Handle edit button click
  const handleEditClick = (session) => {
    setEditSessionId(session.id);
    setNewSession({
      client: session.client,
      coach: session.coach,
      date: session.date,
      time: session.time,
    });
    setShowModal(true);
  };

  // Handle add/edit session
  const handleAddSession = (e) => {
    e.preventDefault();
    if (
      newSession.client &&
      newSession.coach &&
      newSession.date &&
      newSession.time
    ) {
      if (editSessionId) {
        // Edit existing session
        setSessions(
          sessions.map((s) =>
            s.id === editSessionId
              ? { ...s, ...newSession }
              : s
          )
        );
      } else {
        // Add new session
        setSessions([
          ...sessions,
          {
            id: sessions.length + 1,
            ...newSession,
            status: "Scheduled",
          },
        ]);
      }
      setShowModal(false);
      setNewSession({ client: "", coach: "", date: "", time: "" });
      setEditSessionId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-16 md:ml-56">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#002147] mb-2">Session Management</h1>
            <p className="text-gray-600">View, search, and manage all sessions between clients and coaches.</p>
          </div>
          <button
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold mt-4 md:mt-0"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} /> Add Session
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={() => {
                  setShowModal(false);
                  setEditSessionId(null);
                  setNewSession({ client: "", coach: "", date: "", time: "" });
                }}
              >
                <X size={22} />
              </button>
              <h2 className="text-xl font-bold mb-4 text-[#002147]">
                {editSessionId ? "Edit Session" : "Add Session"}
              </h2>
              <form onSubmit={handleAddSession} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                  <input
                    type="text"
                    name="client"
                    value={newSession.client}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coach</label>
                  <input
                    type="text"
                    name="coach"
                    value={newSession.coach}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newSession.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={() => {
                      setShowModal(false);
                      setEditSessionId(null);
                      setNewSession({ client: "", coach: "", date: "", time: "" });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-orange-600 text-white font-semibold hover:bg-orange-700"
                  >
                    {editSessionId ? "Save" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-4">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search by client or coach..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-[#002147]">
                  <th className="py-2 px-4 text-left"><Users size={14} className="inline mr-1" />Client</th>
                  <th className="py-2 px-4 text-left"><User size={14} className="inline mr-1" />Coach</th>
                  <th className="py-2 px-4 text-left"><Calendar size={14} className="inline mr-1" />Date</th>
                  <th className="py-2 px-4 text-left">Time</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No sessions found.
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((session) => (
                    <tr key={session.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{session.client}</td>
                      <td className="py-2 px-4">{session.coach}</td>
                      <td className="py-2 px-4">{session.date}</td>
                      <td className="py-2 px-4">{session.time}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            session.status === "Scheduled"
                              ? "bg-blue-100 text-blue-700"
                              : session.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {session.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 flex gap-2">
                        <button
                          className="p-2 rounded hover:bg-gray-200"
                          title="Edit"
                          onClick={() => handleEditClick(session)}
                        >
                          <Edit size={16} className="text-blue-600" />
                        </button>
                        <button className="p-2 rounded hover:bg-gray-200" title="Delete">
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}