import { useState } from "react";

export default function ScheduleSessionModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [coach, setCoach] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, date, time, coach, unit });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4">
      <div className="bg-white rounded-t-xl sm:rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Schedule New Session</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Session Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Coach"
            value={coach}
            onChange={e => setCoach(e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Unit"
            value={unit}
            onChange={e => setUnit(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Schedule
          </button>
        </form>
      </div>
    </div>
  );
}