"use client";
import { useState, useEffect } from "react";
import AdminSidebar from '../../../../components/dashboardcomponents/adminsidebar';
import { FaUserPlus, FaUserEdit, FaUserTimes } from "react-icons/fa";
import { cohortService } from '../../../services/api/cohort.service';

export default function ManageCoaches() {
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch coaches from API
  useEffect(() => {
    async function fetchCoaches() {
      setLoading(true);
      setError("");
      try {
        const response = await cohortService.getCoaches();
        // Handle nested response structure: { coaches: { data: [...] } }
        const coachesArray = Array.isArray(response) 
          ? response 
          : (Array.isArray(response?.coaches?.data) 
              ? response.coaches.data 
              : (Array.isArray(response?.coaches) 
                  ? response.coaches 
                  : []));
        
        // Map the data to the expected format
        const mappedCoaches = coachesArray.map(coach => ({
          id: coach.id || coach.user_id,
          name: coach.name || coach.user?.name || 'Unknown',
          email: coach.email || coach.user?.email || 'N/A',
          role: coach.role || coach.user?.role || 'Coach',
          status: coach.status || (coach.is_active ? 'Active' : 'Inactive')
        }));
        
        setCoaches(mappedCoaches);
        setFilteredCoaches(mappedCoaches);
      } catch (err) {
        console.error('Error fetching coaches:', err);
        setError("Failed to load coaches.");
        setCoaches([]);
        setFilteredCoaches([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCoaches();
  }, []);

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[#002147] tracking-tight">Manage Coaches</h1>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                <FaUserPlus /> Add Coach
              </button>
            </div>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading coaches...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredCoaches.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                          No coaches found.
                        </td>
                      </tr>
                    ) : (
                      filteredCoaches.map((coach) => (
                        <tr key={coach.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coach.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{coach.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{coach.role || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${coach.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>{coach.status || '-'}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm flex gap-2 justify-end">
                            <button className="p-2 rounded hover:bg-blue-100 text-blue-600" title="Edit Coach">
                              <FaUserEdit />
                            </button>
                            <button className="p-2 rounded hover:bg-red-100 text-red-600" title="Remove Coach">
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
    </div>
  );
}