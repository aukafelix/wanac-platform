"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  Users,
  ClipboardList,
  HelpCircle,
  Calendar,
  User,
  FileText,
  CheckCircle,
  Building2,
  Phone,
  ListChecks,
  MessageSquare,
  FolderOpen,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// Accepts: items [{ name, href, icon?, sectionId? }], title, collapsedDefault, onSectionSelect?(sectionId), activeSectionId?
export default function SectionSidebar({ items = [], title = "Section", collapsedDefault = false, onSectionSelect, activeSectionId }) {
  const [collapsed, setCollapsed] = useState(collapsedDefault);
  const [hovered, setHovered] = useState(false);
  const isOpen = !collapsed || (collapsed && hovered);

  const linkClass = `flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition-all ${isOpen ? "" : "justify-center"} text-gray-700 hover:bg-gray-100`;

  return (
    <aside
      className={`border-r border-gray-200 flex-col h-screen transition-all duration-300 ${isOpen ? "w-56" : "w-16"} hidden md:flex md:static md:z-0`}
      role="navigation"
      aria-label={title + " Sidebar"}
      tabIndex={-1}
      onMouseEnter={() => { if (collapsed) setHovered(true); }}
      onMouseLeave={() => { if (collapsed) setHovered(false); }}
    >
      <div className={`p-3 ${isOpen ? "" : "justify-center flex"}`}> 
        {isOpen && <h2 className="text-base font-semibold text-gray-800 ml-2">{title}</h2>}
      </div>
      <nav className="flex-1 p-1 space-y-1">
        {items.map((item) => {
          const useSelect = onSectionSelect && item.sectionId != null;
          const isActive = activeSectionId != null && item.sectionId === activeSectionId;
          const activeClass = isActive ? " bg-[#002147]/10 text-[#002147] font-semibold" : "";
          if (useSelect) {
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => onSectionSelect(item.sectionId)}
                className={`w-full text-left ${linkClass}${activeClass}`}
              >
                {isOpen ? item.name : null}
              </button>
            );
          }
          return (
            <Link
              key={item.name}
              href={item.href || "#"}
              className={linkClass}
            >
              {isOpen ? item.name : null}
            </Link>
          );
        })}
      </nav>
      <div className={`flex justify-${isOpen ? "end" : "center"} px-2 pb-2`}>
        <button
          className="bg-blue-500 text-white rounded-full p-1 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-1"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </aside>
  );
}
