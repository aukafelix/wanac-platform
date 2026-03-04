"use client";

import React from "react";
import { FaPaperPlane, FaFilter } from "react-icons/fa";

const MOCK_APPLIED = [
  { company: "Tech Corp", role: "Software Engineer", status: "Pending", dateApplied: "Jan 20, 2025" },
  { company: "StartupXYZ", role: "Full Stack Developer", status: "Interview", dateApplied: "Jan 12, 2025" },
  { company: "DataFlow Inc", role: "Backend Developer", status: "Rejected", dateApplied: "Jan 5, 2025" },
  { company: "CloudNine", role: "DevOps Engineer", status: "Offered", dateApplied: "Dec 28, 2024" },
];

const STATUS_OPTIONS = ["All", "Pending", "Interview", "Rejected", "Offered"];

export default function AppliedPage() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2
          className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <FaPaperPlane className="text-[#002147]" />
          Applied
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Jobs you&apos;ve applied to. Filter by status to stay organized.
        </p>
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <FaFilter className="text-gray-400 text-sm" />
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              type="button"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                status === "All"
                  ? "bg-[#002147] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
            <div>Company</div>
            <div>Role</div>
            <div>Status</div>
            <div>Date applied</div>
          </div>
          {MOCK_APPLIED.map((app, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4 px-4 py-3 border-t border-gray-100 items-center"
            >
              <div className="font-medium text-gray-900">{app.company}</div>
              <div className="text-sm text-gray-700">{app.role}</div>
              <div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  app.status === "Pending" ? "bg-amber-100 text-amber-700" :
                  app.status === "Interview" ? "bg-orange-100 text-orange-700" :
                  app.status === "Rejected" ? "bg-red-100 text-red-700" :
                  "bg-green-100 text-green-700"
                }`}>
                  {app.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">{app.dateApplied}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
