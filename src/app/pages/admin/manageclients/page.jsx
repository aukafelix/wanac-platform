"use client";
import { useState, useEffect } from "react";
import AdminSidebar from '../../../../../components/dashboardcomponents/adminsidebar';
import { FaUserPlus, FaUserEdit, FaUserTimes, FaSearch } from "react-icons/fa";
import { clientsService } from '../../../../services/api/clients.service';

export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    clientsService.getClients()
      .then((data) => {
        // Accepts either { clients: [...] } or just an array
        const clientList = Array.isArray(data) ? data : data.clients || [];
        setClients(clientList);
        setFilteredClients(clientList);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch clients.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredClients(
      clients.filter(
        (client) =>
          (client.name && client.name.toLowerCase().includes(search.toLowerCase())) ||
          (client.email && client.email.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [search, clients]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-16 md:ml-56">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#002147] mb-2">Manage Clients</h1>
            <p className="text-gray-600">View, search, and manage all WANAC clients.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold mt-4 md:mt-0">
            <FaUserPlus /> Add Client
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-4">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading clients...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-[#002147]">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Phone</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-gray-500">
                        No clients found.
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map((client) => (
                      <tr key={client.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{client.name}</td>
                        <td className="py-2 px-4">{client.email}</td>
                        <td className="py-2 px-4">{client.phone}</td>
                        <td className="py-2 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${client.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>{client.status}</span>
                        </td>
                        <td className="py-2 px-4 flex gap-2">
                          <button className="p-2 rounded hover:bg-blue-100 text-blue-600" title="Edit Client">
                            <FaUserEdit />
                          </button>
                          <button className="p-2 rounded hover:bg-red-100 text-red-600" title="Remove Client">
                            <FaUserTimes />
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
  );
}
