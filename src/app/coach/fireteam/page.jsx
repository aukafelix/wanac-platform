"use client";

import React, { useState, useEffect } from "react";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import ClassCard from "../../../../components/ClassCard";
import ExperienceCard from "../../../../components/ExperienceCard";
import AddClassModal from "../../../../components/AddClassModal";
import AddExperienceModal from "../../../../components/AddExperienceModal";

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
            <h1 className="text-3xl font-bold mb-6">Fireteam Room Coach Panel</h1>
            {/* Add Class Button and Modal */}
            <div className="mb-8">
              <button
                onClick={() => setShowClassModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                + Add Class
              </button>
              <AddClassModal
                open={showClassModal}
                onClose={() => setShowClassModal(false)}
                onSubmit={handleAddClass}
                form={newClass}
                onChange={handleClassInputChange}
              />
            </div>
            {/* Class List */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Classes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classes.length === 0 ? (
                  <div className="text-gray-400">No classes yet.</div>
                ) : (
                  classes.map(cls => (
                    <ClassCard
                      key={cls.id}
                      cls={cls}
                      isSelected={selectedClassId === cls.id}
                      onSelect={() => setSelectedClassId(cls.id)}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      onAddExperience={() => {
                        setSelectedClassId(cls.id);
                        setShowExperienceModal(true);
                      }}
                    />
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
                  <div className="mb-8">
                    {selectedClass.experiences.map((exp) => (
                      <ExperienceCard
                        key={exp.id}
                        exp={exp}
                        onEdit={() => {}}
                        onDelete={() => {}}
                      />
                    ))}
                  </div>
                )}
                {/* Add Experience Modal */}
                <AddExperienceModal
                  open={showExperienceModal}
                  onClose={() => setShowExperienceModal(false)}
                  onSubmit={handleAddExperience}
                  form={newExperience}
                  onChange={handleExperienceInputChange}
                  agenda={newExperience.agenda}
                  onAgendaChange={handleAgendaChange}
                  onAddAgendaStep={addAgendaStep}
                  onRemoveAgendaStep={removeAgendaStep}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
