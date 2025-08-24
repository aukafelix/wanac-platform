"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from '../../../../../components/dashboardcomponents/adminsidebar';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Typography, Box, IconButton, Autocomplete, Chip, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { FaUsers, FaEdit, FaPlus, FaUserTie } from "react-icons/fa";
import { ProgramsService } from '../../../../services/api/programs.service';
import { clientsService } from '../../../../services/api/clients.service';

// Remove mock data
// const mockCoaches = [
//   { id: 1, name: "Jane Doe", email: "jane@wanac.org" },
//   { id: 2, name: "John Smith", email: "john@wanac.org" },
//   { id: 3, name: "Alice Brown", email: "alice@wanac.org" },
// ];
// const mockCohortsInit = [
//   { id: 1, name: "Cohort Alpha", description: "First cohort", coaches: [1], clients: [101, 102] },
//   { id: 2, name: "Cohort Beta", description: "Second cohort", coaches: [2, 3], clients: [103] },
// ];

export default function AdminCohortManagementPage() {
  const [cohorts, setCohorts] = useState([]); // Will be populated from API in the future
  const [coaches, setCoaches] = useState([]); // TODO: Populate from API when available
  const [clients, setClients] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [showCohortDialog, setShowCohortDialog] = useState(false);
  const [cohortForm, setCohortForm] = useState({ program_id: '', name: '', description: '', coaches: [], clients: [] });
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await ProgramsService.getAll();
        let programsArray = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : (Array.isArray(data.programs) ? data.programs : []));
        setPrograms(programsArray);
      } catch (err) {
        setPrograms([]);
      }
    };
    fetchPrograms();
    async function fetchClients() {
      try {
        const data = await clientsService.getClients();
        const clientArray = Array.isArray(data.clients) ? data.clients : [];
        const mappedClients = clientArray.map(client => ({
          id: client.user?.id || client.user_id,
          name: client.user?.name || 'Unknown',
          email: client.user?.email || ''
        }));
        setClients(mappedClients);
      } catch (error) {
        setClients([]);
      }
    }
    fetchClients();
    // TODO: Fetch coaches from API when endpoint is available
  }, []);

  // Handlers
  const handleOpenAddCohort = () => {
    setCohortForm({ program_id: '', name: '', description: '', coaches: [], clients: [] });
    setSelectedCohort(null);
    setShowCohortDialog(true);
  };
  const handleOpenEditCohort = (cohort) => {
    setCohortForm({ program_id: cohort.program_id || '', name: cohort.name, description: cohort.description, coaches: cohort.coaches, clients: cohort.clients });
    setSelectedCohort(cohort);
    setShowCohortDialog(true);
  };
  const handleCohortFormChange = (e) => {
    setCohortForm({ ...cohortForm, [e.target.name]: e.target.value });
  };
  const handleCohortCoachChange = (event, value) => {
    setCohortForm({ ...cohortForm, coaches: value.map(c => c.id) });
  };
  const handleCohortClientChange = (event, value) => {
    setCohortForm({ ...cohortForm, clients: value.map(c => c.id) });
  };
  // Add cohort to API
  const addCohort = async ({ program_id, name, description, coaches, clients }) => {
    const response = await axios.post(
      "https://wanac-api.kuzasports.com/api/v1/programs/cohort/add",
      {
        program_id,
        name,
        description,
        coaches, // array of coach IDs
        clients, // array of client IDs
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  };

  // Add members to cohort API
  const addCohortMembers = async (cohortId, memberIds) => {
    const response = await axios.post(
      "https://wanac-api.kuzasports.com/api/v1/programs/cohort-member/add",
      {
        cohort_id: cohortId,
        members: memberIds, // array of user IDs
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  };
  const handleSaveCohort = async () => {
    if (selectedCohort) {
      setCohorts(cohorts.map(c => c.id === selectedCohort.id ? { ...c, ...cohortForm } : c));
      setShowCohortDialog(false);
    } else {
      try {
        // 1. Create cohort
        const cohortRes = await addCohort(cohortForm);
        // 2. Add members to cohort (clients + coaches)
        if (cohortRes && cohortRes.id) {
          const allMembers = [...(cohortForm.clients || []), ...(cohortForm.coaches || [])];
          if (allMembers.length > 0) {
            await addCohortMembers(cohortRes.id, allMembers);
          }
        }
        // Optionally, fetch updated cohorts from API here
        setShowCohortDialog(false);
        console.log("Cohort and members added successfully");
      } catch (error) {
        // Handle error (show message to user, etc.)
        console.error("Failed to add cohort or members:", error);
      }
    }
  };
  // Helper to get names from IDs
  const getCoachNames = (ids) => ids.map(id => coaches.find(c => c.id === id)?.name).filter(Boolean);
  const getClientNames = (ids) => ids.map(id => clients.find(c => c.id === id)?.name).filter(Boolean);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-16 md:ml-56">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Cohort Management</Typography>
        <Button variant="contained" color="primary" startIcon={<FaPlus />} sx={{ mb: 3 }} onClick={handleOpenAddCohort}>
          Add Cohort
        </Button>
        <Stack spacing={3}>
          {cohorts.map(cohort => (
            <Box key={cohort.id} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <FaUsers size={24} />
                <Typography variant="h6" sx={{ flex: 1 }}>{cohort.name}</Typography>
                <Button size="small" variant="outlined" startIcon={<FaEdit />} onClick={() => handleOpenEditCohort(cohort)}>Edit</Button>
              </Stack>
              <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>Description: {cohort.description}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Assigned Coaches: {getCoachNames(cohort.coaches).join(', ') || <em>None</em>}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Assigned Clients: {getClientNames(cohort.clients).join(', ') || <em>None</em>}</Typography>
            </Box>
          ))}
        </Stack>
        {/* Add/Edit Cohort Dialog */}
        <Dialog open={showCohortDialog} onClose={() => setShowCohortDialog(false)}>
          <DialogTitle>{selectedCohort ? 'Edit Cohort' : 'Add Cohort'}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="program-select-label">Program</InputLabel>
              <Select
                labelId="program-select-label"
                name="program_id"
                value={cohortForm.program_id}
                label="Program"
                onChange={handleCohortFormChange}
              >
                {programs.map(program => (
                  <MenuItem value={program.id} key={program.id}>{program.title || program.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Cohort Name"
              type="text"
              fullWidth
              variant="outlined"
              value={cohortForm.name}
              onChange={handleCohortFormChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={cohortForm.description}
              onChange={handleCohortFormChange}
              sx={{ mb: 2 }}
            />
            <Autocomplete
              multiple
              options={coaches}
              getOptionLabel={option => option.name}
              value={coaches.filter(c => cohortForm.coaches.includes(c.id))}
              onChange={handleCohortCoachChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option.name} {...getTagProps({ index })} key={option.id} />
                ))
              }
              renderInput={params => (
                <TextField {...params} variant="outlined" label="Assign Coaches" placeholder="Select coaches" />
              )}
              sx={{ mb: 2 }}
            />
            <Autocomplete
              multiple
              options={clients}
              getOptionLabel={option => option.name}
              value={clients.filter(c => cohortForm.clients.includes(c.id))}
              onChange={(event, value) => setCohortForm({ ...cohortForm, clients: value.map(c => c.id) })}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option.name} {...getTagProps({ index })} key={option.id} />
                ))
              }
              renderInput={params => (
                <TextField {...params} variant="outlined" label="Assign Clients" placeholder="Select clients" />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCohortDialog(false)} color="secondary">Cancel</Button>
            <Button onClick={handleSaveCohort} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}
