"use client";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";

function CourseMaterialsModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-2">Course Materials</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Course materials help you understand the core concepts of the experience and prepare you for the discussion.
        </p>
        <div className="bg-gray-100 rounded-lg flex items-center justify-between px-4 py-3">
          <span className="font-semibold text-sm truncate max-w-[180px]">
            Pre-Work PDF: Customer Discovery | Practical Market Research for Startups
          </span>
          <div className="flex items-center gap-3 ml-2">
            {/* View icon */}
            <a
              href="/course-materials/customer-discovery-prework.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600"
              title="View PDF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
            {/* Download icon */}
            <a
              href="/course-materials/customer-discovery-prework.pdf"
              download
              className="text-gray-500 hover:text-blue-600"
              title="Download PDF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v-12m0 12l-3.75-3.75M12 16.5l3.75-3.75M21 21.75H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BreakoutRoomPage() {
  // For now, always show HomePage. Replace with logic for experience selection if needed.
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        {/* Breadcrumb and Title */}
        <div className="text-sm text-gray-400 mb-2">
          Home
        </div>
        <HomePage />
      </main>
    </div>
  );
}