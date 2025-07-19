"use client";
import { useState, useEffect } from "react";
import CoachSidebar from '../../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';
import { FaUserFriends, FaUserEdit, FaUserTimes } from "react-icons/fa";

// Example mock data for clients
const mockClients = [
  { id: 1, name: "Mary Johnson", email: "mary@client.com", phone: "0712345678", status: "Active" },
  { id: 2, name: "Peter Lee", email: "peter@client.com", phone: "0723456789", status: "Inactive" },
  { id: 3, name: "Grace Kim", email: "grace@client.com", phone: "0734567890", status: "Active" },
];

export default function CoachClientsPage() {
  const [clients, setClients] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: Replace with API call to fetch coach's clients
    setClients(mockClients);
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <CoachSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user || { name: "Coach" }} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-8">
              <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <FaUserFriends className="text-primary" /> My Clients
                  </h2>
                </div>
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
                      {clients.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-6 text-gray-500">
                            No clients found.
                          </td>
                        </tr>
                      ) : (
                        clients.map((client) => (
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
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
