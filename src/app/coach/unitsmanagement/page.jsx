"use client";
import { useState } from "react";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { FaLayerGroup, FaPlus, FaEdit } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LinkIcon from '@mui/icons-material/Link';

// Mock data for units
const mockUnitsInit = [
  { id: 1, name: "Unit 1: Foundations", resources: [
    { type: 'link', title: 'Intro Slides', url: 'https://example.com/intro' },
    { type: 'document', title: 'Handout', file: { name: 'handout.pdf' } }
  ] },
  { id: 2, name: "Unit 2: Practice", resources: [
    { type: 'link', title: 'Practice Video', url: 'https://example.com/video' }
  ] },
];

export default function UnitsManagementPage() {
  const [user, setUser] = useState({ name: "Coach" });
  const [units, setUnits] = useState([...mockUnitsInit]);
  const [showAddEditUnit, setShowAddEditUnit] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [unitForm, setUnitForm] = useState({ name: '', resources: [] });
  const [newResource, setNewResource] = useState({ type: 'link', title: '', url: '', file: null });

  // Handlers
  const handleOpenAddUnit = () => {
    setUnitForm({ name: '', resources: [] });
    setNewResource({ type: 'link', title: '', url: '', file: null });
    setEditIdx(null);
    setShowAddEditUnit(true);
  };
  const handleOpenEditUnit = (unit, idx) => {
    setUnitForm({ name: unit.name, resources: [...unit.resources] });
    setNewResource({ type: 'link', title: '', url: '', file: null });
    setEditIdx(idx);
    setShowAddEditUnit(true);
  };
  const handleUnitFormChange = (e) => {
    setUnitForm({ ...unitForm, [e.target.name]: e.target.value });
  };
  const handleResourceTypeChange = (e, val) => {
    if (val) setNewResource({ ...newResource, type: val, url: '', file: null });
  };
  const handleResourceChange = (e) => {
    setNewResource({ ...newResource, [e.target.name]: e.target.value });
  };
  const handleResourceFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewResource({ ...newResource, file: e.target.files[0], url: '' });
    }
  };
  const handleAddResource = () => {
    if (newResource.type === 'link' && newResource.title && newResource.url) {
      setUnitForm({
        ...unitForm,
        resources: [...unitForm.resources, { type: 'link', title: newResource.title, url: newResource.url }],
      });
      setNewResource({ type: 'link', title: '', url: '', file: null });
    } else if (newResource.type === 'document' && newResource.title && newResource.file) {
      setUnitForm({
        ...unitForm,
        resources: [...unitForm.resources, { type: 'document', title: newResource.title, file: newResource.file }],
      });
      setNewResource({ type: 'link', title: '', url: '', file: null });
    }
  };
  const handleRemoveResource = (idx) => {
    setUnitForm({
      ...unitForm,
      resources: unitForm.resources.filter((_, i) => i !== idx),
    });
  };
  const handleSaveUnit = () => {
    if (editIdx === null) {
      setUnits([...units, { id: Date.now(), name: unitForm.name, resources: unitForm.resources }]);
    } else {
      setUnits(units.map((u, i) => i === editIdx ? { ...u, name: unitForm.name, resources: unitForm.resources } : u));
    }
    setShowAddEditUnit(false);
  };
  const handleDeleteUnit = (idx) => {
    setUnits(units.filter((_, i) => i !== idx));
  };

  return (
    <div className="h-screen flex bg-white font-body text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Sidebar */}
      <CoachSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-8 py-4 md:py-6 bg-muted">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Units Management */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <FaLayerGroup className="text-green-600" />
                <h2 className="text-xl font-bold text-heading">Units Management</h2>
                <button className="ml-auto bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-600" onClick={handleOpenAddUnit}>
                  <FaPlus /> Add Unit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {units.length === 0 ? (
                  <div className="col-span-full text-gray-500">No units found.</div>
                ) : (
                  units.map((unit, idx) => (
                    <div key={unit.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-base">{unit.name}</span>
                        <button className="ml-auto text-green-500 hover:text-green-700" onClick={() => handleOpenEditUnit(unit, idx)} title="Edit Unit">
                          <FaEdit />
                        </button>
                        <IconButton aria-label="delete" color="error" onClick={() => handleDeleteUnit(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                      <div className="text-xs text-gray-600">Resources: {unit.resources.length}</div>
                      <div className="flex flex-col gap-1 mt-1">
                        {unit.resources.map((res, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            <span className="font-semibold">{res.title}</span>
                            {res.type === 'link' ? (
                              <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">[Link]</a>
                            ) : (
                              <span className="text-gray-500">[Document: {res.file?.name || 'file'}]</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
            {/* Add/Edit Unit Modal */}
            <Dialog open={showAddEditUnit} onClose={() => setShowAddEditUnit(false)}>
              <DialogTitle>{editIdx === null ? 'Add Unit' : 'Edit Unit'}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  label="Unit Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={unitForm.name}
                  onChange={handleUnitFormChange}
                  sx={{ mb: 2 }}
                />
                {/* Resource Management */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 500, marginBottom: 8 }}>Resources</div>
                  <Stack spacing={1}>
                    {unitForm.resources.map((resource, idx) => (
                      <Stack direction="row" spacing={1} alignItems="center" key={idx}>
                        <TextField
                          value={resource.title}
                          label="Title"
                          size="small"
                          InputProps={{ readOnly: true }}
                          sx={{ flex: 1 }}
                        />
                        {resource.type === 'link' ? (
                          <TextField
                            value={resource.url}
                            label="URL"
                            size="small"
                            InputProps={{ readOnly: true }}
                            sx={{ flex: 2 }}
                          />
                        ) : (
                          <Button
                            variant="outlined"
                            startIcon={<AttachFileIcon />}
                            component="a"
                            href={resource.file ? (resource.file.url || '#') : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ flex: 2, textTransform: 'none', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                          >
                            {resource.file ? resource.file.name : 'Document'}
                          </Button>
                        )}
                        <IconButton aria-label="delete" color="error" onClick={() => handleRemoveResource(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    ))}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        name="title"
                        label="Title"
                        size="small"
                        value={newResource.title}
                        onChange={handleResourceChange}
                        sx={{ flex: 1 }}
                      />
                      <ToggleButtonGroup
                        value={newResource.type}
                        exclusive
                        onChange={handleResourceTypeChange}
                        sx={{ flex: 1 }}
                        size="small"
                      >
                        <ToggleButton value="link" aria-label="Link" sx={{ textTransform: 'none' }}>
                          <LinkIcon fontSize="small" sx={{ mr: 0.5 }} /> Link
                        </ToggleButton>
                        <ToggleButton value="document" aria-label="Document" sx={{ textTransform: 'none' }}>
                          <AttachFileIcon fontSize="small" sx={{ mr: 0.5 }} /> Document
                        </ToggleButton>
                      </ToggleButtonGroup>
                      {newResource.type === 'link' ? (
                        <TextField
                          name="url"
                          label="URL"
                          size="small"
                          value={newResource.url}
                          onChange={handleResourceChange}
                          sx={{ flex: 2 }}
                        />
                      ) : (
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<AttachFileIcon />}
                          sx={{ flex: 2, minWidth: 0 }}
                        >
                          {newResource.file ? newResource.file.name : 'Upload'}
                          <input
                            type="file"
                            hidden
                            onChange={handleResourceFileChange}
                          />
                        </Button>
                      )}
                      <Button onClick={handleAddResource} variant="outlined" color="primary" size="small" sx={{ height: 40 }}>
                        Add
                      </Button>
                    </Stack>
                  </Stack>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowAddEditUnit(false)} color="secondary">Cancel</Button>
                <Button onClick={handleSaveUnit} variant="contained" color="primary">Save</Button>
              </DialogActions>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}
