"use client";
import { useState, useEffect, useRef } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

// Mock notifications data
const mockNotifications = [
  { id: 1, text: 'Your session with Coach Smith is tomorrow at 10:00 AM.' },
  { id: 2, text: 'New message from Coach Smith.' },
  { id: 3, text: 'Community event: Virtual coffee meetup this Friday.' },
];

// Notification item component
function NotificationItem({ notification, onClick }) {
  return (
    <li
      className="p-4 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition flex items-start gap-2"
      role="menuitem"
      tabIndex={0}
      onClick={() => onClick(notification)}
    >
      <FaBell className="text-orange-400 mt-0.5" />
      <span>{notification.text}</span>
    </li>
  );
}

export default function ClientTopbar({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    function handleEsc(event) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [dropdownOpen]);

  const handleNotificationClick = (notification) => {
    console.log('Clicked notification:', notification.id);
    // Here you can add logic to mark as read or navigate
  };

  return (
    <nav className="flex items-center justify-between bg-white px-4 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] pb-3 border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="flex items-center min-w-0 flex-1" />
      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="relative focus:outline-none group p-2 -m-2 rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center [touch-action:manipulation]"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-label="Show notifications"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <FaBell className="text-xl text-gray-500 group-hover:text-blue-600 transition" />
            {mockNotifications.length > 0 && (
              <>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {mockNotifications.length}
                </span>
                <span className="sr-only">{mockNotifications.length} unread notifications</span>
              </>
            )}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 max-w-[min(20rem,calc(100vw-2rem))] bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition transform scale-95 opacity-0 animate-fade-in">
              <div className="p-4 border-b font-semibold text-brand-navy flex items-center gap-2">
                <FaBell className="text-orange-500" /> Notifications
              </div>
              <ul role="menu" className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                {mockNotifications.length === 0 ? (
                  <li className="p-4 text-gray-500 text-sm">No new notifications.</li>
                ) : (
                  mockNotifications.map((n) => (
                    <NotificationItem
                      key={n.id}
                      notification={n}
                      onClick={handleNotificationClick}
                    />
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition min-h-[44px] [touch-action:manipulation]">
          <FaUserCircle className="text-2xl text-gray-500 shrink-0" />
          <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">{user ? user.name : 'Client'}</span>
        </div>
      </div>
    </nav>
  );
}
