"use client";

import React, { useState, useCallback } from "react";
import { FaBullseye, FaPlus } from "react-icons/fa";
import CareerCompassModal from "../../../../../components/dashboardcomponents/CareerCompassModal";

const INITIAL_TARGETS = [
  { id: 1, name: "Tech Corp", industry: "Technology", priority: "High", nextStep: "Apply" },
  { id: 2, name: "StartupXYZ", industry: "SaaS", priority: "High", nextStep: "Follow up" },
  { id: 3, name: "Acme Industries", industry: "Manufacturing", priority: "Medium", nextStep: "Research" },
  { id: 4, name: "Global Solutions Inc", industry: "Consulting", priority: "Medium", nextStep: "Connect on LinkedIn" },
];

const PRIORITY_OPTIONS = ["High", "Medium", "Low"];

const INITIAL_FORM = {
  name: "",
  industry: "",
  priority: "Medium",
  nextStep: "",
};

export default function TargetEmployersPage() {
  const [targets, setTargets] = useState(INITIAL_TARGETS);
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
    if (!form.name?.trim()) {
      setFormError("Company name is required.");
      return;
    }
    setTargets((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((t) => t.id)) + 1 : 1,
        name: form.name.trim(),
        industry: form.industry?.trim() || "—",
        priority: form.priority,
        nextStep: form.nextStep?.trim() || "—",
      },
    ]);
    handleCloseDialog();
  }, [form, handleCloseDialog]);

  const highPriorityCount = targets.filter((t) => t.priority === "High").length;
  const contactedCount = targets.filter((t) => ["Follow up", "Connect on LinkedIn", "Applied"].includes(t.nextStep)).length;

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2
          className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <FaBullseye className="text-[#002147]" />
          Target Employers
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Companies you&apos;re targeting. Track research and next steps.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-[#002147]/5 rounded-lg border border-[#002147]/10">
            <div className="text-2xl font-bold text-[#002147]">{targets.length}</div>
            <div className="text-xs text-gray-600">On list</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">{highPriorityCount}</div>
            <div className="text-xs text-gray-600">High priority</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{contactedCount}</div>
            <div className="text-xs text-gray-600">Contacted</div>
          </div>
        </div>
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
            <div>Company</div>
            <div>Industry</div>
            <div>Priority</div>
            <div>Next step</div>
          </div>
          {targets.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-4 gap-4 px-4 py-3 border-t border-gray-100 items-center"
            >
              <div className="font-medium text-gray-900">{t.name}</div>
              <div className="text-sm text-gray-600">{t.industry}</div>
              <div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  t.priority === "High" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"
                }`}>
                  {t.priority}
                </span>
              </div>
              <div className="text-sm text-gray-600">{t.nextStep}</div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleOpenDialog}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#002147] hover:underline"
        >
          <FaPlus className="text-xs" /> Add target employer
        </button>
      </div>

      <CareerCompassModal
        open={dialogOpen}
        onClose={handleCloseDialog}
        title="Add Target Employer"
        icon={<FaPlus size={14} />}
        onSubmit={handleSubmit}
        submitLabel="Add Target Employer"
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
            <label className="block text-xs font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              name="industry"
              value={form.industry}
              onChange={handleFormChange}
              placeholder="e.g. Technology, Healthcare"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            >
              {PRIORITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Next step</label>
          <input
            type="text"
            name="nextStep"
            value={form.nextStep}
            onChange={handleFormChange}
            placeholder="e.g. Apply, Research, Connect on LinkedIn"
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
          />
        </div>
        {formError && (
          <p className="text-red-600 text-xs flex items-center gap-1">⚠ {formError}</p>
        )}
      </CareerCompassModal>
    </div>
  );
}
