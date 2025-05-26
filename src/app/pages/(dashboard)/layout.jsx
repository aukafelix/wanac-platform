'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
  FaSignOutAlt,
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
  client: [
    { name: 'Dashboard', href: '/(dashboard)/client', icon: FaHome },
    { name: 'Appointments', href: '/(dashboard)/appointments', icon: FaCalendarCheck },
    { name: 'Journal', href: '/(dashboard)/journal', icon: FaPenFancy },
    { name: 'AI Assistant', href: '/(dashboard)/aichatbot', icon: FaBrain },
    { name: 'Life Score', href: '/(dashboard)/lifescore', icon: FaChartLine },
    { name: 'Resources', href: '/(dashboard)/library', icon: FaBook },
    { name: 'My Coach', href: '/(dashboard)/mycoach', icon: FaUserShield },
    { name: 'Community', href: '/(dashboard)/community', icon: FaUsers },
    { name: 'Messages', href: '/(dashboard)/messages', icon: FaEnvelope },
    { name: 'Settings', href: '/(dashboard)/settings', icon: FaCog },
  ],
  coach: [
    { name: 'Dashboard', href: '/(dashboard)/coach', icon: FaHome },
    { name: 'My Clients', href: '/(dashboard)/coach/clients', icon: FaUsers },
    { name: 'Appointments', href: '/(dashboard)/appointments', icon: FaCalendarCheck },
    { name: 'Messages', href: '/(dashboard)/messages', icon: FaEnvelope },
    { name: 'Resources', href: '/(dashboard)/library', icon: FaBook },
    { name: 'Community', href: '/(dashboard)/community', icon: FaUsers },
    { name: 'Settings', href: '/(dashboard)/settings', icon: FaCog },
  ],
  admin: [
    { name: 'Dashboard', href: '/(dashboard)/admin', icon: FaChartBar },
    { name: 'User Management', href: '/(dashboard)/admin/users', icon: FaUserCog },
    { name: 'Coach Directory', href: '/(dashboard)/admin/coaches', icon: FaUserShield },
    { name: 'Client Directory', href: '/(dashboard)/admin/clients', icon: FaUsers },
    { name: 'Reports', href: '/(dashboard)/admin/reports', icon: FaFileAlt },
    { name: 'Resources', href: '/(dashboard)/admin/resources', icon: FaBook },
    { name: 'Settings', href: '/(dashboard)/admin/settings', icon: FaCog },
  ],
};

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check for user data in localStorage
    const userData = localStorage.getItem('wanacUser');
    if (!userData) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('wanacUser');
    router.push('/login');
  };

  if (!user) {
    return null; // or a loading spinner
  }

  const navItems = navItemsByRole[user.userType] || [];
  const dashboardTitle = `${user.userType.charAt(0).toUpperCase() + user.userType.slice(1)} Dashboard`;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-brand-navy text-white w-64 min-h-screen p-4 fixed lg:relative transition-all duration-300 z-20 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-xl font-bold">
            WANAC Platform
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="mb-6 p-4 bg-blue-900 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white">{user.name}</h3>
              <p className="text-sm text-blue-300 capitalize">{user.userType}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-brand-orange text-white'
                    : 'text-gray-300 hover:bg-blue-900'
                }`}
              >
                <item.icon className="flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-blue-900 rounded-lg transition-colors mt-4"
          >
            <FaSignOutAlt className="flex-shrink-0" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600"
              >
                <FaBars size={24} />
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">
                {dashboardTitle}
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Content */}
              <div className="flex-1">
                {children}
              </div>

              {/* Right Sidebar Widgets */}
              <div className="lg:w-80">
                <TimeWidget />
                <CalendarWidget />
                <CommunityFeedWidget />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
