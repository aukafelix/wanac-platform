"use client";

import React from "react";
import { FaCoins } from "react-icons/fa";

export default function SalaryDatabasePage() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2
          className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <FaCoins className="text-[#002147]" />
          Salary Database
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Research salary ranges by role, location, and industry.
        </p>
        <div className="border border-gray-100 rounded-xl p-6 text-center text-gray-500 text-sm">
          Search by job title and location to view salary ranges. (Tool content coming soon.)
        </div>
      </div>
    </div>
  );
}
