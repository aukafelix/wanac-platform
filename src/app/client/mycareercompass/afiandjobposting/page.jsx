"use client";

import React from "react";
import { FaBriefcase, FaMapMarkerAlt, FaCalendar, FaExternalLinkAlt } from "react-icons/fa";

const MOCK_POSTINGS = [
  { title: "Software Engineer", org: "Tech Corp", location: "Remote", date: "Jan 22, 2025" },
  { title: "Full Stack Developer", org: "StartupXYZ", location: "San Francisco, CA", date: "Jan 18, 2025" },
  { title: "Veteran Talent Program — Engineering", org: "Acme Industries", location: "Chicago, IL", date: "Jan 15, 2025" },
];

export default function AFIAndJobPostingPage() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2
          className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <FaBriefcase className="text-[#002147]" />
          AFI and Job Postings
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Job postings and opportunities from AFI and partner employers.
        </p>
        <div className="space-y-3">
          {MOCK_POSTINGS.map((job, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.org}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="shrink-0" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendar className="shrink-0" /> {job.date}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#002147] hover:underline"
                >
                  Apply <FaExternalLinkAlt className="text-xs" />
                </button>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
        {MOCK_POSTINGS.length === 0 && (
          <p className="text-gray-500 text-sm py-6 text-center">
            No postings at the moment. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
