"use client";
import { useState, useEffect, useRef } from "react";
import AdminSidebar from '../../../../components/dashboardcomponents/adminsidebar';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl, Autocomplete, Chip } from '@mui/material';
import { FaEdit, FaPlus } from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ProgramsService } from '../../../services/api/programs.service';
import { useRouter } from 'next/navigation';

export default function AdminProgramManagementPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [programs, setPrograms] = useState([]); // Will be fetched from API
  const [sessions, setSessions] = useState([]); // No mockSessionsInit
  const [coaches, setCoaches] = useState([]); // No mockCoaches
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showProgramDialog, setShowProgramDialog] = useState(false);
  const [showSessionDialog, setShowSessionDialog] = useState(false);
  const [programForm, setProgramForm] = useState({ title: '', description: '' });
  const [sessionForm, setSessionForm] = useState({ name: '', type: '', programId: '', coaches: [] });
  const addButtonRef = useRef(null);
  const router = useRouter();

  // Fetch programs from API on mount
  useEffect(() => {
    const fetchProgramsAndUnits = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ProgramsService.getAll();
        let programsArray = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : (Array.isArray(data.programs) ? data.programs : []));
        setPrograms(programsArray);
        // Fetch units for each program
        const allUnits = await Promise.all(
          programsArray.map(async (program) => {
            const units = await ProgramsService.getUnitsByProgramId(program.id);
            // Attach programId to each unit for filtering
            return (units || []).map(unit => ({ ...unit, programId: program.id }));
          })
        );
        setSessions(allUnits.flat());
      } catch (err) {
        setError('Failed to fetch programs or units');
      } finally {
        setLoading(false);
      }
    };
    fetchProgramsAndUnits();
  }, []);

  // Handlers for Programs
  const handleOpenAddProgram = () => {
    setProgramForm({ title: '', description: '' });
    setSelectedProgram(null);
    setShowProgramDialog(true);
  };
  const handleOpenEditProgram = (program) => {
    setProgramForm({ title: program.title, description: program.description });
    setSelectedProgram(program);
    setShowProgramDialog(true);
  };
  const handleProgramFormChange = (e) => {
    setProgramForm({ ...programForm, [e.target.name]: e.target.value });
  };
  const handleSaveProgram = async () => {
    setLoading(true);
    try {
      if (selectedProgram) {
        const updated = await ProgramsService.update(selectedProgram.id, programForm);
        setPrograms(programs.map(p => p.id === selectedProgram.id ? updated : p));
      } else {
        const created = await ProgramsService.create(programForm);
        setPrograms([...programs, created]);
      }
      setShowProgramDialog(false);
    } catch (err) {
      setError('Failed to save program');
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteProgram = async (programId) => {
    setLoading(true);
    try {
      await ProgramsService.delete(programId);
      setPrograms(programs.filter(p => p.id !== programId));
    } catch (err) {
      setError('Failed to delete program');
    } finally {
      setLoading(false);
    }
  };

  // Handlers for Sessions
  const handleOpenAddSession = (programId) => {
    setSessionForm({ name: '', type: '', programId, coaches: [] });
    setSelectedSession(null);
    setShowSessionDialog(true);
  };
  const handleOpenEditSession = (session) => {
    setSessionForm({ name: session.name, type: session.type, programId: session.programId, coaches: session.coaches });
    setSelectedSession(session);
    setShowSessionDialog(true);
  };
  const handleSessionFormChange = (e) => {
    setSessionForm({ ...sessionForm, [e.target.name]: e.target.value });
  };
  const handleSessionCoachChange = (event, value) => {
    setSessionForm({ ...sessionForm, coaches: value.map(c => c.id) });
  };
  const handleSaveSession = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get current user from localStorage
      const userData = localStorage.getItem('wanacUser');
      const user = userData ? JSON.parse(userData) : null;
      const addedBy = user?.id;

      if (selectedSession) {
        // For now, keep local update for edit (API update can be added if needed)
        setSessions(sessions.map(s => s.id === selectedSession.id ? { ...s, ...sessionForm } : s));
      } else {
        // Call API to add unit (session)
        const payload = {
          program_id: sessionForm.programId,
          name: sessionForm.name,
          description: sessionForm.type, // Using type as description for now, adjust as needed
          added_by: addedBy, // Set the current user ID here
        };
        const createdUnit = await ProgramsService.addUnit(payload);
        // Add to local state (sessions)
        setSessions([...sessions, { id: createdUnit.id || Date.now(), ...sessionForm }]);
        setPrograms(programs.map(p => p.id === sessionForm.programId ? { ...p, sessions: [...(p.sessions || []), createdUnit.id || Date.now()] } : p));
      }
      setShowSessionDialog(false);
    } catch (err) {
      setError('Failed to save session');
    } finally {
      setLoading(false);
    }
  };

  // Helper to get coach objects from IDs
  const getCoachNames = (ids) => (Array.isArray(ids) ? ids.map(id => coaches.find(c => c.id === id)?.name).filter(Boolean) : []);

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[#002147] tracking-tight">Program Management</h1>
              <button
                ref={addButtonRef}
                type="button"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleOpenAddProgram}
              >
                <FaPlus /> Add Program
              </button>
            </div>
            {error && <div className="mb-4 text-center text-red-500">{error}</div>}
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading programs...</div>
            ) : (
              Array.isArray(programs) && programs.length > 0 ? (
                <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Coaches</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {programs.map(program => (
                        <tr
                          key={program.id}
                          className="hover:bg-gray-50 transition cursor-pointer"
                          onClick={() => router.push(`/admin/programmanagement/programdetails?id=${program.id}`)}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{program.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{program.description}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{getCoachNames(program.coaches).join(', ') || <em>None</em>}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {sessions.filter(s => s.programId === program.id).length === 0
                              ? <em>None</em>
                              : sessions.filter(s => s.programId === program.id).map(s => s.name).join(', ')
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <span className="inline-flex gap-2 justify-end">
                            <button
                              type="button"
                              className="p-2 rounded hover:bg-blue-100 text-blue-600"
                              title="Edit Program"
                              onClick={e => { e.stopPropagation(); handleOpenEditProgram(program); }}
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="p-2 rounded hover:bg-green-100 text-green-600"
                              title="Add Session"
                              onClick={e => { e.stopPropagation(); handleOpenAddSession(program.id); }}
                            >
                              <FaPlus />
                            </button>
                            <button
                              type="button"
                              className="p-2 rounded hover:bg-red-100 text-red-600"
                              title="Delete Program"
                              onClick={e => { e.stopPropagation(); handleDeleteProgram(program.id); }}
                            >
                              <DeleteIcon sx={{ fontSize: 18 }} />
                            </button>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No programs found.</div>
              )
            )}
          </div>
        </main>
      </div>
        {/* Add/Edit Program Dialog */}
        <Dialog
          open={showProgramDialog}
          onClose={() => {
            setShowProgramDialog(false);
            setTimeout(() => {
              addButtonRef.current?.focus();
            }, 0);
          }}
        >
          <DialogTitle>{selectedProgram ? 'Edit Program' : 'Add Program'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Program Title"
              type="text"
              fullWidth
              variant="outlined"
              value={programForm.title}
              onChange={handleProgramFormChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              minRows={3}
              variant="outlined"
              value={programForm.description}
              onChange={handleProgramFormChange}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowProgramDialog(false)} color="secondary">Cancel</Button>
            <Button onClick={handleSaveProgram} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
        {/* Add/Edit Session Dialog */}
        <Dialog open={showSessionDialog} onClose={() => setShowSessionDialog(false)}>
          <DialogTitle>{selectedSession ? 'Edit Session' : 'Add Session'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Session Name"
              type="text"
              fullWidth
              variant="outlined"
              value={sessionForm.name}
              onChange={handleSessionFormChange}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="session-type-select-label">Session Type</InputLabel>
              <Select
                labelId="session-type-select-label"
                name="type"
                value={sessionForm.type}
                label="Session Type"
                onChange={handleSessionFormChange}
              >
                <MenuItem value="One-on-One Session">One-on-One Session</MenuItem>
                <MenuItem value="Fireteam Session">Fireteam Session</MenuItem>
                <MenuItem value="Fireteam Recap">Fireteam Recap</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="program-select-label">Program</InputLabel>
              <Select
                labelId="program-select-label"
                name="programId"
                value={sessionForm.programId}
                label="Program"
                onChange={handleSessionFormChange}
                disabled={!!selectedSession}
              >
                {programs.map(program => (
                  <MenuItem value={program.id} key={program.id}>{program.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Autocomplete
              multiple
              options={coaches}
              getOptionLabel={option => option.name}
              value={coaches.filter(c => sessionForm.coaches.includes(c.id))}
              onChange={handleSessionCoachChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option.name} {...getTagProps({ index })} key={option.id} />
                ))
              }
              renderInput={params => (
                <TextField {...params} variant="outlined" label="Assign Coaches" placeholder="Select coaches" />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSessionDialog(false)} color="secondary">Cancel</Button>
            <Button onClick={handleSaveSession} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
