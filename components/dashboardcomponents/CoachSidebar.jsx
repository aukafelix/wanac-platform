"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  FaUserFriends,
  FaCalendarAlt,
  FaClipboardList,
  FaLightbulb,
  FaChartBar,
  FaBook,
  FaUsersCog,
  FaComments,
  FaEnvelope,
  FaSignOutAlt,
} from 'react-icons/fa';

const coachNavItems = [
  { name: 'Dashboard', href: '/coach', icon: <FaChartBar size={18} /> },
  { name: 'Sessions', href: '/coach/sessions', icon: <FaCalendarAlt size={18} /> },
  { name: 'Clients', href: '/coach/clients', icon: <FaUserFriends size={18} /> },
  { name: 'Session Notes', href: '/coach/session-notes', icon: <FaClipboardList size={18} /> },
  { name: 'Coaching Tips', href: '/coach/tips', icon: <FaLightbulb size={18} /> },
  { name: 'Progress', href: '/coach/progress', icon: <FaChartBar size={18} /> },
  { name: 'Resources', href: '/coach/resources', icon: <FaBook size={18} /> },
  { name: 'Community', href: '/client/community', icon: <FaUsersCog size={18} /> },
  { name: 'Feedback', href: '/coach/feedback', icon: <FaComments size={18} /> },
  { name: 'Messages', href: '/coach/messages', icon: <FaEnvelope size={18} /> },
];

export default function CoachSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      className={`bg-white border-r border-gray-200 hidden md:flex flex-col h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <div className={`p-3 ${collapsed ? 'justify-center flex' : ''}`}>
        {!collapsed && <h1 className="text-base font-semibold text-gray-800">WANAC Coach</h1>}
        {collapsed && <span className="sr-only">WANAC Coach</span>}
      </div>
      <nav className="flex-1 p-1 space-y-1">
        {coachNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition-all 
              ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
          >
            {item.icon}
            {collapsed ? null : item.name}
          </Link>
        ))}
      </nav>
      <div className="p-2 border-t flex flex-col gap-1">
        <button className={`flex items-center gap-2 px-2 py-2 text-xs text-gray-600 hover:bg-gray-100 w-full rounded-md ${collapsed ? 'justify-center' : ''}`}
          // TODO: Add actual logout logic
        >
          <FaSignOutAlt size={18} />
          {!collapsed && 'Log Out'}
        </button>
      </div>
    </aside>
  );
} 