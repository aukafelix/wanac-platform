"use client";

import React from "react";
import { FaSearch, FaChartLine, FaCoins, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

const TOOLS = [
  {
    id: "offertimeline",
    title: "Offer Timeline",
    description: "Plan and compare offer timelines and decision deadlines.",
    icon: FaCalendarAlt,
    href: "/client/mycareercompass/researchtools/offertimeline",
    available: true,
  },
  {
    id: "outcomesindex",
    title: "Outcomes Index",
    description: "Explore outcomes data to inform your career decisions.",
    icon: FaChartLine,
    href: "/client/mycareercompass/researchtools/outcomesindex",
    available: true,
  },
  {
    id: "salarydatabase",
    title: "Salary Database",
    description: "Research salary ranges by role, location, and industry.",
    icon: FaCoins,
    href: "/client/mycareercompass/researchtools/salarydatabase",
    available: true,
  },
];

export default function ResearchToolsPage() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2
          className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <FaSearch className="text-[#002147]" />
          Research Tools
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Use these tools to research offers, outcomes, and salary data for your career decisions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-10 h-10 rounded-lg bg-[#002147]/10 flex items-center justify-center text-[#002147] mb-3">
                <tool.icon className="text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{tool.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
              {tool.available ? (
                <Link
                  href={tool.href}
                  className="text-sm font-medium text-[#002147] hover:underline"
                >
                  Open →
                </Link>
              ) : (
                <span className="text-sm text-gray-400">Coming soon</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
