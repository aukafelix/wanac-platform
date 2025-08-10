"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
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
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

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
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Load sidebar state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wanacAdminSidebarCollapsed');
      if (stored !== null) {
        setCollapsed(stored === 'true');
      }
    }
  }, []);

  // Persist sidebar state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wanacAdminSidebarCollapsed', collapsed);
    }
  }, [collapsed]);

  // Determine if sidebar should be open
  const isOpen = !collapsed || (collapsed && hovered);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wanacUser');
      localStorage.removeItem('auth_token');
    }
    router.push('/login');
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-30 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen transition-all duration-300 ${isOpen ? 'w-56' : 'w-16'}`}
      onMouseEnter={() => { if (collapsed) setHovered(true); }}
      onMouseLeave={() => { if (collapsed) setHovered(false); }}
    >
      <div className={`p-3 ${isOpen ? '' : 'justify-center flex'}`}>
        {isOpen ? <h1 className="text-base font-semibold text-gray-800">WANAC Admin</h1> : <span className="sr-only">WANAC Admin</span>}
      </div>
      <nav className="flex-1 p-1 space-y-1">
        {adminNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition-all \
              ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isOpen ? '' : 'justify-center'}`}
          >
            {item.icon}
            {isOpen ? item.name : null}
          </Link>
        ))}
      </nav>
      {/* Toggle button below nav items */}
      <div className={`flex justify-${isOpen ? 'end' : 'center'} px-2 pb-2`}>
        <button
          className="bg-blue-500 text-white rounded-full p-1 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-1"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {isOpen ? <FaCogs size={20} /> : <FaChartPie size={20} />}
          {/* Material UI pin icon to indicate pinned state */}
          {!collapsed ? <PushPinIcon style={{ fontSize: 16 }} /> : <PushPinOutlinedIcon style={{ fontSize: 16 }} />}
        </button>
      </div>
      <div className="p-2 border-t flex flex-col gap-1">
        <button className={`flex items-center gap-2 px-2 py-2 text-xs text-gray-600 hover:bg-gray-100 w-full rounded-md ${isOpen ? '' : 'justify-center'}`}
          onClick={handleLogout}
        >
          <FaSignOutAlt size={18} />
          {isOpen && 'Log Out'}
        </button>
      </div>
    </aside>
  );
}
