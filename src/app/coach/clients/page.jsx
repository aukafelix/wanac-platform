"use client";
import { useState, useEffect, useMemo } from "react";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { clientsService } from '../../../services/api/clients.service';

// Normalize API client to a consistent display shape (API may return { user: { name, email }, user_id } or flat { name, email })
function normalizeClient(raw) {
  const id = raw?.id ?? raw?.user_id;
  const u = raw?.user;
  return {
    id,
    name: u?.name ?? raw?.name ?? '—',
    email: u?.email ?? raw?.email ?? '—',
    phone: u?.phone ?? raw?.phone ?? '—',
    status: raw?.status ?? 'Active',
  };
}

export default function CoachClientsPage() {
  const [clients, setClients] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchClients() {
      setLoading(true);
      setError(null);
      try {
        const data = await clientsService.getClients();
        const rawList = data?.clients ?? data?.data ?? (Array.isArray(data) ? data : []);
        const normalized = (rawList || []).map(normalizeClient);
        setClients(normalized);
      } catch (err) {
        setError("Unable to load clients. Please try again.");
        setClients([]);
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const filteredClients = useMemo(() => {
    if (!search.trim()) return clients;
    const q = search.trim().toLowerCase();
    return clients.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && String(c.phone).toLowerCase().includes(q))
    );
  }, [clients, search]);

  return (
    <div className="min-h-screen h-screen flex bg-gray-50 font-serif overflow-x-hidden">
      <CoachSidebar />
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <ClientTopbar user={user || { name: "Coach" }} />
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-12 py-4 md:py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-6 md:gap-8">
              <section className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-[#002147] flex items-center gap-2">
                    <FaUserFriends className="text-[#002147]" aria-hidden /> My Clients
                    {!loading && (
                      <span className="text-sm font-normal text-gray-500">
                        ({filteredClients.length}{search ? ` of ${clients.length}` : ''})
                      </span>
                    )}
                  </h2>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} aria-hidden />
                    <input
                      type="search"
                      placeholder="Search by name, email, or phone..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full sm:w-64 pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      aria-label="Search clients"
                    />
                  </div>
                </div>

                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-14 rounded-lg bg-gray-100 animate-pulse" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-10 px-4">
                    <p className="text-red-600 font-medium">{error}</p>
                    <p className="text-gray-500 text-sm mt-1">Check your connection and refresh the page.</p>
                  </div>
                ) : filteredClients.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <FaUserFriends className="mx-auto text-gray-300 mb-3" size={48} aria-hidden />
                    <p className="text-gray-600 font-medium">
                      {search ? "No clients match your search." : "No clients yet."}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {search ? "Try a different search term." : "Clients will appear here when they are assigned to you."}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="md:hidden space-y-3">
                      {filteredClients.map((client) => (
                        <div
                          key={client.id}
                          className="border border-gray-200 rounded-lg p-4 space-y-2 hover:border-[#002147]/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-gray-900">{client.name}</p>
                            <span className="shrink-0 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                              {client.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 break-all">{client.email}</p>
                          {client.phone !== '—' && (
                            <p className="text-sm text-gray-600">{client.phone}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="bg-[#002147] text-white">
                            <th className="py-3 px-4 text-left font-semibold">Name</th>
                            <th className="py-3 px-4 text-left font-semibold">Email</th>
                            <th className="py-3 px-4 text-left font-semibold">Phone</th>
                            <th className="py-3 px-4 text-left font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredClients.map((client) => (
                            <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors">
                              <td className="py-3 px-4 font-medium text-gray-900">{client.name}</td>
                              <td className="py-3 px-4 text-gray-600">{client.email}</td>
                              <td className="py-3 px-4 text-gray-600">{client.phone}</td>
                              <td className="py-3 px-4">
                                <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                  {client.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
