import React from "react";

export default function VideoSessionModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
        <h2 className="text-xl font-bold mb-4">Live Video Session</h2>
        {/* Replace this with your actual video component or integration */}
        <div className="aspect-video bg-black rounded mb-4 flex items-center justify-center text-white">
          Video Stream Here
        </div>
        <p className="text-gray-600">This is a placeholder for your live video session.</p>
      </div>
    </div>
  );
}