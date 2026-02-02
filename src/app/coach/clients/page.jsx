"use client";
import { useState, useEffect } from "react";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { FaUserFriends, FaUserEdit, FaUserTimes } from "react-icons/fa";
import { clientsService } from '../../../services/api/clients.service';

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
    async function fetchClients() {
      try {
        const data = await clientsService.getClients();
        setClients(Array.isArray(data) ? data : []); // Defensive: always set an array
      } catch (error) {
        setClients([]);
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

  return (
    <div className="min-h-screen h-screen flex bg-gray-50 font-serif overflow-x-hidden">
      {/* Sidebar */}
      <CoachSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user || { name: "Coach" }} />
        {/* Main Content */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-12 py-4 md:py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-6 md:gap-8">
              <section className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-none">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2">
                    <FaUserFriends className="text-primary" /> My Clients
                  </h2>
                </div>
                {/* Mobile card layout */}
                <div className="md:hidden space-y-3">
                  {clients.length === 0 ? (
                    <p className="text-center py-6 text-gray-500 text-sm">No clients found.</p>
                  ) : (
                    clients.map((client) => (
                      <div key={client.id} className="border border-gray-200 rounded-lg p-4 space-y-2">
                        <p className="font-semibold text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-600 break-all">{client.email}</p>
                        <p className="text-sm text-gray-600">{client.phone}</p>
                      </div>
                    ))
                  )}
                </div>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-[#002147]">
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="text-center py-6 text-gray-500">
                            No clients found.
                          </td>
                        </tr>
                      ) : (
                        clients.map((client) => (
                          <tr key={client.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{client.name}</td>
                            <td className="py-2 px-4">{client.email}</td>
                            <td className="py-2 px-4">{client.phone}</td>
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
