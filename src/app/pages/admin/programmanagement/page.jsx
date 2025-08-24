"use client";
import { useState, useEffect, useRef } from "react";
import AdminSidebar from '../../../../../components/dashboardcomponents/adminsidebar';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Stack, Select, MenuItem, InputLabel, FormControl, Autocomplete, Chip, Box, Typography } from '@mui/material';
import { FaBook, FaEdit, FaPlus, FaUsers, FaLayerGroup, FaUser } from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ProgramsService } from '../../../../services/api/programs.service';

// Remove mock data
// const mockCoaches = [
//   { id: 1, name: "Jane Doe", email: "jane@wanac.org" },
//   { id: 2, name: "John Smith", email: "john@wanac.org" },
//   { id: 3, name: "Alice Brown", email: "alice@wanac.org" },
// ];
// const mockCoursesInit = [
//   { id: 1, name: "Leadership 101", syllabus: "Intro to Leadership", coaches: [1], units: [1, 2] },
//   { id: 2, name: "Resilience Training", syllabus: "Building Resilience", coaches: [], units: [3] },
// ];
// const mockUnitsInit = [
//   { id: 1, courseId: 1, name: "Unit 1: Foundations", coaches: [2] },
//   { id: 2, courseId: 1, name: "Unit 2: Practice", coaches: [] },
//   { id: 3, courseId: 2, name: "Unit 1: Mindset", coaches: [1, 3] },
// ];

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
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-16 md:ml-56">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Program Management</Typography>
        <Button
          ref={addButtonRef}
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          sx={{ mb: 3 }}
          onClick={handleOpenAddProgram}
        >
          Add Program
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        {loading ? (
          <Typography>Loading programs...</Typography>
        ) : (
          Array.isArray(programs) && programs.length > 0 ? (
            <Stack spacing={3}>
              {programs.map(program => (
                <Box key={program.id} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <FaBook size={24} />
                    <Typography variant="h6" sx={{ flex: 1 }}>{program.title}</Typography>
                    <Button size="small" variant="outlined" startIcon={<FaEdit />} onClick={() => handleOpenEditProgram(program)}>Edit</Button>
                    <Button size="small" variant="contained" color="success" startIcon={<FaPlus />} onClick={() => handleOpenAddSession(program.id)}>Add Session</Button>
                    <IconButton aria-label="delete" color="error" onClick={() => handleDeleteProgram(program.id)}><DeleteIcon /></IconButton>
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 1 }}>Assigned Coaches: {getCoachNames(program.coaches).join(', ') || <em>None</em>}</Typography>
                  <Box sx={{ mt: 2, ml: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}><FaLayerGroup style={{ marginRight: 6 }} />Sessions</Typography>
                    <Stack spacing={1}>
                      {sessions.filter(s => s.programId === program.id).length === 0 && (
                        <Typography variant="body2" color="text.secondary">No sessions for this program.</Typography>
                      )}
                      {sessions.filter(s => s.programId === program.id).map(session => (
                        <Box key={session.id} sx={{ border: '1px solid #f0f0f0', borderRadius: 1, p: 2, bgcolor: '#fafafa' }}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <FaLayerGroup size={18} />
                            <Typography variant="body2" sx={{ flex: 1 }}>{session.name} <em>({session.type})</em></Typography>
                            <Button size="small" variant="outlined" startIcon={<FaEdit />} onClick={() => handleOpenEditSession(session)}>Edit</Button>
                          </Stack>
                          <Typography variant="body2" sx={{ mt: 1 }}>Assigned Coaches: {getCoachNames(session.coaches).join(', ') || <em>None</em>}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography>No programs found.</Typography>
          )
        )}
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
      </main>
    </div>
  );
}
