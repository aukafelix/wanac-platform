"use client";
import { useState, useEffect } from "react";
import AdminSidebar from '../../../../../components/dashboardcomponents/adminsidebar';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Typography, Box, IconButton, Autocomplete, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tabs, Tab, Chip, Avatar } from '@mui/material';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { clientsService } from '../../../../services/api/clients.service';

const mockCoaches = [
  { id: 'c1', name: "Jane Doe", email: "jane@wanac.org", role: "coach" },
  { id: 'c2', name: "John Smith", email: "john@wanac.org", role: "coach" },
  { id: 'c3', name: "Alice Brown", email: "alice@wanac.org", role: "coach" },
];

export default function FireteamAdminManagementPage() {
  const [fireteams, setFireteams] = useState([]);
  const [selectedFireteam, setSelectedFireteam] = useState(null);
  const [showFireteamDialog, setShowFireteamDialog] = useState(false);
  const [fireteamForm, setFireteamForm] = useState({ name: '', description: '', members: [], admin: '', type: 'client' });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [clients, setClients] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    clientsService.getClients().then((data) => {
      if (Array.isArray(data)) {
        setClients(data.map(u => ({ ...u, role: 'client' })));
      } else if (data && typeof data === 'object') {
        setClients(Object.values(data).map(u => ({ ...u, role: 'client' })));
      } else {
        setClients([]);
      }
    });
    // Simulate fetching coaches (replace with real API if available)
    setCoaches(mockCoaches);
  }, []);

  const allUsers = [...clients, ...coaches];

  // Handlers for Fireteams
  const handleOpenAddFireteam = () => {
    setFireteamForm({ name: '', description: '', members: [], admin: '', type: 'client' });
    setSelectedFireteam(null);
    setShowFireteamDialog(true);
  };
  const handleOpenEditFireteam = (fireteam) => {
    setFireteamForm({
      name: fireteam.name,
      description: fireteam.description,
      members: fireteam.members || [],
      admin: fireteam.admin || '',
      type: fireteam.type || 'client',
    });
    setSelectedFireteam(fireteam);
    setShowFireteamDialog(true);
  };
  const handleFireteamFormChange = (e) => {
    setFireteamForm({ ...fireteamForm, [e.target.name]: e.target.value });
  };
  const handleTypeChange = (e) => {
    setFireteamForm({ ...fireteamForm, type: e.target.value, members: [], admin: '' });
  };
  const handleMembersChange = (event, value) => {
    setFireteamForm(form => ({ ...form, members: value.map(u => u.id), admin: value.find(u => u.id === form.admin) ? form.admin : '' }));
  };
  const handleAdminChange = (e) => {
    setFireteamForm({ ...fireteamForm, admin: e.target.value });
  };
  const handleSaveFireteam = () => {
    if (selectedFireteam) {
      setFireteams(fireteams.map(f => f.id === selectedFireteam.id ? { ...f, ...fireteamForm } : f));
    } else {
      setFireteams([...fireteams, { id: Date.now(), ...fireteamForm }]);
    }
    setShowFireteamDialog(false);
  };
  const handleOpenDeleteFireteam = (fireteam) => {
    setSelectedFireteam(fireteam);
    setShowDeleteDialog(true);
  };
  const handleDeleteFireteam = () => {
    setFireteams(fireteams.filter(f => f.id !== selectedFireteam.id));
    setShowDeleteDialog(false);
    setSelectedFireteam(null);
  };
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Filter fireteams by type
  const filteredFireteams = tab === 'all' ? fireteams : fireteams.filter(f => f.type === tab);
  const userOptions = fireteamForm.type === 'coach' ? coaches : clients;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 md:ml-56">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h5" className="font-bold">Fireteam Management</Typography>
          <Button variant="contained" color="primary" startIcon={<FaPlus />} onClick={handleOpenAddFireteam}>
            Add Fireteam
          </Button>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={handleTabChange} aria-label="fireteam type tabs">
            <Tab label="All" value="all" />
            <Tab label="Client Fireteams" value="client" />
            <Tab label="Coach Fireteams" value="coach" />
          </Tabs>
        </Box>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Members</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFireteams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No fireteams found.</TableCell>
                </TableRow>
              ) : filteredFireteams.map((fireteam) => (
                <TableRow key={fireteam.id}>
                  <TableCell>{fireteam.name}</TableCell>
                  <TableCell>{fireteam.description}</TableCell>
                  <TableCell>
                    <Chip label={fireteam.type === 'coach' ? 'Coach' : 'Client'} color={fireteam.type === 'coach' ? 'secondary' : 'primary'} size="small" />
                  </TableCell>
                  <TableCell>
                    {fireteam.members?.map(memberId => {
                      const user = allUsers.find(u => u.id === memberId);
                      return user ? (
                        <Chip
                          key={user.id}
                          avatar={<Avatar>{user.name[0]}</Avatar>}
                          label={user.name}
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ) : null;
                    })}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const adminUser = allUsers.find(u => u.id === fireteam.admin);
                      return adminUser ? (
                        <Chip
                          avatar={<Avatar>{adminUser.name[0]}</Avatar>}
                          label={adminUser.name}
                          color="primary"
                        />
                      ) : '--';
                    })()}
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenEditFireteam(fireteam)}><FaEdit /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteFireteam(fireteam)}><FaTrash /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Fireteam Dialog */}
        <Dialog open={showFireteamDialog} onClose={() => setShowFireteamDialog(false)} maxWidth="xs" fullWidth scroll="paper">
          <DialogTitle>{selectedFireteam ? 'Edit Fireteam' : 'Add Fireteam'}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField
                label="Fireteam Name"
                name="name"
                value={fireteamForm.name}
                onChange={handleFireteamFormChange}
                fullWidth
                autoFocus
                variant="outlined"
                required
              />
              <TextField
                label="Description"
                name="description"
                value={fireteamForm.description}
                onChange={handleFireteamFormChange}
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                variant="outlined"
              />
              <FormControl fullWidth>
                <InputLabel id="type-label">Fireteam Type</InputLabel>
                <Select
                  labelId="type-label"
                  value={fireteamForm.type}
                  label="Fireteam Type"
                  onChange={handleTypeChange}
                >
                  <MenuItem value="client">Client</MenuItem>
                  <MenuItem value="coach">Coach</MenuItem>
                </Select>
              </FormControl>
              <Autocomplete
                multiple
                options={userOptions}
                getOptionLabel={option => option.name}
                value={userOptions.filter(u => fireteamForm.members.includes(u.id))}
                onChange={handleMembersChange}
                renderInput={(params) => <TextField {...params} label="Members" placeholder="Select members" />}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                disableCloseOnSelect
              />
              <FormControl fullWidth>
                <InputLabel id="admin-label">Admin</InputLabel>
                <Select
                  labelId="admin-label"
                  value={fireteamForm.admin}
                  label="Admin"
                  onChange={handleAdminChange}
                  disabled={fireteamForm.members.length === 0}
                >
                  {userOptions.filter(u => fireteamForm.members.includes(u.id)).map(user => (
                    <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setShowFireteamDialog(false)} color="inherit">Cancel</Button>
            <Button onClick={handleSaveFireteam} variant="contained" color="primary" disabled={!fireteamForm.name.trim() || !fireteamForm.admin || fireteamForm.members.length === 0}>
              {selectedFireteam ? 'Save Changes' : 'Add Fireteam'}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete Dialog */}
        <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
          <DialogTitle>Delete Fireteam</DialogTitle>
          <DialogContent>
            Are you sure you want to delete the fireteam "{selectedFireteam?.name}"?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleDeleteFireteam} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}
