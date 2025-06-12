"use client";
import { useState } from "react";
import { Video, Star } from "lucide-react";

const mockSessions = [
  {
    id: 1,
    title: "Career Guidance Session",
    date: "2025-06-15",
    time: "10:00 AM",
    type: "Group",
  },
  {
    id: 2,
    title: "One-on-One Mentorship",
    date: "2025-06-16",
    time: "2:00 PM",
    type: "1:1",
  },
];

export default function SessionsPage() {
  const [starting, setStarting] = useState(false);

  const handleStartSession = () => {
    setStarting(true);
    // Simulate starting a session (replace with real logic)
    setTimeout(() => {
      alert("One-on-One Video Session Started!");
      setStarting(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Sessions</h1>
      <ul className="space-y-4 mb-8">
        {mockSessions.map((session) => (
          <li
            key={session.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-semibold">{session.title}</div>
              <div className="text-sm text-gray-500">
                {session.date} &middot; {session.time} &middot; {session.type}
              </div>
            </div>
            {session.type === "1:1" && (
              <button
                onClick={handleStartSession}
                disabled={starting}
                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                <Video size={16} />
                Start 1:1
              </button>
            )}
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={handleStartSession}
          disabled={starting}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          <Star size={18} />
          Start a One-on-One Video Session
        </button>
      </div>
    </div>
  );
}