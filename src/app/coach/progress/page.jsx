"use client";
import { useState, useEffect, useMemo } from "react";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { FaUserCircle, FaChartLine, FaHeartbeat, FaSearch, FaPhone } from "react-icons/fa";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { clientsService } from '../../../services/api/clients.service';

function normalizeClient(raw) {
  const id = raw?.id ?? raw?.user_id;
  const u = raw?.user;
  return {
    id,
    name: u?.name ?? raw?.name ?? '—',
    email: u?.email ?? raw?.email ?? '—',
    phone: u?.phone ?? raw?.phone ?? '—',
    status: raw?.status ?? 'Active',
  };
}

function normalizeProgress(progress) {
  if (!progress) return null;
  const data = progress?.data ?? progress;
  const wholeLife = data?.whole_life ?? data?.wholeLife;
  const dailyHabit = data?.daily_habit ?? data?.dailyHabit;
  const insight = data?.insight ?? data?.coach_insight ?? null;
  return {
    wholeLife: wholeLife ? {
      month: wholeLife.month ?? new Date().toLocaleString('default', { month: 'long' }),
      score: typeof wholeLife.score === 'number' ? wholeLife.score : (wholeLife.health || wholeLife.career || wholeLife.finances) ? 0 : null,
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
    } : null,
    dailyHabit: dailyHabit ? {
      date: dailyHabit.date ?? new Date().toISOString().slice(0, 10),
      score: typeof dailyHabit.score === 'number' ? dailyHabit.score : null,
      details: dailyHabit.details ?? {
        ...(dailyHabit.sleep != null && { sleep: dailyHabit.sleep }),
        ...(dailyHabit.exercise != null && { exercise: dailyHabit.exercise }),
        ...(dailyHabit.nutrition != null && { nutrition: dailyHabit.nutrition }),
        ...(dailyHabit.mood != null && { mood: dailyHabit.mood }),
        ...(dailyHabit.productivity != null && { productivity: dailyHabit.productivity }),
      },
    } : null,
    insight: insight ?? null,
  };
}

