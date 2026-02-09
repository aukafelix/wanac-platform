"use client";
import { useState, useEffect } from "react";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { FaBook, FaEdit, FaPlus, FaUsers, FaLayerGroup, FaBullhorn, FaClipboardList, FaUser, FaChartLine } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LinkIcon from '@mui/icons-material/Link';
import { ProgramsService } from '../../../services/api/programs.service';
import { cohortService } from '../../../services/api/cohort.service';
import { clientsService } from '../../../services/api/clients.service';
import { MARKETING_PROGRAMS } from '../../../data/marketingPrograms';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Map marketing programs to same shape as API (id, title, description); used when API returns no programs
const getPreFillPrograms = () =>
  MARKETING_PROGRAMS.map((p, i) => ({
    id: `prefill-${i}`,
    title: p.title,
    name: p.title,
    description: p.desc || p.description || '',
  }));

// Data comes from API services (Programs, Cohorts); pre-fills from marketing when API is empty

export default function CourseManagementPage() {
  const [user, setUser] = useState({ name: "Coach" });
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programUnits, setProgramUnits] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddEditCourse, setShowAddEditCourse] = useState(false);
  const [showAddEditUnit, setShowAddEditUnit] = useState(false);
  const [courseForm, setCourseForm] = useState({ name: '', syllabus: '', resources: [] });
  const [newResource, setNewResource] = useState({ type: 'link', title: '', url: '', file: null });
  const [unitForm, setUnitForm] = useState({ name: '', resources: [] });
  const [newUnitResource, setNewUnitResource] = useState({ type: 'link', title: '', url: '', file: null });
  const [showAddCohortDialog, setShowAddCohortDialog] = useState(false);
  const [cohortForm, setCohortForm] = useState({ name: '', description: '', start_date: '', end_date: '' });
  const [showCohortDialog, setShowCohortDialog] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [clients, setClients] = useState([]);
  const [showAddClientDialog, setShowAddClientDialog] = useState(false);
  const [selectedClientIdToAdd, setSelectedClientIdToAdd] = useState('');
  const [editingProgramId, setEditingProgramId] = useState(null); // null = add, id = edit

  // Fetch programs and cohorts; pre-fill with marketing programs when API returns none
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ProgramsService.getAll();
        let programsArray = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : (Array.isArray(data.programs) ? data.programs : []));
        if (!programsArray || programsArray.length === 0) {
          programsArray = getPreFillPrograms();
        }
        setPrograms(programsArray);
        if (programsArray.length > 0 && !selectedProgram) {
          setSelectedProgram(programsArray[0]);
        }
      } catch (e) {
        setError('Failed to fetch programs');
        const prefill = getPreFillPrograms();
        setPrograms(prefill);
        setSelectedProgram(prefill[0] || null);
      } finally {
        setLoading(false);
      }
    };
    const fetchCohorts = async () => {
      try {
        const data = await cohortService.getCohorts();
        const cohortArray = Array.isArray(data) ? data : (Array.isArray(data.cohorts) ? data.cohorts : []);
        setCohorts(cohortArray);
      } catch (e) {
        setCohorts([]);
      }
    };
    fetchData();
    fetchCohorts();
  }, []);

  // Fetch units when selected program changes (skip API for prefill programs)
  useEffect(() => {
    const fetchUnits = async () => {
      if (!selectedProgram) {
        setProgramUnits([]);
        return;
      }
      const isPreFill = String(selectedProgram.id).startsWith('prefill-');
      if (isPreFill) {
        setProgramUnits([]);
        return;
      }
      try {
        const units = await ProgramsService.getUnitsByProgramId(selectedProgram.id);
        setProgramUnits(Array.isArray(units) ? units : []);
      } catch (e) {
        setProgramUnits([]);
      }
    };
    fetchUnits();
  }, [selectedProgram]);

  // Handler functions must be defined before return
  const handleOpenAddCourse = () => {
    setEditingProgramId(null);
    setCourseForm({ name: '', syllabus: '', resources: [] });
    setNewResource({ type: 'link', title: '', url: '', file: null });
    setShowAddEditCourse(true);
  };
  const handleOpenEditCourse = (program) => {
    setEditingProgramId(program.id);
    setCourseForm({
      name: program.title || program.name || '',
      syllabus: program.description || '',
      resources: Array.isArray(program.resources) ? program.resources : [],
    });
    setNewResource({ type: 'link', title: '', url: '', file: null });
    setShowAddEditCourse(true);
  };
  const handleCourseFormChange = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };
  const handleResourceTypeChange = (e) => {
    setNewResource({ ...newResource, type: e.target.value, url: '', file: null });
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
      setCourseForm({
        ...courseForm,
        resources: [...courseForm.resources, { type: 'link', title: newResource.title, url: newResource.url }],
      });
      setNewResource({ type: 'link', title: '', url: '', file: null });
    } else if (newResource.type === 'document' && newResource.title && newResource.file) {
      setCourseForm({
        ...courseForm,
        resources: [...courseForm.resources, { type: 'document', title: newResource.title, file: newResource.file }],
      });
      setNewResource({ type: 'link', title: '', url: '', file: null });
    }
  };
  const handleRemoveResource = (idx) => {
    setCourseForm({
      ...courseForm,
      resources: courseForm.resources.filter((_, i) => i !== idx),
    });
  };
  const handleSaveCourse = async () => {
    const title = (courseForm.name || '').trim();
    if (!title) return;
    try {
      if (editingProgramId) {
        const isPreFill = String(editingProgramId).startsWith('prefill-');
        if (isPreFill) {
          setPrograms((prev) =>
            prev.map((p) =>
              p.id === editingProgramId
                ? { ...p, title, name: title, description: courseForm.syllabus || '' }
                : p
            )
          );
        } else {
          await ProgramsService.update(editingProgramId, {
            title,
            description: courseForm.syllabus || '',
          });
          const data = await ProgramsService.getAll();
          const programsArray = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : (Array.isArray(data.programs) ? data.programs : []));
          setPrograms(programsArray.length > 0 ? programsArray : getPreFillPrograms());
        }
      } else {
        await ProgramsService.create({
          title,
          description: courseForm.syllabus || '',
        });
        const data = await ProgramsService.getAll();
        const programsArray = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : (Array.isArray(data.programs) ? data.programs : []));
        setPrograms(programsArray.length > 0 ? programsArray : getPreFillPrograms());
      }
      setShowAddEditCourse(false);
      setEditingProgramId(null);
    } catch (e) {
      setError('Failed to save program');
    }
  };

  const handleRemoveProgram = async (program, e) => {
    e?.stopPropagation();
    const isPreFill = String(program.id).startsWith('prefill-');
    if (isPreFill) {
      setPrograms((prev) => {
        const next = prev.filter((p) => p.id !== program.id);
        if (selectedProgram?.id === program.id) setSelectedProgram(next[0] || null);
        return next;
      });
      return;
    }
    try {
      await ProgramsService.delete(program.id);
      setPrograms((prev) => {
        const next = prev.filter((p) => p.id !== program.id);
        if (selectedProgram?.id === program.id) setSelectedProgram(next[0] || null);
        return next.length > 0 ? next : getPreFillPrograms();
      });
    } catch (err) {
      setError('Failed to delete program');
    }
  };

  const handleOpenAddUnit = () => {
    setUnitForm({ name: '', resources: [] });
    setNewUnitResource({ type: 'link', title: '', url: '', file: null });
    setShowAddEditUnit(true);
  };
  const handleUnitFormChange = (e) => {
    setUnitForm({ ...unitForm, [e.target.name]: e.target.value });
  };
  const handleUnitResourceTypeChange = (e, val) => {
    if (val) setNewUnitResource({ ...newUnitResource, type: val, url: '', file: null });
  };
  const handleUnitResourceChange = (e) => {
    setNewUnitResource({ ...newUnitResource, [e.target.name]: e.target.value });
  };
  const handleUnitResourceFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewUnitResource({ ...newUnitResource, file: e.target.files[0], url: '' });
    }
  };
  const handleAddUnitResource = () => {
    if (newUnitResource.type === 'link' && newUnitResource.title && newUnitResource.url) {
      setUnitForm({
        ...unitForm,
        resources: [...unitForm.resources, { type: 'link', title: newUnitResource.title, url: newUnitResource.url }],
      });
      setNewUnitResource({ type: 'link', title: '', url: '', file: null });
    } else if (newUnitResource.type === 'document' && newUnitResource.title && newUnitResource.file) {
      setUnitForm({
        ...unitForm,
        resources: [...unitForm.resources, { type: 'document', title: newUnitResource.title, file: newUnitResource.file }],
      });
      setNewUnitResource({ type: 'link', title: '', url: '', file: null });
    }
  };
  const handleRemoveUnitResource = (idx) => {
    setUnitForm({
      ...unitForm,
      resources: unitForm.resources.filter((_, i) => i !== idx),
    });
  };
  const handleSaveUnit = () => {
    // Here you would add logic to save the unit (API call or update state)
    setShowAddEditUnit(false);
  };

  // ——— Cohorts: Add cohort first, then add clients to it ———
  const handleOpenAddCohort = () => {
    setCohortForm({ name: '', description: '', start_date: '', end_date: '' });
    setShowAddCohortDialog(true);
  };
  const handleCohortFormChange = (e) => {
    setCohortForm({ ...cohortForm, [e.target.name]: e.target.value });
  };
  const handleSaveCohort = async () => {
    const name = (cohortForm.name || '').trim();
    if (!name || !selectedProgram) return;
    const isPreFill = String(selectedProgram.id).startsWith('prefill-');
    let programId = selectedProgram.id;
    const programTitle = selectedProgram.title || selectedProgram.name || '';
    try {
      if (isPreFill) {
        await ProgramsService.create({
          title: programTitle,
          description: selectedProgram.description || '',
        });
        const data = await ProgramsService.getAll();
        const programsArray = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : (Array.isArray(data.programs) ? data.programs : []));
        const createdProgram = programsArray.find(
          (p) => (p.title || p.name || '').trim() === programTitle.trim()
        );
        programId = createdProgram?.id ?? data?.id;
        if (programId == null) {
          setError('Program was created but could not find its id. Please refresh and try adding the cohort again.');
          return;
        }
        setPrograms(programsArray.length > 0 ? programsArray : getPreFillPrograms());
        setSelectedProgram(createdProgram ?? { id: programId, title: programTitle, name: programTitle, description: selectedProgram.description });
      }
      await cohortService.createCohort({
        program_id: programId,
        name,
        description: cohortForm.description || '',
        start_date: cohortForm.start_date || undefined,
        end_date: cohortForm.end_date || undefined,
      });
      const data = await cohortService.getCohorts();
      const cohortArray = Array.isArray(data) ? data : (Array.isArray(data.cohorts) ? data.cohorts : []);
      setCohorts(cohortArray);
      setShowAddCohortDialog(false);
      setError(null);
    } catch (e) {
      setError(isPreFill ? 'Failed to create program or cohort' : 'Failed to create cohort');
    }
  };

  const handleOpenCohortDetails = (cohort) => {
    setSelectedCohort(cohort);
    setShowCohortDialog(true);
  };
  const fetchClients = async () => {
    try {
      const data = await clientsService.getClients();
      const list = data?.clients ?? (Array.isArray(data) ? data : []);
      setClients(Array.isArray(list) ? list : []);
    } catch {
      setClients([]);
    }
  };
  const handleOpenAddClient = () => {
    setSelectedClientIdToAdd('');
    fetchClients();
    setShowAddClientDialog(true);
  };
  const handleSaveAddClient = async () => {
    if (!selectedCohort || !selectedClientIdToAdd) return;
    const clientId = Number(selectedClientIdToAdd);
    try {
      await cohortService.addCohortMember({
        cohort_id: selectedCohort.id,
        member_id: clientId,
        role: 'client',
      });
      const addedClient = clients.find(
        (c) => Number(c.id ?? c.user_id ?? c.user?.id) === clientId
      );
      const data = await cohortService.getCohorts();
      const cohortArray = Array.isArray(data) ? data : (Array.isArray(data.cohorts) ? data.cohorts : []);
      const cohortId = selectedCohort.id;
      if (addedClient) {
        const existingClients = Array.isArray(selectedCohort.clients) ? selectedCohort.clients : [];
        const mergedClients = [...existingClients, addedClient];
        const mergedCohort = { ...selectedCohort, clients: mergedClients };
        setCohorts(
          cohortArray.map((c) =>
            c.id === cohortId ? { ...c, clients: mergedClients } : c
          )
        );
        setSelectedCohort(mergedCohort);
      } else {
        setCohorts(cohortArray);
        const updatedFromApi = cohortArray.find((c) => c.id === cohortId);
        if (updatedFromApi) setSelectedCohort(updatedFromApi);
      }
      setShowAddClientDialog(false);
    } catch (e) {
      setError('Failed to add client to cohort');
    }
  };

  const cohortClientIds = Array.isArray(selectedCohort?.clients)
    ? selectedCohort.clients.map((c) => (typeof c === 'object' ? c.id ?? c.user_id : c))
    : [];
  const clientsNotInCohort = clients.filter(
    (c) => !cohortClientIds.includes(c.id ?? c.user_id ?? c.user?.id)
  );
  const clientOptions = clientsNotInCohort.length > 0 ? clientsNotInCohort : clients;

  // Filter cohorts by selected program
  const filteredCohorts = Array.isArray(cohorts) && selectedProgram
    ? cohorts.filter(c => c.program_id === selectedProgram.id)
    : [];

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
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Courses Overview */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-2">
            
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-heading">Programs Overview</h1>
                <button className="ml-auto bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600" onClick={handleOpenAddCourse}>
                  <FaPlus /> Add Course
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                  <div className="text-gray-500">Loading programs...</div>
                ) : (Array.isArray(programs) && programs.length > 0 ? (
                  programs.map(program => (
                    <div key={program.id} className={`bg-white border border-gray-100 rounded-xl p-4 shadow flex flex-col gap-2 ${selectedProgram && selectedProgram.id === program.id ? 'ring-2 ring-blue-400' : ''}`}
                      onClick={() => setSelectedProgram(program)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{program.title || program.name}</span>
                        <div className="ml-auto flex items-center gap-1">
                          <button className="text-blue-500 hover:text-blue-700 p-1" onClick={e => { e.stopPropagation(); handleOpenEditCourse(program); }} title="Edit Program">
                            <FaEdit />
                          </button>
                          <button className="text-red-500 hover:text-red-700 p-1" onClick={e => handleRemoveProgram(program, e)} title="Remove Program">
                            <DeleteIcon fontSize="small" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{program.description || '—'}</div>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>Units: {Array.isArray(programUnits) && selectedProgram && selectedProgram.id === program.id ? programUnits.length : 0}</span>
                        <span>Cohorts: {Array.isArray(cohorts) ? cohorts.filter(c => c.program_id === program.id).length : 0}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No programs found.</div>
                ))}
              </div>
            </section>

            {/* Units/Modules Management */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <FaLayerGroup className="text-green-600" />
                <h2 className="text-xl font-bold text-heading">Units/Modules</h2>
                <button className="ml-auto bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-600" onClick={handleOpenAddUnit}>
                  <FaPlus /> Add Unit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(!selectedProgram || !Array.isArray(programUnits) || programUnits.length === 0) ? (
                  <div className="col-span-full text-gray-500">No units for this program.</div>
                ) : (
                  programUnits.map(unit => (
                    <div key={unit.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-base">{unit.name}</span>
                        <button className="ml-auto text-green-500 hover:text-green-700" onClick={() => setShowAddEditUnit(true)} title="Edit Unit">
                          <FaEdit />
                        </button>
                      </div>
                      <div className="text-xs text-gray-600">{unit.description || '—'}</div>
                      <div className="flex gap-2 mt-1">
                        <button className="text-blue-500 hover:underline text-xs">Attach Resource</button>
                        <button className="text-blue-500 hover:underline text-xs">View Assignments</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Cohorts: Add cohort first, then add clients to it */}
            <section>
              <div className="flex items-center gap-3 mb-2">
                <FaUsers className="text-purple-600" />
                <h2 className="text-xl font-bold text-heading">Cohorts</h2>
                <button
                  className="ml-auto bg-purple-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleOpenAddCohort}
                  disabled={!selectedProgram}
                  title={!selectedProgram ? 'Select a program first' : 'Add a new cohort'}
                >
                  <FaPlus /> Add Cohort
                </button>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow">
                <div className="mb-2 font-semibold text-gray-700">{selectedProgram ? `Cohorts for ${selectedProgram.title || selectedProgram.name}` : 'Select a program to view cohorts'}</div>
                {!selectedProgram ? (
                  <div className="text-gray-500">Select a program above to create and manage cohorts.</div>
                ) : filteredCohorts.length === 0 ? (
                  <div className="text-gray-500">No cohorts yet. Click &quot;Add Cohort&quot; to create one, then add clients to it.</div>
                ) : (
                  <ul className="mb-0">
                    {filteredCohorts.map((cohort) => (
                      <li
                        key={cohort.id}
                        className="flex items-center gap-2 text-sm py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded px-1 -mx-1"
                        onClick={() => handleOpenCohortDetails(cohort)}
                      >
                        <FaUser className="text-gray-400 flex-shrink-0" />
                        <span className="font-medium">{cohort.name}</span>
                        <span className="ml-2 text-xs text-gray-500 truncate">{cohort.description || '—'}</span>
                        <span className="ml-auto text-xs text-gray-500 flex-shrink-0">
                          {Array.isArray(cohort.clients) ? cohort.clients.length : 0} client(s)
                        </span>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {cohort.start_date ? new Date(cohort.start_date).toLocaleDateString() : '—'}
                          {cohort.end_date ? ` – ${new Date(cohort.end_date).toLocaleDateString()}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
            {/* Cohort Details Modal — view cohort and add clients */}
            <Dialog open={showCohortDialog} onClose={() => setShowCohortDialog(false)} maxWidth="sm" fullWidth>
              <DialogTitle>{selectedCohort?.name || 'Cohort Details'}</DialogTitle>
              <DialogContent>
                <div className="space-y-3">
                  <div><span className="font-semibold">Description:</span> {selectedCohort?.description || '—'}</div>
                  <div><span className="font-semibold">Program:</span> {selectedProgram?.title || selectedProgram?.name || '—'}</div>
                  <div>
                    <span className="font-semibold">Dates:</span>{' '}
                    {selectedCohort?.start_date ? new Date(selectedCohort.start_date).toLocaleDateString() : '—'}
                    {selectedCohort?.end_date ? ` – ${new Date(selectedCohort.end_date).toLocaleDateString()}` : ''}
                  </div>
                  <div><span className="font-semibold">Coaches:</span> {Array.isArray(selectedCohort?.coaches) ? selectedCohort.coaches.length : 0}</div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">
                        Clients ({Array.isArray(selectedCohort?.clients) ? selectedCohort.clients.length : 0})
                      </span>
                      <Button size="small" variant="outlined" color="primary" startIcon={<FaPlus />} onClick={handleOpenAddClient}>
                        Add Client
                      </Button>
                    </div>
                    {(!selectedCohort?.clients || selectedCohort.clients.length === 0) ? (
                      <p className="text-sm text-gray-500">No clients yet. Click &quot;Add Client&quot; to add clients to this cohort.</p>
                    ) : (
                      <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                        {selectedCohort.clients.map((client) => {
                          const name = client?.user?.name ?? client?.name ?? client?.email ?? 'Unknown';
                          const email = client?.user?.email ?? client?.email ?? '';
                          return (
                            <li key={client?.id ?? client?.user_id ?? name} className="text-gray-800">
                              {name}{email ? ` — ${email}` : ''}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowCohortDialog(false)} color="secondary">Close</Button>
              </DialogActions>
            </Dialog>

            {/* Add Cohort Modal */}
            <Dialog open={showAddCohortDialog} onClose={() => setShowAddCohortDialog(false)} maxWidth="sm" fullWidth>
              <DialogTitle>Add Cohort</DialogTitle>
              <DialogContent>
                <p className="text-sm text-gray-600 mb-2">
                  Program: <strong>{selectedProgram?.title || selectedProgram?.name || '—'}</strong>
                </p>
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
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={2}
                  value={cohortForm.description}
                  onChange={handleCohortFormChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  name="start_date"
                  label="Start Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={cohortForm.start_date}
                  onChange={handleCohortFormChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  name="end_date"
                  label="End Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={cohortForm.end_date}
                  onChange={handleCohortFormChange}
                  InputLabelProps={{ shrink: true }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowAddCohortDialog(false)} color="secondary">Cancel</Button>
                <Button onClick={handleSaveCohort} variant="contained" color="primary" disabled={!cohortForm.name?.trim()}>Create Cohort</Button>
              </DialogActions>
            </Dialog>

            {/* Add Client to Cohort Modal */}
            <Dialog open={showAddClientDialog} onClose={() => setShowAddClientDialog(false)} maxWidth="sm" fullWidth>
              <DialogTitle>Add Client to {selectedCohort?.name}</DialogTitle>
              <DialogContent>
                <FormControl fullWidth variant="outlined" sx={{ mt: 1, minWidth: 200 }}>
                  <InputLabel id="add-client-label">Client</InputLabel>
                  <Select
                    labelId="add-client-label"
                    value={selectedClientIdToAdd}
                    onChange={(e) => setSelectedClientIdToAdd(e.target.value)}
                    label="Client"
                  >
                    <MenuItem value="">Select a client</MenuItem>
                    {clientOptions.map((client) => {
                      const id = client.id ?? client.user_id ?? client.user?.id;
                      const name = client.user?.name ?? client.name ?? client.email ?? `Client ${id}`;
                      const email = client.user?.email ?? client.email ?? '';
                      return (
                        <MenuItem key={id} value={id}>{name}{email ? ` (${email})` : ''}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {clientOptions.length === 0 && clients.length > 0 && (
                  <p className="text-sm text-amber-600 mt-2">All clients are already in this cohort.</p>
                )}
                {clients.length === 0 && (
                  <p className="text-sm text-gray-500 mt-2">No clients available. Add clients in the platform first.</p>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowAddClientDialog(false)} color="secondary">Cancel</Button>
                <Button onClick={handleSaveAddClient} variant="contained" color="primary" disabled={!selectedClientIdToAdd}>Add to Cohort</Button>
              </DialogActions>
            </Dialog>

            {/* Add/Edit Course Modal (Material UI) */}
            <Dialog open={showAddEditCourse} onClose={() => { setShowAddEditCourse(false); setEditingProgramId(null); }}>
              <DialogTitle>{editingProgramId ? 'Edit Course' : 'Add Course'}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  label="Course Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={courseForm.name}
                  onChange={handleCourseFormChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  name="syllabus"
                  label="Syllabus"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={courseForm.syllabus}
                  onChange={handleCourseFormChange}
                  sx={{ mb: 2 }}
                />
                {/* Resource Management */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 500, marginBottom: 8 }}>Resources</div>
                  <Stack spacing={1}>
                    {courseForm.resources.map((resource, idx) => (
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
                            href={resource.file ? URL.createObjectURL(resource.file) : undefined}
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
                        onChange={(e, val) => val && setNewResource({ ...newResource, type: val, url: '', file: null })}
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
                <Button onClick={() => setShowAddEditCourse(false)} color="secondary">Cancel</Button>
                <Button onClick={handleSaveCourse} variant="contained" color="primary">Save</Button>
              </DialogActions>
            </Dialog>
            {/* Add/Edit Unit Modal (Material UI) */}
            <Dialog open={showAddEditUnit} onClose={() => setShowAddEditUnit(false)}>
              <DialogTitle>Add/Edit Unit</DialogTitle>
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
                {/* Unit Resource Management */}
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
                            href={resource.file ? URL.createObjectURL(resource.file) : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ flex: 2, textTransform: 'none', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                          >
                            {resource.file ? resource.file.name : 'Document'}
                          </Button>
                        )}
                        <IconButton aria-label="delete" color="error" onClick={() => handleRemoveUnitResource(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    ))}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        name="title"
                        label="Title"
                        size="small"
                        value={newUnitResource.title}
                        onChange={handleUnitResourceChange}
                        sx={{ flex: 1 }}
                      />
                      <ToggleButtonGroup
                        value={newUnitResource.type}
                        exclusive
                        onChange={handleUnitResourceTypeChange}
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
                      {newUnitResource.type === 'link' ? (
                        <TextField
                          name="url"
                          label="URL"
                          size="small"
                          value={newUnitResource.url}
                          onChange={handleUnitResourceChange}
                          sx={{ flex: 2 }}
                        />
                      ) : (
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<AttachFileIcon />}
                          sx={{ flex: 2, minWidth: 0 }}
                        >
                          {newUnitResource.file ? newUnitResource.file.name : 'Upload'}
                          <input
                            type="file"
                            hidden
                            onChange={handleUnitResourceFileChange}
                          />
                        </Button>
                      )}
                      <Button onClick={handleAddUnitResource} variant="outlined" color="primary" size="small" sx={{ height: 40 }}>
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
