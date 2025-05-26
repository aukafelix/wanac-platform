"use client";

import { useState } from 'react';
import { FaCalendarAlt, FaUserClock, FaHistory, FaPlus } from 'react-icons/fa';

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Sample data - replace with actual data fetching in production
  const upcomingAppointments = [
    {
      id: 1,
      coachName: "Sarah Johnson",
      coachAvatar: "/avatars/coach1.jpg",
      date: "2023-11-15",
      time: "10:00 AM - 11:00 AM",
      type: "Career Transition",
      status: "confirmed",
      notes: "Discuss resume updates and interview preparation"
    },
    {
      id: 2,
      coachName: "Michael Rodriguez",
      coachAvatar: "/avatars/coach2.jpg",
      date: "2023-11-18",
      time: "2:00 PM - 3:00 PM",
      type: "Life Skills",
      status: "pending",
      notes: "Financial planning and budgeting strategies"
    }
  ];
  
  const pastAppointments = [
    {
      id: 3,
      coachName: "Sarah Johnson",
      coachAvatar: "/avatars/coach1.jpg",
      date: "2023-11-01",
      time: "10:00 AM - 11:00 AM",
      type: "Career Transition",
      status: "completed",
      notes: "Initial assessment and goal setting"
    },
    {
      id: 4,
      coachName: "David Thompson",
      coachAvatar: "/avatars/coach3.jpg",
      date: "2023-10-25",
      time: "3:00 PM - 4:00 PM",
      type: "Personal Growth",
      status: "completed",
      notes: "Stress management techniques"
    }
  ];

  // Function to format date to a more readable format
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#002147]">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your coaching sessions</p>
        </div>
        
        <button 
          className="mt-4 md:mt-0 flex items-center gap-2 bg-[#002147] text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          <FaPlus /> Book New Session
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 font-medium flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'text-[#002147] border-b-2 border-[#002147]'
              : 'text-gray-500 hover:text-[#002147]'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          <FaUserClock /> Upcoming
        </button>
        <button
          className={`py-3 px-6 font-medium flex items-center gap-2 ${
            activeTab === 'past'
              ? 'text-[#002147] border-b-2 border-[#002147]'
              : 'text-gray-500 hover:text-[#002147]'
          }`}
          onClick={() => setActiveTab('past')}
        >
          <FaHistory /> Past
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        {activeTab === 'upcoming' ? (
          upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment} 
                formatDate={formatDate}
                isPast={false}
              />
            ))
          ) : (
            <EmptyState 
              message="No upcoming appointments" 
              subMessage="Book a session with one of our coaches to get started"
            />
          )
        ) : (
          pastAppointments.length > 0 ? (
            pastAppointments.map((appointment) => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment} 
                formatDate={formatDate}
                isPast={true}
              />
            ))
          ) : (
            <EmptyState 
              message="No past appointments" 
              subMessage="Your completed sessions will appear here"
            />
          )
        )}
      </div>

      {/* Calendar Preview Section */}
      <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#002147] flex items-center gap-2">
            <FaCalendarAlt /> Calendar View
          </h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
              Month
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-[#002147] text-white">
              Week
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
              Day
            </button>
          </div>
        </div>
        
        {/* Calendar Placeholder - Replace with actual calendar component */}
        <div className="bg-white border border-gray-200 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-500">Calendar component will be integrated here</p>
        </div>
      </div>
    </div>
  );
}

// Appointment Card Component
function AppointmentCard({ appointment, formatDate, isPast }) {
  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800"
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
              {/* Coach Avatar */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
                {appointment.coachAvatar ? (
                  <img 
                    src={appointment.coachAvatar} 
                    alt={appointment.coachName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  appointment.coachName.charAt(0)
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-[#002147]">{appointment.coachName}</h3>
              <p className="text-gray-600">{appointment.type}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[appointment.status]}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </div>
            <p className="mt-2 text-gray-700 font-medium">{formatDate(appointment.date)}</p>
            <p className="text-gray-600">{appointment.time}</p>
          </div>
        </div>
        
        {appointment.notes && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Notes:</span> {appointment.notes}
            </p>
          </div>
        )}
        
        <div className="mt-6 flex justify-end gap-3">
          {!isPast ? (
            <>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Reschedule
              </button>
              <button className="px-4 py-2 bg-[#002147] text-white rounded-md hover:bg-blue-800">
                Join Session
              </button>
            </>
          ) : (
            <>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                View Notes
              </button>
              <button className="px-4 py-2 bg-[#002147] text-white rounded-md hover:bg-blue-800">
                Book Follow-up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState({ message, subMessage }) {
  return (
    <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <FaCalendarAlt className="mx-auto text-4xl text-gray-400 mb-4" />
      <h3 className="text-xl font-medium text-gray-700">{message}</h3>
      <p className="text-gray-500 mt-2">{subMessage}</p>
      <button className="mt-6 px-6 py-2 bg-[#002147] text-white rounded-md hover:bg-blue-800">
        Book a Session
      </button>
    </div>
  );
}