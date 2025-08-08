"use client";
import React, { useState, useEffect } from "react";
import Sidebar from '../../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';
import { Dialog } from "@headlessui/react";
import { FaCalendar } from 'react-icons/fa';
import { sessionsService } from '../../../../services/api/sessions.service';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [events, setEvents] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        sessionsService.getSessions().then((result) => {
          const sessionArray = result?.sessions?.data || [];
          // Filter for sessions where the user is coach or participant
          const filtered = sessionArray.filter(
            (session) =>
              session.coach_id === parsedUser.id ||
              session.user_id === parsedUser.id
          );
          setUpcomingSessions(filtered);
        });
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleAddEvent = () => {
    if (title.trim() !== "") {
      setEvents([...events, { title, date: selectedDate }]);
      setTitle("");
      setModalOpen(false);
    }
  };

  // Get current date
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Generate days for current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Empty cells for days before the 1st of month
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

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
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <h1 className="text-2xl font-bold mb-4">Calendar View</h1>
                  
                  {/* Simple Calendar Grid */}
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center font-medium p-2">
                        {day}
                      </div>
                    ))}
                    
                    {days.map((day, index) => (
                      <div 
                        key={index} 
                        className={`border p-2 h-20 ${day === today.getDate() ? 'bg-blue-50' : ''} ${!day ? 'bg-gray-100' : ''}`}
                        onClick={() => {
                          if (day) {
                            setSelectedDate(new Date(currentYear, currentMonth, day));
                            setModalOpen(true);
                          }
                        }}
                      >
                        {day && (
                          <>
                            <div className="font-medium">{day}</div>
                            <div className="text-xs">
                              {events
                                .filter(event => {
                                  const eventDate = new Date(event.date);
                                  return eventDate.getDate() === day && 
                                         eventDate.getMonth() === currentMonth && 
                                         eventDate.getFullYear() === currentYear;
                                })
                                .map((event, i) => (
                                  <div key={i} className="bg-blue-100 p-1 mb-1 truncate rounded">
                                    {event.title}
                                  </div>
                                ))
                              }
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              
              {/* Right Sidebar */}
              <div className="lg:w-80 space-y-4">
                {/* Upcoming Sessions Widget */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                    <FaCalendar className="text-primary" />
                    Upcoming Sessions
                  </h3>
                  <div className="space-y-4">
                    {upcomingSessions.length === 0 ? (
                      <p className="text-gray-500 text-sm">No upcoming sessions.</p>
                    ) : (
                      upcomingSessions.map((session) => (
                        <div
                          key={session.id}
                          className="border-l-4 border-primary pl-4 py-3 bg-primary/5 rounded"
                        >
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium text-gray-800">{session.title}</p>
                              <p className="text-sm text-gray-600">ID: {session.id}</p>
                              <p className="text-sm text-gray-600">Description: {session.description}</p>
                              <p className="text-sm text-gray-600">Date: {session.date}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
          
          {/* Modal */}
          <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
                <Dialog.Title className="text-xl font-semibold mb-2">Add Event</Dialog.Title>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Event title"
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    onClick={handleAddEvent}
                  >
                    Add
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;