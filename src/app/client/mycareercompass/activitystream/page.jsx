"use client";

import React from "react";
import { FaStream, FaPaperPlane, FaCalendarCheck, FaUserPlus, FaBuilding, FaFileAlt } from "react-icons/fa";

const MOCK_ACTIVITY = [
  { type: "application", icon: FaPaperPlane, title: "Application submitted", subtitle: "Tech Corp — Software Engineer", date: "2 hours ago", color: "text-blue-600" },
  { type: "interview", icon: FaCalendarCheck, title: "Interview scheduled", subtitle: "StartupXYZ — Second round", date: "1 day ago", color: "text-orange-600" },
  { type: "contact", icon: FaUserPlus, title: "Contact added", subtitle: "Jane Doe — Google", date: "2 days ago", color: "text-green-600" },
  { type: "employer", icon: FaBuilding, title: "Employer saved", subtitle: "Acme Industries", date: "3 days ago", color: "text-[#002147]" },
  { type: "material", icon: FaFileAlt, title: "Resume updated", subtitle: "Version 2.1", date: "5 days ago", color: "text-gray-600" },
];

export default function ActivityStreamPage() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2
          className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <FaStream className="text-[#002147]" />
          Activity Stream
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Recent career-related actions and updates in one place.
        </p>
        <div className="space-y-0">
          {MOCK_ACTIVITY.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0"
            >
              <div className={`w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 ${item.color}`}>
                <item.icon className="text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
