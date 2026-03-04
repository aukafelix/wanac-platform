 "use client";

import { useMemo, useState } from "react";
import AdminSidebar from "../../../../components/dashboardcomponents/adminsidebar";
import { FaCompass, FaSearch, FaPlus, FaTrash, FaEdit } from "react-icons/fa";

// Mirror the client-side Career Compass sections so admins can control what
// appears for each template.
const CAREER_SECTIONS = [
  { name: "Overview", sectionId: "overview" },
  { name: "Activity Stream", sectionId: "activitystream" },
  { name: "Application Management", sectionId: "applicationmanagement" },
  { name: "Employers", sectionId: "employers" },
  { name: "Application Materials", sectionId: "applicationmaterials" },
  { name: "Interview Questions", sectionId: "interviewquestions" },
  { name: "Target Employers", sectionId: "targetemployers" },
  { name: "Contacts", sectionId: "contacts" },
  { name: "Applied", sectionId: "applied" },
  { name: "Appointments", sectionId: "appointments" },
  { name: "Research Tools", sectionId: "researchtools" },
  { name: "AFI and Job Postings", sectionId: "afiandjobposting" },
];

const INITIAL_PLANS = [
  {
    id: 1,
    name: "Veteran Transition Career Map",
    audience: "Veterans",
    owner: "System",
    status: "Active",
    lastUpdated: "2025-12-15",
    enabledSections: [
      "overview",
      "activitystream",
      "applicationmanagement",
      "targetemployers",
      "contacts",
      "researchtools",
    ],
  },
  {
    id: 2,
    name: "Early Career Compass",
    audience: "Students",
    owner: "Coaching Team",
    status: "Draft",
    lastUpdated: "2025-11-02",
    enabledSections: [
      "overview",
      "applicationmanagement",
      "applicationmaterials",
      "interviewquestions",
    ],
  },
  {
    id: 3,
    name: "Leadership Track Compass",
    audience: "Emerging Leaders",
    owner: "Admin",
    status: "Inactive",
    lastUpdated: "2025-10-01",
    enabledSections: ["overview"],
  },
];

const STATUS_OPTIONS = ["Active", "Draft", "Inactive"];

const emptyForm = {
  id: null,
  name: "",
  audience: "",
  owner: "",
  status: "Draft",
  enabledSections: ["overview", "applicationmanagement", "researchtools"],
};

