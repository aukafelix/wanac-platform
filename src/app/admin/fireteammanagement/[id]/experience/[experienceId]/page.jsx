"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "../../../../../../../components/dashboardcomponents/adminsidebar";
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Clock,
  Video,
  Link as LinkIcon,
  Image,
  FileText,
  Film,
  Paperclip,
  Plus,
  User,
  Save,
  Flag,
  X,
  Calendar,
  Target,
  Copy,
  Check,
} from "lucide-react";
import { fireteamService } from "../../../../../../services/api/fireteam.service";
import { experienceService } from "../../../../../../services/api/experience.service";
import { generateFireteamMeetingLink } from "../../../../../../lib/jitsi.utils";
import EditExperienceModal from "../../../../../../../components/EditExperienceModal";

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id: fireteamId, experienceId } = params;
  
  const [experience, setExperience] = useState(null);
  const [fireteam, setFireteam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editExperienceData, setEditExperienceData] = useState({
    title: '',
    experience: '',
    agenda: [],
    exhibits: [],
    videoAdminId: '',
    link: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [showAddAgendaDialog, setShowAddAgendaDialog] = useState(false);
  const [newAgendaStep, setNewAgendaStep] = useState({
    title: '',
    duration: '',
  });
  const [showAddExhibitDialog, setShowAddExhibitDialog] = useState(false);
  const [newExhibit, setNewExhibit] = useState({
    name: '',
    type: 'link',
    link: '',
  });
  const [selectedVideoAdminId, setSelectedVideoAdminId] = useState('');
  const [isUpdatingVideoAdmin, setIsUpdatingVideoAdmin] = useState(false);
  const [showAddObjectiveDialog, setShowAddObjectiveDialog] = useState(false);
  const [newObjective, setNewObjective] = useState({ objective: '' });
  const [objectives, setObjectives] = useState([]);
  const [generatedLink, setGeneratedLink] = useState('');
  const [isSavingLink, setIsSavingLink] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (fireteamId && experienceId) {
      fetchExperienceDetails();
    }
  }, [fireteamId, experienceId]);

  useEffect(() => {
    if (experience) {
      // Check for admin field (from API) or videoAdminId (legacy)
      const facilitatorId = experience.admin || experience.videoAdminId;
      if (facilitatorId) {
        console.log('🎯 [FACILITATOR] Setting selected facilitator ID:', facilitatorId);
        setSelectedVideoAdminId(facilitatorId.toString());
      } else {
        console.log('🎯 [FACILITATOR] No facilitator assigned');
        setSelectedVideoAdminId('');
      }
    }
  }, [experience]);

  // Auto-dismiss success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Auto-dismiss error message after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (experience && showEditModal) {
      const agendaSource = experience.agenda || experience.agenda_steps || [];
      const agendaData = Array.isArray(agendaSource) && agendaSource.length > 0
        ? agendaSource.map(step => ({
            ...step,
            title: typeof step.title === 'string' ? step.title : '',
            duration: typeof step.duration === 'string' ? step.duration : '',
          }))
        : [];
      
      const exhibitsData = experience.exhibits && Array.isArray(experience.exhibits) && experience.exhibits.length > 0
        ? experience.exhibits.map(ex => ({ ...ex, file: null }))
        : [];
      
      setEditExperienceData(prev => ({
        ...prev,
        agenda: agendaData,
        exhibits: exhibitsData,
      }));
    }
  }, [experience, showEditModal]);

  const fetchExperienceDetails = async () => {
    setLoading(true);
    try {
      const fireteamData = await fireteamService.getFireteam(fireteamId);
      const fireTeam = fireteamData.fireTeam;
      setFireteam(fireTeam);
      
      const membersList = Array.isArray(fireTeam.members) ? fireTeam.members : [];
      console.log('👥 [FETCH MEMBERS] Total members:', membersList.length);
      membersList.forEach(member => {
        console.log('👥 [FETCH MEMBERS] Member:', {
          memberId: member.id,
          userId: member.client?.user?.id,
          userName: member.client?.user?.name,
        });
      });
      setMembers(membersList);

      const experiences = Array.isArray(fireTeam.experiences) ? fireTeam.experiences : [];
      const currentExperience = experiences.find(exp => exp.id === parseInt(experienceId));
      
      if (currentExperience) {
        const normalizedExperience = {
          ...currentExperience,
          agenda: currentExperience.agenda || currentExperience.agenda_steps || [],
          exhibits: currentExperience.exhibits || [],
        };
        
        console.log('✅ [FETCH EXPERIENCE] Current experience data:', currentExperience);
        console.log('✅ [FETCH EXPERIENCE] Admin/Facilitator ID:', currentExperience.admin);
        console.log('✅ [FETCH EXPERIENCE] Normalized experience:', normalizedExperience);
        
        setExperience(normalizedExperience);
        
        if (currentExperience.objectives && Array.isArray(currentExperience.objectives)) {
          setObjectives(currentExperience.objectives);
        }
      } else {
        setError("Experience not found");
      }
    } catch (err) {
      console.error("Error fetching experience:", err);
      setError("Failed to load experience details");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (!experience) return;
    
    const agendaSource = experience.agenda || experience.agenda_steps || [];
    const agendaData = Array.isArray(agendaSource) && agendaSource.length > 0
      ? agendaSource.map(step => ({
          ...step,
          title: typeof step.title === 'string' ? step.title : '',
          duration: typeof step.duration === 'string' ? step.duration : '',
        }))
      : [];
    
    const exhibitsData = experience.exhibits && Array.isArray(experience.exhibits) && experience.exhibits.length > 0
      ? experience.exhibits.map(ex => ({ ...ex, file: null }))
      : [];
    
    setEditExperienceData({
      title: experience.title || '',
      experience: experience.experience || '',
      agenda: agendaData,
      exhibits: exhibitsData,
      videoAdminId: experience.videoAdminId || '',
      link: experience.link || '',
    });
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await experienceService.deleteExperience(experienceId);
        setSuccess("Experience deleted successfully!");
        setTimeout(() => {
          router.push(`/admin/fireteammanagement/${fireteamId}`);
        }, 1000);
      } catch (err) {
        setError("Failed to delete experience");
      }
    }
  };

  const handleAddAgendaStep = async ({ title, duration }) => {
    if (!experience) return;
    try {
      const stepTitle = title && typeof title === 'string' && title.trim() 
        ? title 
        : 'New Step';
      
      const requestData = {
        fire_team_experience_id: experience.id,
        title: stepTitle,
        duration: typeof duration === 'string' ? duration : '5 minutes',
      };

      const newStep = await experienceService.addAgendaStep(requestData);
      
      const safeStep = {
        ...newStep,
        title: typeof newStep.title === 'string' ? newStep.title : stepTitle,
        duration: typeof newStep.duration === 'string' ? newStep.duration : '5 minutes',
      };
      
      setEditExperienceData((prev) => ({
        ...prev,
        agenda: [...prev.agenda, safeStep],
      }));

      return safeStep;
    } catch (err) {
      console.error("Error adding agenda step:", err);
      setError("Failed to add agenda step");
      throw err;
    }
  };

  const handleAddExhibit = async () => {
    if (!experience) return;
    try {
      const newExhibit = await experienceService.addExhibit({
        fire_team_experience_id: experience.id,
        name: 'New Exhibit',
        type: 'link',
        link: 'https://',
      });
      setEditExperienceData(prev => ({
        ...prev,
        exhibits: [...prev.exhibits, { ...newExhibit, file: null }],
      }));
    } catch (err) {
      console.error('Error adding exhibit:', err);
      setError('Failed to add exhibit');
      throw err;
    }
  };

  const handleSubmitAgendaStep = async () => {
    if (!newAgendaStep.title.trim()) {
      setError('Agenda step title is required');
      return;
    }
    
    try {
      const requestData = {
        fire_team_experience_id: experience.id,
        title: newAgendaStep.title,
        duration: newAgendaStep.duration || '5 minutes',
      };

      await experienceService.addAgendaStep(requestData);
      
      setSuccess('Agenda step added successfully!');
      setShowAddAgendaDialog(false);
      setNewAgendaStep({ title: '', duration: '' });
      
      await fetchExperienceDetails();
    } catch (err) {
      console.error('Error adding agenda step:', err);
      setError('Failed to add agenda step');
    }
  };

  const handleSubmitExhibit = async () => {
    if (!newExhibit.name.trim()) {
      setError('Exhibit name is required');
      return;
    }
    
    if (newExhibit.type === 'link' && !newExhibit.link.trim()) {
      setError('Link is required for link-type exhibits');
      return;
    }
    
    try {
      const requestData = {
        fire_team_experience_id: experience.id,
        name: newExhibit.name,
        type: newExhibit.type,
        ...(newExhibit.type === 'link' && { link: newExhibit.link }),
      };

      await experienceService.addExhibit(requestData);
      
      setSuccess('Exhibit added successfully!');
      setShowAddExhibitDialog(false);
      setNewExhibit({ name: '', type: 'link', link: '' });
      
      await fetchExperienceDetails();
    } catch (err) {
      console.error('Error adding exhibit:', err);
      setError('Failed to add exhibit');
    }
  };

  const handleAddObjective = async () => {
    if (!newObjective.objective.trim()) {
      setError('Objective is required');
      return;
    }
    
    try {
      // Get current user from localStorage
      const userData = localStorage.getItem('wanacUser');
      console.log('🔐 [USER CHECK] Raw userData from localStorage:', userData);
      
      const user = userData ? JSON.parse(userData) : null;
      console.log('🔐 [USER CHECK] Parsed user object:', user);
      
      const addedBy = user?.id;
      console.log('🔐 [USER CHECK] Extracted user ID (added_by):', addedBy);
      console.log('🔐 [USER CHECK] User ID type:', typeof addedBy);

      if (!addedBy) {
        console.error('⚠️ [WARNING] No user ID found! User might not be logged in.');
      }

      const requestData = {
        fire_team_experience_id: experienceId,
        objective: newObjective.objective,
        added_by: addedBy,
      };

      console.log('🎯 [ADD OBJECTIVE] Final request data:', requestData);
      console.log('🎯 [ADD OBJECTIVE] Request data stringified:', JSON.stringify(requestData));

      const addedObjective = await fireteamService.addObjective(requestData);
      
      setSuccess('Objective added successfully!');
      setObjectives(prev => [...prev, addedObjective]);
      setShowAddObjectiveDialog(false);
      setNewObjective({ objective: '' });
      
      await fetchExperienceDetails();
    } catch (err) {
      console.error('Error adding objective:', err);
      setError('Failed to add objective');
    }
  };

  const handleDeleteObjective = async (objectiveId) => {
    if (window.confirm("Are you sure you want to delete this objective?")) {
      try {
        await fireteamService.deleteObjective(objectiveId);
        setSuccess('Objective deleted successfully!');
        setObjectives(prev => prev.filter(obj => obj.id !== objectiveId));
        await fetchExperienceDetails();
      } catch (err) {
        console.error('Error deleting objective:', err);
        setError('Failed to delete objective');
      }
    }
  };

  const handleDeleteAgendaStep = async (agendaStepId) => {
    if (window.confirm("Are you sure you want to delete this agenda step?")) {
      try {
        await experienceService.deleteAgendaStep(agendaStepId);
        setSuccess('Agenda step deleted successfully!');
        await fetchExperienceDetails();
      } catch (err) {
        console.error('Error deleting agenda step:', err);
        setError('Failed to delete agenda step');
      }
    }
  };

  const handleDeleteExhibit = async (exhibitId) => {
    if (window.confirm("Are you sure you want to delete this exhibit?")) {
      try {
        await experienceService.deleteExhibit(exhibitId);
        setSuccess('Exhibit deleted successfully!');
        await fetchExperienceDetails();
      } catch (err) {
        console.error('Error deleting exhibit:', err);
        setError('Failed to delete exhibit');
      }
    }
  };

  const handleUpdateVideoAdmin = async () => {
    if (!selectedVideoAdminId) {
      setError('Please select a video admin');
      return;
    }

    setIsUpdatingVideoAdmin(true);
    try {
      // Prepare update data according to API spec: PUT api/v1/fireteams/experience/update/{fireTeamExperience_id}
      const updateData = {
        title: experience.title,
        experience: experience.experience,
        link: experience.link, // Preserve the meeting link
        status: experience.status, // Preserve the status
        report: experience.report, // Preserve the report
        summary: experience.summary, // Preserve the summary
        admin: parseInt(selectedVideoAdminId), // Meeting facilitator ID (integer as per API spec)
      };
      
      console.log('🎯 [VIDEO ADMIN UPDATE] Updating meeting facilitator with data:', updateData);
      console.log('🎯 [VIDEO ADMIN UPDATE] Experience ID:', experience.id);
      
      const result = await experienceService.updateExperience(experience.id, updateData);
      
      console.log('✅ [VIDEO ADMIN UPDATE] Update successful:', result);
      
      if (result.fireTeamExperience?.admin === null) {
        setError('Backend does not support setting meeting facilitator. Please contact backend team.');
      } else {
        setSuccess('Meeting facilitator updated successfully!');
      }
      
      await fetchExperienceDetails();
    } catch (err) {
      console.error('❌ [VIDEO ADMIN UPDATE] Error updating meeting facilitator:', err);
      console.error('❌ [VIDEO ADMIN UPDATE] Error response:', err.response?.data);
      setError('Failed to update meeting facilitator: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsUpdatingVideoAdmin(false);
    }
  };

  const handleGenerateLink = () => {
    try {
      // Get current user from localStorage for the moderator name
      const userData = localStorage.getItem('wanacUser');
      const user = userData ? JSON.parse(userData) : null;
      const moderatorName = user?.name || 'admin';
      
      // Generate a new Jitsi meeting link
      const newLink = generateFireteamMeetingLink(
        fireteamId,
        experienceId,
        moderatorName,
        experience?.title || 'Fireteam Meeting'
      );
      
      console.log('🔗 [GENERATE LINK] New meeting link generated:', newLink);
      setGeneratedLink(newLink);
      setSuccess('Meeting link generated! Click "Save Link" to apply it.');
    } catch (err) {
      console.error('❌ [GENERATE LINK] Error generating link:', err);
      setError('Failed to generate meeting link');
    }
  };

  const handleSaveLink = async () => {
    if (!generatedLink) {
      setError('No link to save. Please generate a link first.');
      return;
    }

    setIsSavingLink(true);
    try {
      // Prepare update data according to API spec
      const updateData = {
        title: experience.title,
        experience: experience.experience,
        link: generatedLink, // Update with the new generated link
        status: experience.status,
        report: experience.report,
        summary: experience.summary,
        admin: experience.admin, // Preserve the facilitator
      };
      
      console.log('💾 [SAVE LINK] Saving new meeting link:', generatedLink);
      
      await experienceService.updateExperience(experience.id, updateData);
      
      setSuccess('Meeting link saved successfully!');
      setGeneratedLink(''); // Clear the generated link
      await fetchExperienceDetails();
    } catch (err) {
      console.error('❌ [SAVE LINK] Error saving link:', err);
      console.error('❌ [SAVE LINK] Error response:', err.response?.data);
      setError('Failed to save meeting link: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSavingLink(false);
    }
  };

  const handleDeleteLink = async () => {
    if (!experience.link) {
      setError('No link to delete.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this meeting link? Participants will no longer be able to join using the current link.')) {
      return;
    }

    setIsSavingLink(true);
    try {
      const updateData = {
        title: experience.title,
        experience: experience.experience,
        link: '', // Clear the meeting link
        status: experience.status,
        report: experience.report,
        summary: experience.summary,
        admin: experience.admin,
      };
      
      console.log('🗑️ [DELETE LINK] Removing meeting link');
      
      await experienceService.updateExperience(experience.id, updateData);
      
      setSuccess('Meeting link deleted successfully!');
      setGeneratedLink('');
      await fetchExperienceDetails();
    } catch (err) {
      console.error('❌ [DELETE LINK] Error deleting link:', err);
      setError('Failed to delete meeting link: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSavingLink(false);
    }
  };

  const handleCopyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setSuccess('Link copied to clipboard!');
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedLink(false);
      }, 2000);
    } catch (err) {
      console.error('❌ [COPY LINK] Error copying link:', err);
      setError('Failed to copy link to clipboard');
    }
  };

  const validateExperienceData = () => {
    const errors = {};
    
    if (!editExperienceData.title.trim()) {
      errors.title = 'Experience title is required';
    }
    
    if (!editExperienceData.experience.trim()) {
      errors.experience = 'Experience content is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearValidationErrors = () => {
    setValidationErrors({});
  };

  const getExhibitIcon = (type) => {
    switch(type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Film className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'link': return <LinkIcon className="w-4 h-4" />;
      default: return <Paperclip className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-8 ml-16 md:ml-56">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading experience details...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-8 ml-16 md:ml-56">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <p className="text-red-600 text-lg font-medium">Experience not found</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 ml-16 md:ml-56 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-3 px-4 shadow-lg border-b border-blue-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/admin/fireteammanagement/${fireteamId}`)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold truncate">{experience.title}</h1>
              {fireteam && (
                <p className="text-xs text-blue-200 truncate">{fireteam.title}</p>
              )}
            </div>
            {experience.status && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                experience.status === 'completed' 
                  ? 'bg-green-500/30 text-green-100' 
                  : 'bg-white/20 text-white'
              }`}>
                {experience.status}
              </span>
            )}
            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-xs font-medium"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
            {/* Left Column - 8/12 */}
            <div className="lg:col-span-8 flex flex-col gap-3 overflow-auto">
              {/* Experience Content */}
              <div className="bg-white rounded-md shadow-sm border-l-4 border-blue-900 p-3">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base font-semibold text-blue-900">Experience Content</h2>
                  {experience.link && (
                    <button
                      onClick={() => {
                        const clientUrl = `/client/fireteam/experience/${experienceId}?id=${experienceId}&fireteamId=${fireteamId}&link=${encodeURIComponent(experience.link)}&admin=true`;
                        router.push(clientUrl);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-md transition-colors text-xs font-medium"
                    >
                      <Video className="w-3.5 h-3.5" />
                      Join Meeting
                    </button>
                  )}
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{experience.experience}</p>
                </div>
                
                {/* Summary & Report */}
                {(experience.summary || experience.report) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {experience.summary && (
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-2">
                        <h3 className="text-xs font-semibold text-blue-900 mb-1 uppercase">Summary</h3>
                        <p className="text-xs text-gray-700">{experience.summary}</p>
                      </div>
                    )}
                    {experience.report && (
                      <div className="bg-orange-50 border border-orange-200 rounded-md p-2">
                        <h3 className="text-xs font-semibold text-orange-900 mb-1 uppercase">Report</h3>
                        <p className="text-xs text-gray-700">{experience.report}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Learning Objectives */}
              <div className="bg-white rounded-md shadow-sm border-l-4 border-amber-500 p-3">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base font-semibold text-amber-600 flex items-center gap-1.5">
                    <Flag className="w-4 h-4" />
                    Learning Objectives
                  </h2>
                  <button
                    onClick={() => setShowAddObjectiveDialog(true)}
                    className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                {objectives && objectives.length > 0 ? (
                  <div className="space-y-1.5">
                    {objectives.map((objective, index) => (
                      <div
                        key={objective.id || index}
                        className={`flex items-center justify-between p-2 rounded-md border ${
                          index % 2 === 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold">
                            {index + 1}
                          </span>
                          <p className="text-xs text-gray-700">{objective.objective}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteObjective(objective.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">No learning objectives yet</p>
                )}
              </div>

              {/* Agenda & Exhibits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Agenda */}
                <div className="bg-white rounded-md shadow-sm border-l-4 border-blue-900 p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-base font-semibold text-blue-900">Agenda</h2>
                    <button
                      onClick={() => setShowAddAgendaDialog(true)}
                      className="p-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-md transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {experience.agenda && experience.agenda.length > 0 ? (
                    <div className="space-y-1.5">
                      {experience.agenda.map((step, index) => (
                        <div
                          key={step.id || index}
                          className={`p-2 rounded-md border ${
                            index % 2 === 0 ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-900 text-white text-xs font-bold">
                              {index + 1}
                            </span>
                            <p className="text-xs font-semibold text-gray-900 flex-1">{step.title}</p>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">{step.duration}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteAgendaStep(step.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                              title="Delete agenda step"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 italic">No agenda steps yet</p>
                  )}
                </div>

                {/* Exhibits */}
                <div className="bg-white rounded-md shadow-sm border-l-4 border-orange-500 p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-base font-semibold text-orange-600">Exhibits</h2>
                    <button
                      onClick={() => setShowAddExhibitDialog(true)}
                      className="p-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {experience.exhibits && experience.exhibits.length > 0 ? (
                    <div className="space-y-1.5">
                      {experience.exhibits.map((exhibit, index) => (
                        <div
                          key={exhibit.id || index}
                          className={`p-2 rounded-md border ${
                            index % 2 === 0 ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="text-orange-600">
                              {getExhibitIcon(exhibit.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-900">{exhibit.name}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                  {exhibit.type}
                                </span>
                                {exhibit.type === 'link' && exhibit.link && (
                                  <a
                                    href={exhibit.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:underline"
                                  >
                                    Open →
                                  </a>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteExhibit(exhibit.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                              title="Delete exhibit"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 italic">No exhibits yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - 4/12 */}
            <div className="lg:col-span-4 flex flex-col gap-3 overflow-auto">
              {/* Meeting Facilitator */}
              <div className="bg-white rounded-md shadow-sm border-l-4 border-purple-600 p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <User className="w-4 h-4 text-purple-600" />
                  <h2 className="text-base font-semibold text-purple-600">Meeting Facilitator</h2>
                </div>
                <select
                  value={selectedVideoAdminId}
                  onChange={(e) => setSelectedVideoAdminId(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2 text-xs"
                >
                  <option value="">None</option>
                  {members.map((member) => (
                    <option 
                      key={member.id} 
                      value={member.client?.user?.id || member.user_id || member.id}
                    >
                      {member.client?.user?.name || member.user?.name || member.name || `User #${member.client?.user?.id || member.user_id || member.id}`}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleUpdateVideoAdmin}
                  disabled={isUpdatingVideoAdmin || !selectedVideoAdminId}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors text-xs font-medium"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isUpdatingVideoAdmin ? 'Saving...' : 'Save'}
                </button>
              </div>

              {/* Meeting Link */}
              <div className="bg-white rounded-md shadow-sm border-l-4 border-green-600 p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <LinkIcon className="w-4 h-4 text-green-600" />
                  <h2 className="text-base font-semibold text-green-600">Meeting Link</h2>
                </div>
                
                {/* Current Link */}
                {experience.link && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-500 mb-1">Current Link:</p>
                    <div className="flex gap-2">
                      <div className="flex-1 p-2 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-xs font-mono text-green-800 break-all">
                          {experience.link}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopyLink(experience.link)}
                        className="flex items-center justify-center px-2 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                        title="Copy link"
                      >
                        {copiedLink ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Generated Link (if any) */}
                {generatedLink && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-500 mb-1">New Generated Link:</p>
                    <div className="flex gap-2">
                      <div className="flex-1 p-2 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-xs font-mono text-blue-800 break-all">
                          {generatedLink}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopyLink(generatedLink)}
                        className="flex items-center justify-center px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                        title="Copy link"
                      >
                        {copiedLink ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleGenerateLink}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-xs font-medium"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    Generate New Link
                  </button>
                  
                  {generatedLink && (
                    <button
                      onClick={handleSaveLink}
                      disabled={isSavingLink}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors text-xs font-medium"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {isSavingLink ? 'Saving...' : 'Save Link'}
                    </button>
                  )}
                  
                  {experience.link && (
                    <button
                      onClick={handleDeleteLink}
                      disabled={isSavingLink}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors text-xs font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Link
                    </button>
                  )}
                </div>
                
                {!experience.link && !generatedLink && (
                  <p className="text-xs text-gray-500 italic mt-2">No meeting link yet. Click "Generate New Link" to create one.</p>
                )}
              </div>

              {/* Metadata */}
              <div className="bg-white rounded-md shadow-sm border-l-4 border-gray-400 p-3">
                <h2 className="text-base font-semibold text-gray-700 mb-2">Metadata</h2>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="p-2 bg-gray-50 rounded-md">
                    <p className="text-xs text-gray-500 mb-0.5">Experience ID</p>
                    <p className="text-xs font-bold text-gray-900">#{experience.id}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-md">
                    <p className="text-xs text-gray-500 mb-0.5">Team ID</p>
                    <p className="text-xs font-bold text-gray-900">#{experience.fire_team_id || fireteamId}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {experience.created_at && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Created</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(experience.created_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                  {experience.updated_at && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Updated</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(experience.updated_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <EditExperienceModal
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            clearValidationErrors();
          }}
          editExperienceData={editExperienceData}
          setEditExperienceData={setEditExperienceData}
          validationErrors={validationErrors}
          clearValidationErrors={clearValidationErrors}
          handleAddAgendaStep={handleAddAgendaStep}
          handleAddExhibit={handleAddExhibit}
          handleSave={async () => {
            if (!experience) return;
            if (!validateExperienceData()) {
              setError('Please fix validation errors before saving');
              return;
            }
            try {
              const agendaData = editExperienceData.agenda
                .filter(step => step.title?.trim())
                .map(step => ({
                  id: step.id,
                  title: step.title,
                  duration: step.duration || '5 minutes',
                }));

              const exhibitsData = editExperienceData.exhibits
                .filter(ex => ex.name?.trim())
                .map(ex => ({
                  id: ex.id,
                  name: ex.name,
                  type: ex.type || 'link',
                  link: ex.type === 'link' ? ex.link : undefined,
                }));

              // Prepare update payload according to API spec
              const updatePayload = {
                title: editExperienceData.title,
                experience: editExperienceData.experience,
                link: editExperienceData.link || experience.link, // Preserve the meeting link
                status: experience.status, // Preserve status
                report: experience.report, // Preserve report
                summary: experience.summary, // Preserve summary
                admin: editExperienceData.videoAdminId ? parseInt(editExperienceData.videoAdminId) : undefined, // Meeting facilitator
                agenda: agendaData,
                exhibits: exhibitsData,
              };

              console.log('💾 [SAVE] Saving experience with payload:', updatePayload);
              console.log('💾 [SAVE] Meeting link being saved:', updatePayload.link);
              console.log('💾 [SAVE] Meeting facilitator (admin):', updatePayload.admin);

              await experienceService.updateExperience(experience.id, updatePayload);
              
              const currentExhibitIds = experience.exhibits?.map(ex => ex.id).filter(Boolean) || [];
              const updatedExhibitIds = exhibitsData.map(ex => ex.id).filter(Boolean);
              
              for (const exhibitId of currentExhibitIds) {
                if (!updatedExhibitIds.includes(exhibitId)) {
                  try {
                    await experienceService.deleteExhibit(exhibitId);
                  } catch (err) {
                    console.warn('Failed to delete exhibit:', err);
                  }
                }
              }
              
              const currentAgendaIds = experience.agenda?.map(step => step.id).filter(Boolean) || [];
              const updatedAgendaIds = agendaData.map(step => step.id).filter(Boolean);
              
              for (const stepId of currentAgendaIds) {
                if (!updatedAgendaIds.includes(stepId)) {
                  try {
                    await experienceService.deleteAgendaStep(stepId);
                  } catch (err) {
                    console.warn('Failed to delete agenda step:', err);
                  }
                }
              }
              
              setShowEditModal(false);
              clearValidationErrors();
              setSuccess('Experience updated successfully!');
              fetchExperienceDetails();
            } catch (err) {
              console.error('Failed to update experience:', err);
              setError('Failed to update experience: ' + (err.message || 'Unknown error'));
            }
          }}
          setError={setError}
          members={members}
          selectedExperienceToEdit={experience}
          generateFireteamMeetingLink={generateFireteamMeetingLink}
          id={fireteamId}
          fireteam={fireteam}
          experienceService={experienceService}
        />

        {/* Add Agenda Step Modal */}
        {showAddAgendaDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="bg-blue-900 text-white px-4 py-3 rounded-t-lg">
                <h3 className="text-base font-semibold">Add Agenda Step</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Step Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newAgendaStep.title}
                    onChange={(e) => setNewAgendaStep(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Introduction & Icebreaker"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newAgendaStep.duration}
                    onChange={(e) => setNewAgendaStep(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 10 minutes"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                  />
                  <p className="text-xs text-gray-500 mt-0.5">Optional - specify the estimated duration</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 px-4 py-3 bg-gray-50 rounded-b-lg">
                <button
                  onClick={() => {
                    setShowAddAgendaDialog(false);
                    setNewAgendaStep({ title: '', duration: '' });
                  }}
                  className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitAgendaStep}
                  className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-md transition-colors font-medium text-xs"
                >
                  Add Step
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Exhibit Modal */}
        {showAddExhibitDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="bg-orange-500 text-white px-4 py-3 rounded-t-lg">
                <h3 className="text-base font-semibold">Add Exhibit</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Exhibit Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newExhibit.name}
                    onChange={(e) => setNewExhibit(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Leadership Framework"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newExhibit.type}
                    onChange={(e) => setNewExhibit(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs"
                  >
                    <option value="link">Link</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                  </select>
                </div>
                {newExhibit.type === 'link' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Link URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newExhibit.link}
                      onChange={(e) => setNewExhibit(prev => ({ ...prev, link: e.target.value }))}
                      placeholder="https://example.com"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs"
                    />
                    <p className="text-xs text-gray-500 mt-0.5">Enter the full URL including https://</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 px-4 py-3 bg-gray-50 rounded-b-lg">
                <button
                  onClick={() => {
                    setShowAddExhibitDialog(false);
                    setNewExhibit({ name: '', type: 'link', link: '' });
                  }}
                  className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitExhibit}
                  className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors font-medium text-xs"
                >
                  Add Exhibit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Objective Modal */}
        {showAddObjectiveDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="bg-amber-500 text-white px-4 py-3 rounded-t-lg">
                <h3 className="text-base font-semibold">Add Learning Objective</h3>
              </div>
              <div className="p-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Objective <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={newObjective.objective}
                  onChange={(e) => setNewObjective({ objective: e.target.value })}
                  placeholder="e.g., Understand the key principles of effective leadership"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-xs"
                />
                <p className="text-xs text-gray-500 mt-0.5">Describe what participants should learn or achieve</p>
              </div>
              <div className="flex justify-end gap-2 px-4 py-3 bg-gray-50 rounded-b-lg">
                <button
                  onClick={() => {
                    setShowAddObjectiveDialog(false);
                    setNewObjective({ objective: '' });
                  }}
                  className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddObjective}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors font-medium text-xs"
                >
                  Add Objective
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success/Error Toast Notifications */}
        {success && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-slide-up">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm">{success}</span>
            <button onClick={() => setSuccess("")} className="ml-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-slide-up">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm">{error}</span>
            <button onClick={() => setError("")} className="ml-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