export default function CoachProgressPage() {
  const [clients, setClients] = useState([]);
  const [clientProgress, setClientProgress] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [coachNotes, setCoachNotes] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleOpenModal = (client) => {
    setSelectedClient(client);
    setCoachNotes(client?.coachNotes ?? "");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedClient(null);
  };

  const handleSaveCoachNotes = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
    if (selectedClient) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === selectedClient.id ? { ...c, coachNotes } : c
        )
      );
      setSelectedClient((prev) => (prev ? { ...prev, coachNotes } : null));
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchClientsAndProgress() {
      setLoading(true);
      setError(null);
      try {
        const data = await clientsService.getClients();
        const rawList = data?.clients ?? data?.data ?? (Array.isArray(data) ? data : []);
        const normalized = (rawList || []).map(normalizeClient);
        setClients(normalized);

        const progressMap = {};
        await Promise.all(
          normalized.map(async (client) => {
            const progress = await clientsService.getClientProgress(client.id);
            progressMap[client.id] = normalizeProgress(progress);
          })
        );
        setClientProgress(progressMap);
      } catch (err) {
        setError("Unable to load clients. Please try again.");
        setClients([]);
        setClientProgress({});
      } finally {
        setLoading(false);
      }
    }
    fetchClientsAndProgress();
  }, []);

  const filteredClients = useMemo(() => {
    if (!search.trim()) return clients;
    const q = search.trim().toLowerCase();
    return clients.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && String(c.phone).toLowerCase().includes(q))
    );
  }, [clients, search]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="min-h-screen h-screen flex bg-gray-50 font-serif overflow-x-hidden">
      <CoachSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full transition-all duration-300">
        <ClientTopbar user={user || { name: "Coach" }} />
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-12 py-4 md:py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold text-[#002147]">Client Progress & Insights</h2>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} aria-hidden />
                <input
                  type="search"
                  placeholder="Search by name, email, or phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                  aria-label="Search clients"
                />
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-48 rounded-xl bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12 px-4 bg-white rounded-xl border border-gray-200">
                <p className="text-red-600 font-medium">{error}</p>
                <p className="text-gray-500 text-sm mt-1">Check your connection and refresh the page.</p>
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="text-center py-12 px-4 bg-white rounded-xl border border-gray-200">
                <FaUserCircle className="mx-auto text-gray-300 mb-3" size={48} aria-hidden />
                <p className="text-gray-600 font-medium">
                  {search ? "No clients match your search." : "No clients yet."}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {search ? "Try a different search term." : "Client progress will appear here when clients are assigned to you."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClients.map((client) => {
                  const progress = clientProgress[client.id];
                  const hasWholeLife = progress?.wholeLife && (progress.wholeLife.score != null || Object.keys(progress.wholeLife.details || {}).length > 0);
                  const hasDailyHabit = progress?.dailyHabit && (progress.dailyHabit.score != null || Object.keys(progress.dailyHabit.details || {}).length > 0);
                  const hasInsight = progress?.insight;

                  return (
                    <div
                      key={client.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col gap-4 cursor-pointer"
                      onClick={() => handleOpenModal(client)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaUserCircle className="text-3xl text-[#002147]" />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-lg text-gray-800 truncate">{client.name}</div>
                          <div className="text-xs text-gray-500 truncate">{client.email}</div>
                          {client.phone !== '—' && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                              <FaPhone className="shrink-0" /> {client.phone}
                            </div>
                          )}
                          <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            {client.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {hasWholeLife ? (
                          <>
                            <div className="flex items-center gap-2 text-[#002147] font-semibold">
                              <FaChartLine /> Whole Life: <span className="text-gray-800">{progress.wholeLife.score != null ? `${progress.wholeLife.score}/10` : '—'}</span>
                              {progress.wholeLife.month && <span className="text-xs text-gray-500">({progress.wholeLife.month})</span>}
                            </div>
                            {progress.wholeLife.details && Object.keys(progress.wholeLife.details).length > 0 && (
                              <div className="flex flex-wrap gap-2 text-xs text-gray-600 pl-6">
                                {Object.entries(progress.wholeLife.details).map(([k, v]) => (
                                  <span key={k}>{k.replace(/_/g, ' ')}: <span className="font-bold text-gray-700">{v}</span></span>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <FaChartLine /> Whole Life: <span className="italic">No data yet</span>
                          </div>
                        )}

                        {hasDailyHabit ? (
                          <>
                            <div className="flex items-center gap-2 text-orange-700 font-semibold mt-2">
                              <FaHeartbeat /> Daily Habit: <span className="text-gray-800">{progress.dailyHabit.score != null ? `${progress.dailyHabit.score}/5` : '—'}</span>
                              {progress.dailyHabit.date && <span className="text-xs text-gray-500">({progress.dailyHabit.date})</span>}
                            </div>
                            {progress.dailyHabit.details && Object.keys(progress.dailyHabit.details).length > 0 && (
                              <div className="flex flex-wrap gap-2 text-xs text-gray-600 pl-6">
                                {Object.entries(progress.dailyHabit.details).map(([k, v]) => (
                                  <span key={k}>{k}: <span className="font-bold text-gray-700">{v}</span></span>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                            <FaHeartbeat /> Daily Habit: <span className="italic">No data yet</span>
                          </div>
                        )}

                        {hasInsight && (
                          <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-sm text-blue-900">
                            <span className="font-semibold">Insight:</span> {progress.insight}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>

        <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth fullScreen={isSmallScreen}>
          <DialogTitle>Client Details & Progress</DialogTitle>
          <DialogContent dividers>
            {selectedClient && (
              <div className="flex flex-col gap-4">
                <div>
                  <span className="font-bold">Name:</span> {selectedClient.name}
                </div>
                <div>
                  <span className="font-bold">Email:</span> {selectedClient.email}
                </div>
                {selectedClient.phone !== '—' && (
                  <div>
                    <span className="font-bold">Phone:</span> {selectedClient.phone}
                  </div>
                )}
                <div>
                  <span className="font-bold">Status:</span>{" "}
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    {selectedClient.status}
                  </span>
                </div>

                {(() => {
                  const progress = clientProgress[selectedClient.id];
                  const hasWholeLife = progress?.wholeLife && (progress.wholeLife.score != null || Object.keys(progress.wholeLife.details || {}).length > 0);
                  const hasDailyHabit = progress?.dailyHabit && (progress.dailyHabit.score != null || Object.keys(progress.dailyHabit.details || {}).length > 0);
                  return (
                    <>
                      <div>
                        <span className="font-bold">Whole Life Score:</span>{" "}
                        {hasWholeLife ? `${progress.wholeLife.score ?? '—'}/10 (${progress.wholeLife.month ?? '—'})` : "No data yet"}
                        {hasWholeLife && progress.wholeLife.details && Object.keys(progress.wholeLife.details).length > 0 && (
                          <div className="ml-4 mt-1 text-sm text-gray-700">
                            {Object.entries(progress.wholeLife.details).map(([k, v]) => (
                              <div key={k}>{k.replace(/_/g, ' ')}: <span className="font-semibold">{v}</span></div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-bold">Daily Habit Score:</span>{" "}
                        {hasDailyHabit ? `${progress.dailyHabit.score ?? '—'}/5 (${progress.dailyHabit.date ?? '—'})` : "No data yet"}
                        {hasDailyHabit && progress.dailyHabit.details && Object.keys(progress.dailyHabit.details).length > 0 && (
                          <div className="ml-4 mt-1 text-sm text-gray-700">
                            {Object.entries(progress.dailyHabit.details).map(([k, v]) => (
                              <div key={k}>{k}: <span className="font-semibold">{v}</span></div>
                            ))}
                          </div>
                        )}
                      </div>
                      {progress?.insight && (
                        <div>
                          <span className="font-bold">Insight:</span> {progress.insight}
                        </div>
                      )}
                    </>
                  );
                })()}

                <div>
                  <span className="font-bold">Coach&apos;s Notes:</span>
                  <TextField
                    multiline
                    minRows={3}
                    maxRows={6}
                    fullWidth
                    value={coachNotes}
                    onChange={(e) => setCoachNotes(e.target.value)}
                    placeholder="Add notes about this client..."
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                  {saveSuccess && (
                    <div className="text-green-600 text-sm mt-1">Notes saved!</div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveCoachNotes} color="success" variant="contained">
              Save Notes
            </Button>
            <Button onClick={handleCloseModal} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
