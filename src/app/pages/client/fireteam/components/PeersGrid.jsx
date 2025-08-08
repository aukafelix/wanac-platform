import React from "react";

export default function PeersGrid({ peers = ["Alice", "Bob", "Charlie", "Dana"] }) {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-6 items-center justify-center">
      {peers.map((peer, idx) => (
        <div key={peer.id || peer.name || idx} className="flex flex-col items-center">
          <div className="w-40 h-32 bg-gray-300 rounded-lg flex items-center justify-center text-4xl text-gray-500 mb-2">
            {/* Placeholder for video feed */}
            <span role="img" aria-label="Peer video">🎥</span>
          </div>
          <div className="text-sm text-gray-700 font-medium">
            {peer.name || peer}
          </div>
        </div>
      ))}
    </div>
  );
}