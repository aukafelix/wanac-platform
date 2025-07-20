"use client";
import { useState, useEffect } from "react";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { FaLightbulb } from "react-icons/fa";

// Mock coaching tips data
const mockTips = [
  {
    id: 1,
    title: "Active Listening",
    description: "Focus fully on your client, reflect back what you hear, and avoid interrupting. This builds trust and understanding.",
  },
  {
    id: 2,
    title: "Ask Powerful Questions",
    description: "Use open-ended questions to encourage deeper reflection and insight. Avoid yes/no questions when possible.",
  },
  {
    id: 3,
    title: "Set Clear Goals",
    description: "Work with your client to define specific, measurable, achievable, relevant, and time-bound (SMART) goals.",
  },
  {
    id: 4,
    title: "Provide Constructive Feedback",
    description: "Offer feedback that is specific, actionable, and focused on behaviors rather than personal traits.",
  },
  {
    id: 5,
    title: "Encourage Accountability",
    description: "Help clients create action plans and check in on their progress regularly to foster accountability.",
  },
];

export default function CoachingTipsPage() {
  const [user, setUser] = useState({ name: "Coach" });

  useEffect(() => {
    // Optionally load user from localStorage for personalization
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser({ name: "Coach" });
      }
    }
  }, []);

  return (
    <div className="h-screen flex bg-white font-body text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Sidebar */}
      <CoachSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-2 md:px-8 py-6 bg-muted">
          <div className="max-w-4xl mx-auto">
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <FaLightbulb className="text-yellow-400 text-2xl" />
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
                  Coaching Tips
                </h1>
              </div>
              <p className="text-gray-600 text-base md:text-lg">Boost your coaching impact with these practical tips and best practices.</p>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockTips.map((tip) => (
                <div key={tip.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md flex flex-col gap-2 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-1">
                    <FaLightbulb className="text-yellow-400" />
                    <h2 className="text-lg font-semibold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>{tip.title}</h2>
                  </div>
                  <p className="text-gray-700 text-sm">{tip.description}</p>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
