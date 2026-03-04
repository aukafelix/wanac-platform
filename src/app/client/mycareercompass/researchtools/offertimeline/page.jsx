"use client";

import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default function OfferTimelinePage() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2
          className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <FaCalendarAlt className="text-[#002147]" />
          Offer Timeline
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Plan and compare offer timelines and decision deadlines in one view.
        </p>
        <div className="border border-gray-100 rounded-xl p-6 text-center text-gray-500 text-sm">
          Add offers to compare deadlines and plan your response timeline. (Tool content coming soon.)
        </div>
      </div>
    </div>
  );
}
