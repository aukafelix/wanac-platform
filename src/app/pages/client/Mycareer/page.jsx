"use client";
import Sidebar from '../../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';
import { useState } from 'react';

export default function MyCareerPage() {
  const [collapsed, setCollapsed] = useState(false);
  // Placeholder data for each section
  return (
    <div className="h-screen flex bg-white font-body text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-2 md:px-8 py-6 bg-muted">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
              My Career Management
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Application Management */}
              <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
                <h2 className="text-xl font-semibold mb-4">Application Management</h2>
                <p className="text-gray-600 text-sm">Track and manage your job applications here.</p>
                {/* Add application management UI here */}
              </section>
              {/* Interview Questions */}
              <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
                <h2 className="text-xl font-semibold mb-4">Interview Questions</h2>
                <p className="text-gray-600 text-sm">Prepare and review common interview questions.</p>
                {/* Add interview questions UI here */}
              </section>
              {/* Target Employers */}
              <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
                <h2 className="text-xl font-semibold mb-4">Target Employers</h2>
                <p className="text-gray-600 text-sm">List and research your target employers.</p>
                {/* Add target employers UI here */}
              </section>
              {/* Contacts */}
              <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
                <h2 className="text-xl font-semibold mb-4">Contacts</h2>
                <p className="text-gray-600 text-sm">Manage your professional contacts.</p>
                {/* Add contacts UI here */}
              </section>
              {/* Applied */}
              <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
                <h2 className="text-xl font-semibold mb-4">Applied</h2>
                <p className="text-gray-600 text-sm">See jobs you have applied to.</p>
                {/* Add applied jobs UI here */}
              </section>
              {/* Appointments */}
              <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
                <h2 className="text-xl font-semibold mb-4">Appointments</h2>
                <p className="text-gray-600 text-sm">View and manage your appointments.</p>
                {/* Add appointments UI here */}
              </section>
              {/* Resources */}
              <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
                <h2 className="text-xl font-semibold mb-4">Resources</h2>
                <p className="text-gray-600 text-sm">Access helpful resources for your career journey.</p>
                {/* Add resources UI here */}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
