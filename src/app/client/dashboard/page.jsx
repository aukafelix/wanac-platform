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
  FaBell,
  FaGraduationCap,
  FaBriefcase,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaFileAlt,
  FaSearch,
  FaClipboardList,
} from 'react-icons/fa';
import Sidebar from '../../../../components/dashboardcomponents/sidebar'
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { useRouter } from 'next/navigation';
import { sessionsService } from '../../../services/api/sessions.service';
import { habitsService } from '../../../services/api/habits.service';
import { fireteamService } from '../../../services/api/fireteam.service';
import { experienceService } from '../../../services/api/experience.service';
import { notificationService } from '../../../services/api/notification.service';
import journalPrompts from '../../../data/journalPrompts.json';

// Day of year (1–365) for aligning with 365 Growth Journal prompts
function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 864e5;
  return Math.min(365, Math.max(1, Math.floor(diff / oneDay) + 1));
}

export default function ClientDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [lifeScore, setLifeScore] = useState({});
  const [upcomingExperiences, setUpcomingExperiences] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(() => new Date());

  // Mock data for right sidebar (replace with real API later)
  const availableForCoaching = [
    { id: 1, name: 'Mike Tyson', role: 'iOS Developer', initial: 'M' },
    { id: 2, name: 'Samuel John', role: 'Android Developer', initial: 'S' },
    { id: 3, name: 'Jiya George', role: 'UX/UI Designer', initial: 'J' },
  ];

  const router = useRouter();

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  })();

  // Progress summary for hero banner (from life score or placeholder)
  const progressSummary = (() => {
    const keys = Object.keys(lifeScore);
    if (keys.length === 0) return 'Your journey starts here. Schedule a session to begin tracking your progress.';
    const avg = Math.round(keys.reduce((acc, k) => acc + (lifeScore[k] || 0), 0) / keys.length);
    const upcoming = upcomingSessions.length;
    if (upcoming > 0) {
      return `You have ${upcoming} upcoming session${upcoming > 1 ? 's' : ''}. Your overall progress is looking good at ${avg}/10. Keep going!`;
    }
    return `Your overall progress is at ${avg}/10. Schedule your next session to keep building momentum.`;
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

        // Fetch notifications
        setNotificationsLoading(true);
        notificationService.getNotifications().then((data) => {
          let list = [];
          if (Array.isArray(data)) list = data;
          else if (data?.data && Array.isArray(data.data)) list = data.data;
          else if (data?.notifications && Array.isArray(data.notifications)) list = data.notifications;
          setNotifications(list);
        }).catch(() => setNotifications([])).finally(() => setNotificationsLoading(false));
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
      className="h-screen max-h-[100dvh] flex flex-row overflow-hidden bg-white font-body text-foreground"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0 w-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content - no scroll, fits viewport */}
        <main className="flex-1 min-h-0 overflow-hidden flex flex-col px-3 sm:px-4 md:px-6 py-3 md:py-4 bg-gray-50">
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 md:gap-4 max-w-7xl mx-auto w-full min-w-0">
            {/* Main Content */}
            <div className="flex-1 min-w-0 flex flex-col min-h-0 gap-3 md:gap-4">
              {/* Welcome hero banner - purple card like screenshot */}
              <section className="flex-shrink-0 relative overflow-hidden rounded-2xl bg-[#9A6AE3] text-white shadow-lg">
                {/* Decorative translucent circles */}
                <div className="absolute top-2 left-16 w-10 h-10 rounded-full bg-white/20" aria-hidden />
                <div className="absolute bottom-4 left-24 w-8 h-8 rounded-full bg-white/15" aria-hidden />
                <div className="absolute top-4 right-1/3 w-6 h-6 rounded-full bg-white/10" aria-hidden />
                <div className="flex flex-row min-h-[140px] sm:min-h-[160px]">
                  {/* Left: illustration / image */}
                  <div className="relative w-32 sm:w-40 flex-shrink-0 flex items-end justify-center overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=320&q=80"
                      alt=""
                      className="h-full w-full object-cover object-bottom scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#9A6AE3] to-transparent opacity-60" />
                  </div>
                  {/* Right: greeting + summary + CTA */}
                  <div className="flex-1 flex flex-col justify-center px-4 sm:px-5 py-4 pr-4">
                    <h2
                      className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Hello, {user?.name ? user.name.split(' ')[0] : 'there'}!
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base mt-1 leading-snug max-w-xl">
                      {progressSummary}
                    </p>
                    <button
                      onClick={() => router.push('/client/session')}
                      className="mt-3 w-fit inline-flex items-center justify-center gap-2 bg-white text-[#9A6AE3] hover:bg-white/95 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
                    >
                      <FaVideo className="text-base" />
                      Schedule your next Session
                    </button>
                  </div>
                </div>
              </section>

              {/* Quick Actions - compact */}
              <section className="flex-shrink-0 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                    Quick access
                  </h3>
                  <button
                    type="button"
                    onClick={() => router.push('/client/session')}
                    className="text-xs font-medium text-[#002147] hover:text-orange-500 transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <QuickActionCard
                      icon={FaUsers}
                      title="Community"
                      subtitle="Join the community"
                      href="/client/community"
                      iconBg="bg-blue-100 text-blue-600"
                    />
                    <QuickActionCard
                      icon={FaPenFancy}
                      title="Journal"
                      subtitle="Record your thoughts"
                      href="/client/journal"
                      iconBg="bg-purple-100 text-purple-600"
                    />
                    <QuickActionCard
                      icon={FaRobot}
                      title="AI Assistant"
                      subtitle="Get instant guidance"
                      href="/client/aichatbot"
                      iconBg="bg-pink-100 text-pink-600"
                    />
                    <QuickActionCard
                      icon={FaChartLine}
                      title="Life Score"
                      subtitle="View your metrics"
                      href="/client/lifescore"
                      iconBg="bg-amber-100 text-amber-600"
                    />
                    <QuickActionCard
                      icon={FaFire}
                      title="FireTeam"
                      subtitle="Group collaboration"
                      href="/client/fireteam"
                      iconBg="bg-orange-100 text-orange-600"
                    />
                    <QuickActionCard
                      icon={FaCalendar}
                      title="Sessions"
                      subtitle="Schedule session"
                      href="/client/session"
                      iconBg="bg-indigo-100 text-indigo-600"
                    />
                  </div>
                </section>

                {/* Content Grid - fills remaining space, no scroll */}
                <section className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 overflow-hidden">
                  {/* Life Score - compact */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm min-h-0 flex flex-col overflow-hidden">
                    <h3 className="text-base font-semibold mb-2 flex items-center gap-2 text-[#002147] shrink-0" style={{ fontFamily: 'var(--font-heading)' }}>
                      <FaChartLine className="text-yellow-500 text-sm" />
                      Life Score Overview
                    </h3>
                    <div className="space-y-2 min-h-0 overflow-hidden">
                      {Object.keys(lifeScore).length === 0 ? (
                        <p className="text-gray-500 text-xs">No life score data available.</p>
                      ) : (
                        Object.entries(lifeScore).map(([category, score]) => (
                          <div key={category}>
                            <div className="flex justify-between mb-1">
                              <span className="capitalize font-medium text-gray-900 text-sm truncate">{category}</span>
                              <span className="text-xs font-semibold text-gray-700 shrink-0">{score}/10</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                                style={{ width: `${score * 10}%` }}
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <button
                      className="mt-2 text-[#002147] hover:text-orange-500 text-xs font-semibold transition-colors shrink-0"
                      onClick={() => router.push('/client/lifescores')}
                    >
                      View Detailed Analysis →
                    </button>
                  </div>

                  {/* Upcoming Journal Prompts - compact */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm min-h-0 flex flex-col overflow-hidden">
                    <h3 className="text-base font-semibold mb-2 flex items-center gap-2 text-[#002147] shrink-0" style={{ fontFamily: 'var(--font-heading)' }}>
                      <FaPenFancy className="text-purple-500 text-sm" />
                      Upcoming Journal Prompts
                    </h3>
                    <div className="space-y-1.5 min-h-0 overflow-hidden">
                      {(() => {
                        const dayOfYear = getDayOfYear();
                        const len = journalPrompts.length;
                        const upcoming = [0, 1].map((i) => {
                          const idx = (dayOfYear - 1 + i) % len;
                          const p = journalPrompts[idx];
                          return p ? { ...p, dayLabel: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : `Day ${dayOfYear + i}` } : null;
                        }).filter(Boolean);
                        return upcoming.length === 0 ? (
                          <p className="text-gray-500 text-xs">No prompts available.</p>
                        ) : (
                          upcoming.map((p, i) => (
                            <div key={`${p.number}-${i}`} className="border-l-2 border-purple-400 pl-2 py-1 bg-purple-50/50 rounded text-xs">
                              <p className="font-medium text-purple-800">{p.dayLabel} · #{p.number}</p>
                              <p className="text-gray-700 line-clamp-1">{p.text}</p>
                            </div>
                          ))
                        );
                      })()}
                    </div>
                    <button
                      className="mt-2 text-[#002147] hover:text-orange-500 text-xs font-semibold transition-colors shrink-0"
                      onClick={() => router.push('/client/journal')}
                    >
                      Open Journal →
                    </button>
                  </div>
                </section>
              </div>

              {/* Right sidebar - no scroll, fits viewport */}
              <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 min-w-0 bg-gray-100 border-t lg:border-t-0 lg:border-l border-gray-200 overflow-hidden flex flex-col">
                <div className="p-2 sm:p-3 space-y-2 sm:space-y-3 flex-1 min-h-0 overflow-hidden flex flex-col">
                  {/* Header: icons + user profile - compact */}
                  <div className="flex-shrink-0 flex items-center justify-between gap-1 sm:gap-2 min-w-0">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <button className="min-w-[36px] min-h-[36px] sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 text-xs" aria-label="Settings">
                        <FaCog />
                      </button>
                      <button className="relative min-w-[36px] min-h-[36px] sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 text-xs" aria-label="Notifications">
                        <FaBell />
                        <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full" />
                      </button>
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 hidden sm:flex flex-shrink-0">
                        <FaUserCircle className="text-sm" />
                      </div>
                    </div>
                    <button onClick={() => router.push('/client/accountsettings')} className="flex items-center gap-1.5 min-w-0 flex-1 justify-end touch-manipulation">
                      <div className="text-right min-w-0">
                        <p className="font-semibold text-gray-900 truncate text-xs">{user?.name || 'Sara Abraham'}</p>
                        <p className="text-[10px] text-gray-500">View profile</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-amber-200 border border-amber-300 flex items-center justify-center overflow-hidden flex-shrink-0 text-amber-800 font-semibold text-xs">
                        {user?.profile_image ? (
                          <img src={user.profile_image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span>{(user?.name || 'Sara Abraham').split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Schedule Calendar - compact */}
                  <div className="flex-shrink-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-sm font-semibold text-gray-900">Schedule Calendar</h3>
                      <div className="flex items-center gap-0.5">
                        <button type="button" onClick={() => setCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1))} className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:bg-gray-200 text-xs">
                          <FaChevronLeft />
                        </button>
                        <button type="button" onClick={() => setCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1))} className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:bg-gray-200 text-xs">
                          <FaChevronRight />
                        </button>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-purple-500 text-white text-xs font-medium">
                          <FaCalendarAlt className="text-[10px]" />
                          {calendarMonth.toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 overflow-x-auto overflow-y-hidden pb-0.5">
                      {(() => {
                        const start = new Date(calendarMonth);
                        start.setDate(start.getDate() - start.getDay() + 1);
                        return [0, 1, 2, 3, 4].map((i) => {
                          const d = new Date(start);
                          d.setDate(start.getDate() + i);
                          const isSelected = selectedDay.toDateString() === d.toDateString();
                          return (
                            <button key={i} type="button" onClick={() => setSelectedDay(d)}
                              className={`flex-shrink-0 min-w-[44px] px-1.5 py-1.5 rounded text-xs font-medium ${
                                isSelected ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {d.toLocaleDateString('en-GB', { weekday: 'short' })} {d.getDate()}
                            </button>
                          );
                        });
                      })()}
                    </div>
                  </div>

                  {/* Shortcuts - compact */}
                  <div className="flex-shrink-0 space-y-1">
                    <h3 className="text-sm font-semibold text-gray-900">Shortcuts</h3>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button type="button" onClick={() => router.push('/client/mycareercompass')} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 text-left">
                        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0"><FaFileAlt className="text-xs" /></div>
                        <span className="font-medium text-gray-900 text-xs truncate">Application materials</span>
                      </button>
                      <button type="button" onClick={() => router.push('/client/mycareercompass')} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 text-left">
                        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0"><FaCalendar className="text-xs" /></div>
                        <span className="font-medium text-gray-900 text-xs truncate">Appointments</span>
                      </button>
                      <button type="button" onClick={() => router.push('/client/mycareercompass/researchtools')} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 text-left">
                        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0"><FaSearch className="text-xs" /></div>
                        <span className="font-medium text-gray-900 text-xs truncate">Research tools</span>
                      </button>
                      <button type="button" onClick={() => router.push('/client/myeducationcompass')} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 text-left">
                        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0"><FaClipboardList className="text-xs" /></div>
                        <span className="font-medium text-gray-900 text-xs truncate">Assignment & grades</span>
                      </button>
                    </div>
                  </div>

                  {/* Available For Coaching - compact, not stretched */}
                  <div className="flex-shrink-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">Available for coaching</h3>
                      <button type="button" className="text-xs font-medium text-gray-600 hover:text-gray-900 px-1.5 py-0.5 rounded bg-gray-200 hover:bg-gray-300">View All</button>
                    </div>
                    <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-0.5">
                      {availableForCoaching.map((p) => (
                        <div key={p.id} className="flex-shrink-0 w-28 sm:w-32 rounded-lg bg-white border border-gray-200 shadow-sm p-2 flex flex-col items-center text-center">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold text-xs mb-1">{p.initial}</div>
                          <p className="font-semibold text-gray-900 text-xs truncate w-full">{p.name}</p>
                          <p className="text-[10px] text-gray-500 truncate w-full mb-1.5">{p.role}</p>
                          <button type="button" className="w-full py-1.5 rounded bg-purple-500 text-white text-xs font-medium hover:bg-purple-600" onClick={() => router.push('/client/session')}>
                            Schedule session
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming events from the community */}
                  <div className="flex-shrink-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                        <FaUsers className="text-orange-500 text-xs" />
                        Upcoming events from the community
                      </h3>
                      <button
                        type="button"
                        onClick={() => router.push('/client/community')}
                        className="text-xs font-medium text-gray-600 hover:text-gray-900 px-1.5 py-0.5 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {loading ? (
                        <p className="text-gray-500 text-xs">Loading...</p>
                      ) : upcomingExperiences.length === 0 ? (
                        <p className="text-gray-500 text-xs">No upcoming community events.</p>
                      ) : (
                        upcomingExperiences.map((exp) => (
                          <button
                            key={exp.id}
                            type="button"
                            onClick={() => router.push('/client/fireteam')}
                            className="w-full text-left p-2 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <p className="font-medium text-gray-900 text-xs truncate">{exp.title || exp.name || 'Community event'}</p>
                            <p className="text-[10px] text-gray-500 truncate mt-0.5">{exp.fireteam?.title || 'Community'}</p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
        </main>
      </div>
    </div>
  );
}

// Quick Action Card - larger size
function QuickActionCard({ icon: Icon, title, subtitle, href, iconBg = 'bg-blue-100 text-blue-600' }) {
  return (
    <a
      href={href}
      className="group flex flex-col items-center text-center p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className={`mb-3 p-3 rounded-xl ${iconBg} transition-colors group-hover:opacity-90`}>
        <Icon className="text-2xl" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-0.5 line-clamp-1" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
      <p className="text-xs text-gray-500 line-clamp-1">{subtitle}</p>
    </a>
  );
}
