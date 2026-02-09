"use client";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import ChatComponentV2 from '../../../../components/ChatComponentV2';
import { useState, useEffect } from 'react';

export default function CoachMessagesPage() {
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
    <div className="h-screen flex bg-white font-body text-foreground">
      {/* Sidebar */}
      <CoachSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user || { name: 'Coach' }} />
        {/* Main Content */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-8 py-4 md:py-6 bg-muted flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-6 text-center">Messages</h1>
          <div className="w-full max-w-2xl">
            <ChatComponentV2 user={user || { name: 'Coach', role: 'coach' }} />
          </div>
        </main>
      </div>
    </div>
  );
}
