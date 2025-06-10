"use client";

import { useState, useEffect } from "react";
import Sidebar from '../../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';
import CommunityFeedWidget from '../../../../../components/dashboardcomponents/widgets/CommunityFeedWidget';
import { FaLock, FaCalendarAlt, FaPlus, FaUsers } from 'react-icons/fa';

// Mock data for tier-based chatrooms
const chatrooms = [
  { id: 1, name: "Bronze Members", description: "Chatroom for Bronze tier members", locked: false },
  { id: 2, name: "Silver Members", description: "Exclusive chat for Silver tier", locked: true },
  { id: 3, name: "Gold Members", description: "VIP Gold tier chatroom", locked: true },
];

// Mock data for events
const mockEvents = [
  { id: 1, title: "Virtual Coffee Meetup", date: "2024-07-10", time: "10:00 AM", location: "Zoom", rsvped: false },
  { id: 2, title: "In-Person Networking", date: "2024-07-20", time: "6:00 PM", location: "WANAC Center", rsvped: true },
];

export default function CommunityPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState(mockEvents);

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

  // RSVP handler (mock)
  const handleRSVP = (eventId) => {
    setEvents(events.map(ev => ev.id === eventId ? { ...ev, rsvped: !ev.rsvped } : ev));
  };

  // Create event handler (mock)
  const handleCreateEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: `New Event #${events.length + 1}`,
      date: "2024-08-01",
      time: "5:00 PM",
      location: "TBD",
      rsvped: false,
    };
    setEvents([newEvent, ...events]);
  };

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 space-y-8">
                {/* General Community Forum */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <h2 className="text-2xl font-bold mb-2 text-primary flex items-center gap-2">
                    <FaUsers className="text-primary" /> General Community Forum
                  </h2>
                  <p className="text-gray-600 mb-4">Connect, share, and discuss with the WANAC community.</p>
                  <CommunityFeedWidget />
                </section>

                {/* Exclusive Tier-based Chatrooms */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <h2 className="text-2xl font-bold mb-2 text-primary flex items-center gap-2">
                    <FaLock className="text-primary" /> Exclusive Tier-based Chatrooms
                  </h2>
                  <p className="text-gray-600 mb-4">Join your exclusive chatroom based on your membership tier.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {chatrooms.map(room => (
                      <div key={room.id} className={`rounded-lg border p-4 flex flex-col items-start ${room.locked ? 'bg-gray-100' : 'bg-blue-50'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <FaUsers className="text-lg" />
                          <span className="font-semibold">{room.name}</span>
                          {room.locked && <FaLock className="ml-2 text-gray-400" title="Exclusive" />}
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{room.description}</p>
                        <button
                          className={`px-4 py-1 rounded text-sm font-medium ${room.locked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-orange-500'}`}
                          disabled={room.locked}
                        >
                          {room.locked ? 'Locked' : 'Enter Chatroom'}
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Meetup & Events */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                      <FaCalendarAlt className="text-primary" /> Meetup & Events
                    </h2>
                    <button
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-orange-500 transition text-sm"
                      onClick={handleCreateEvent}
                    >
                      <FaPlus /> Create Event
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">See upcoming events, RSVP, or manage your meetups.</p>
                  <div className="space-y-4">
                    {events.length === 0 ? (
                      <p className="text-gray-500 text-sm">No events yet. Be the first to create one!</p>
                    ) : (
                      events.map(ev => (
                        <div key={ev.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-blue-50">
                          <div>
                            <h3 className="font-semibold text-lg text-brand-navy">{ev.title}</h3>
                            <p className="text-sm text-gray-600">{ev.date} at {ev.time} &middot; {ev.location}</p>
                          </div>
                          <div className="flex gap-2 mt-2 md:mt-0">
                            <button
                              className={`px-4 py-1 rounded text-sm font-medium ${ev.rsvped ? 'bg-gray-300 text-gray-500' : 'bg-primary text-white hover:bg-orange-500'}`}
                              onClick={() => handleRSVP(ev.id)}
                            >
                              {ev.rsvped ? 'Cancel RSVP' : 'RSVP'}
                            </button>
                            <button className="px-4 py-1 rounded text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300">Manage</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
