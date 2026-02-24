"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "../../../../../components/dashboardcomponents/adminsidebar";
import {
  Box,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  PersonAdd,
  PersonRemove,
  VideoCall,
} from "@mui/icons-material";
import { fireteamService } from "../../../../services/api/fireteam.service";
import { experienceService } from "../../../../services/api/experience.service";
import { clientsService } from "../../../../services/api/clients.service";
import { generateFireteamMeetingLink } from "../../../../lib/jitsi.utils";
import ExperienceVideoModal from "../../../../../components/ExperienceVideoModal";
import EditExperienceModal from "../../../../../components/EditExperienceModal";

export default function FireteamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [fireteam, setFireteam] = useState(null);
  const [cohort, setCohort] = useState(null);
  const [members, setMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showRemoveMember, setShowRemoveMember] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [showVideoMeeting, setShowVideoMeeting] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedMemberToRemove, setSelectedMemberToRemove] = useState("");
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    cohort_id: "",
  });
  const [experienceData, setExperienceData] = useState({
    title: "",
    experience: "",
  });
  const [showEditExperience, setShowEditExperience] = useState(false);
  const [selectedExperienceToEdit, setSelectedExperienceToEdit] = useState(null);
  const [editExperienceData, setEditExperienceData] = useState({
    title: '',
    experience: '',
    agenda: [],
    exhibits: [],
    videoAdminId: '',
    meetingLink: '',
    link: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (id) {
      fetchFireteamDetails();
    }
  }, [id]);

  const fetchFireteamDetails = async () => {
    setLoading(true);
    try {
      const fireteamData = await fireteamService.getFireteam(id);
      const fireTeam = fireteamData.fireTeam;
      console.log("Fireteam data:", fireteamData.fireTeam);
      setFireteam(fireTeam);
      setMembers(Array.isArray(fireTeam.members) ? fireTeam.members : []);
      setExperiences(Array.isArray(fireTeam.experiences) ? fireTeam.experiences : []);
      setCohort(fireTeam.cohort);
      setEditData({
        title: fireTeam.title || "",
        description: fireTeam.description || "",
        date: fireTeam.date || "",
        time: fireTeam.time || "",
        cohort_id: fireTeam.cohort_id || "",
      });

      try {
        const clientsResponse = await clientsService.getClients();
        const clientsArray = Array.isArray(clientsResponse?.clients) ? clientsResponse.clients : [];
        const mappedClients = clientsArray.map(client => ({
          id: client.id,
          name: client.user?.name || 'Unknown',
          email: client.user?.email || ''
        }));
        setClients(mappedClients);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setClients([]);
      }
    } catch (err) {
      console.error("Error fetching fireteam:", err);
      setError("Failed to load fireteam details");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setShowEdit(true);
  };

  const handleSaveEdit = async () => {
    try {
      await fireteamService.updateFireteam(id, editData);
      setSuccess("Fireteam updated successfully!");
      setShowEdit(false);
      fetchFireteamDetails();
    } catch (err) {
      setError("Failed to update fireteam");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this fireteam?")) {
      try {
        await fireteamService.deleteFireteam(id);
        setSuccess("Fireteam deleted successfully!");
        router.push("/admin/fireteammanagement");
      } catch (err) {
        setError("Failed to delete fireteam");
      }
    }
  };

  const handleAddMember = async () => {
    if (!selectedClient) return;
    try {
      const result = await fireteamService.addFireteamMember({
        client_id: selectedClient,
        fire_team_id: id,
      });
      setSuccess("Member added successfully!");
      setShowAddMember(false);
      setSelectedClient("");
      fetchFireteamDetails();
    } catch (err) {
      console.error("Error adding member:", err);
      setError("Failed to add member");
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (window.confirm("Are you sure you want to remove this member from the fireteam?")) {
      try {
        await fireteamService.deleteFireteamMember(memberId);
        setSuccess("Member removed successfully!");
        fetchFireteamDetails();
      } catch (err) {
        setError("Failed to remove member");
      }
    }
  };

  const handleRemoveMemberFromDialog = async () => {
    if (!selectedMemberToRemove) return;
    try {
      await fireteamService.deleteFireteamMember(selectedMemberToRemove);
      setSuccess("Member removed successfully!");
      setShowRemoveMember(false);
      setSelectedMemberToRemove("");
      fetchFireteamDetails();
    } catch (err) {
      setError("Failed to remove member");
    }
  };

  const handleAddExperience = () => {
    setExperienceData({ title: "", experience: "" });
    setShowAddExperience(true);
  };

  const handleSaveExperience = async () => {
    try {
      const created = await experienceService.addExperience({
        fire_team_id: id,
        ...experienceData,
      });
      const newExperience = {
        id: created?.id ?? created?.fire_team_experience_id,
        title: created?.title ?? experienceData.title,
        experience: created?.experience ?? experienceData.experience,
        agenda: created?.agenda ?? [],
        exhibits: created?.exhibits ?? [],
      };
      setExperiences((prev) => [...prev, newExperience]);
      setSuccess("Experience added successfully!");
      setShowAddExperience(false);
      setExperienceData({ title: "", experience: "" });
    } catch (err) {
      setError("Failed to add experience");
    }
  };

  const handleDeleteExperience = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await experienceService.deleteExperience(id);
        setSuccess("Experience deleted successfully!");
        fetchFireteamDetails();
      } catch (err) {
        setError("Failed to delete experience");
      }
    }
  };

  const handleStartExperience = async (id) => {
    try {
      const experience = experiences.find(exp => exp.id === id);
      if (!experience) {
        setError("Experience not found");
        return;
      }
      await experienceService.startExperience(id);
      setSelectedExperience(experience);
      setShowVideoMeeting(true);
      setSuccess("Experience started successfully!");
    } catch (err) {
      setError("Failed to start experience");
    }
  };

  const handleCloseVideoMeeting = () => {
    setShowVideoMeeting(false);
    setSelectedExperience(null);
    if (selectedExperience) {
      experienceService.endExperience(selectedExperience.id).catch(console.error);
    }
  };

  // Add agenda step — local only, no API call until individual Submit
  const handleAddAgendaStep = async () => {
    if (!selectedExperienceToEdit) return;
    const tempStep = {
      _tempId: Date.now(),
      title: '',
      duration: '',
    };
    setEditExperienceData((prev) => ({
      ...prev,
      agenda: [...prev.agenda, tempStep],
    }));
    return tempStep;
  };

  // Submit a single agenda step to the backend, then replace the local temp with the real record
  const handleSubmitAgendaStep = async (idx) => {
    const step = editExperienceData.agenda[idx];
    if (!step || !selectedExperienceToEdit) return;
    if (step.id) return; // already persisted

    if (!step.title?.trim() && !step.duration?.trim()) {
      setError("Please fill in the step title or duration before submitting.");
      return;
    }

    try {
      const newStep = await experienceService.addAgendaStep({
        fire_team_experience_id: selectedExperienceToEdit.id,
        title: step.title || '',
        duration: step.duration || '',
      });

      const safeStep = {
        ...newStep,
        title: typeof newStep.title === 'string' ? newStep.title : '',
        duration: typeof newStep.duration === 'string' ? newStep.duration : '',
      };

      // Replace the temp item at this index with the persisted one
      setEditExperienceData((prev) => ({
        ...prev,
        agenda: prev.agenda.map((item, i) => (i === idx ? safeStep : item)),
      }));

      setSuccess("Agenda step saved!");
      return safeStep;
    } catch (err) {
      console.error("Error submitting agenda step:", err);
      setError("Failed to save agenda step");
    }
  };

  // Add exhibit — local only, no API call until individual Submit
  const handleAddExhibit = async () => {
    if (!selectedExperienceToEdit) return;
    const tempExhibit = {
      _tempId: Date.now(),
      name: '',
      type: 'link',
      link: '',
      file: null,
    };
    setEditExperienceData((prev) => ({
      ...prev,
      exhibits: [...prev.exhibits, tempExhibit],
    }));
  };

  // Submit a single exhibit to the backend, then replace the local temp with the real record
  const handleSubmitExhibit = async (idx) => {
    const exhibit = editExperienceData.exhibits[idx];
    if (!exhibit || !selectedExperienceToEdit) return;
    if (exhibit.id) return; // already persisted

    if (!exhibit.name?.trim()) {
      setError("Please fill in the exhibit name before submitting.");
      return;
    }

    try {
      const newExhibit = await experienceService.addExhibit({
        fire_team_experience_id: selectedExperienceToEdit.id,
        name: exhibit.name,
        type: exhibit.type,
        link: exhibit.type === 'link' ? exhibit.link : undefined,
      });

      // Replace the temp item at this index with the persisted one
      setEditExperienceData((prev) => ({
        ...prev,
        exhibits: prev.exhibits.map((item, i) => (i === idx ? { ...newExhibit, file: null } : item)),
      }));

      setSuccess("Exhibit saved!");
      return newExhibit;
    } catch (err) {
      console.error("Error submitting exhibit:", err);
      setError("Failed to save exhibit");
    }
  };

  const handleDeleteExhibit = async (exhibitId, idx) => {
    if (!selectedExperienceToEdit) return;
    try {
      if (exhibitId) {
        await experienceService.deleteExhibit(exhibitId);
      }
      setEditExperienceData(prev => ({
        ...prev,
        exhibits: prev.exhibits.filter((_, i) => i !== idx),
      }));
    } catch (err) {
      setError('Failed to delete exhibit');
    }
  };

  const clearValidationErrors = () => setValidationErrors({});

  const handleSaveEditExperience = async () => {
    if (!selectedExperienceToEdit) return;
    try {
      // 1. Update the experience title & content
      await experienceService.updateExperience(selectedExperienceToEdit.id, {
        title: editExperienceData.title,
        experience: editExperienceData.experience,
      });

      // 2. Handle agenda steps — create any that are still local-only (no `id`)
      for (const step of editExperienceData.agenda) {
        if (!step.id) {
          if (step.title?.trim() || step.duration?.trim()) {
            await experienceService.addAgendaStep({
              fire_team_experience_id: selectedExperienceToEdit.id,
              title: step.title || '',
              duration: step.duration || '',
            });
          }
        }
      }

      // 3. Handle exhibits
      const currentExhibitIds = selectedExperienceToEdit.exhibits?.map(ex => ex.id).filter(Boolean) || [];
      const existingExhibits = editExperienceData.exhibits.filter(ex => ex.id);
      const newExhibits = editExperienceData.exhibits.filter(ex => !ex.id);

      for (const exhibitId of currentExhibitIds) {
        if (!existingExhibits.find(ex => ex.id === exhibitId)) {
          await experienceService.deleteExhibit(exhibitId);
        }
      }

      for (const exhibit of newExhibits) {
        if (exhibit.name?.trim()) {
          await experienceService.addExhibit({
            fire_team_experience_id: selectedExperienceToEdit.id,
            name: exhibit.name,
            type: exhibit.type,
            link: exhibit.type === 'link' ? exhibit.link : undefined,
          });
        }
      }

      // 4. Refresh from server
      const allExperiences = await experienceService.getExperiences(fireteam.id);
      const updatedExperience = allExperiences.find(exp => exp.id === selectedExperienceToEdit.id);
      setExperiences(prev => prev.map(e => (e.id === selectedExperienceToEdit.id ? updatedExperience : e)));
      setShowEditExperience(false);
      setSelectedExperienceToEdit(null);
      setSuccess('Experience updated successfully!');
    } catch (err) {
      console.error('Error updating experience:', err);
      setError('Failed to update experience');
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex bg-gray-50 font-serif">
        <AdminSidebar />
        <div className="flex-1 flex flex-col h-full transition-all duration-300">
          <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center py-12 text-gray-500">Loading fireteam details...</div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!fireteam) {
    return (
      <div className="h-screen flex bg-gray-50 font-serif">
        <AdminSidebar />
        <div className="flex-1 flex flex-col h-full transition-all duration-300">
          <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center py-12 text-red-500">Fireteam not found</div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 font-serif overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full transition-all duration-300">
        <main className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 bg-gray-50">
          <div className="max-w-[1600px] mx-auto space-y-4">
            <button
              type="button"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition text-sm shrink-0"
              onClick={() => router.push("/admin/fireteammanagement")}
            >
              ← Back to Fireteam Management
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm"
                    onClick={() => setShowAddMember(true)}
                  >
                    <PersonAdd sx={{ fontSize: 18 }} /> Add Member
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2 text-sm"
                    onClick={() => setShowRemoveMember(true)}
                  >
                    <PersonRemove sx={{ fontSize: 18 }} /> Remove Member
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
                  <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-amber-700">{members.length}</p>
                    <p className="text-xs text-amber-800/80">Members</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-700">{experiences.length}</p>
                    <p className="text-xs text-blue-800/80">Experiences</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 overflow-hidden flex flex-col">
                <h2 className="text-base font-semibold text-[#002147] mb-3">Fireteam Information</h2>
                <dl className="space-y-2 text-sm flex-1 min-h-0">
                  <div>
                    <dt className="text-gray-500 font-medium">Title</dt>
                    <dd className="text-gray-900 mt-0.5">{fireteam.title}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 font-medium">Description</dt>
                    <dd className="text-gray-900 mt-0.5 line-clamp-3">{fireteam.description || '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 font-medium">Cohort</dt>
                    <dd className="text-gray-900 mt-0.5">{cohort ? (cohort.name || cohort.title || `Cohort ${cohort.id}`) : `Cohort ${fireteam.cohort_id}`}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 font-medium">Date & Time</dt>
                    <dd className="text-gray-900 mt-0.5">{fireteam.date} {fireteam.time && `at ${fireteam.time}`}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 font-medium">Created</dt>
                    <dd className="text-gray-900 mt-0.5">{fireteam.created_at ? new Date(fireteam.created_at).toLocaleDateString() : 'N/A'}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                  <h2 className="text-base font-semibold text-[#002147]">Fireteam Members</h2>
                  <span className="text-sm text-gray-500">{members.length} total</span>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto max-h-[280px]">
                  {members.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 text-sm">No members yet</div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between gap-2 px-4 py-3 hover:bg-gray-50 transition">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">{member.client?.user?.name ?? member.name ?? '—'}</p>
                            <p className="text-xs text-gray-500 truncate">{member.client?.user?.email ?? member.email ?? '—'}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 shrink-0">{member.role || 'Member'}</span>
                          <button
                            type="button"
                            className="p-1.5 rounded hover:bg-red-100 text-red-600 shrink-0"
                            title="Remove Member"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <PersonRemove sx={{ fontSize: 18 }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                  <h2 className="text-base font-semibold text-[#002147]">Fireteam Experiences</h2>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-xs flex items-center gap-1"
                    onClick={handleAddExperience}
                  >
                    <Add sx={{ fontSize: 14 }} /> Add
                  </button>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto max-h-[280px]">
                  {experiences.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-gray-500 text-sm mb-3">No experiences yet</p>
                      <button
                        type="button"
                        className="px-3 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition text-sm flex items-center gap-2 mx-auto"
                        onClick={handleAddExperience}
                      >
                        <Add sx={{ fontSize: 16 }} /> Create First Experience
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {experiences.map((experience) => (
                        <div
                          key={experience.id}
                          className="flex flex-col gap-2 px-4 py-3 hover:bg-gray-50 transition cursor-pointer group"
                          onClick={async (e) => {
                            if (e.target.closest('.experience-action-btn')) return;
                            // Fetch full experience details (including agenda & exhibits) from the API
                            try {
                              const allExperiences = await experienceService.getExperiences(fireteam.id);
                              const fullExperience = Array.isArray(allExperiences)
                                ? allExperiences.find(exp => exp.id === experience.id)
                                : null;
                              const exp = fullExperience || experience;
                              setSelectedExperienceToEdit(exp);
                              setEditExperienceData({
                                title: exp.title || '',
                                experience: exp.experience || '',
                                agenda: exp.agenda && Array.isArray(exp.agenda) && exp.agenda.length > 0
                                  ? exp.agenda.map(step => ({
                                      ...step,
                                      title: typeof step.title === 'string' ? step.title : '',
                                      duration: typeof step.duration === 'string' ? step.duration : '',
                                    }))
                                  : [],
                                exhibits: exp.exhibits && Array.isArray(exp.exhibits) && exp.exhibits.length > 0
                                  ? exp.exhibits.map(ex => ({ ...ex, file: null }))
                                  : [],
                                videoAdminId: exp.videoAdminId || '',
                                meetingLink: exp.meetingLink || '',
                                link: exp.meetingLink || exp.link || '',
                              });
                              setShowEditExperience(true);
                            } catch (err) {
                              console.error("Error fetching experience details:", err);
                              // Fall back to the data we already have
                              setSelectedExperienceToEdit(experience);
                              setEditExperienceData({
                                title: experience.title || '',
                                experience: experience.experience || '',
                                agenda: experience.agenda && Array.isArray(experience.agenda) && experience.agenda.length > 0
                                  ? experience.agenda.map(step => ({
                                      ...step,
                                      title: typeof step.title === 'string' ? step.title : '',
                                      duration: typeof step.duration === 'string' ? step.duration : '',
                                    }))
                                  : [],
                                exhibits: experience.exhibits && Array.isArray(experience.exhibits) && experience.exhibits.length > 0
                                  ? experience.exhibits.map(ex => ({ ...ex, file: null }))
                                  : [],
                                videoAdminId: experience.videoAdminId || '',
                                meetingLink: experience.meetingLink || '',
                                link: experience.meetingLink || experience.link || '',
                              });
                              setShowEditExperience(true);
                            }
                          }
                        }
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-gray-900 line-clamp-1 flex-1">{experience.title}</p>
                            <span className="inline-flex gap-1 experience-action-btn shrink-0">
                              <button
                                type="button"
                                className="p-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs flex items-center gap-1"
                                onClick={e => { e.stopPropagation(); handleStartExperience(experience.id); }}
                              >
                                <VideoCall sx={{ fontSize: 14 }} /> Join
                              </button>
                              <button
                                type="button"
                                className="p-1.5 rounded hover:bg-red-100 text-red-600"
                                onClick={e => { e.stopPropagation(); handleDeleteExperience(experience.id); }}
                              >
                                Delete
                              </button>
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2">{experience.experience}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEdit} onClose={() => setShowEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Fireteam</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Title" value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})} fullWidth />
            <TextField label="Description" value={editData.description} onChange={(e) => setEditData({...editData, description: e.target.value})} fullWidth multiline rows={3} />
            <TextField label="Date" type="date" value={editData.date} onChange={(e) => setEditData({...editData, date: e.target.value})} InputLabelProps={{ shrink: true }} fullWidth />
            <TextField label="Time" type="time" value={editData.time} onChange={(e) => setEditData({...editData, time: e.target.value})} InputLabelProps={{ shrink: true }} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={showAddMember} onClose={() => setShowAddMember(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Member to Fireteam</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Select Client</InputLabel>
              <Select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} label="Select Client">
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>{client.name} ({client.email})</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddMember(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddMember}>Add Member</Button>
        </DialogActions>
      </Dialog>

      {/* Remove Member Dialog */}
      <Dialog open={showRemoveMember} onClose={() => setShowRemoveMember(false)} fullWidth maxWidth="sm">
        <DialogTitle>Remove Member from Fireteam</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Select Member to Remove</InputLabel>
              <Select value={selectedMemberToRemove} onChange={(e) => setSelectedMemberToRemove(e.target.value)} label="Select Member to Remove">
                {members.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.client?.user?.name ?? member.name ?? 'Unknown'} ({member.client?.user?.email ?? member.email ?? '—'})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRemoveMember(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleRemoveMemberFromDialog} disabled={!selectedMemberToRemove}>Remove Member</Button>
        </DialogActions>
      </Dialog>

      {/* Add Experience Dialog */}
      <Dialog open={showAddExperience} onClose={() => setShowAddExperience(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Experience</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField label="Experience Title" value={experienceData.title} onChange={(e) => setExperienceData({...experienceData, title: e.target.value})} fullWidth required placeholder="e.g., Leadership in Crisis Management" helperText="Enter a descriptive title for this experience" />
            <TextField label="Experience Content" value={experienceData.experience} onChange={(e) => setExperienceData({...experienceData, experience: e.target.value})} fullWidth multiline rows={4} required placeholder="Describe the experience content, learning objectives, and what participants will gain..." helperText="Provide the detailed content and description of the experience" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddExperience(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveExperience} disabled={!experienceData.title.trim() || !experienceData.experience.trim()}>Create Experience</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Experience Modal */}
      <EditExperienceModal
        open={showEditExperience}
        onClose={() => {
          setShowEditExperience(false);
          setSelectedExperienceToEdit(null);
        }}
        editExperienceData={editExperienceData}
        setEditExperienceData={setEditExperienceData}
        validationErrors={validationErrors}
        clearValidationErrors={clearValidationErrors}
        handleAddAgendaStep={handleAddAgendaStep}
        handleSubmitAgendaStep={handleSubmitAgendaStep}
        handleAddExhibit={handleAddExhibit}
        handleSubmitExhibit={handleSubmitExhibit}
        handleSave={handleSaveEditExperience}
        setError={setError}
        error={error}
        members={members}
        selectedExperienceToEdit={selectedExperienceToEdit}
        generateFireteamMeetingLink={generateFireteamMeetingLink}
        id={id}
        fireteam={fireteam}
        experienceService={experienceService}
      />

      {/* Video Meeting Modal */}
      {showVideoMeeting && selectedExperience && (
        <ExperienceVideoModal
          onClose={handleCloseVideoMeeting}
          experience={selectedExperience}
          fireteam={fireteam}
        />
      )}

      {/* Success/Error Snackbars */}
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess("")}>
        <Alert onClose={() => setSuccess("")} severity="success" sx={{ width: '100%' }}>{success}</Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError("")}>
        <Alert onClose={() => setError("")} severity="error" sx={{ width: '100%' }}>{error}</Alert>
      </Snackbar>
    </div>
  );
}