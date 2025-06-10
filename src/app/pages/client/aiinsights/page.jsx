'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';
import DashboardSidebar from '../../../../../components/dashboardcomponents/DashboardSidebar';
import AIChatbot from '../../../../../components/dashboardcomponents/AIChatbot';

export default function AIInsightsPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
      <Sidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 space-y-8">
                {/* Welcome Section */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-none">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-1 tracking-tight">
                      Welcome to AI Insights{user?.name ? `, ${user.name}` : ''}!
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg">Get instant guidance, insights, and support from your AI assistant.</p>
                  </div>
                  <img
                    src="/ai-insights-illustration.svg"
                    alt="AI Insights"
                    className="w-28 h-28 md:w-36 md:h-36 object-contain hidden md:block"
                  />
                </section>
                {/* AI Assistant Section */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none min-h-[300px] flex flex-col justify-center items-center">
                  <AIChatbot />
                </section>
              </div>
              {/* Dashboard Widgets Sidebar */}
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
