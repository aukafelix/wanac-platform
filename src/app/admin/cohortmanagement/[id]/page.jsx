"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "../../../../../components/dashboardcomponents/adminsidebar";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Autocomplete, Typography } from "@mui/material";
import { cohortService } from "../../../../services/api/cohort.service";
import { sessionsService } from "../../../../services/api/sessions.service";
import { clientsService } from "../../../../services/api/clients.service";

export default function CohortDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const cohortId = params?.id;

  const [cohort, setCohort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({ user_id: '' });
  const [addingMember, setAddingMember] = useState(false);
  const [memberError, setMemberError] = useState(null);
  const [memberSuccess, setMemberSuccess] = useState(null);
  const [userOptions, setUserOptions] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [membersWithDetails, setMembersWithDetails] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await cohortService.getCohorts();
        const list = Array.isArray(data) ? data : (Array.isArray(data?.cohorts) ? data.cohorts : []);
        const found = list.find(c => String(c.id) === String(cohortId));
        setCohort(found || null);
        
        // Fetch member details if cohort is found
        if (found) {
          await loadMemberDetails(found);
        }
      } catch (e) {
        setError("Failed to load cohort");
      } finally {
        setLoading(false);
      }
    }
    if (cohortId) load();
  }, [cohortId]);

  const loadMemberDetails = async (cohortData) => {
    try {
      const clientIds = cohortData.clients || [];
      const coachIds = cohortData.coaches || [];
      
      console.log('Cohort data:', cohortData);
      console.log('Client IDs:', clientIds);
      console.log('Coach IDs:', coachIds);
      
      // Fetch all clients and coaches
      const [clientsResponse, coachesResponse] = await Promise.all([
        clientsService.getClients(),
        cohortService.getCoaches()
      ]);
      
      const allClients = Array.isArray(clientsResponse?.clients) ? clientsResponse.clients : [];
      const allCoaches = Array.isArray(coachesResponse?.coaches?.data) ? coachesResponse.coaches.data : [];
      
      console.log('All clients:', allClients);
      console.log('All coaches:', allCoaches);
      console.log('Looking for client IDs:', clientIds);
      
      // Debug: Check if any clients match the IDs we're looking for
      const matchingClients = allClients.filter(client => clientIds.includes(client.user_id));
      console.log('Matching clients found:', matchingClients);
      
      // Map IDs to full objects
      const clientMembers = allClients
        .filter(client => clientIds.includes(client.user_id))
        .map(client => ({
          type: 'Client',
          id: client.user_id,
          name: client.user?.name || 'Unknown',
          email: client.user?.email || 'No email'
        }));
      
      const coachMembers = allCoaches
        .filter(coach => coachIds.includes(coach.user_id))
        .map(coach => ({
          type: 'Coach',
          id: coach.user_id,
          name: coach.user?.name || 'Unknown',
          email: coach.user?.email || 'No email'
        }));
      
      console.log('Client members found:', clientMembers);
      console.log('Coach members found:', coachMembers);
      
      const allMembers = [...clientMembers, ...coachMembers];
      console.log('All members to display:', allMembers);
      console.log('Setting members with details:', allMembers);
      
      setMembersWithDetails(allMembers);
    } catch (e) {
      console.error('Failed to load member details:', e);
      setMembersWithDetails([]);
    }
  };

  useEffect(() => {
    async function loadSessions() {
      if (!cohortId) return;
      setSessionsLoading(true);
      try {
        const all = await sessionsService.getSessions();
        const list = Array.isArray(all)
          ? all
          : Array.isArray(all?.data)
          ? all.data
          : Array.isArray(all?.sessions?.data)
          ? all.sessions.data
          : [];
        const filtered = list.filter((s) => String(s.cohort_id ?? s.cohortId) === String(cohortId));
        setSessions(filtered);
      } catch (e) {
        // silently fail; keep sessions empty
      } finally {
        setSessionsLoading(false);
      }
    }
    loadSessions();
  }, [cohortId]);

  const handleCreateSession = async (e) => {
    e?.preventDefault?.();
    if (!newSession.title || !newSession.date) return;
    try {
      await sessionsService.addSession({
        title: newSession.title,
        description: newSession.description,
        date: newSession.date,
        time: newSession.time,
        cohort_id: cohortId,
      });
      setSessionModalOpen(false);
      setNewSession({ title: "", description: "", date: "", time: "" });
      // reload sessions
      const all = await sessionsService.getSessions();
      const list = Array.isArray(all)
        ? all
        : Array.isArray(all?.data)
        ? all.data
        : Array.isArray(all?.sessions?.data)
        ? all.sessions.data
        : [];
      const filtered = list.filter((s) => String(s.cohort_id ?? s.cohortId) === String(cohortId));
      setSessions(filtered);
    } catch (e) {
      console.error("Failed to create session:", e);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <button
                type="button"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition"
                onClick={() => router.push("/admin/cohortmanagement")}
              >
                ← Back to Cohort Management
              </button>
            </div>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : !cohort ? (
              <div className="text-center py-8 text-gray-500">Cohort not found.</div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#002147] tracking-tight">{cohort.name || `Cohort ${cohort.id}`}</h1>
                    <p className="text-gray-600 mt-1">{cohort.description || 'No description'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                    Members: {(Array.isArray(cohort.clients) ? cohort.clients.length : 0) + (Array.isArray(cohort.coaches) ? cohort.coaches.length : 0)}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                    Start: {cohort.start_date ? new Date(cohort.start_date).toLocaleDateString() : '—'}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                    End: {cohort.end_date ? new Date(cohort.end_date).toLocaleDateString() : '—'}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#002147]">Members</h2>
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
                    onClick={() => {
                      setAddMemberOpen(true);
                      setMemberError(null);
                      setMemberSuccess(null);
                    }}
                  >
                    Add Member
                  </button>
                </div>
                {memberSuccess && (
                  <p className="text-green-600 mb-2">{memberSuccess}</p>
                )}
                <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {membersWithDetails.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-6 text-center text-gray-500">No members found</td>
                        </tr>
                      ) : (
                        membersWithDetails.map((member, index) => (
                          <tr key={`${member.type}-${member.id}-${index}`} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 text-sm text-gray-700">{member.type}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{member.email}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#002147]">Cohort Sessions</h2>
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
                      onClick={() => setSessionModalOpen(true)}
                    >
                      Add Session
                    </button>
                  </div>
                  {sessionsLoading ? (
                    <div className="text-center py-6 text-gray-500">Loading sessions...</div>
                  ) : sessions.length === 0 ? (
                    <p className="text-gray-500">No sessions for this cohort.</p>
                  ) : (
                    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {sessions.map((s) => (
                            <tr key={s.id} className="hover:bg-gray-50 transition">
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">{s.title || '-'}</td>
                              <td className="px-6 py-4 text-sm text-gray-700">{s.date || '-'}</td>
                              <td className="px-6 py-4 text-sm text-gray-700">{s.description || '-'}</td>
                              <td className="px-6 py-4 text-sm text-gray-700">{s.time || '-'}</td>
                              <td className="px-6 py-4 text-sm text-gray-700">{s.status || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      <Dialog open={sessionModalOpen} onClose={() => setSessionModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Session to Cohort</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              value={newSession.title}
              onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={newSession.description}
              onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              label="Date"
              type="date"
              value={newSession.date}
              onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
            <TextField
              label="Time"
              type="time"
              value={newSession.time}
              onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSessionModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateSession}>Create</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={addMemberOpen} onClose={() => setAddMemberOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add Client to Cohort</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Autocomplete
              options={userOptions}
              getOptionLabel={option => option.user?.name + (option.user?.email ? ` (${option.user.email})` : "")}
              loading={userLoading}
              onInputChange={async (e, value) => {
                setUserSearch(value);
                if (value.length < 2) {
                  setUserOptions([]);
                  return;
                }
                setUserLoading(true);
                try {
                  const response = await clientsService.getClients();
                  const clients = Array.isArray(response?.clients) ? response.clients : [];
                  const results = clients.filter(client =>
                    (client.user?.name && client.user.name.toLowerCase().includes(value.toLowerCase())) ||
                    (client.user?.email && client.user.email.toLowerCase().includes(value.toLowerCase()))
                  );
                  setUserOptions(results);
                } catch {
                  setUserOptions([]);
                } finally {
                  setUserLoading(false);
                }
              }}
              onChange={(e, value) => {
                setNewMember({ user_id: value ? value.user_id : "" });
              }}
              renderInput={params => (
                <TextField {...params} label="Search client by name or email" fullWidth required />
              )}
            />
            {memberError && <Typography color="error">{memberError}</Typography>}
            {memberSuccess && <Typography color="success" sx={{ color: 'green' }}>{memberSuccess}</Typography>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAddMemberOpen(false);
            setMemberError(null);
            setMemberSuccess(null);
          }}>Cancel</Button>
          <Button variant="contained" disabled={addingMember || !newMember.user_id} onClick={async () => {
            setAddingMember(true);
            setMemberError(null);
            try {
              const payload = {
                cohort_id: parseInt(cohortId),
                member_id: parseInt(newMember.user_id),
                role: 'client',
              };
              console.log('Sending payload:', payload);
              const response = await cohortService.addCohortMember(payload);
              console.log('Add member response:', response);
              
              setMemberSuccess('Member added successfully!');
              setMemberError(null);
              
              setAddMemberOpen(false);
              setNewMember({ user_id: '' });
              setUserOptions([]);
              setUserSearch("");
              
              // Update cohort data locally by adding the new member
              if (cohort) {
                const updatedCohort = {
                  ...cohort,
                  clients: [...(cohort.clients || []), parseInt(newMember.user_id)]
                };
                setCohort(updatedCohort);
                
                // Reload member details with updated cohort
                await loadMemberDetails(updatedCohort);
              }
              
              // Clear success message after 3 seconds
              setTimeout(() => setMemberSuccess(null), 3000);
            } catch (e) {
              setMemberError('Failed to add member');
              setMemberSuccess(null);
            } finally {
              setAddingMember(false);
            }
          }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


