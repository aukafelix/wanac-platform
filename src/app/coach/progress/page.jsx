"use client";
import { useState, useEffect } from "react";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { FaUserCircle, FaChartLine, FaHeartbeat } from "react-icons/fa";

// Mock clients and progress data
const mockClients = [
  {
    id: 1,
    name: "Mary Johnson",
    email: "mary@client.com",
    wholeLife: { month: "June", score: 8, details: { health: 8, career: 7, finances: 9 } },
    dailyHabit: { date: "2024-06-10", score: 4, details: { sleep: 4, exercise: 5, nutrition: 3, mood: 4, productivity: 4 } },
    insight: "Mary has shown consistent improvement in her finances and health."
  },
  {
    id: 2,
    name: "Peter Lee",
    email: "peter@client.com",
    wholeLife: { month: "June", score: 6, details: { health: 5, career: 7, finances: 6 } },
    dailyHabit: { date: "2024-06-10", score: 3, details: { sleep: 3, exercise: 2, nutrition: 4, mood: 3, productivity: 3 } },
    insight: "Peter is working on improving his exercise routine."
  },
  {
    id: 3,
    name: "Grace Kim",
    email: "grace@client.com",
    wholeLife: { month: "June", score: 9, details: { health: 9, career: 8, finances: 9 } },
    dailyHabit: { date: "2024-06-10", score: 5, details: { sleep: 5, exercise: 5, nutrition: 5, mood: 5, productivity: 5 } },
    insight: "Grace is excelling in all areas this month."
  },
];

export default function CoachProgressPage() {
  const [clients, setClients] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: Replace with API call to fetch coach's clients and their progress
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
            <h2 className="text-2xl font-bold text-primary mb-8">Client Progress & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">No clients found.</div>
              ) : (
                clients.map((client) => (
                  <div key={client.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FaUserCircle className="text-3xl text-blue-400" />
                      <div>
                        <div className="font-bold text-lg text-gray-800">{client.name}</div>
                        <div className="text-xs text-gray-500">{client.email}</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-blue-700 font-semibold">
                        <FaChartLine /> Whole Life Score: <span className="text-gray-800">{client.wholeLife.score}/10</span>
                        <span className="ml-2 text-xs text-gray-500">({client.wholeLife.month})</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600 pl-6">
                        {Object.entries(client.wholeLife.details).map(([k, v]) => (
                          <span key={k}>{k}: <span className="font-bold text-gray-700">{v}</span></span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-orange-700 font-semibold mt-2">
                        <FaHeartbeat /> Daily Habit Score: <span className="text-gray-800">{client.dailyHabit.score}/5</span>
                        <span className="ml-2 text-xs text-gray-500">({client.dailyHabit.date})</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600 pl-6">
                        {Object.entries(client.dailyHabit.details).map(([k, v]) => (
                          <span key={k}>{k}: <span className="font-bold text-gray-700">{v}</span></span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-sm text-blue-900">
                      <span className="font-semibold">Insight:</span> {client.insight}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
