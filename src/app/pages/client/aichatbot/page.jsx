"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../../../../components/dashboardcomponents/sidebar";
import ClientTopbar from "../../../../../components/dashboardcomponents/clienttopbar";
import ChatComponent from "../../../../../components/ChatComponent";

export default function AIChatbotPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("wanacUser");
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
          <div className="max-w-3xl mx-auto">
            <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none flex flex-col items-center justify-center min-h-[60vh]">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 tracking-tight text-center">
                AI Chatbot Assistant
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-8 text-center max-w-xl">
                Get instant guidance and support from your AI assistant. Ask anything!
              </p>
              <div className="w-full flex justify-center">
                <div className="w-full max-w-lg">
                  <ChatComponent />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
