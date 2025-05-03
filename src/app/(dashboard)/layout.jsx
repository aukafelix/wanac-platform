'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FaUser,
  FaHome,
  FaCalendarCheck,
  FaEnvelope,
  FaBook,
  FaBrain,
  FaPenFancy,
  FaUsers,
  FaCog,
  FaBars,
  FaTimes,
  FaChartBar,
  FaClipboardList,
  FaUserShield,
  FaUserCog,
  FaUserPlus,
  FaFileAlt,
  FaHandsHelping,
  FaGraduationCap,
  FaChartLine,
  FaCalendar,
  FaClock,
} from 'react-icons/fa';

// Widget Components
const TimeWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
  
  const formattedDate = time.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
        <FaClock /> Current Time
      </h3>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-700">{formattedTime}</div>
        <div className="text-sm text-gray-600">{formattedDate}</div>
      </div>
    </div>
  );
};

const CalendarWidget = () => {
  const [currentDate] = useState(new Date());
  
  // Get current month and year
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  
  // Get days in current month
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();
  
  // Create calendar grid
  const calendarDays = [];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="text-center text-gray-300"></div>);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === currentDate.getDate();
    calendarDays.push(
      <div 
        key={day} 
        className={`text-center p-1 text-sm ${
          isToday ? 'bg-blue-500 text-white rounded-full' : ''
        }`}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
        <FaCalendar /> Calendar
      </h3>
      <div className="text-center mb-2 text-blue-700 font-medium">
        {month} {year}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>
    </div>
  );
};

const CommunityFeedWidget = () => {
  // Mock data for community feed
  const feedItems = [
    {
      id: 1,
      user: 'John D.',
      action: 'posted in Veterans Support',
      time: '10 min ago',
      content: 'Just completed my first week of the transition program!'
    },
    {
      id: 2,
      user: 'Sarah M.',
      action: 'shared a resource',
      time: '1 hour ago',
      content: 'Found this great article on resume building for veterans.'
    },
    {
      id: 3,
      user: 'Michael T.',
      action: 'created an event',
      time: '3 hours ago',
      content: 'Virtual coffee meetup this Friday at 10am PT.'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
        <FaUsers /> Community Feed
      </h3>
      <div className="space-y-3">
        {feedItems.map(item => (
          <div key={item.id} className="border-b pb-2 last:border-0">
            <div className="flex items-start">
              <div className="bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-2">
                {item.user.charAt(0)}
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">{item.user}</span> {item.action}
                </p>
                <p className="text-xs text-gray-500">{item.time}</p>
                <p className="text-sm mt-1">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-3 bg-blue-700 text-white px-3 py-1 rounded text-sm hover:bg-blue-800 transition">
        View All Updates
      </button>
    </div>
  );
};

const navItemsByRole = {
  admin: [
    { name: 'Dashboard', href: '/dashboard/admin', icon: FaChartBar },
    { name: 'User Management', href: '/dashboard/admin/users', icon: FaUserCog },
    { name: 'Coach Directory', href: '/dashboard/admin/coaches', icon: FaUserShield },
    { name: 'Client Directory', href: '/dashboard/admin/clients', icon: FaUsers },
    { name: 'Reports', href: '/dashboard/admin/reports', icon: FaFileAlt },
    { name: 'Resources', href: '/dashboard/admin/resources', icon: FaBook },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: FaCog },
  ],
  coach: [
    { name: 'Dashboard', href: '/dashboard/coachdashboard', icon: FaHome },
    { name: 'My Clients', href: '/dashboard/coachdashboard/clients', icon: FaUsers },
    { name: 'Appointments', href: '/dashboard/coachdashboard/appointments', icon: FaCalendarCheck },
    { name: 'Messages', href: '/dashboard/coachdashboard/messages', icon: FaEnvelope },
    { name: 'Resources', href: '/dashboard/coachdashboard/resources', icon: FaBook },
    { name: 'Client Progress', href: '/dashboard/coachdashboard/progress', icon: FaChartLine },
    { name: 'Training', href: '/dashboard/coachdashboard/training', icon: FaGraduationCap },
    { name: 'Settings', href: '/dashboard/coachdashboard/settings', icon: FaCog },
  ],
  client: [
    { name: 'Dashboard', href: '/dashboard', icon: FaHome },
    { name: 'My Coach', href: '/dashboard/my-coach', icon: FaHandsHelping },
    { name: 'Appointments', href: '/dashboard/bookings', icon: FaCalendarCheck },
    { name: 'Messages', href: '/dashboard/messages', icon: FaEnvelope },
    { name: 'Library', href: '/dashboard/library', icon: FaBook },
    { name: 'AI Chatbot', href: '/dashboard/ai-chatbot', icon: FaBrain },
    { name: 'Journal', href: '/dashboard/journal', icon: FaPenFancy },
    { name: 'Community', href: '/dashboard/community', icon: FaUsers },
    { name: 'Life Scores', href: '/dashboard/life-score', icon: FaChartLine },
    { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
  ],
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState('client');
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const fetchUserData = async () => {
      setTimeout(() => {
        if (pathname.includes('/admin')) {
          setUserRole('admin');
          setUserName('Admin User');
        } else if (pathname.includes('/coach')) {
          setUserRole('coach');
          setUserName('Coach Smith');
        } else {
          setUserRole('client');
          setUserName('Veteran Jones');
        }
      }, 100);
    };

    fetchUserData();
  }, [pathname]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navItems = navItemsByRole[userRole] || navItemsByRole.client;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:static md:translate-x-0 z-40 w-64 bg-white shadow-lg h-screen transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Company Logo Section */}
          <div className="flex justify-center mb-6 border-b pb-4">
            <div className="text-center">
              <Link href="/dashboard" className="inline-block">
                <Image 
                  src="/WANAC N 8 Old Glory.png" 
                  alt="WANAC Logo" 
                  width={200} 
                  height={80} 
                  className="mx-auto"
                  priority
                />
              </Link>
            </div>
          </div>
          
          {/* User Profile Section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-700 text-white rounded-full p-2">
              <FaUser />
            </div>
            <div>
              <h2 className="font-semibold text-blue-700">{userName}</h2>
              <p className="text-sm text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-2 py-2 rounded transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-800 font-semibold'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                >
                  <item.icon className="text-lg" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t pt-6">
            <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 transition-all duration-300">
        <div className="bg-white shadow p-4">
          <h1 className="text-xl font-semibold text-blue-800">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
          </h1>
        </div>
        <div className="p-4 flex flex-col lg:flex-row">
          <div className="flex-1">
            {children}
          </div>
          
          {/* Right Sidebar with Widgets */}
          <aside className="w-full lg:w-80 mt-4 lg:mt-0 lg:ml-4 hidden lg:block">
            <TimeWidget />
            <CalendarWidget />
            <CommunityFeedWidget />
          </aside>
        </div>
      </main>
    </div>
  );
}
