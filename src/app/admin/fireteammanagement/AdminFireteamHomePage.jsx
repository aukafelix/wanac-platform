import React, { useMemo, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AdminFireteamHomePage({ fireteams = [], cohorts = [], onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Fireteams");
  const router = useRouter();

  const filteredFireteams = useMemo(() => {
    return fireteams.filter((f) => {
      const name = typeof f.name === 'string' ? f.name : '';
      const description = typeof f.description === 'string' ? f.description : '';
      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === "All Fireteams" ||
        (filter === "Client" && f.type === "client") ||
        (filter === "Coach" && f.type === "coach");
      return matchesSearch && matchesFilter;
    });
  }, [fireteams, search, filter]);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Fireteam Management</h1>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={onAdd}
          >
            <FaPlus /> Add Fireteam
          </button>
        </div>
        {/* Search and Filter */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search Fireteams"
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
              <option>All Fireteams</option>
              <option>Client</option>
              <option>Coach</option>
            </select>
          </div>
        </div>
        {/* Table */}
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-xs">
            <thead>
              <tr className="text-xs text-gray-400 border-b">
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="px-4 font-medium">Members</th>
                <th className="px-4 font-medium">Description</th>
                <th className="px-4 font-medium">Cohort</th>
                <th className="px-4 font-medium">Date & Time</th>
                <th className="px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFireteams.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">No fireteams found.</td>
                </tr>
              ) : (
                filteredFireteams.map((f) => {
                  const cohort = cohorts.find(c => c.id === f.cohort_id);
                  // Add state for members
                  const [members, setMembers] = React.useState([]);
                  React.useEffect(() => {
                    async function fetchMembers() {
                      try {
                        const data = await import("../../../../services/api/fireteam.service").then(m => m.fireteamService.getFireteamMembers(f.id));
                        setMembers(data);
                      } catch {
                        setMembers([]);
                      }
                    }
                    fetchMembers();
                  }, [f.id]);
                  return (
                  <tr
                    key={f.id}
                    className="border-b last:border-b-0 hover:bg-blue-50 transition-colors group cursor-pointer"
                    onClick={() => router.push(`/admin/fireteammanagement/${f.id}`)}
                  >
                    <td className="py-4 px-4 font-semibold align-middle">{f.name}</td>
                    <td className="px-4 align-middle">{members.length > 0 ? members.map(m => m.name).join(", ") : "-"}</td>
                    <td className="px-4 align-middle">{f.description}</td>
                      <td className="px-4 align-middle">{cohort ? (cohort.name || cohort.title || `Cohort ${cohort.id}`) : f.cohort_id}</td>
                      <td className="px-4 align-middle">{f.date ? `${f.date}${f.time ? ` ${f.time}` : ''}` : ''}</td>
                    <td className="px-4 align-middle" onClick={e => e.stopPropagation()}>
                      <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => onEdit(f)} title="Edit"><FaEdit /></button>
                      <button className="text-red-600 hover:text-red-800" onClick={() => onDelete(f)} title="Delete"><FaTrash /></button>
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
