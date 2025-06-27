"use client";

import { useState, useEffect } from "react";
import Sidebar from '../../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';

const meetups = [
  {
    time: "Friday, Jan 31, 6:00 AM (PST)",
    duration: "60 minutes",
    title: "Leaders: Let's Connect & Collaborate. What book and mentors have shaped your style?",
    host: "Jaclyn Zolnik",
    rsvps: 2,
    image: "/images/meetup1.png",
  },
  {
    time: "Friday, Jan 31, 8:00 AM (PST)",
    duration: "60 minutes",
    title: "EVerything They Forgot to Tell You When You Started Your Business",
    host: "Kevin McKamey",
    rsvps: 21,
    image: "/images/meetup2.png",
  },
  {
    time: "Friday, Jan 31, 9:00 AM (PST)",
    duration: "30 minutes",
    title: "Reclaim Your Relationship With Money - Making It Positive",
    host: "Elizabeth Rosenberg",
    rsvps: 17,
    image: "/images/meetup3.png",
  },
  {
    time: "Friday, Jan 31, 9:30 AM (PST)",
    duration: "30 minutes",
    title: "Mental Health Success Habits",
    host: "Samantha S.",
    rsvps: 10,
    image: "/images/meetup4.png",
  },
];

export default function SocialCommunityMeetupsPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-primary">Upcoming Meetups</h2>
            <div className="space-y-4">
              {meetups.map((event, idx) => (
                <div key={idx} className="flex justify-between items-start bg-white p-4 rounded-lg shadow-sm">
                  <div className="max-w-3xl">
                    <div className="text-sm text-gray-500">
                      {event.time} • {event.duration}
                    </div>
                    <h3 className="font-semibold text-lg mt-1">{event.title}</h3>
                    <div className="flex items-center mt-2 space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gray-300" />
                      <span className="text-sm text-gray-800">{event.host}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <img src={event.image} alt="event" className="w-28 h-20 object-cover rounded-md" />
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{event.rsvps} RSVPs</span>
                      <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg">RSVP</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
