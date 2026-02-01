"use client";
import { useState, useEffect, useRef } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Menu } from 'lucide-react';
import { useDashboardMobile } from '@/contexts/DashboardMobileContext';

const mockNotifications = [
  { id: 1, text: 'Your session with Coach Smith is tomorrow at 10:00 AM.' },
  { id: 2, text: 'New message from Coach Smith.' },
  { id: 3, text: 'Community event: Virtual coffee meetup this Friday.' },
];

export default function ClientTopbar({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileCtx = useDashboardMobile();
  const setMobileOpen = mobileCtx?.setMobileOpen;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav
      className="flex items-center justify-between bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30 pt-[env(safe-area-inset-top)] px-3 md:px-4 h-14 min-h-[56px] md:min-h-[52px]"
      style={{ paddingTop: 'max(env(safe-area-inset-top), 0.75rem)' }}
    >
      {/* Left: hamburger on mobile only */}
      <div className="flex items-center gap-2">
        {setMobileOpen && (
          <button
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        )}
      </div>

      {/* Right: notifications + user */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-600 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-label="Show notifications"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <FaBell className="text-xl text-gray-600 hover:text-blue-600 transition" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {mockNotifications.length}
            </span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-[calc(100vw-2rem)] max-w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2">
              <div className="px-4 py-2 border-b border-gray-100 font-semibold text-[#002147] flex items-center gap-2">
                <FaBell className="text-orange-500" /> Notifications
              </div>
              <ul className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                {mockNotifications.length === 0 ? (
                  <li className="p-4 text-gray-500 text-sm">No new notifications.</li>
                ) : (
                  mockNotifications.map((n) => (
                    <li key={n.id} className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition">
                      {n.text}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 md:px-3 md:py-1.5 rounded-lg md:rounded transition">
          <FaUserCircle className="text-2xl text-gray-600 shrink-0" />
          <span className="text-sm font-medium text-gray-700 hidden sm:inline truncate max-w-[120px] md:max-w-none">
            {user ? user.name : 'Client'}
          </span>
        </div>
      </div>
    </nav>
  );
}
