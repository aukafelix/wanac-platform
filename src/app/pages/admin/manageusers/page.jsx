"use client";
import AdminSidebar from '../../../../../components/dashboardcomponents/adminsidebar';
import { useState, useEffect } from 'react';
import { FaUserPlus, FaUserEdit, FaUserTimes } from 'react-icons/fa';
import { clientsService } from '../../../../services/api/clients.service';

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    clientsService.getClients().then((data) => {
      setUsers(Array.isArray(data) ? data : (data.clients || []));
    });
  }, []);

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">Manage Users</h1>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                <FaUserPlus /> Add User
              </button>
            </div>
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
                  {users.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.user?.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.user?.email || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.user?.role || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>{client.status || '-'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm flex gap-2 justify-end">
                        <button className="p-2 rounded hover:bg-blue-100 text-blue-600" title="Edit User">
                          <FaUserEdit />
                        </button>
                        <button className="p-2 rounded hover:bg-red-100 text-red-600" title="Remove User">
                          <FaUserTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
