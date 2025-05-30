'use client';

import { useState, useEffect } from 'react';
import {
  FaCalendar,
  FaPenFancy,
  FaRobot,
  FaChartLine,
  FaBook,
  FaUserShield,
  FaUsers,
  FaEnvelope,
} from 'react-icons/fa';

export default function ClientDashboard() {
  const [upcomingSessions, setUpcomingSessions] = useState([
    {
      id: 1,
      date: '2024-03-25',
      time: '10:00 AM',
      coach: 'Coach Smith',
      type: 'One-on-One Session',
    },
    {
      id: 2,
      date: '2024-03-27',
      time: '2:00 PM',
      coach: 'Coach Smith',
      type: 'Goal Review',
    },
  ]);

  const [lifeScore, setLifeScore] = useState({
    career: 7,
    relationships: 8,
    health: 6,
    finances: 5,
    personal: 7,
  });

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back!</h2>
        <p className="text-gray-600">Here's an overview of your coaching journey.</p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          icon={FaCalendar}
          title="Schedule Session"
          description="Book your next coaching session"
          href="/(dashboard)/appointments"
          color="blue"
        />
        <QuickActionCard
          icon={FaPenFancy}
          title="New Journal Entry"
          description="Record your thoughts and progress"
          href="/(dashboard)/journal"
          color="green"
        />
        <QuickActionCard
          icon={FaRobot}
          title="AI Assistant"
          description="Get instant guidance and support"
          href="/(dashboard)/aichatbot"
          color="purple"
        />
        <QuickActionCard
          icon={FaChartLine}
          title="Track Progress"
          description="View your life score metrics"
          href="/(dashboard)/lifescore"
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaCalendar className="text-blue-600" />
            Upcoming Sessions
          </h3>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{session.type}</p>
                    <p className="text-sm text-gray-600">with {session.coach}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{session.date}</p>
                    <p className="text-sm text-gray-600">{session.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Sessions →
          </button>
        </div>

        {/* Life Score Overview */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartLine className="text-orange-600" />
            Life Score Overview
          </h3>
          <div className="space-y-4">
            {Object.entries(lifeScore).map(([category, score]) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize text-gray-700">
                    {category}
                  </span>
                  <span className="text-sm text-gray-600">{score}/10</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${score * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium">
            View Detailed Analysis →
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ icon: Icon, title, description, href, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    green: 'bg-green-50 text-green-600 hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
  };

  return (
    <a
      href={href}
      className={`block p-6 rounded-lg transition-colors ${colorClasses[color]} cursor-pointer`}
    >
      <Icon className="text-2xl mb-3" />
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm opacity-75">{description}</p>
    </a>
  );
}
