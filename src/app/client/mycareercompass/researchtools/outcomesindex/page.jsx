"use client";

import React from "react";
import { FaChartLine } from "react-icons/fa";

export default function OutcomesIndexPage() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2
          className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <FaChartLine className="text-[#002147]" />
          Outcomes Index
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Explore outcomes data to inform your career and transition decisions.
        </p>
        <div className="border border-gray-100 rounded-xl p-6 text-center text-gray-500 text-sm">
          Browse outcomes by program, cohort, or industry. (Tool content coming soon.)
        </div>
      </div>
    </div>
  );
}
