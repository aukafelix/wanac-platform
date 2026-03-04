"use client";
import React, { useState, useCallback } from "react";
import Sidebar from '../../../../components/dashboardcomponents/sidebar';
import SectionSidebar from '../../../../components/dashboardcomponents/SectionSidebar';
import CareerCompassModal from '../../../../components/dashboardcomponents/CareerCompassModal';
import { ClipboardList, HelpCircle, Building2, Users, CheckCircle, Calendar, FolderOpen, Briefcase, FileText } from 'lucide-react';
import { FaBriefcase, FaBuilding, FaUserTie, FaChartLine, FaCheckCircle, FaClock, FaTimes, FaPlus, FaUserPlus, FaCalendarPlus } from 'react-icons/fa';
import ActivityStreamPage from './activitystream/page';
import ApplicationManagementPage from './applicationmanagement/page';
import EmployersPage from './employers/page';
import InterviewQuestionsPage from './interviewquestions/page';
import TargetEmployersPage from './targetemployers/page';
import AppliedPage from './applied/page';
import ResearchToolsPage from './researchtools/page';
import AFIAndJobPostingPage from './afiandjobposting/page';

const careerSections = [
  { name: 'Overview', sectionId: 'overview' },
  { name: 'Activity Stream', sectionId: 'activitystream' },
  { name: 'Application Management', sectionId: 'applicationmanagement' },
  { name: 'Employers', sectionId: 'employers' },
  { name: 'Application Materials', sectionId: 'applicationmaterials' },
  { name: 'Interview Questions', sectionId: 'interviewquestions' },
  { name: 'Target Employers', sectionId: 'targetemployers' },
  { name: 'Contacts', sectionId: 'contacts' },
  { name: 'Applied', sectionId: 'applied' },
  { name: 'Appointments', sectionId: 'appointments' },
  { name: 'Research Tools', sectionId: 'researchtools' },
  { name: 'AFI and Job Postings', sectionId: 'afiandjobposting' },
];

