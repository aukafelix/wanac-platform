"use client";

import React, { useState } from "react";

const AdminAnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      setError("Title and message are required.");
      return;
    }
    setAnnouncements([
      {
        id: Date.now(),
        title,
        message,
        audience,
        date: new Date().toLocaleString(),
      },
      ...announcements,
    ]);
    setTitle("");
    setMessage("");
    setAudience("all");
    setError("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin Announcements</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement title"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Message</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your announcement here..."
            rows={4}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Audience</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="clients">Clients Only</option>
            <option value="coaches">Coaches Only</option>
          </select>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Announcement
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-2">Previous Announcements</h2>
      {announcements.length === 0 ? (
        <div className="text-gray-500">No announcements yet.</div>
      ) : (
        <ul className="space-y-4">
          {announcements.map((a) => (
            <li key={a.id} className="border rounded p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{a.title}</span>
                <span className="text-xs text-gray-400">{a.date}</span>
              </div>
              <div className="mb-2">{a.message}</div>
              <div className="text-xs text-gray-600">
                Audience: {a.audience === "all" ? "All Users" : a.audience.charAt(0).toUpperCase() + a.audience.slice(1)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminAnnouncementPage;
