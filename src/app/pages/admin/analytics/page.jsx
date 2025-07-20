"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "../../../../../components/dashboardcomponents/adminsidebar";
import { clientsService } from "../../../../services/api/clients.service";
import { sessionsService } from "../../../../services/api/sessions.service";
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt } from "react-icons/fa";

export default function AdminAnalytics() {
  const [clients, setClients] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [clientsRes, sessionsRes] = await Promise.all([
          clientsService.getClients(),
          sessionsService.getSessions(),
        ]);
        setClients(clientsRes || []);
        setSessions(sessionsRes || []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch analytics data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Unique coaches from sessions
  const sessionArray = Array.isArray(sessions) ? sessions : [];
  const uniqueCoaches = Array.from(
    new Set(sessionArray.map((s) => s.coach).filter(Boolean))
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-16 md:ml-56">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#002147] mb-2">Admin Analytics</h1>
          <p className="text-gray-600">Overview of key metrics for coaches, clients, and sessions.</p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-gray-500 text-lg">Loading analytics...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <FaUsers size={36} className="text-blue-600 mb-2" />
              <div className="text-3xl font-bold text-[#002147]">{clients.length}</div>
              <div className="text-gray-600 mt-1">Total Clients</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <FaChalkboardTeacher size={36} className="text-green-600 mb-2" />
              <div className="text-3xl font-bold text-[#002147]">{uniqueCoaches.length}</div>
              <div className="text-gray-600 mt-1">Total Coaches (from sessions)</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <FaCalendarAlt size={36} className="text-orange-600 mb-2" />
              <div className="text-3xl font-bold text-[#002147]">{sessions.length}</div>
              <div className="text-gray-600 mt-1">Total Sessions</div>
            </div>
          </div>
        )}
        {/* You can add more analytics, charts, or tables here */}
      </main>
    </div>
  );
}
