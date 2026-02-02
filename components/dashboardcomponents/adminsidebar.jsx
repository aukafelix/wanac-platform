"use client";
import Link from 'next/link';
import Image from 'next/image';
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
  FaGraduationCap,
} from 'react-icons/fa';
import { Menu, X, LogOut } from 'lucide-react';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import ForumIcon from '@mui/icons-material/Forum';

const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: <FaUserShield size={18} /> },
  { name: 'User Management', href: '/admin/manageusers', icon: <FaUsers size={18} /> },
  { name: 'Coach Management', href: '/admin/managecoaches', icon: <FaUserTie size={18} /> },
  { name: 'Program Management', href: '/admin/programmanagement', icon: <FaGraduationCap size={18} /> },
  { name: 'Cohort Management', href: '/admin/cohortmanagement', icon: <FaGraduationCap size={18} /> },
  { name: 'Fireteam Management', href: '/admin/fireteammanagement', icon: <GroupsIcon fontSize="small" /> },
  { name: 'Community Management', href: '/admin/community', icon: <ForumIcon fontSize="small" /> },
  { name: 'Client Services', href: '/admin/manageclients', icon: <FaUserEdit size={18} /> },
  { name: 'Sessions', href: '/admin/sessions', icon: <FaCalendarAlt size={18} /> },
  { name: 'Analytics', href: '/admin/analytics', icon: <FaChartPie size={18} /> },
  { name: 'Feedback', href: '/admin/feedback', icon: <FaClipboardCheck size={18} /> },
  { name: 'Resources', href: '/admin/resources', icon: <FaBook size={18} /> },
  { name: 'Announcements', href: '/admin/announcements', icon: <FaEnvelope size={18} /> },
  { name: 'Settings', href: '/admin/settings', icon: <FaCogs size={18} /> },
];

export default function AdminSidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // If no props provided, use internal state (fallback for backward compatibility)
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;
  const updateCollapsed = setCollapsed || setInternalCollapsed;

  // Load sidebar state from localStorage only if not controlled by props
  useEffect(() => {
    if (collapsed === undefined && typeof window !== 'undefined') {
      const stored = localStorage.getItem('wanacAdminSidebarCollapsed');
      if (stored !== null) {
        setInternalCollapsed(stored === 'true');
      }
    }
  }, [collapsed]);

  // Persist sidebar state to localStorage only if not controlled by props
  useEffect(() => {
    if (collapsed === undefined && typeof window !== 'undefined') {
      localStorage.setItem('wanacAdminSidebarCollapsed', internalCollapsed);
    }
  }, [internalCollapsed, collapsed]);

  // Determine if sidebar should be open
  const isOpen = !isCollapsed || (isCollapsed && hovered);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wanacUser');
      localStorage.removeItem('auth_token');
    }
    router.push('/login');
  };

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Open sidebar"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={24} className="text-gray-600" />
      </button>
      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      {/* Mobile drawer */}
      <aside
        className={`bg-white border-r border-gray-200 flex flex-col h-screen w-56 fixed top-0 left-0 z-50 md:hidden transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : '-translate-x-[calc(100%+1rem)]'}`}
        role="navigation"
        aria-label="Sidebar"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-100 shrink-0">
          <Image
            src="/WANAC N 8 Old Glory.svg"
            alt="WANAC Admin"
            width={100}
            height={22}
            className="object-contain h-6 w-auto"
          />
          <button
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X size={22} />
          </button>
        </div>
        <nav className="flex-1 min-h-0 overflow-y-auto py-2 space-y-0.5">
          {adminNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 w-full px-3 py-2.5 text-sm font-medium transition-colors rounded-none ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t border-gray-100 shrink-0">
          <button
            className="flex items-center gap-2 px-2 py-2.5 text-sm text-gray-600 hover:bg-gray-100 w-full rounded-md"
            onClick={() => { setMobileOpen(false); handleLogout(); }}
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>
      {/* Sidebar for desktop */}
      <aside
        className={`bg-white border-r border-gray-200 flex-col h-screen transition-all duration-300 ${isOpen ? 'w-56' : 'w-16'} hidden md:flex md:static md:z-0`}
        role="navigation"
        aria-label="Sidebar"
        tabIndex={-1}
        onMouseEnter={() => { if (isCollapsed) setHovered(true); }}
        onMouseLeave={() => { if (isCollapsed) setHovered(false); }}
      >
        <div className={`p-3 flex items-center ${isOpen ? 'ml-2' : 'justify-center'}`}>
          {!isOpen && <span className="sr-only">WANAC Admin</span>}
          <Image
            src="/WANAC N 8 Old Glory.svg"
            alt="WANAC Admin"
            width={isOpen ? 100 : 48}
            height={isOpen ? 22 : 11}
            className={`object-contain w-auto ${isOpen ? 'h-6' : 'h-8'}`}
          />
        </div>
        <nav className="flex-1 py-1 space-y-0.5">
          {adminNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-none text-xs font-medium transition-all ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isOpen ? '' : 'justify-center px-0'}`}
            >
              {item.icon}
              {isOpen ? item.name : null}
            </Link>
          ))}
        </nav>
        {/* Toggle button below nav items */}
        <div className={`flex justify-${isOpen ? 'end' : 'center'} px-2 pb-2 min-w-0 overflow-hidden`}>
          <button
            className="bg-blue-500 text-white rounded-full p-1.5 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center gap-1 min-w-[44px] shrink-0 overflow-hidden"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => updateCollapsed((prev) => !prev)}
          >
            <span className="flex items-center justify-center shrink-0" key={isOpen ? 'close' : 'menu'}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </span>
            {!isCollapsed ? <PushPinIcon style={{ fontSize: 16 }} /> : <PushPinOutlinedIcon style={{ fontSize: 16 }} />}
          </button>
        </div>
        <div className="p-2 border-t flex flex-col gap-1">
          <button className={`flex items-center gap-2 px-2 py-2 text-xs text-gray-600 hover:bg-gray-100 w-full rounded-md ${isOpen ? '' : 'justify-center'}`}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            {isOpen && 'Log Out'}
          </button>
        </div>
      </aside>
    </>
  );
}
