"use client";
import { useState, useEffect } from "react";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { FaBook } from "react-icons/fa";

const coachResources = [
  {
    title: "Effective Coaching Techniques",
    description: "A comprehensive guide to proven coaching strategies.",
    url: "https://www.mindtools.com/pages/article/newLDR_78.htm",
  },
  {
    title: "Coaching Tools & Templates",
    description: "Downloadable worksheets and templates for coaching sessions.",
    url: "https://www.coachingtoolscompany.com/free-coaching-tools/",
  },
  {
    title: "ICF Core Competencies",
    description: "International Coaching Federation's core competencies for professional coaches.",
    url: "https://coachingfederation.org/core-competencies",
  },
  {
    title: "Coaching Videos Playlist",
    description: "Curated YouTube playlist on coaching best practices.",
    url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo",
  },
  {
    title: "Goal Setting Frameworks",
    description: "SMART goals and other frameworks for client success.",
    url: "https://www.smartsheet.com/blog/essential-guide-writing-smart-goals",
  },
];

export default function CoachResourcesPage() {
  const [user, setUser] = useState({ name: "Coach" });

  useEffect(() => {
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
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-8 py-4 md:py-6 bg-muted">
          <div className="max-w-4xl mx-auto">
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
                  Coach Resources
                </h1>
              </div>
              <p className="text-gray-600 text-base md:text-lg">Explore curated resources to enhance your coaching practice and support your clients' growth.</p>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coachResources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md flex flex-col gap-2 hover:bg-blue-50 transition animate-fadeIn"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FaBook className="text-blue-600" />
                    <h2 className="text-lg font-semibold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>{resource.title}</h2>
                  </div>
                  <p className="text-gray-700 text-sm mb-1">{resource.description}</p>
                  <span className="text-blue-500 text-xs font-medium">Visit resource &rarr;</span>
                </a>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