// Career Compass Overview Widget
function CareerCompassOverview() {
  // Mock career data
  const careerData = {
    applications: {
      total: 12,
      thisMonth: 5,
      pending: 8,
      rejected: 3,
      accepted: 1
    },
    interviews: {
      scheduled: 3,
      completed: 2,
      upcoming: 1
    },
    targetEmployers: 8,
    contacts: 15,
    applicationMaterials: {
      resume: true,
      coverLetter: true,
      portfolio: false,
      references: true
    },
    recentActivity: [
      { type: 'application', company: 'Tech Corp', date: '2 days ago', status: 'pending' },
      { type: 'interview', company: 'StartupXYZ', date: '1 week ago', status: 'completed' },
      { type: 'contact', name: 'John Smith', company: 'Google', date: '3 days ago' },
    ]
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-md animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-[#002147]" style={{ fontFamily: 'var(--font-heading)' }}>
          <FaBriefcase className="text-[#002147]" />
          Career Progress Overview
        </h2>
      </div>
      
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="text-center p-3 bg-[#002147]/5 rounded-lg border border-[#002147]/10">
          <div className="text-2xl font-bold text-[#002147] mb-1">{careerData.applications.total}</div>
          <div className="text-xs text-gray-600">Total Applications</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600 mb-1">{careerData.interviews.scheduled}</div>
          <div className="text-xs text-gray-600">Interviews</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600 mb-1">{careerData.targetEmployers}</div>
          <div className="text-xs text-gray-600">Target Companies</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600 mb-1">{careerData.contacts}</div>
          <div className="text-xs text-gray-600">Network Contacts</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Application Status */}
        <div>
          <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FaChartLine className="text-[#002147]" />
            Application Status
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-3 bg-gray-200 rounded-full">
                  <div className="w-20 h-3 bg-yellow-400 rounded-full"></div>
                </div>
                <span className="text-sm font-medium w-8 text-right">{careerData.applications.pending}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Accepted</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-3 bg-gray-200 rounded-full">
                  <div className="w-2 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium w-8 text-right">{careerData.applications.accepted}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Rejected</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-3 bg-gray-200 rounded-full">
                  <div className="w-6 h-3 bg-red-400 rounded-full"></div>
                </div>
                <span className="text-sm font-medium w-8 text-right">{careerData.applications.rejected}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Materials Status */}
        <div>
          <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FileText className="text-[#002147]" />
            Application Materials
          </h3>
          <div className="space-y-2">
            {Object.entries(careerData.applicationMaterials).map(([material, completed]) => (
              <div key={material} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {completed && <FaCheckCircle className="text-white text-xs" />}
                  </div>
                  <span className="text-sm text-gray-700 capitalize font-medium">{material.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {completed ? 'Complete' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

// Contacts section with add modal
const INITIAL_CONTACTS = [];
const INITIAL_CONTACT_FORM = { name: "", company: "", email: "", phone: "", notes: "" };

function ContactsSection() {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_CONTACT_FORM);
  const [formError, setFormError] = useState("");

  const handleOpen = useCallback(() => {
    setForm(INITIAL_CONTACT_FORM);
    setFormError("");
    setDialogOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
    setFormError("");
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!form.name?.trim()) {
      setFormError("Name is required.");
      return;
    }
    setContacts((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((c) => c.id)) + 1 : 1,
        name: form.name.trim(),
        company: form.company?.trim() || "—",
        email: form.email?.trim() || "—",
        phone: form.phone?.trim() || "—",
        notes: form.notes?.trim() || "",
      },
    ]);
    handleClose();
  }, [form, handleClose]);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2 className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          <Users className="text-[#002147]" />
          Contacts
        </h2>
        <p className="text-gray-600 text-sm mb-4">Manage your professional network and connections.</p>
        <div className="mb-4">
          <div className="text-center p-3 bg-[#002147]/5 rounded-lg border border-[#002147]/10 inline-block">
            <span className="text-2xl font-bold text-[#002147]">{contacts.length}</span>
            <span className="text-xs text-gray-600 ml-1">contacts</span>
          </div>
        </div>
        {contacts.length > 0 ? (
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              <div>Name</div>
              <div>Company</div>
              <div>Email</div>
              <div>Phone</div>
            </div>
            {contacts.map((c) => (
              <div key={c.id} className="grid grid-cols-4 gap-4 px-4 py-3 border-t border-gray-100 items-center">
                <div className="font-medium text-gray-900">{c.name}</div>
                <div className="text-sm text-gray-600">{c.company}</div>
                <div className="text-sm text-gray-600">{c.email}</div>
                <div className="text-sm text-gray-600">{c.phone}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm py-4">No contacts yet. Add one to get started.</p>
        )}
        <button type="button" onClick={handleOpen} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#002147] hover:underline">
          <FaPlus className="text-xs" /> Add contact
        </button>
      </div>
      <CareerCompassModal open={dialogOpen} onClose={handleClose} title="Add Contact" icon={<FaUserPlus size={14} />} onSubmit={handleSubmit} submitLabel="Add Contact">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
            <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Optional" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Optional" rows={2} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none resize-none" />
        </div>
        {formError && <p className="text-red-600 text-xs flex items-center gap-1">⚠ {formError}</p>}
      </CareerCompassModal>
    </div>
  );
}

// Appointments section with add modal
const INITIAL_APPOINTMENTS = [];
const APPOINTMENT_TYPES = ["Interview", "Call", "Meeting", "Other"];
const INITIAL_APPOINTMENT_FORM = { title: "", date: "", time: "", type: "Meeting", notes: "" };

function AppointmentsSection() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(() => ({
    ...INITIAL_APPOINTMENT_FORM,
    date: new Date().toISOString().slice(0, 10),
    time: "09:00",
  }));
  const [formError, setFormError] = useState("");

  const handleOpen = useCallback(() => {
    setForm({
      ...INITIAL_APPOINTMENT_FORM,
      date: new Date().toISOString().slice(0, 10),
      time: "09:00",
    });
    setFormError("");
    setDialogOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
    setFormError("");
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!form.title?.trim()) {
      setFormError("Title is required.");
      return;
    }
    const dateStr = form.date ? new Date(form.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
    setAppointments((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((a) => a.id)) + 1 : 1,
        title: form.title.trim(),
        date: dateStr,
        time: form.time || "—",
        type: form.type,
        notes: form.notes?.trim() || "",
      },
    ]);
    handleClose();
  }, [form, handleClose]);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-md animate-fadeIn">
        <h2 className="text-xl font-bold flex items-center gap-2 text-[#002147] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          <Calendar className="text-[#002147]" />
          Appointments
        </h2>
        <p className="text-gray-600 text-sm mb-4">Schedule and track your career-related appointments.</p>
        <div className="mb-4">
          <div className="text-center p-3 bg-[#002147]/5 rounded-lg border border-[#002147]/10 inline-block">
            <span className="text-2xl font-bold text-[#002147]">{appointments.length}</span>
            <span className="text-xs text-gray-600 ml-1">appointments</span>
          </div>
        </div>
        {appointments.length > 0 ? (
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              <div>Title</div>
              <div>Date</div>
              <div>Time</div>
              <div>Type</div>
            </div>
            {appointments.map((a) => (
              <div key={a.id} className="grid grid-cols-4 gap-4 px-4 py-3 border-t border-gray-100 items-center">
                <div className="font-medium text-gray-900">{a.title}</div>
                <div className="text-sm text-gray-600">{a.date}</div>
                <div className="text-sm text-gray-600">{a.time}</div>
                <div className="text-sm text-gray-600">{a.type}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm py-4">No appointments yet. Add one to get started.</p>
        )}
        <button type="button" onClick={handleOpen} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#002147] hover:underline">
          <FaPlus className="text-xs" /> Add appointment
        </button>
      </div>
      <CareerCompassModal open={dialogOpen} onClose={handleClose} title="Add Appointment" icon={<FaCalendarPlus size={14} />} onSubmit={handleSubmit} submitLabel="Add Appointment">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Interview with Tech Corp" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none">
            {APPOINTMENT_TYPES.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Optional" rows={2} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none resize-none" />
        </div>
        {formError && <p className="text-red-600 text-xs flex items-center gap-1">⚠ {formError}</p>}
      </CareerCompassModal>
    </div>
  );
}

// Renders the main content for a selected section (no navigation; same page).
function SectionContent({ sectionId }) {
  switch (sectionId) {
    case 'activitystream':
      return <ActivityStreamPage />;
    case 'applicationmanagement':
    case 'applicationmaterials':
      return <ApplicationManagementPage />;
    case 'employers':
      return <EmployersPage />;
    case 'interviewquestions':
      return <InterviewQuestionsPage />;
    case 'targetemployers':
      return <TargetEmployersPage />;
    case 'applied':
      return <AppliedPage />;
    case 'researchtools':
      return <ResearchToolsPage />;
    case 'afiandjobposting':
      return <AFIAndJobPostingPage />;
    case 'contacts':
      return <ContactsSection />;
    case 'appointments':
      return <AppointmentsSection />;
    default:
      return null;
  }
}

export default function MyCareerCompassPage() {
  const [selectedSection, setSelectedSection] = useState('overview');

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Main Sidebar */}
      <Sidebar />
      {/* Section Sidebar for Career Management */}
      <SectionSidebar
        title="Career Management"
        items={careerSections}
        collapsedDefault={true}
        onSectionSelect={setSelectedSection}
        activeSectionId={selectedSection}
      />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-4 bg-gray-50">
          <div className="max-w-6xl mx-auto h-full">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold mb-2 text-[#002147]" style={{ fontFamily: 'var(--font-heading)' }}>
                My Career Compass
              </h1>
              <p className="text-gray-600">Track your career progress and manage your job search journey</p>
            </div>

            {selectedSection === 'overview' ? (
              <>
                {/* Career Compass Overview Widget */}
                <div className="mb-4">
                  <CareerCompassOverview />
                </div>
                
                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-[#002147]/10 rounded-lg flex items-center justify-center">
                        <ClipboardList className="w-4 h-4 text-[#002147]" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">Application Management</h3>
                    </div>
                    <p className="text-gray-600 text-xs mb-3">Track and manage all your job applications in one place</p>
                    <button type="button" onClick={() => setSelectedSection('applicationmanagement')} className="text-[#002147] hover:underline text-xs font-medium">
                      Manage Applications →
                    </button>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-orange-600" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">Target Employers</h3>
                    </div>
                    <p className="text-gray-600 text-xs mb-3">Research and track companies you want to work for</p>
                    <button type="button" onClick={() => setSelectedSection('targetemployers')} className="text-orange-600 hover:underline text-xs font-medium">
                      View Employers →
                    </button>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">Network Contacts</h3>
                    </div>
                    <p className="text-gray-600 text-xs mb-3">Manage your professional network and connections</p>
                    <button type="button" onClick={() => setSelectedSection('contacts')} className="text-green-600 hover:underline text-xs font-medium">
                      View Contacts →
                    </button>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">Application Materials</h3>
                    </div>
                    <p className="text-gray-600 text-xs mb-3">Organize your resume, cover letters, and portfolios</p>
                    <button type="button" onClick={() => setSelectedSection('applicationmaterials')} className="text-blue-600 hover:underline text-xs font-medium">
                      Manage Materials →
                    </button>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-purple-600" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">Interview Questions</h3>
                    </div>
                    <p className="text-gray-600 text-xs mb-3">Practice and prepare for common interview questions</p>
                    <button type="button" onClick={() => setSelectedSection('interviewquestions')} className="text-purple-600 hover:underline text-xs font-medium">
                      Practice Questions →
                    </button>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-yellow-600" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">Appointments</h3>
                    </div>
                    <p className="text-gray-600 text-xs mb-3">Schedule and track your career-related appointments</p>
                    <button type="button" onClick={() => setSelectedSection('appointments')} className="text-yellow-600 hover:underline text-xs font-medium">
                      View Appointments →
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <SectionContent sectionId={selectedSection} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