export default function CareerCompassManagementPage() {
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const filteredPlans = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = plans;
    if (!term) return base;
    return base.filter((plan) =>
      [plan.name, plan.audience, plan.owner]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    );
  }, [plans, search]);

  const totalCount = plans.length;
  const activeCount = plans.filter((p) => p.status === "Active").length;
  const inactiveOrDraftCount = plans.filter((p) => p.status !== "Active").length;

  const openNewModal = () => {
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (plan) => {
    setForm({
      id: plan.id,
      name: plan.name || "",
      audience: plan.audience || "",
      owner: plan.owner || "",
      status: plan.status || "Draft",
      enabledSections: plan.enabledSections?.length
        ? plan.enabledSections
        : emptyForm.enabledSections,
    });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormError("");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSection = (sectionId) => {
    setForm((prev) => {
      const exists = prev.enabledSections.includes(sectionId);
      return {
        ...prev,
        enabledSections: exists
          ? prev.enabledSections.filter((s) => s !== sectionId)
          : [...prev.enabledSections, sectionId],
      };
    });
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      setFormError("Name is required.");
      return;
    }

    const now = new Date().toISOString().slice(0, 10);
    if (form.id == null) {
      const nextId = plans.length ? Math.max(...plans.map((p) => p.id)) + 1 : 1;
      const newPlan = {
        ...form,
        id: nextId,
        owner: form.owner || "Admin",
        lastUpdated: now,
      };
      setPlans((prev) => [...prev, newPlan]);
    } else {
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === form.id
            ? {
                ...plan,
                ...form,
                lastUpdated: now,
              }
            : plan
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this Career Compass template?"
      );
      if (!confirmed) return;
    }
    setPlans((prev) => prev.filter((plan) => plan.id !== id));
  };

  const describeSections = (plan) => {
    const names = CAREER_SECTIONS.filter((s) =>
      plan.enabledSections?.includes(s.sectionId)
    ).map((s) => s.name);
    if (!names.length) return "No sections enabled";
    if (names.length <= 3) return names.join(", ");
    return `${names.slice(0, 3).join(", ")} +${names.length - 3} more`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
              <FaCompass size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#002147]">
                Career Compass Management
              </h1>
              <p className="text-gray-600 text-sm">
                Configure templates and sections that power the client Career
                Compass.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-72">
              <input
                type="text"
                placeholder="Search career templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <FaSearch
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
            </div>
            <button
              type="button"
              onClick={openNewModal}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <FaPlus size={12} />
              New Template
            </button>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Total Career Templates
            </p>
            <p className="text-2xl font-bold text-[#002147]">{totalCount}</p>
            <p className="text-xs text-gray-500 mt-1">
              Includes active, draft, and inactive blueprints.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Active Templates
            </p>
            <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
            <p className="text-xs text-gray-500 mt-1">
              Visible to clients in the Career Compass.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Draft / Inactive
            </p>
            <p className="text-2xl font-bold text-amber-600">
              {inactiveOrDraftCount}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Work-in-progress or archived experiences.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#002147]">
              Career Compass Templates
            </h2>
            <span className="text-xs text-gray-500">
              {filteredPlans.length} result
              {filteredPlans.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Audience</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Client Sections</th>
                  <th className="px-4 py-2">Last Updated</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-gray-500 text-sm"
                    >
                      No matching career compass templates. Try a different
                      search or create a new template.
                    </td>
                  </tr>
                ) : (
                  filteredPlans.map((plan) => (
                    <tr
                      key={plan.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        <div>{plan.name}</div>
                        {plan.audience && (
                          <div className="text-xs text-gray-500">
                            Audience: {plan.audience}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {plan.audience || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold ${
                            plan.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : plan.status === "Draft"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {plan.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        <span className="block max-w-xs truncate">
                          {describeSections(plan)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {plan.lastUpdated || "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(plan)}
                            className="p-1.5 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100"
                            title="Edit template"
                          >
                            <FaEdit size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(plan.id)}
                            className="p-1.5 rounded-md border border-red-100 text-red-600 hover:bg-red-50"
                            title="Delete template"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500 bg-gray-50">
            Changes are stored in the browser for now. Connect this page to your
            backend services to persist templates and roll them out to clients.
          </div>
        </section>

        {modalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-[#002147]">
                    {form.id == null
                      ? "New Career Compass Template"
                      : "Edit Career Compass Template"}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Define the audience, status, and which client sections are
                    enabled.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                {formError && (
                  <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Template name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Veteran Transition Career Map"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Audience
                    </label>
                    <input
                      type="text"
                      name="audience"
                      value={form.audience}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Veterans, Students"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Owner
                    </label>
                    <input
                      type="text"
                      name="owner"
                      value={form.owner}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Coaching Team"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <fieldset className="border border-gray-200 rounded-lg px-3 py-3">
                  <legend className="text-xs font-semibold text-gray-700 px-1">
                    Enabled client sections
                  </legend>
                  <p className="text-[11px] text-gray-500 mb-2">
                    These map directly to the sections in the client Career
                    Compass sidebar.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CAREER_SECTIONS.map((section) => (
                      <label
                        key={section.sectionId}
                        className="flex items-center gap-2 text-xs text-gray-700"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={form.enabledSections.includes(
                            section.sectionId
                          )}
                          onChange={() => toggleSection(section.sectionId)}
                        />
                        <span>{section.name}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-end gap-2 bg-gray-50">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

