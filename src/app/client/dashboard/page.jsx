'use client';

import { useState, useEffect } from 'react';
import {
  FaCalendar,
  FaPenFancy,
  FaRobot,
  FaChartLine,
  FaUsers,
  FaFire,
  FaUserCircle,
  FaVideo,
} from 'react-icons/fa';
import Sidebar from '../../../../components/dashboardcomponents/sidebar'
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { useRouter } from 'next/navigation';
import { sessionsService } from '../../../services/api/sessions.service';
import { habitsService } from '../../../services/api/habits.service';
import { fireteamService } from '../../../services/api/fireteam.service';
import { experienceService } from '../../../services/api/experience.service';

export default function ClientDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [lifeScore, setLifeScore] = useState({});
  const [upcomingExperiences, setUpcomingExperiences] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  })();

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
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-8 py-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Content */}
              <div className="flex-1 space-y-6">
                {/* Welcome block: avatar + greeting + CTA (reference-style) */}
                <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 md:pb-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#002147] flex items-center justify-center shrink-0">
                      <FaUserCircle className="text-white text-2xl md:text-3xl" />
                    </div>
                    <div>
                      <h2
                        className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {greeting}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
                      </h2>
                      <p className="text-gray-600 text-sm md:text-base mt-0.5">
                        Your journey starts here.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push('/client/session')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#003875] text-white font-semibold px-4 py-3 rounded-xl shadow-sm transition-colors"
                  >
                    <FaVideo className="text-lg" />
                    Schedule your next Session
                  </button>
                </section>

                {/* Quick Actions: 2x2 on mobile, row on desktop */}
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
                    href="/client/lifescore"
                    color="warning"
                  />
                  <QuickActionCard
                    icon={FaFire}
                    title="FireTeam"
                    description="Group collaboration"
                    href="/client/fireteam"
                    color="fireteam"
                  />
                  <QuickActionCard
                    icon={FaCalendar}
                    title="Sessions"
                    description="Schedule your next session"
                    href="/client/session"
                    color="primary"
                  />
                </section>

                {/* Content Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Upcoming Sessions */}
                  

                  {/* Life Score */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 animate-fadeIn">
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
                            <div className="flex justify-between mb-2">
                              <span className="capitalize font-medium text-gray-900">{category}</span>
                              <span className="text-sm font-semibold text-gray-700">{score}/10</span>
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
                      className="mt-5 text-[#002147] hover:text-orange-500 text-sm font-semibold transition-colors duration-150 flex items-center gap-1 group"
                      onClick={() => router.push('/client/lifescores')}
                    >
                      View Detailed Analysis
                      <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
                    </button>
                  </div>

                </section>
              </div>

              {/* Sidebar for Notifications */}
              <aside className="lg:w-80 space-y-6">
                
                
                {/* Upcoming Fireteam Experiences */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5">
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
                    className="mt-4 text-[#002147] hover:text-orange-500 text-sm font-medium transition-colors duration-150 w-full text-center"
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
      className={`group p-5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg transform hover:scale-105 flex flex-col items-center text-center gap-3 ${colorClasses[color]}`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
        <Icon className="text-2xl" />
      </div>
      <div>
        <h3 className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
        <p className="text-xs opacity-90 hidden md:block">{description}</p>
      </div>
    </a>
  );
}
