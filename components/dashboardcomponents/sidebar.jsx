"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BarChart2,
  Settings,
  LogOut,
  Users,
  Calendar,
  HeartPulse,
  BookOpen,
  CheckSquare,
  Brain,
  MessageCircle,
  Bot,
  UserCog,
  CalendarDays,
  Briefcase,
  GraduationCap,
  Video,
  Menu,
  X,
} from "lucide-react";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { useState, useEffect } from "react";

// -------------------- NAV ITEMS --------------------
export const navItems = [
  { name: "Dashboard", href: "/client/dashboard", icon: <Home size={18} /> },
  { name: "Calendar", href: "/client/calendar", icon: <Calendar size={18} /> },
  { name: "Lifescores", href: "/client/lifescores", icon: <HeartPulse size={18} /> },
  { name: "Journal", href: "/client/journal", icon: <BookOpen size={18} /> },
  { name: "Fireteam", href: "/client/fireteam", icon: <Users size={18} /> },
  { name: "Task Management", href: "/client/taskmanagement", icon: <CheckSquare size={18} /> },
  { name: "AI Insights", href: "/client/aiinsights", icon: <Brain size={18} /> },
  { name: "Community", href: "/client/community", icon: <MessageCircle size={18} /> },
  { name: "AI Chat Bot", href: "/client/aichatbot", icon: <Bot size={18} /> },
  { name: "Students", href: "/client/students", icon: <Users size={18} /> },
  { name: "Account Settings", href: "/client/accountsettings", icon: <UserCog size={18} /> },
  { name: "Sessions", href: "/client/session", icon: <Video size={18} /> },
  { name: "My Career Compass", href: "/client/mycareercompass", icon: <Briefcase size={18} /> },
  { name: "My Education Compass", href: "/client/myeducationcompass", icon: <GraduationCap size={18} /> },
  { name: "Reports", href: "/client/reports", icon: <BarChart2 size={18} /> },
];

// -------------------- SIDEBAR ITEM COMPONENT --------------------
function SidebarItem({ item, isOpen, active, onClick }) {
  return (
    <Link
      href={item.href}
      className={`relative flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition-all
        ${active ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"}
        ${isOpen ? "" : "justify-center"} group`}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      {item.icon}
      {isOpen && item.name}
      {/* Tooltip for collapsed */}
      {!isOpen && (
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
          {item.name}
        </span>
      )}
    </Link>
  );
}

// -------------------- SIDEBAR COMPONENT --------------------
export default function Sidebar({ collapsed: collapsedProp, setCollapsed: setCollapsedProp }) {
  const pathname = usePathname();
  const router = useRouter();

  // Internal state if props not provided
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const collapsed = collapsedProp !== undefined ? collapsedProp : internalCollapsed;
  const setCollapsed = setCollapsedProp || setInternalCollapsed;

  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  // Load collapsed state from localStorage if uncontrolled
  useEffect(() => {
    if (collapsedProp === undefined && typeof window !== "undefined") {
      const stored = localStorage.getItem("wanacSidebarCollapsed");
      if (stored !== null) setInternalCollapsed(stored === "true");
    }
  }, [collapsedProp]);

  useEffect(() => {
    if (collapsedProp === undefined && typeof window !== "undefined") {
      localStorage.setItem("wanacSidebarCollapsed", internalCollapsed);
    }
  }, [internalCollapsed, collapsedProp]);

  // Logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("wanacUser");
    }
    router.push("/login");
  };

  const isOpen = !collapsed || (collapsed && (hovered || pinned));

  return (
    <>
      {/* MOBILE HAMBURGER - hidden when sidebar open; safe-area aware */}
      <button
        className={`md:hidden fixed z-50 bg-white p-2 rounded shadow transition-opacity ${mobileOpen ? "invisible pointer-events-none" : ""}`}
        style={{ top: 'max(1rem, env(safe-area-inset-top, 1rem))', left: 'max(1rem, env(safe-area-inset-left, 1rem))' }}
        aria-label="Open sidebar"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* MOBILE OVERLAY - only over content area (right of sidebar), lighter so content remains visible */}
      {mobileOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-56 bg-black/20 z-40 transition-opacity duration-300 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* MOBILE SIDEBAR */}
      {mobileOpen && (
        <aside className="bg-white border-r border-gray-200 flex-col h-screen transition-all duration-300 w-56 fixed top-0 left-0 z-50 md:hidden flex">
          <div className="px-3 pb-3 flex items-center justify-between shrink-0" style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0.75rem))' }}>
            <h1 className="text-base font-semibold text-gray-800">WANAC</h1>
            <button
              type="button"
              className="p-2 -mr-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex-1 p-1 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <SidebarItem
                key={item.name}
                item={item}
                isOpen={true}
                active={pathname.startsWith(item.href)}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>
          <div className="p-2 border-t flex flex-col gap-1">
            <button
              className="flex items-center gap-2 px-2 py-2 text-xs text-gray-600 hover:bg-gray-100 w-full rounded-md"
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
            >
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </aside>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`bg-white border-r border-gray-200 flex-col h-screen transition-[width] duration-300 ease-in-out ${
          isOpen ? "w-56" : "w-16"
        } hidden md:flex md:static md:z-0`}
        role="navigation"
        aria-label="Sidebar"
        tabIndex={-1}
        onMouseEnter={() => collapsed && setHovered(true)}
        onMouseLeave={() => collapsed && setHovered(false)}
      >
        {/* Logo */}
        <div className={`p-3 ${isOpen ? "" : "justify-center flex"}`}>
          {!isOpen && <span className="sr-only">WANAC</span>}
          {isOpen && <h1 className="text-base font-semibold text-gray-800 ml-6">WANAC</h1>}
        </div>

        {/* NAV ITEMS */}
        <nav className="flex-1 p-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              isOpen={isOpen}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </nav>

        {/* PIN & COLLAPSE TOGGLE */}
        <div className={`flex justify-${isOpen ? "end" : "center"} px-2 pb-2 gap-2`}>
          <button
            className="bg-blue-500 text-white rounded-full p-1 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-1"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button
            className="bg-gray-100 text-gray-700 rounded-full p-1 hover:bg-gray-200"
            onClick={() => setPinned((prev) => !prev)}
            aria-label={pinned ? "Unpin sidebar" : "Pin sidebar"}
          >
            {pinned ? <PushPinIcon style={{ fontSize: 16 }} /> : <PushPinOutlinedIcon style={{ fontSize: 16 }} />}
          </button>
        </div>

        {/* LOGOUT */}
        <div className="p-2 border-t flex flex-col gap-1">
          <button
            className={`flex items-center gap-2 px-2 py-2 text-xs text-gray-600 hover:bg-gray-100 w-full rounded-md ${
              isOpen ? "" : "justify-center"
            }`}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            {isOpen && "Log Out"}
          </button>
        </div>
      </aside>
    </>
  );
}
