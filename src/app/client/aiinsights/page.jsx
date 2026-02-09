'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import AIChatbot from '../../../../components/dashboardcomponents/AIChatbot';
import { sessionsService } from '../../../services/api/sessions.service';
import { habitsService } from '../../../services/api/habits.service';
import { clientsService } from '../../../services/api/clients.service';
import { FaChartLine } from 'react-icons/fa';

const QUICK_TIPS = [
  'Set clear, achievable goals for the week.',
  'Use the AI assistant to brainstorm solutions.',
  'Review your progress every Friday.',
];

function getTimeAgo(date) {
  if (!date) return '—';
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 60) return diffMins <= 1 ? 'Just now' : `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  return d.toLocaleDateString();
}

function normalizeProgress(progress) {
  if (!progress) return null;
  const data = progress?.data ?? progress;
  const wholeLife = data?.whole_life ?? data?.wholeLife;
  const dailyHabit = data?.daily_habit ?? data?.dailyHabit;
  const insight = data?.insight ?? data?.coach_insight ?? null;
  return {
    wholeLife: wholeLife
      ? {
          month: wholeLife.month ?? new Date().toLocaleString('default', { month: 'long' }),
          score: typeof wholeLife.score === 'number' ? wholeLife.score : null,
          details: wholeLife.details ?? {
            ...(wholeLife.health != null && { health: wholeLife.health }),
            ...(wholeLife.relationship != null && { relationship: wholeLife.relationship }),
            ...(wholeLife.career != null && { career: wholeLife.career }),
            ...(wholeLife.finances != null && { finances: wholeLife.finances }),
            ...(wholeLife.personal_growth != null && { personal_growth: wholeLife.personal_growth }),
            ...(wholeLife.recreation != null && { recreation: wholeLife.recreation }),
            ...(wholeLife.spirituality != null && { spirituality: wholeLife.spirituality }),
            ...(wholeLife.community != null && { community: wholeLife.community }),
          },
        }
      : null,
    dailyHabit: dailyHabit
      ? {
          date: dailyHabit.date ?? new Date().toISOString().slice(0, 10),
          score: typeof dailyHabit.score === 'number' ? dailyHabit.score : null,
          details: dailyHabit.details ?? {},
        }
      : null,
    insight: insight ?? null,
  };
}

function toSessionArray(sessions) {
  if (Array.isArray(sessions)) return sessions;
  if (sessions?.sessions?.data && Array.isArray(sessions.sessions.data)) return sessions.sessions.data;
  if (sessions?.data && Array.isArray(sessions.data)) return sessions.data;
  return [];
}

function toHistoryArray(history) {
  if (Array.isArray(history)) return history;
  if (history?.data && Array.isArray(history.data)) return history.data;
  return [];
}

export default function AIInsightsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [wholeLifeHistory, setWholeLifeHistory] = useState([]);
  const [progress, setProgress] = useState(null);

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

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);

    Promise.all([
      sessionsService.getSessions().catch(() => []),
      habitsService.getWholeLifeHistory().catch(() => []),
      user?.id ? clientsService.getClientProgress(user.id).then(normalizeProgress).catch(() => null) : Promise.resolve(null),
    ]).then(([sessionsRes, historyRes, progressRes]) => {
      const sessionArray = toSessionArray(sessionsRes);
      const historyArray = toHistoryArray(historyRes);
      setSessions(sessionArray);
      setWholeLifeHistory(historyArray);
      setProgress(progressRes);
      setLoading(false);
    });
  }, [user?.id]);

  const stats = useMemo(() => {
    const sessionArray = sessions;
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const upcoming = sessionArray.filter(
      (s) => s.scheduled_at && new Date(s.scheduled_at) > new Date()
    ).length;
    const completed = sessionArray.filter(
      (s) =>
        (s.status || '').toLowerCase() === 'completed' ||
        (s.status || '').toLowerCase() === 'done'
    ).length;
    const withDate = sessionArray
      .filter((s) => s.scheduled_at || s.date || s.updated_at)
      .map((s) => new Date(s.scheduled_at || s.date || s.updated_at));
    const lastSessionDate = withDate.length ? new Date(Math.max(...withDate.map((d) => d.getTime()))) : null;
    const insightsThisWeek = wholeLifeHistory.filter(
      (h) => h.created_at && new Date(h.created_at) >= weekStart
    ).length;
    return {
      completedSessions: completed,
      upcomingSessions: upcoming,
      lastActive: lastSessionDate ? getTimeAgo(lastSessionDate) : '—',
      insightsThisWeek,
    };
  }, [sessions, wholeLifeHistory]);

  const lifeScoreEntry = useMemo(() => {
    if (progress?.wholeLife?.details && Object.keys(progress.wholeLife.details).length > 0) {
      return progress.wholeLife.details;
    }
    const history = toHistoryArray(wholeLifeHistory);
    if (history.length === 0) return null;
    const latest = history[0];
    if (!latest || typeof latest !== 'object') return null;
    const omit = ['id', 'created_at', 'updated_at', 'user_id', 'client_id'];
    const categories = {};
    Object.entries(latest).forEach(([k, v]) => {
      if (omit.includes(k)) return;
      if (typeof v === 'number' || (typeof v === 'string' && v.trim() !== '')) {
        categories[k] = typeof v === 'number' ? v : parseFloat(v) || 0;
      }
    });
    return Object.keys(categories).length ? categories : null;
  }, [progress, wholeLifeHistory]);

  const activityInsights = useMemo(() => {
    const list = [];
    if (stats.completedSessions > 0) {
      list.push({
        id: 'sessions',
        title: 'Coaching sessions',
        description: `You've completed ${stats.completedSessions} session${stats.completedSessions !== 1 ? 's' : ''}. Keep building momentum with your coach.`,
        date: new Date().toISOString().slice(0, 10),
      });
    }
    if (lifeScoreEntry && Object.keys(lifeScoreEntry).length > 0) {
      list.push({
        id: 'lifescore',
        title: 'Life score',
        description: 'Your whole-life balance is tracked. Update it regularly on the Life Scores page to see trends.',
        date: new Date().toISOString().slice(0, 10),
      });
    }
    if (stats.upcomingSessions > 0) {
      list.push({
        id: 'upcoming',
        title: 'Upcoming sessions',
        description: `You have ${stats.upcomingSessions} upcoming session${stats.upcomingSessions !== 1 ? 's' : ''}. Prepare questions or topics you want to cover.`,
        date: new Date().toISOString().slice(0, 10),
      });
    }
    if (list.length === 0) {
      list.push({
        id: 'start',
        title: 'Get started',
        description: 'Complete a session, log your life score, or use the AI assistant above to get personalized insights.',
        date: new Date().toISOString().slice(0, 10),
      });
    }
    return list.slice(0, 4);
  }, [stats, lifeScoreEntry]);

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <ClientTopbar user={user} />
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-8">
                <section className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-none">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-1 tracking-tight">
                      Welcome to AI Insights{user?.name ? `, ${user.name}` : ''}!
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg">
                      Get instant guidance, insights, and support from your AI assistant.
                    </p>
                  </div>
                  <img
                    src="/ai-insights-illustration.svg"
                    alt="AI Insights"
                    className="w-28 h-28 md:w-36 md:h-36 object-contain hidden md:block"
                  />
                </section>

                {/* Where you are - Life score snapshot */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <h3 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                    <FaChartLine className="text-primary" />
                    Where you are
                  </h3>
                  {loading ? (
                    <p className="text-gray-500 text-sm">Loading your progress…</p>
                  ) : lifeScoreEntry && Object.keys(lifeScoreEntry).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(lifeScoreEntry).map(([category, value]) => {
                        const score = typeof value === 'number' ? value : parseFloat(value) || 0;
                        const label = category.replace(/_/g, ' ');
                        return (
                          <div key={category}>
                            <div className="flex justify-between mb-2">
                              <span className="capitalize font-medium text-gray-900">{label}</span>
                              <span className="text-sm font-semibold text-gray-700">{score}/10</span>
                            </div>
                            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${Math.min(100, score * 10)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => router.push('/client/lifescores')}
                        className="mt-2 text-primary hover:underline text-sm font-semibold"
                      >
                        View detailed Life Scores →
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-500 text-sm mb-2">
                        No life score data yet. Track your balance across health, career, relationships, and more.
                      </p>
                      <button
                        type="button"
                        onClick={() => router.push('/client/lifescores')}
                        className="text-primary hover:underline text-sm font-semibold"
                      >
                        Add your first Life Score →
                      </button>
                    </div>
                  )}
                </section>

                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none min-h-[300px] flex flex-col justify-center items-center">
                  <AIChatbot />
                </section>

                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Recent activity & insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activityInsights.map((insight) => (
                      <div
                        key={insight.id}
                        className="border border-gray-100 rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
                      >
                        <span className="text-sm text-gray-400">
                          {new Date(insight.date).toLocaleDateString()}
                        </span>
                        <h4 className="text-lg font-bold text-gray-800 mt-2 mb-1">{insight.title}</h4>
                        <p className="text-gray-600 text-sm">{insight.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-none">
                  <h5 className="text-md font-semibold mb-2 text-primary">Your stats</h5>
                  {loading ? (
                    <p className="text-gray-500 text-sm">Loading…</p>
                  ) : (
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>
                        Completed sessions: <span className="font-bold">{stats.completedSessions}</span>
                      </li>
                      <li>
                        Upcoming sessions: <span className="font-bold">{stats.upcomingSessions}</span>
                      </li>
                      <li>
                        Last active: <span className="font-bold">{stats.lastActive}</span>
                      </li>
                      <li>
                        Life score updates this week: <span className="font-bold">{stats.insightsThisWeek}</span>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-none">
                  <h5 className="text-md font-semibold mb-2 text-primary">Quick tips</h5>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    {QUICK_TIPS.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
