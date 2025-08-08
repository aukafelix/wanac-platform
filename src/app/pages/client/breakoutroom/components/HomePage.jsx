import React, { useState } from "react";
import { useRouter } from "next/navigation";

const mockAssignments = [
  {
    id: 1,
    course: "Business Plan Development",
    instructor: "Jon Funk",
    experience: {
      title: "Customer Discovery",
      subtitle: "Practical Market Research for Startups",
    },
    dueDate: "28 Apr 2025",
    dueTime: "5:00 PM PDT",
    sessionDate: "24 Apr 2025",
    sessionTime: "12:00 PM PDT",
    chat: false,
    action: "View Results",
    status: "Completed",
  },
  {
    id: 2,
    course: "Leadership Essentials",
    instructor: "Jane Smith",
    experience: {
      title: "Team Building",
      subtitle: "Effective Collaboration Techniques",
    },
    dueDate: "10 May 2025",
    dueTime: "3:00 PM PDT",
    sessionDate: "8 May 2025",
    sessionTime: "11:00 AM PDT",
    chat: true,
    action: "View", // Changed from 'View Results' to 'View'
    status: "Upcoming",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Assignments");
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Assignments</h1>
        {/* Search and Filter */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search Experiences"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Filter:</span>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm bg-white"
            >
              <option>All Assignments</option>
              <option>Upcoming</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
        {/* Table */}
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-xs">
            <thead>
              <tr className="text-xs text-gray-400 border-b">
                <th className="py-3 px-4 font-medium">Course</th>
                <th className="px-4 font-medium">Instructor</th>
                <th className="px-4 font-medium">Experience</th>
                <th className="px-4 font-medium">Due Date</th>
                <th className="px-4 font-medium">Session Date</th>
                <th className="px-4 font-medium">Status</th>
                <th className="px-4 font-medium">Chat</th>
                <th className="px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockAssignments.map(a => (
                <tr key={a.id} className="border-b last:border-b-0 hover:bg-blue-50 transition-colors group">
                  <td className="py-4 px-4 font-semibold align-middle">
                    {a.course}
                    <div className="text-[10px] text-gray-400">01</div>
                  </td>
                  <td className="px-4 align-middle">{a.instructor}</td>
                  <td className="px-4 align-middle">
                    <div className="font-medium flex items-center gap-2 text-xs">
                      <span className="inline-block w-5 h-5 bg-gray-200 rounded-full" />
                      {a.experience.title}
                    </div>
                    <div className="text-[10px] text-gray-400">{a.experience.subtitle}</div>
                  </td>
                  <td className="px-4 align-middle">
                    <div className="font-semibold text-xs">{a.dueDate}</div>
                    <div className="text-[10px] text-gray-400">{a.dueTime}</div>
                  </td>
                  <td className="px-4 align-middle">
                    <div className="font-semibold text-xs">{a.sessionDate}</div>
                    <div className="text-[10px] text-gray-400">{a.sessionTime}</div>
                  </td>
                  <td className="px-4 align-middle">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${a.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{a.status}</span>
                  </td>
                  <td className="px-4 align-middle text-center">
                    {a.chat ? (
                      <span className="inline-block w-4 h-4 bg-blue-100 rounded-full" />
                    ) : (
                      <span className="inline-block w-4 h-4 border border-gray-300 rounded-full" />
                    )}
                  </td>
                  <td className="px-4 align-middle">
                    {a.status === 'Upcoming' ? (
                      <button
                        className="text-[11px] text-blue-600 font-semibold hover:underline group-hover:text-blue-800 transition-colors"
                        onClick={() => router.push(`/pages/client/breakoutroom/details?id=${a.id}`)}
                      >
                        View &rarr;
                      </button>
                    ) : (
                      <button
                        className="text-[11px] text-blue-600 font-semibold hover:underline group-hover:text-blue-800 transition-colors"
                        onClick={() => router.push(`/pages/client/breakoutroom/details?id=${a.id}`)}
                      >
                        View Results &rarr;
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}