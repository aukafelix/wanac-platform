"use client";

import React, { useState, useCallback } from "react";
import { FaClipboardList, FaPlus } from "react-icons/fa";
import CareerCompassModal from "../../../../../components/dashboardcomponents/CareerCompassModal";

const INITIAL_APPLICATIONS = [
  { id: 1, company: "Tech Corp", role: "Software Engineer", status: "Pending", dateApplied: "Jan 20, 2025" },
  { id: 2, company: "StartupXYZ", role: "Full Stack Developer", status: "Interview", dateApplied: "Jan 12, 2025" },
  { id: 3, company: "DataFlow Inc", role: "Backend Developer", status: "Rejected", dateApplied: "Jan 5, 2025" },
  { id: 4, company: "CloudNine", role: "DevOps Engineer", status: "Offered", dateApplied: "Dec 28, 2024" },
];

const STATUS_OPTIONS = ["Pending", "Interview", "Rejected", "Offered"];

const INITIAL_FORM = {
  company: "",
  role: "",
  dateApplied: new Date().toISOString().slice(0, 10),
  status: "Pending",
  notes: "",
};

function formatDisplayDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  return isNaN(d.getTime()) ? isoDate : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ApplicationManagementPage() {
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [formError, setFormError] = useState("");

  const handleOpenDialog = useCallback(() => {
    setForm(INITIAL_FORM);
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
    if (!form.company?.trim()) {
      setFormError("Company is required.");
      return;
    }
    if (!form.role?.trim()) {
      setFormError("Role is required.");
      return;
    }
    setApplications((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((a) => a.id)) + 1 : 1,
        company: form.company.trim(),
        role: form.role.trim(),
        status: form.status,
        dateApplied: formatDisplayDate(form.dateApplied),
        notes: form.notes?.trim() || "",
      },
    ]);
    handleCloseDialog();
  }, [form, handleCloseDialog]);

  const pendingCount = applications.filter((a) => a.status === "Pending").length;
  const rejectedCount = applications.filter((a) => a.status === "Rejected").length;
  const offeredCount = applications.filter((a) => a.status === "Offered").length;

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2
          className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <FaClipboardList className="text-[#002147]" />
          Application Management
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Track all your job applications and their status in one place.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="text-center p-3 bg-[#002147]/5 rounded-lg border border-[#002147]/10">
            <div className="text-2xl font-bold text-[#002147]">{applications.length}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <div className="text-xs text-gray-600">Rejected</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">{offeredCount}</div>
            <div className="text-xs text-gray-600">Offered</div>
          </div>
        </div>
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
            <div>Company</div>
            <div>Role</div>
            <div>Status</div>
            <div>Date applied</div>
          </div>
          {applications.map((app) => (
            <div
              key={app.id}
              className="grid grid-cols-4 gap-4 px-4 py-3 border-t border-gray-100 items-center"
            >
              <div className="font-medium text-gray-900">{app.company}</div>
              <div className="text-sm text-gray-700">{app.role}</div>
              <div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  app.status === "Pending" ? "bg-amber-100 text-amber-700" :
                  app.status === "Interview" ? "bg-orange-100 text-orange-700" :
                  app.status === "Rejected" ? "bg-red-100 text-red-700" :
                  "bg-green-100 text-green-700"
                }`}>
                  {app.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">{app.dateApplied}</div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleOpenDialog}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#002147] hover:underline"
        >
          <FaPlus className="text-xs" /> Add application
        </button>
      </div>

      <CareerCompassModal
        open={dialogOpen}
        onClose={handleCloseDialog}
        title="Add Application"
        icon={<FaPlus size={14} />}
        onSubmit={handleSubmit}
        submitLabel="Add Application"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Company *</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleFormChange}
              placeholder="Company name"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Role *</label>
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleFormChange}
              placeholder="Job title"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date applied</label>
            <input
              type="date"
              name="dateApplied"
              value={form.dateApplied}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
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
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleFormChange}
            placeholder="Optional notes"
            rows={3}
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
