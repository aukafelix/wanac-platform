import { useState, useEffect, useRef } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const mockNotifications = [
  { id: 1, text: 'Your session with Coach Smith is tomorrow at 10:00 AM.' },
  { id: 2, text: 'New message from Coach Smith.' },
  { id: 3, text: 'Community event: Virtual coffee meetup this Friday.' },
];

export default function ClientTopbar({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <nav className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div />
      <div className="flex items-center gap-6">
        <div className="relative" ref={dropdownRef}>
          <button
            className="relative focus:outline-none group"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-label="Show notifications"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <FaBell className="text-xl text-gray-500 group-hover:text-blue-600 transition" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {mockNotifications.length}
            </span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
              <div className="p-4 border-b font-semibold text-brand-navy flex items-center gap-2">
                <FaBell className="text-orange-500" /> Notifications
              </div>
              <ul className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                {mockNotifications.length === 0 ? (
                  <li className="p-4 text-gray-500 text-sm">No new notifications.</li>
                ) : (
                  mockNotifications.map((n) => (
                    <li key={n.id} className="p-4 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition">
                      {n.text}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded transition">
          <FaUserCircle className="text-2xl text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{user ? user.name : 'Client'}</span>
        </div>
      </div>
    </nav>
  );
}
