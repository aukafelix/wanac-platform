"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  FaUsers,
  FaCalendarAlt,
  FaChartPie,
  FaCogs,
  FaUserTie,
  FaClipboardCheck,
  FaBook,
  FaEnvelope,
  FaUserShield,
  FaUserEdit,
  FaSignOutAlt,
} from 'react-icons/fa';

const adminNavItems = [
  { name: 'Dashboard', href: '/pages/admin', icon: <FaUserShield size={18} /> },
  { name: 'User Management', href: '/pages/admin/manageusers', icon: <FaUsers size={18} /> },
  { name: 'Coach Services', href: '/pages/admin/managecoaches', icon: <FaUserTie size={18} /> },
  { name: 'Client Services', href: '/pages/admin/manageclients', icon: <FaUserEdit size={18} /> },
  { name: 'Sessions', href: '/pages/admin/sessions', icon: <FaCalendarAlt size={18} /> },
  { name: 'Analytics', href: '/pages/admin/analytics', icon: <FaChartPie size={18} /> },
  { name: 'Feedback', href: '/pages/admin/feedback', icon: <FaClipboardCheck size={18} /> },
  { name: 'Resources', href: '/pages/admin/resources', icon: <FaBook size={18} /> },
  { name: 'Announcements', href: '/pages/admin/announcements', icon: <FaEnvelope size={18} /> },
  { name: 'Settings', href: '/pages/admin/settings', icon: <FaCogs size={18} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      className={`bg-white border-r border-gray-200 hidden md:flex flex-col h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <div className={`p-3 ${collapsed ? 'justify-center flex' : ''}`}>
        {!collapsed && <h1 className="text-base font-semibold text-gray-800">WANAC Admin</h1>}
        {collapsed && <span className="sr-only">WANAC Admin</span>}
      </div>
      <nav className="flex-1 p-1 space-y-1">
        {adminNavItems.map((item) => (
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
