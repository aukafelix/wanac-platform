"use client";
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, BarChart2, Settings, LogOut, Users, Calendar, HeartPulse, BookOpen, CheckSquare, Brain, MessageCircle, Bot, UserCog, CalendarDays, Briefcase, GraduationCap, Video, Menu } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { name: 'Dashboard', href: '/pages/client/dashboard', icon: <Home size={18} /> },
  { name: 'Calendar', href: '/pages/client/calendar', icon: <Calendar size={18} /> },
  
  { name: 'Lifescores', href: '/pages/client/lifescores', icon: <HeartPulse size={18} /> },
  { name: 'Journal', href: '/pages/client/journal', icon: <BookOpen size={18} /> },
  { name: 'BreakoutRoom', href: '/pages/client/fireteam', icon: <Users size={18} /> },
  { name: 'Task Management', href: '/pages/client/taskmanagement', icon: <CheckSquare size={18} /> },
  { name: 'AI Insights', href: '/pages/client/aiinsights', icon: <Brain size={18} /> },
  { name: 'Community', href: '/pages/client/community', icon: <MessageCircle size={18} /> },
  { name: 'AI Chat Bot', href: '/pages/client/aichatbot', icon: <Bot size={18} /> },
  { name: 'Students', href: '/pages/client/students', icon: <Users size={18} /> },
  { name: 'Account Settings', href: '/pages/client/accountsettings', icon: <UserCog size={18} /> },
  { name: 'Sessions', href: '/pages/client/session', icon: <Video size={18} /> }, // <-- Changed to Video icon
  { name: 'My Education Compass', href: '/pages/client/myeducationcompass', icon: <GraduationCap size={18} /> },
  { name: 'Reports', href: '/client/reports', icon: <BarChart2 size={18} /> },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter();

  // Logout handler
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wanacUser');
    }
    router.push('/login');
  };

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        aria-label="Open sidebar"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={24} />
      </button>
      {/* Sidebar overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* Sidebar for mobile */}
      {mobileOpen && (
        <aside
          className={`bg-white border-r border-gray-200 flex-col h-screen transition-all duration-300 w-56 fixed top-0 left-0 z-50 md:hidden flex`}
          role="navigation"
          aria-label="Sidebar"
          tabIndex={-1}
          style={{ outline: '2px solid #2563eb' }}
        >
          <div className={`p-3`}>
            <h1 className="text-base font-semibold text-gray-800">WANAC</h1>
          </div>
          <nav className="flex-1 p-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition-all \
                  ${
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
          <div className="p-2 border-t flex flex-col gap-1">
            <button className="flex items-center gap-2 px-2 py-2 text-xs text-gray-600 hover:bg-gray-100 w-full rounded-md"
              onClick={() => { setMobileOpen(false); handleLogout(); }}
            >
              <LogOut size={18} />
              {'Log Out'}
            </button>
          </div>
        </aside>
      )}
      {/* Sidebar for desktop */}
      <aside
        className={`bg-white border-r border-gray-200 flex-col h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'} hidden md:flex md:static md:z-0`}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        role="navigation"
        aria-label="Sidebar"
        tabIndex={-1}
      >
        <div className={`p-3 ${collapsed ? 'justify-center flex' : ''}`}>
          {!collapsed && <h1 className="text-base font-semibold text-gray-800">WANAC</h1>}
          {collapsed && <span className="sr-only">WANAC</span>}
        </div>
        <nav className="flex-1 p-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition-all \
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
            onClick={handleLogout}
          >
            <LogOut size={18} />
            {!collapsed && 'Log Out'}
          </button>
        </div>
      </aside>
    </>
  )
}
