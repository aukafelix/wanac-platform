"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Sidebar from '../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { Dialog } from "@headlessui/react";
import {
  FaCalendar, FaChevronLeft, FaChevronRight, FaPlus,
  FaTimes, FaEdit, FaTrash, FaDownload, FaClock
} from 'react-icons/fa';
import { sessionsService } from '../../../services/api/sessions.service';
import { getEvents } from '../../../services/api/events.service';

// ── Google Calendar Connect ───────────────────────────────────────────────────
function GoogleCalendarConnect() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';').map(c => c.trim());
      const tokenCookie = cookies.find(c => c.startsWith('google_tokens='));
      setConnected(!!tokenCookie);
    }
  }, []);

  return connected ? (
    <div className="flex items-center gap-1.5 mb-3 p-2 bg-green-50 border border-green-200 rounded-lg">
      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <span className="text-green-700 font-medium text-[10px]">Connected to Google Calendar</span>
    </div>
  ) : (
    <button
      className="bg-[#002147] hover:bg-[#003875] text-white font-semibold px-3 py-1.5 rounded-lg mb-3 transition-all duration-200 shadow-sm hover:shadow-md text-[11px]"
      onClick={() => window.location.href = '/api/auth/google'}
    >
      Connect Google Calendar
    </button>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function generateId() {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const EVENT_TYPES = [
  { value: 'Personal',  label: 'Personal',  chip: 'bg-orange-100 text-orange-800 border-orange-300' },
  { value: 'Reminder',  label: 'Reminder',  chip: 'bg-purple-100 text-purple-800 border-purple-300' },
  { value: 'Goal',      label: 'Goal',      chip: 'bg-green-100  text-green-800  border-green-300'  },
  { value: 'Other',     label: 'Other',     chip: 'bg-gray-100   text-gray-800   border-gray-300'   },
];

const SESSION_CHIP   = 'bg-blue-100   text-blue-800   border-blue-300';
const COMMUNITY_CHIP = 'bg-indigo-100 text-indigo-800 border-indigo-300';

function getChip(event) {
  if (event._type === 'session')   return SESSION_CHIP;
  if (event._type === 'community') return COMMUNITY_CHIP;
  return EVENT_TYPES.find(t => t.value === event.type)?.chip ?? 'bg-gray-100 text-gray-800 border-gray-300';
}

/** Returns YYYY-MM-DD from any date value */
function toDateStr(val) {
  if (!val) return '';
  const d = new Date(val);
  if (isNaN(d)) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function exportToICS(event) {
  const dateStr = (event.date || '').replace(/-/g, '');
  const timeStr = event.time ? event.time.replace(':', '') + '00' : '';
  const dt = dateStr + (timeStr ? `T${timeStr}` : '');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WANAC//Calendar//EN',
    'BEGIN:VEVENT',
    `DTSTART:${dt || dateStr}`,
    `DTEND:${dt || dateStr}`,
    `SUMMARY:${(event.title || 'Event').replace(/\n/g, ' ')}`,
    event.notes ? `DESCRIPTION:${event.notes.replace(/\n/g, '\\n')}` : '',
    `UID:${event.id || generateId()}@wanac.org`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(event.title || 'event').replace(/\s+/g, '_')}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Main Component ────────────────────────────────────────────────────────────
const CalendarPage = () => {
  const today = new Date();

  const [viewMonth, setViewMonth]       = useState(today.getMonth());
  const [viewYear, setViewYear]         = useState(today.getFullYear());
  const [user, setUser]                 = useState(null);
  const [collapsed, setCollapsed]       = useState(false);
  const [personalEvents, setPersonalEvents] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [communityEvents, setCommunityEvents]   = useState([]);

  // Modal
  const [addModalOpen, setAddModalOpen]       = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editMode, setEditMode]               = useState(false);
  const [selectedDate, setSelectedDate]       = useState('');
  const [selectedEvent, setSelectedEvent]     = useState(null);
  const [form, setForm]   = useState({ title: '', time: '', type: 'Personal', notes: '' });
  const [formError, setFormError] = useState('');

  // ── Bootstrap ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (!userData) return;
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Personal events from localStorage
      try {
        const stored = localStorage.getItem(`wanac_calendar_${parsedUser.id}`);
        if (stored) setPersonalEvents(JSON.parse(stored));
      } catch (_) {}

      // Coaching sessions
      sessionsService.getSessions().then((result) => {
        const arr = result?.sessions?.data ?? (Array.isArray(result) ? result : []);
        setUpcomingSessions(
          arr.filter(s => s.coach_id === parsedUser.id || s.user_id === parsedUser.id)
        );
      }).catch(() => {});

      // WANAC community events
      getEvents().then((result) => {
        const arr = result?.events?.data ?? result?.data ?? (Array.isArray(result) ? result : []);
        setCommunityEvents(arr);
      }).catch(() => {});

    } catch (_) {}
  }, []);

  // ── Persist personal events ─────────────────────────────────────────────────
  const saveEvents = useCallback((events) => {
    setPersonalEvents(events);
    if (user?.id) {
      localStorage.setItem(`wanac_calendar_${user.id}`, JSON.stringify(events));
    }
  }, [user]);

  // ── Calendar grid ────────────────────────────────────────────────────────────
  const daysInMonth     = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  // ── Events for a given day ───────────────────────────────────────────────────
  const getEventsForDay = (day) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const personal = personalEvents.filter(e => e.date === dateStr);

    const sessions = upcomingSessions
      .filter(s => s.date && toDateStr(s.date) === dateStr)
      .map(s => ({ ...s, _type: 'session', title: s.title || 'Coaching Session' }));

    const community = communityEvents
      .filter(e => e.date && (e.date === dateStr || toDateStr(e.date) === dateStr))
      .map(e => ({ ...e, _type: 'community', title: 'Community Event' }));

    return [...personal, ...sessions, ...community];
  };

  // ── Upcoming list (sidebar) ──────────────────────────────────────────────────
  const todayStr = toDateStr(today);
  const upcomingAll = useMemo(() => {
    const items = [];
    personalEvents.forEach(e => {
      if (e.date >= todayStr) items.push({ ...e, _source: 'personal' });
    });
    upcomingSessions.forEach(s => {
      const d = toDateStr(s.date);
      if (d >= todayStr) items.push({ ...s, _source: 'session', title: s.title || 'Coaching Session', date: d });
    });
    return items.sort((a, b) => a.date.localeCompare(b.date)).slice(0, 6);
  }, [personalEvents, upcomingSessions, todayStr]);

  // ── Add / Edit handlers ──────────────────────────────────────────────────────
  const openAddModal = (day) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setForm({ title: '', time: '', type: 'Personal', notes: '' });
    setFormError('');
    setEditMode(false);
    setAddModalOpen(true);
  };

  const openEditModal = (event) => {
    setForm({ title: event.title || '', time: event.time || '', type: event.type || 'Personal', notes: event.notes || '' });
    setSelectedEvent(event);
    setFormError('');
    setEditMode(true);
    setDetailModalOpen(false);
    setAddModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (!form.title.trim()) { setFormError('Please enter a title.'); return; }
    if (editMode && selectedEvent) {
      saveEvents(personalEvents.map(e => e.id === selectedEvent.id ? { ...e, ...form } : e));
    } else {
      saveEvents([...personalEvents, { id: generateId(), date: selectedDate, ...form }]);
    }
    setAddModalOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    saveEvents(personalEvents.filter(e => e.id !== eventId));
    setDetailModalOpen(false);
  };

  const openDetailModal = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setDetailModalOpen(true);
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="h-screen flex bg-white font-body">
      <Sidebar
        className="w-56 bg-white border-r border-gray-200"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <ClientTopbar user={user} />

        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-6 py-3 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">

              {/* ── Left: Calendar ─────────────────────────────────────────── */}
              <div className="flex-1 space-y-3">

                {/* Header banner */}
                <section className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-xl p-4 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img src="/veterancommunity.png" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10">
                    <h1 className="text-xl font-bold text-white mb-1">Calendar</h1>
                    <p className="text-white/90 text-xs">Manage your schedule and upcoming events</p>
                  </div>
                </section>

                {/* Calendar grid */}
                <section className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <GoogleCalendarConnect />

                  {/* Month navigation */}
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={prevMonth}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                      aria-label="Previous month"
                    >
                      <FaChevronLeft className="text-xs" />
                    </button>

                    <div className="text-center">
                      <h2 className="text-base font-bold text-[#002147]">
                        {MONTH_NAMES[viewMonth]} {viewYear}
                      </h2>
                      <p className="text-[10px] text-gray-500">Click a date to add an event</p>
                    </div>

                    <button
                      onClick={nextMonth}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                      aria-label="Next month"
                    >
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {EVENT_TYPES.map(t => (
                      <span
                        key={t.value}
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border ${t.chip}`}
                      >
                        {t.label}
                      </span>
                    ))}
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border ${SESSION_CHIP}`}>
                      Session
                    </span>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border ${COMMUNITY_CHIP}`}>
                      Community
                    </span>
                  </div>

                  {/* Day grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                      <div key={d} className="text-center font-bold text-[#002147] p-1 text-[10px]">{d}</div>
                    ))}

                    {days.map((day, idx) => {
                      const isToday =
                        day === today.getDate() &&
                        viewMonth === today.getMonth() &&
                        viewYear === today.getFullYear();
                      const dayEvents = day ? getEventsForDay(day) : [];

                      return (
                        <div
                          key={idx}
                          className={`border p-1.5 min-h-[56px] rounded transition-all duration-200 ${
                            isToday
                              ? 'bg-[#002147] border-[#002147]'
                              : day
                              ? 'border-gray-200 hover:border-orange-400 hover:shadow-sm bg-white cursor-pointer'
                              : 'bg-gray-50 border-gray-100'
                          }`}
                          onClick={() => day && openAddModal(day)}
                        >
                          {day && (
                            <>
                              <div className={`font-semibold text-[10px] mb-0.5 ${isToday ? 'text-white' : 'text-gray-900'}`}>
                                {day}
                              </div>
                              <div className="space-y-0.5">
                                {dayEvents.slice(0, 2).map((ev, i) => (
                                  <div
                                    key={i}
                                    className={`px-0.5 truncate rounded text-[8px] font-medium border cursor-pointer ${getChip(ev)}`}
                                    onClick={(e) => openDetailModal(ev, e)}
                                  >
                                    {ev.title}
                                  </div>
                                ))}
                                {dayEvents.length > 2 && (
                                  <div className="text-[8px] text-gray-500 font-medium">
                                    +{dayEvents.length - 2} more
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* ── Right: Sidebar ──────────────────────────────────────────── */}
              <aside className="lg:w-64 space-y-3">

                {/* Upcoming events */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3">
                  <h3 className="text-sm font-semibold text-[#002147] mb-2 flex items-center gap-1.5">
                    <FaCalendar className="text-orange-500 text-xs" />
                    Upcoming
                  </h3>
                  <div className="space-y-2">
                    {upcomingAll.length === 0 ? (
                      <p className="text-gray-500 text-[10px]">Nothing coming up.</p>
                    ) : (
                      upcomingAll.map((ev, i) => (
                        <div key={i} className="flex items-start gap-2 py-1.5 border-b border-gray-100 last:border-0">
                          <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                            ev._source === 'session' ? 'bg-blue-500' : 'bg-orange-500'
                          }`} />
                          <div className="min-w-0">
                            <p className="font-semibold text-[11px] text-gray-900 line-clamp-1">{ev.title}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[9px] text-gray-500">
                                {new Date(ev.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                              {ev.time && (
                                <span className="text-[9px] text-gray-400 flex items-center gap-0.5">
                                  <FaClock className="text-[7px]" /> {ev.time}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick add today */}
                <button
                  onClick={() => openAddModal(today.getDate())}
                  className="w-full flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#003875] text-white font-semibold py-2 px-3 rounded-xl transition-colors text-[11px] shadow-sm"
                >
                  <FaPlus className="text-[10px]" /> Add Event Today
                </button>

                {/* Book a session */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-sm p-3 text-white">
                  <h3 className="text-sm font-semibold mb-1">Need Help?</h3>
                  <p className="text-[10px] text-white/90 mb-2">
                    Schedule a coaching session or connect with your fireteam.
                  </p>
                  <button className="w-full bg-white text-orange-600 font-semibold py-1.5 px-3 rounded-lg hover:bg-orange-50 transition-colors text-[11px]">
                    Book a Session
                  </button>
                </div>
              </aside>
            </div>
          </div>

          {/* ── Add / Edit Modal ──────────────────────────────────────────────── */}
          <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
              <Dialog.Panel className="relative bg-white p-5 rounded-xl shadow-2xl max-w-sm w-full border border-gray-200">

                <div className="flex items-center justify-between mb-2">
                  <Dialog.Title className="text-base font-bold text-[#002147]">
                    {editMode ? 'Edit Event' : 'Add Event'}
                  </Dialog.Title>
                  <button onClick={() => setAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <FaTimes className="text-sm" />
                  </button>
                </div>

                {!editMode && selectedDate && (
                  <p className="text-[10px] text-gray-500 mb-3">
                    {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
                    })}
                  </p>
                )}

                {formError && (
                  <p className="text-[10px] text-red-500 mb-2 bg-red-50 rounded px-2 py-1">{formError}</p>
                )}

                <div className="space-y-3">
                  {/* Title */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="Event title"
                      className="w-full border-2 border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                    />
                  </div>

                  {/* Time + Type */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        value={form.time}
                        onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                        className="w-full border-2 border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={form.type}
                        onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                        className="w-full border-2 border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                      >
                        {EVENT_TYPES.map(t => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      placeholder="Optional notes..."
                      rows={2}
                      className="w-full border-2 border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="px-3 py-1.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-[11px]"
                    onClick={() => setAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1.5 bg-[#002147] text-white font-semibold rounded-lg hover:bg-[#003875] transition-colors shadow-sm text-[11px]"
                    onClick={handleSaveEvent}
                  >
                    {editMode ? 'Save Changes' : 'Add Event'}
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>

          {/* ── Detail Modal ──────────────────────────────────────────────────── */}
          <Dialog open={detailModalOpen} onClose={() => setDetailModalOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
              <Dialog.Panel className="relative bg-white p-5 rounded-xl shadow-2xl max-w-sm w-full border border-gray-200">
                {selectedEvent && (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-medium border mb-1.5 ${getChip(selectedEvent)}`}>
                          {selectedEvent._type === 'session'
                            ? 'Session'
                            : selectedEvent._type === 'community'
                            ? 'Community'
                            : selectedEvent.type || 'Personal'}
                        </span>
                        <Dialog.Title className="text-base font-bold text-[#002147]">
                          {selectedEvent.title}
                        </Dialog.Title>
                      </div>
                      <button
                        onClick={() => setDetailModalOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors ml-2 flex-shrink-0"
                      >
                        <FaTimes className="text-sm" />
                      </button>
                    </div>

                    <div className="space-y-2 mb-4">
                      {selectedEvent.date && (
                        <div className="flex items-center gap-2 text-[11px] text-gray-600">
                          <FaCalendar className="text-[10px] text-gray-400" />
                          {new Date(
                            (selectedEvent.date.includes('T') ? selectedEvent.date : selectedEvent.date + 'T12:00:00')
                          ).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                      )}
                      {selectedEvent.time && (
                        <div className="flex items-center gap-2 text-[11px] text-gray-600">
                          <FaClock className="text-[10px] text-gray-400" />
                          {selectedEvent.time}
                        </div>
                      )}
                      {selectedEvent.notes && (
                        <div className="bg-gray-50 rounded-lg p-2 text-[11px] text-gray-600 mt-1">
                          {selectedEvent.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Export always available */}
                      <button
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-[11px]"
                        onClick={() => exportToICS(selectedEvent)}
                      >
                        <FaDownload className="text-[10px]" /> Export .ics
                      </button>

                      {/* Edit / Delete only for personal events */}
                      {!selectedEvent._type && (
                        <>
                          <button
                            className="flex items-center justify-center gap-1.5 px-3 py-1.5 border-2 border-blue-200 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-[11px]"
                            onClick={() => openEditModal(selectedEvent)}
                            aria-label="Edit event"
                          >
                            <FaEdit className="text-[10px]" />
                          </button>
                          <button
                            className="flex items-center justify-center gap-1.5 px-3 py-1.5 border-2 border-red-200 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition-colors text-[11px]"
                            onClick={() => handleDeleteEvent(selectedEvent.id)}
                            aria-label="Delete event"
                          >
                            <FaTrash className="text-[10px]" />
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </div>
          </Dialog>

        </main>
      </div>
    </div>
  );
};

export default CalendarPage;
