"use client";
import { Menu, MessageCircle } from 'lucide-react';
import { useDashboardMobile } from '@/contexts/DashboardMobileContext';

export default function ClientTopbar({ user, currentCommunity }) {
  const mobileCtx = useDashboardMobile();
  const setMobileOpen = mobileCtx?.setMobileOpen;

  return (
    <nav
      className="flex items-center justify-between bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30 pt-[env(safe-area-inset-top)] px-3 md:px-4 h-14 min-h-[56px] md:min-h-[52px]"
      style={{ paddingTop: 'max(env(safe-area-inset-top), 0.75rem)' }}
    >
      {/* Left: current community + hamburger on mobile */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {currentCommunity && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-[#002147] truncate max-w-[200px] md:max-w-xs">
            <MessageCircle size={16} className="text-orange-500 shrink-0" />
            <span className="text-sm font-medium truncate">{currentCommunity}</span>
          </div>
        )}
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
    </nav>
  );
}
