"use client";
import { useState, useEffect, useCallback } from "react";
import Sidebar from '../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import HomePage from "./components/HomePage";
import { FaFire, FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import { fireteamService } from '../../../services/api/fireteam.service';
import { experienceService } from '../../../services/api/experience.service';

function transformExperience(exp, fireteam) {
  return {
    id: exp.id,
    course: fireteam?.title || "Fireteam Experience",
    instructor: fireteam?.coach_name || fireteam?.instructor || "Coach",
    experience: {
      title: exp.title,
      subtitle: exp.experience || "Interactive Learning Session",
    },
    dueDate: exp.due_date ? new Date(exp.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "TBD",
    dueTime: exp.due_time || "5:00 PM PDT",
    sessionDate: exp.session_date ? new Date(exp.session_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "TBD",
    sessionTime: exp.session_time || "12:00 PM PDT",
    chat: exp.has_chat !== undefined ? exp.has_chat : true,
    action: exp.status === 'completed' ? "View Results" : "View",
    status: exp.status === 'completed' ? "Completed" : "Upcoming",
    fireteamId: fireteam?.id ?? exp.fire_team_id,
    experienceId: exp.id,
    meetingLink: exp.link || null,
  };
}

export default function FireteamPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalExperiences: 0,
    upcomingExperiences: 0,
    completedExperiences: 0,
    fireteams: 0
  });
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFireteamData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const fireteams = await fireteamService.getFireteams();
      const allAssignments = [];
      let totalExp = 0;
      let upcomingExp = 0;
      let completedExp = 0;

      if (fireteams && fireteams.length > 0) {
        for (const fireteam of fireteams) {
          try {
            const experiences = await experienceService.getExperiences(fireteam.id);
            totalExp += experiences.length;
            upcomingExp += experiences.filter(e => e.status !== 'completed').length;
            completedExp += experiences.filter(e => e.status === 'completed').length;
            const transformed = experiences.map(exp => transformExperience(exp, fireteam));
            allAssignments.push(...transformed);
          } catch (err) {
            console.error(`Error fetching experiences for fireteam ${fireteam.id}:`, err);
          }
        }
      }

      setStats({
        totalExperiences: totalExp,
        upcomingExperiences: upcomingExp,
        completedExperiences: completedExp,
        fireteams: fireteams?.length ?? 0
      });
      setAssignments(allAssignments);
    } catch (err) {
      console.error('Error fetching fireteam data:', err);
      setError("Failed to load experiences. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        fetchFireteamData();
      } catch (e) {
        setUser(null);
      }
    }
  }, [fetchFireteamData]);

  return (
    <div className="h-screen flex bg-white font-body">
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
  {/* Main Area */}
  <div className="flex-1 min-w-0 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-6 py-3 bg-gray-50 min-w-0">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Main Content */}
              <div className="flex-1 space-y-3 min-w-0">
                {/* Header Section */}
                <section className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-xl p-4 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src="/veterancommunity.png" 
                      alt="Background" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <h1 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                      <FaFire className="text-orange-500" />
                      FireTeam Experiences
                    </h1>
                    <p className="text-white/90 text-xs">Collaborative learning and growth with your team</p>
                  </div>
                </section>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 bg-orange-100 rounded-lg">
                        <FaFire className="text-orange-500 text-sm" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">Total</span>
                    </div>
                    <p className="text-xl font-bold text-[#002147]">{stats.totalExperiences}</p>
                    <p className="text-[9px] text-gray-500">Experiences</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <FaCalendarAlt className="text-blue-500 text-sm" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">Upcoming</span>
                    </div>
                    <p className="text-xl font-bold text-[#002147]">{stats.upcomingExperiences}</p>
                    <p className="text-[9px] text-gray-500">To Complete</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 bg-green-100 rounded-lg">
                        <FaChartLine className="text-green-500 text-sm" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">Completed</span>
                    </div>
                    <p className="text-xl font-bold text-[#002147]">{stats.completedExperiences}</p>
                    <p className="text-[9px] text-gray-500">Finished</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 bg-purple-100 rounded-lg">
                        <FaUsers className="text-purple-500 text-sm" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">FireTeams</span>
                    </div>
                    <p className="text-xl font-bold text-[#002147]">{stats.fireteams}</p>
                    <p className="text-[9px] text-gray-500">Active</p>
                  </div>
                </div>

                {/* HomePage Component */}
                <HomePage
                  assignments={assignments}
                  loading={loading}
                  error={error}
                  onRetry={fetchFireteamData}
                />
              </div>

              {/* Right Sidebar */}
              <aside className="lg:w-64 space-y-3">
                {/* Quick Info Card */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-sm p-4 text-white">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <FaFire />
                    What is FireTeam?
                  </h3>
                  <p className="text-[10px] text-white/90 mb-3 leading-relaxed">
                    FireTeam is a collaborative learning environment where you work alongside fellow veterans to complete experiences, share insights, and grow together.
                  </p>
                  <div className="space-y-2 text-[10px]">
                    <div className="flex items-start gap-2">
                      <span className="text-white mt-0.5">•</span>
                      <span>Participate in group sessions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-white mt-0.5">•</span>
                      <span>Complete pre-work assignments</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-white mt-0.5">•</span>
                      <span>Collaborate with your team</span>
                    </div>
                  </div>
                </div>

                {/* Tips Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4">
                  <h3 className="text-sm font-semibold text-[#002147] mb-3">Tips for Success</h3>
                  <div className="space-y-2 text-[10px] text-gray-700">
                    <div className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                      <span className="text-orange-500 font-bold">1.</span>
                      <span>Complete pre-work before sessions</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-green-50 rounded">
                      <span className="text-orange-500 font-bold">2.</span>
                      <span>Participate actively in discussions</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded">
                      <span className="text-orange-500 font-bold">3.</span>
                      <span>Share your experiences with the team</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-purple-50 rounded">
                      <span className="text-orange-500 font-bold">4.</span>
                      <span>Review session summaries and recordings</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}