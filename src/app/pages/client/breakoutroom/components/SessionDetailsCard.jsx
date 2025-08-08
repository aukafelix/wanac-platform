import { FaVideo } from "react-icons/fa";

export default function SessionDetailsCard() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-1 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-800">Exchange</span>
        <span className="text-gray-500">Thursday at 12:00 PM</span>
      </div>
      <div className="text-gray-500">April 24, 2025</div>
      <div className="flex items-center gap-2 mt-2">
        <FaVideo className="text-blue-500" />
        <span className="text-blue-600 hover:underline cursor-pointer text-sm">Join via Zoom</span>
      </div>
    </div>
  );
}