"use client";

import React, { useState, useCallback } from "react";
import { FaBuilding, FaPlus } from "react-icons/fa";
import CareerCompassModal from "../../../../../components/dashboardcomponents/CareerCompassModal";

const INITIAL_EMPLOYERS = [
  { id: 1, name: "Tech Corp", status: "Applied", dateAdded: "Jan 15, 2025" },
  { id: 2, name: "StartupXYZ", status: "Interview", dateAdded: "Jan 10, 2025" },
  { id: 3, name: "Acme Industries", status: "Saved", dateAdded: "Jan 5, 2025" },
  { id: 4, name: "Global Solutions Inc", status: "Contacted", dateAdded: "Dec 28, 2024" },
];

const STATUS_OPTIONS = ["Saved", "Applied", "Contacted", "Interview"];

const INITIAL_FORM = {
  name: "",
  status: "Saved",
  dateAdded: new Date().toISOString().slice(0, 10),
  notes: "",
};

function formatDisplayDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  return isNaN(d.getTime()) ? isoDate : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function EmployersPage() {
  const [employers, setEmployers] = useState(INITIAL_EMPLOYERS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [formError, setFormError] = useState("");

  const handleOpenDialog = useCallback(() => {
    setForm({ ...INITIAL_FORM, dateAdded: new Date().toISOString().slice(0, 10) });
    setFormError("");
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setFormError("");
  }, []);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!form.name?.trim()) {
      setFormError("Company name is required.");
      return;
    }
    setEmployers((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((e) => e.id)) + 1 : 1,
        name: form.name.trim(),
        status: form.status,
        dateAdded: formatDisplayDate(form.dateAdded),
        notes: form.notes?.trim() || "",
      },
    ]);
    handleCloseDialog();
  }, [form, handleCloseDialog]);

  const appliedCount = employers.filter((e) => e.status === "Applied").length;
  const interviewCount = employers.filter((e) => e.status === "Interview").length;
  const contactedCount = employers.filter((e) => e.status === "Contacted").length;

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2
          className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <FaBuilding className="text-[#002147]" />
          Employers
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Companies you&apos;ve saved, applied to, or contacted.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="text-center p-3 bg-[#002147]/5 rounded-lg border border-[#002147]/10">
            <div className="text-2xl font-bold text-[#002147]">{employers.length}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{appliedCount}</div>
            <div className="text-xs text-gray-600">Applied</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">{interviewCount}</div>
            <div className="text-xs text-gray-600">Interview</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">{contactedCount}</div>
            <div className="text-xs text-gray-600">Contacted</div>
          </div>
        </div>
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 gap-4 px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
            <div>Company</div>
            <div>Status</div>
            <div>Date added</div>
          </div>
          {employers.map((emp) => (
            <div
              key={emp.id}
              className="grid grid-cols-3 gap-4 px-4 py-3 border-t border-gray-100 items-center"
            >
              <div className="font-medium text-gray-900">{emp.name}</div>
              <div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  emp.status === "Applied" ? "bg-blue-100 text-blue-700" :
                  emp.status === "Interview" ? "bg-orange-100 text-orange-700" :
                  emp.status === "Contacted" ? "bg-green-100 text-green-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {emp.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">{emp.dateAdded}</div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleOpenDialog}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#002147] hover:underline"
        >
          <FaPlus className="text-xs" /> Add employer
        </button>
      </div>

      <CareerCompassModal
        open={dialogOpen}
        onClose={handleCloseDialog}
        title="Add Employer"
        icon={<FaPlus size={14} />}
        onSubmit={handleSubmit}
        submitLabel="Add Employer"
      >
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Company name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Company or organization"
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date added</label>
            <input
              type="date"
              name="dateAdded"
              value={form.dateAdded}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleFormChange}
            placeholder="Optional notes"
            rows={2}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none resize-none"
          />
        </div>
        {formError && (
          <p className="text-red-600 text-xs flex items-center gap-1">⚠ {formError}</p>
        )}
      </CareerCompassModal>
    </div>
  );
}
