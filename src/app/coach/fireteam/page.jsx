"use client";

import React, { useState, useEffect } from "react";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';

// Initial mock data for classes and experiences
const initialClasses = [
  {
    id: 1,
    name: "Entrepreneurship 101",
    sectionName: "Section A",
    experiences: [
      {
        id: 1,
        title: "Customer Discovery",
        subtitle: "Practical Market Research for Startups",
        agenda: [
          { title: "Waiting Room", duration: "1 min" },
          { title: "Learning Objectives", duration: "2 mins" },
          { title: "Intro Video", duration: "2 mins" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Leadership Essentials",
    sectionName: "Section B",
    experiences: [
      {
        id: 1,
        title: "Team Building",
        subtitle: "Effective Collaboration Techniques",
        agenda: [
          { title: "Icebreaker", duration: "3 mins" },
          { title: "Group Activity", duration: "10 mins" },
        ],
      },
    ],
  },
];

export default function FireteamCoachPage() {
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState(initialClasses);
  const [selectedClassId, setSelectedClassId] = useState(initialClasses[0]?.id || null);
  const [newClass, setNewClass] = useState({ name: "", sectionName: "" });
  const [newExperience, setNewExperience] = useState({
    title: "",
    subtitle: "",
    agenda: [{ title: "", duration: "" }],
  });
  const [showClassModal, setShowClassModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser({ name: "Coach" });
      }
    } else {
      setUser({ name: "Coach" });
    }
  }, []);

  // Handle input changes for new class
  const handleClassInputChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };

  // Add new class
  const handleAddClass = (e) => {
    e.preventDefault();
    if (!newClass.name.trim() || !newClass.sectionName.trim()) return;
    const newId = Date.now();
    setClasses([
      ...classes,
      {
        id: newId,
        name: newClass.name,
        sectionName: newClass.sectionName,
        experiences: [],
      },
    ]);
    setNewClass({ name: "", sectionName: "" });
    setSelectedClassId(newId);
    setShowClassModal(false); // Close modal
  };

  // Handle input changes for new experience
  const handleExperienceInputChange = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
  };

  // Handle agenda step changes
  const handleAgendaChange = (idx, field, value) => {
    const updatedAgenda = newExperience.agenda.map((step, i) =>
      i === idx ? { ...step, [field]: value } : step
    );
    setNewExperience({ ...newExperience, agenda: updatedAgenda });
  };

  // Add a new agenda step
  const addAgendaStep = () => {
    setNewExperience({
      ...newExperience,
      agenda: [...newExperience.agenda, { title: "", duration: "" }],
    });
  };

  // Remove an agenda step
  const removeAgendaStep = (idx) => {
    setNewExperience({
      ...newExperience,
      agenda: newExperience.agenda.filter((_, i) => i !== idx),
    });
  };

  // Add new experience to the selected class
  const handleAddExperience = (e) => {
    e.preventDefault();
    if (!newExperience.title.trim()) return;
    setClasses(classes.map(cls => {
      if (cls.id === selectedClassId) {
        return {
          ...cls,
          experiences: [
            ...cls.experiences,
            {
              ...newExperience,
              id: Date.now(),
              agenda: newExperience.agenda.filter((step) => step.title.trim()),
            },
          ],
        };
      }
      return cls;
    }));
    setNewExperience({ title: "", subtitle: "", agenda: [{ title: "", duration: "" }] });
    setShowExperienceModal(false); // Close modal
  };

  // Get selected class object
  const selectedClass = classes.find(cls => cls.id === selectedClassId);

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <CoachSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user || { name: "Coach" }} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Breakout Room Coach Panel</h1>
            {/* Add Class Button and Modal */}
            <div className="mb-8">
              <button
                onClick={() => setShowClassModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                + Add Class
              </button>
              {showClassModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
                      onClick={() => setShowClassModal(false)}
                      aria-label="Close"
                    >
                      &times;
                    </button>
                    <h2 className="text-lg font-semibold mb-4">Add New Class</h2>
                    <form onSubmit={handleAddClass} className="flex flex-col gap-4">
                      <div>
                        <label className="block text-sm font-medium">Class Name</label>
                        <input
                          type="text"
                          name="name"
                          value={newClass.name}
                          onChange={handleClassInputChange}
                          className="w-full px-3 py-2 border rounded-lg mt-1"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Section Name</label>
                        <input
                          type="text"
                          name="sectionName"
                          value={newClass.sectionName}
                          onChange={handleClassInputChange}
                          className="w-full px-3 py-2 border rounded-lg mt-1"
                          required
                        />
                      </div>
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">Add Class</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
            {/* Class List */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Classes</h2>
              <div className="flex flex-wrap gap-3">
                {classes.length === 0 ? (
                  <div className="text-gray-400">No classes yet.</div>
                ) : (
                  classes.map(cls => (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClassId(cls.id)}
                      className={`px-4 py-2 rounded-lg border font-semibold transition-colors ${selectedClassId === cls.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
                    >
                      {cls.name} <span className="text-xs text-gray-300">|</span> {cls.sectionName}
                    </button>
                  ))
                )}
              </div>
            </div>
            {/* Experience Panel for Selected Class */}
            {selectedClass && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Experiences for {selectedClass.name} ({selectedClass.sectionName})</h2>
                {/* Experience List */}
                {selectedClass.experiences.length === 0 ? (
                  <div className="text-gray-400 mb-8">No experiences yet for this class.</div>
                ) : (
                  <ul className="divide-y mb-8">
                    {selectedClass.experiences.map((exp) => (
                      <li key={exp.id} className="py-4">
                        <div className="font-bold text-lg">{exp.title}</div>
                      </li>
                    ))}
                  </ul>
                )}
                {/* Add Experience Button and Modal */}
                <div className="mb-8">
                  <button
                    onClick={() => setShowExperienceModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                  >
                    + Add Experience
                  </button>
                  {showExperienceModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <button
                          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
                          onClick={() => setShowExperienceModal(false)}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Add New Experience</h2>
                        <form onSubmit={handleAddExperience} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium">Title</label>
                            <input
                              type="text"
                              name="title"
                              value={newExperience.title}
                              onChange={handleExperienceInputChange}
                              className="w-full px-3 py-2 border rounded-lg mt-1"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Subtitle</label>
                            <input
                              type="text"
                              name="subtitle"
                              value={newExperience.subtitle}
                              onChange={handleExperienceInputChange}
                              className="w-full px-3 py-2 border rounded-lg mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Agenda Steps</label>
                            {newExperience.agenda.map((step, idx) => (
                              <div key={idx} className="flex gap-2 mb-2">
                                <input
                                  type="text"
                                  placeholder="Step Title"
                                  value={step.title}
                                  onChange={e => handleAgendaChange(idx, "title", e.target.value)}
                                  className="flex-1 px-2 py-1 border rounded"
                                  required
                                />
                                <input
                                  type="text"
                                  placeholder="Duration (e.g. 5 mins)"
                                  value={step.duration}
                                  onChange={e => handleAgendaChange(idx, "duration", e.target.value)}
                                  className="w-32 px-2 py-1 border rounded"
                                />
                                {newExperience.agenda.length > 1 && (
                                  <button type="button" onClick={() => removeAgendaStep(idx)} className="text-red-500 px-2">&times;</button>
                                )}
                              </div>
                            ))}
                            <button type="button" onClick={addAgendaStep} className="text-blue-600 text-sm mt-1">+ Add Step</button>
                          </div>
                          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">Add Experience</button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
