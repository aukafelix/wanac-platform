'use client';

import { useState, useEffect } from 'react';
import {
  FaCalendar,
  FaPenFancy,
  FaRobot,
  FaChartLine,
  FaUsers,
  FaFire,
} from 'react-icons/fa';
import Sidebar from '../../../../components/dashboardcomponents/sidebar'
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { useRouter } from 'next/navigation';
import { sessionsService } from '../../../services/api/sessions.service';
import { habitsService } from '../../../services/api/habits.service';
import { fireteamService } from '../../../services/api/fireteam.service';
import { experienceService } from '../../../services/api/experience.service';

// Simple Notifications Widget
function NotificationsWidget() {
  // Mock notifications
  const notifications = [
    { id: 1, text: 'Your session with Coach Smith is tomorrow at 10:00 AM.' },
    { id: 2, text: 'New message from Coach Smith.' },
    { id: 3, text: 'Community event: Virtual coffee meetup this Friday.' },
  ];
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-5">
      <h3 className="text-lg font-semibold text-[#002147] mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" /> 
        Notifications
      </h3>
      <ul className="space-y-3">
        {notifications.map((n) => (
          <li key={n.id} className="text-sm text-gray-700 border-b border-gray-100 pb-3 last:border-0 last:pb-0 hover:text-gray-900 transition-colors">
            {n.text}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default function ClientDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [lifeScore, setLifeScore] = useState({});
  const [upcomingExperiences, setUpcomingExperiences] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Function to fetch upcoming fireteam experiences
  const fetchUpcomingExperiences = async () => {
    try {
      // Get user's fireteams first
      const fireteams = await fireteamService.getFireteams();
      const allExperiences = [];
      
      // Fetch experiences for each fireteam
      for (const fireteam of fireteams) {
        try {
          const experiences = await experienceService.getExperiences(fireteam.id);
          // Add fireteam info to each experience
          const experiencesWithFireteam = experiences.map(exp => ({
            ...exp,
            fireteam: fireteam
          }));
          allExperiences.push(...experiencesWithFireteam);
        } catch (error) {
          console.error(`Error fetching experiences for fireteam ${fireteam.id}:`, error);
        }
      }
      
      // Filter for upcoming experiences (mock logic - you might want to add date filtering)
      const upcoming = allExperiences.filter(exp => 
        exp.status === 'upcoming' || exp.status === 'scheduled' || !exp.status
      ).slice(0, 3); // Show only first 3 upcoming experiences
      
      setUpcomingExperiences(upcoming);
    } catch (error) {
      console.error('Error fetching upcoming experiences:', error);
      setUpcomingExperiences([]);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setLoading(true);
        // Fetch sessions for this user
        sessionsService.getSessions().then((sessions) => {
          // Robustly handle both array and object API responses
          let sessionArray = [];
          if (Array.isArray(sessions)) {
            sessionArray = sessions;
          } else if (sessions?.sessions?.data && Array.isArray(sessions.sessions.data)) {
            sessionArray = sessions.sessions.data;
          } else if (sessions?.data && Array.isArray(sessions.data)) {
            sessionArray = sessions.data;
          }
          const now = new Date();
          // Only filter by scheduled_at (upcoming sessions)
          const upcoming = sessionArray.filter(
            (session) => session.scheduled_at && new Date(session.scheduled_at) > now
          );
          setUpcomingSessions(upcoming);
          setLoading(false);
        });
        // Fetch life score overview
        habitsService.getWholeLifeHistory().then((history) => {
          // Robustly handle both array and object API responses
          let historyArray = [];
          if (Array.isArray(history)) {
            historyArray = history;
          } else if (history?.data && Array.isArray(history.data)) {
            historyArray = history.data;
          }
          if (historyArray.length > 0) {
            setLifeScore(historyArray[0]);
          }
        });
        
        // Fetch upcoming fireteam experiences
        fetchUpcomingExperiences();
      } catch (e) {
        setUser(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div
      className="h-screen flex bg-white font-body text-foreground"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Area - pl-14 md:pl-0 reserves space for hamburger; min-w-0 avoids flex overflow; pb clears FAB + safe-area */}
      <div className="flex-1 flex flex-col h-full min-w-0 transition-all duration-300 pl-14 md:pl-0">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-8 pt-6 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Main Content */}
              <div className="flex-1 space-y-6">
                {/* Welcome Section */}
                <section className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-2xl p-5 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-lg animate-fadeIn motion-reduce:animate-none relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src="/veterancommunity.png" 
                      alt="Background" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="relative z-10 flex-1 min-w-0">
                    <h2
                      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Welcome Back{user?.name ? `, ${user.name}` : ''}!
                    </h2>
                    <p className="text-white/90 text-base md:text-lg leading-relaxed">
                      Your journey starts here. Track your progress and stay connected.
                    </p>
                  </div>
                  <img
                    src="/dashboard-illustration.svg"
                    alt=""
                    className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain opacity-80 relative z-10 shrink-0"
                  />
                </section>

                {/* Quick Actions Row */}
                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                  <QuickActionCard
                    icon={FaUsers}
                    title="Community"
                    description="Join the community"
                    href="/client/community"
                    color="primary"
                  />
                  <QuickActionCard
                    icon={FaPenFancy}
                    title="Journal"
                    description="Record your thoughts"
                    href="/client/journal"
                    color="secondary"
                  />
                  <QuickActionCard
                    icon={FaRobot}
                    title="AI Assistant"
                    description="Get instant guidance"
                    href="/client/aichatbot"
                    color="accent"
                  />
                  <QuickActionCard
                    icon={FaChartLine}
                    title="Life Score"
                    description="View your metrics"
                    href="/client/lifescores"
                    color="warning"
                  />
                  <QuickActionCard
                    icon={FaFire}
                    title="FireTeam"
                    description="Group collaboration"
                    href="/client/fireteam"
                    color="fireteam"
                  />
                </section>

                {/* Content Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Upcoming Sessions */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 animate-fadeIn motion-reduce:animate-none">
                    <h3
                      className="text-lg font-semibold mb-4 flex items-center gap-2 text-[#002147]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <FaCalendar className="text-orange-500" />
                      Upcoming Sessions
                    </h3>
                    <div className="space-y-4">
                      {loading ? (
                        <p className="text-gray-500 text-sm">Loading...</p>
                      ) : upcomingSessions.length === 0 ? (
                        <p className="text-gray-500 text-sm">No sessions scheduled yet.</p>
                      ) : (
                        upcomingSessions.map((session) => {
                          // Format date and time
                          const dateObj = new Date(session.scheduled_at);
                          const dateStr = dateObj.toLocaleDateString();
                          const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                          return (
                            <div
                              key={session.id}
                              className="border-l-4 border-[#002147] pl-4 py-3 bg-blue-50/50 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 cursor-pointer"
                            >
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-900">{session.type || session.title}</p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    with {
                                      typeof session.coach === 'object'
                                        ? session.coach.name || session.coach.user?.name || '-'
                                        : session.coach || '-'
                                    }
                                  </p>
                                </div>
                                <div className="text-left sm:text-right shrink-0">
                                  <p className="text-sm font-semibold text-gray-900">{dateStr}</p>
                                  <p className="text-xs text-gray-600 mt-0.5">{timeStr}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                    <button 
                      className="mt-4 md:mt-5 py-2.5 md:py-1 min-h-[44px] md:min-h-0 w-full sm:w-auto justify-center sm:justify-start text-[#002147] hover:text-orange-500 text-sm font-semibold transition-colors duration-150 flex items-center gap-1 group rounded-lg hover:bg-gray-50 active:bg-gray-100 motion-reduce:transition-none [touch-action:manipulation]" 
                      onClick={() => router.push('/client/session')}
                    >
                      View All Sessions 
                      <span className="group-hover:translate-x-1 transition-transform duration-150 motion-reduce:transition-none">→</span>
                    </button>
                  </div>

                  {/* Life Score */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 animate-fadeIn motion-reduce:animate-none">
                    <h3
                      className="text-lg font-semibold mb-4 flex items-center gap-2 text-[#002147]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <FaChartLine className="text-yellow-500" />
                      Life Score Overview
                    </h3>
                    <div className="space-y-4">
                      {Object.keys(lifeScore).length === 0 ? (
                        <p className="text-gray-500 text-sm">No life score data available.</p>
                      ) : (
                        Object.entries(lifeScore).map(([category, score]) => (
                          <div key={category}>
                            <div className="flex justify-between items-center gap-2 mb-2 min-w-0">
                              <span className="capitalize font-medium text-gray-900 truncate">{category}</span>
                              <span className="text-sm font-semibold text-gray-700 shrink-0">{score}/10</span>
                            </div>
                            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${score * 10}%` }}
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <button 
                      className="mt-4 md:mt-5 py-2.5 md:py-1 min-h-[44px] md:min-h-0 w-full sm:w-auto justify-center sm:justify-start text-[#002147] hover:text-orange-500 text-sm font-semibold transition-colors duration-150 flex items-center gap-1 group rounded-lg hover:bg-gray-50 active:bg-gray-100 motion-reduce:transition-none [touch-action:manipulation]"
                      onClick={() => router.push('/client/lifescores')}
                    >
                      View Detailed Analysis
                      <span className="group-hover:translate-x-1 transition-transform duration-150 motion-reduce:transition-none">→</span>
                    </button>
                  </div>

                </section>
              </div>

              {/* Sidebar for Notifications */}
              <aside className="lg:w-80 space-y-6">
                <NotificationsWidget />
                
                {/* Upcoming Fireteam Experiences */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-5">
                  <h3 className="text-lg font-semibold text-[#002147] mb-4 flex items-center gap-2">
                    <FaFire className="text-orange-500" />
                    Fireteam Events
                  </h3>
                  <div className="space-y-3">
                    {loading ? (
                      <p className="text-gray-500 text-sm">Loading...</p>
                    ) : upcomingExperiences.length === 0 ? (
                      <p className="text-gray-500 text-sm">No upcoming experiences.</p>
                    ) : (
                      upcomingExperiences.slice(0, 3).map((experience) => (
                        <div
                          key={experience.id}
                          className="border-l-3 border-orange-500 pl-3 py-2 bg-orange-50/50 rounded hover:bg-orange-50 transition-colors cursor-pointer"
                        >
                          <p className="font-medium text-sm text-gray-900 line-clamp-1">{experience.title}</p>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                            {experience.fireteam?.title || 'Fireteam'}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  <button 
                    className="mt-4 py-2.5 min-h-[44px] text-[#002147] hover:text-orange-500 hover:bg-gray-50 active:bg-gray-100 text-sm font-medium transition-colors duration-150 w-full text-center rounded-lg motion-reduce:transition-none [touch-action:manipulation]"
                    onClick={() => router.push('/client/fireteam')}
                  >
                    View All →
                  </button>
                </div>
                
                
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Quick Action Card
function QuickActionCard({ icon: Icon, title, description, href, color }) {
  // Use brand color classes from Tailwind config with better contrast
  const colorClasses = {
    primary: 'bg-[#002147] text-white hover:bg-[#003875]',
    secondary: 'bg-orange-500 text-white hover:bg-orange-600',
    accent: 'bg-blue-600 text-white hover:bg-blue-700',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    fireteam: 'bg-gradient-to-br from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600',
  };

  return (
    <a
      href={href}
      className={`group p-4 md:p-5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg flex flex-col items-center text-center gap-2 md:gap-3 min-h-[88px] md:min-h-0 justify-center hover:scale-105 active:scale-[0.98] motion-reduce:transform-none [touch-action:manipulation] ${colorClasses[color]}`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="p-2.5 md:p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors shrink-0">
        <Icon className="text-xl md:text-2xl" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-bold mb-0.5 md:mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
        <p className="text-xs opacity-90 hidden md:block">{description}</p>
      </div>
    </a>
  );
}
