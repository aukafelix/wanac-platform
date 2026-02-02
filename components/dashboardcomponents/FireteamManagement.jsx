import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaPlus } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { cohortService } from "../../src/services/api/cohort.service";
import { fireteamService } from "../../src/services/api/fireteam.service";
import { generateJitsiMeetingLink } from "../../src/lib/jitsi.utils";

export default function FireteamManagement({ sidebar: SidebarComponent }) {
  const router = useRouter();
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedFireteam, setSelectedFireteam] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cohortId, setCohortId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [fireteams, setFireteams] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const cohortsData = await cohortService.getCohorts();
        setCohorts(cohortsData);
      } catch (err) {
        setError("Error fetching cohorts");
      }
      try {
        const fireteamsData = await fireteamService.getFireteams();
        setFireteams(fireteamsData);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Authentication required. Please log in to view fireteams.");
        } else {
          setError("Error fetching fireteams");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Modal handlers
  const handleAdd = () => {
    setSelectedFireteam(null);
    setShowAddEdit(true);
    setName("");
    setDescription("");
    setCohortId("");
    setDate("");
    setTime("");
    setError("");
  };
  const handleEdit = (fireteam) => {
    setSelectedFireteam(fireteam);
    setShowAddEdit(true);
    setName(fireteam?.title || fireteam?.name || "");
    setDescription(fireteam?.description || "");
    setCohortId(String(fireteam?.cohort_id || ""));
    setDate(fireteam?.date || "");
    setTime(fireteam?.time || "");
    setError("");
  };
  const handleDelete = (fireteam) => {
    setSelectedFireteam(fireteam);
    setShowDelete(true);
  };
  const handleClose = () => {
    setShowAddEdit(false);
    setShowDelete(false);
    setSelectedFireteam(null);
    setName("");
    setDescription("");
    setCohortId("");
    setDate("");
    setTime("");
    setError("");
  };

  // Save Fireteam (create or update)
  const handleSave = async () => {
    const validationErrors = [];
    if (!name.trim()) validationErrors.push("Name is required");
    if (!description.trim()) validationErrors.push("Description is required");
    if (!cohortId) validationErrors.push("Cohort is required");
    if (!date.trim()) validationErrors.push("Date is required");
    if (!time.trim()) validationErrors.push("Time is required");
    if (validationErrors.length > 0) {
      setError(validationErrors.join(". "));
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (selectedFireteam) {
        const currentTitle = selectedFireteam?.title || selectedFireteam?.name || "";
        const dateTime = `${date}T${time}:00`;
        await fireteamService.updateFireteam(selectedFireteam.id, {
          cohort_id: cohortId,
          title: name,
          description,
          date: dateTime,
          time,
        });
        const updated = await fireteamService.getFireteams();
        setFireteams(updated);
        setSuccess("Fireteam updated successfully!");
      } else {
        const dateTime = `${date}T${time}:00`;
        // Generate a unique meeting link for the fireteam
        const roomName = `wanac-fireteam-${cohortId}-${Date.now()}`;
        const meetingLink = generateJitsiMeetingLink(roomName);
        
        const createdFireteam = await fireteamService.addFireteam({
          cohort_id: cohortId,
          title: name,
          description,
          date: dateTime,
          time,
          link: meetingLink
        });
        if (createdFireteam && createdFireteam.id) {
          await fireteamService.updateFireteam(createdFireteam.id, {
            cohort_id: cohortId,
            title: name,
            description,
            date: dateTime,
            time,
          });
        }
        const refreshed = await fireteamService.getFireteams();
        setFireteams(refreshed);
        setSuccess("Fireteam created successfully!");
      }
      handleClose();
    } catch (err) {
      let errorMessage = "Network or server error. Please try again.";
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.errors) {
          const errors = Array.isArray(err.response.data.errors) 
            ? err.response.data.errors 
            : Object.values(err.response.data.errors).flat();
          errorMessage = errors.join(". ");
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Delete Fireteam
  const handleConfirmDelete = async () => {
    if (!selectedFireteam) return;
    try {
      await fireteamService.deleteFireteam(selectedFireteam.id);
      setFireteams((prev) => prev.filter((ft) => ft.id !== selectedFireteam.id));
      setSuccess("Fireteam deleted successfully!");
      handleClose();
    } catch (err) {
      setError("Failed to delete fireteam.");
    }
  };

  // Filtered fireteams
  const filteredFireteams = fireteams.filter((f) => {
    const nameVal = typeof f.name === "string" ? f.name : f.title || "";
    const descriptionVal = typeof f.description === "string" ? f.description : "";
    return (
      nameVal.toLowerCase().includes(search.toLowerCase()) ||
      descriptionVal.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {SidebarComponent && <SidebarComponent />}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[#002147] tracking-tight">Fireteam Management</h1>
              <button
                type="button"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleAdd}
              >
                <FaPlus /> Add Fireteam
              </button>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search Fireteams"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full md:w-1/3 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : error && typeof error === "string" && error.includes("Authentication required") ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => window.location.href = '/login'}
                >
                  Go to Login
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cohort</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredFireteams.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                          No fireteams found.
                        </td>
                      </tr>
                    ) : (
                      filteredFireteams.map((f) => {
                        const cohort = cohorts.find(c => c.id === f.cohort_id);
                        return (
                          <tr
                            key={f.id}
                            className="hover:bg-gray-50 transition cursor-pointer"
                            onClick={() => router.push(`/admin/fireteammanagement/${f.id}`)}
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{f.title || f.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{f.description}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{cohort ? (cohort.name || cohort.title || `Cohort ${cohort.id}`) : f.cohort_id}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{f.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{f.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <span className="inline-flex gap-2 justify-end">
                                <button
                                  type="button"
                                  className="p-2 rounded hover:bg-blue-100 text-blue-600"
                                  title="Edit Fireteam"
                                  onClick={(e) => { e.stopPropagation(); handleEdit(f); }}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  type="button"
                                  className="p-2 rounded hover:bg-red-100 text-red-600"
                                  title="Delete Fireteam"
                                  onClick={(e) => { e.stopPropagation(); handleDelete(f); }}
                                >
                                  Delete
                                </button>
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {/* Add/Edit Dialog */}
        <Dialog open={showAddEdit} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle>{selectedFireteam ? "Edit Fireteam" : "Add Fireteam"}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <FormControl fullWidth required>
                <InputLabel id="cohort-label">Cohort</InputLabel>
                <Select
                  labelId="cohort-label"
                  value={cohortId}
                  label="Cohort"
                  onChange={e => setCohortId(String(e.target.value))}
                >
                  <MenuItem value="">Select a cohort</MenuItem>
                  {cohorts.map((cohort) => (
                    <MenuItem key={cohort.id} value={cohort.id}>
                      {cohort.name || cohort.title || `Cohort ${cohort.id}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                fullWidth
                multiline
                minRows={2}
              />
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
              <TextField
                label="Time"
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
              
              {error && <Alert severity="error">{error}</Alert>}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>Cancel</Button>
            <Button variant="contained" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete Dialog */}
        <Dialog open={showDelete} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle>Delete Fireteam</DialogTitle>
          <DialogContent dividers>
            <Typography>Are you sure you want to delete the fireteam <b>{selectedFireteam?.title || selectedFireteam?.name}</b>?</Typography>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
        {/* Success Snackbar */}
        <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess("")}> 
          <Alert onClose={() => setSuccess("")} severity="success" sx={{ width: '100%' }}>{success}</Alert>
        </Snackbar>
          </div>
        </main>
      </div>
    </div>
  );
}
