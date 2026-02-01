"use client";
import { useState, useEffect } from "react";
import Sidebar from '../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { FaUserGraduate, FaUserEdit, FaUserTimes } from "react-icons/fa";
import axios from "axios";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [cohortId, setCohortId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Assuming cohortId is stored in user object
        setCohortId(parsedUser.cohortId);
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (!cohortId) return;
    async function fetchClients() {
      try {
        const response = await axios.get("https://wanac-api.kuzasports.com/api/v1/clients");
        // Assuming each client has a cohortId property
        const filtered = response.data.filter(client => client.cohortId === cohortId);
        setStudents(filtered);
      } catch (error) {
        setStudents([]);
      }
    }
    fetchClients();
  }, [cohortId]);

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-8">
              <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <FaUserGraduate className="text-primary" /> Students
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
                      {students.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-6 text-gray-500">
                            No students found.
                          </td>
                        </tr>
                      ) : (
                        students.map((student) => (
                          <tr key={student.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{student.name}</td>
                            <td className="py-2 px-4">{student.email}</td>
                            <td className="py-2 px-4">{student.phone}</td>
                            <td className="py-2 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>{student.status}</span>
                            </td>
                            <td className="py-2 px-4 flex gap-2">
                              <button className="p-2 rounded hover:bg-blue-100 text-blue-600" title="Edit Student">
                                <FaUserEdit />
                              </button>
                              <button className="p-2 rounded hover:bg-red-100 text-red-600" title="Remove Student">
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
