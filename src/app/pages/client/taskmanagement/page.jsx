"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "../../../../../components/dashboardcomponents/sidebar";
import ClientTopbar from "../../../../../components/dashboardcomponents/clienttopbar";
import { tasksService } from "../../../../services/api/tasks.service";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import toast from "react-hot-toast";

// Constants
const PRIORITY_MATRIX = [
  { value: "urgent-important", label: "Urgent & Important" },
  { value: "not-urgent-important", label: "Not Urgent & Important" },
  { value: "urgent-not-important", label: "Urgent & Not Important" },
  { value: "not-urgent-not-important", label: "Not Urgent & Not Important" },
];

const INITIAL_FORM_STATE = {
  title: "",
  description: "",
  due_date: "",
  status: "pending",
  priority: "urgent-important",
};

export default function TaskManagementPage() {
  // State management
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [formError, setFormError] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  // Filter tasks by priority quadrant
  const getTasksByPriority = useCallback(
    (priority) => {
      return tasks.filter((task) => task.priority === priority);
    },
    [tasks]
  );

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await tasksService.getTasks();
      setTasks(data.data);

    } catch (error) {
      setTasks({}); // fallback to empty array on error
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize client-side data
  useEffect(() => {
    const userData = localStorage.getItem("wanacUser");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    fetchTasks();
  }, [fetchTasks]);

  // Form handlers
  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleOpenDialog = useCallback((task = null) => {
    setEditTask(task);
    setForm(task ? { ...task } : INITIAL_FORM_STATE);
    setFormError("");
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setEditTask(null);
    setForm(INITIAL_FORM_STATE);
    setFormError("");
  }, []);

  // Task CRUD operations
  const handleSaveTask = useCallback(async () => {
    if (!form.title || !form.due_date) {
      setFormError("Title and Due Date are required.");
      return;
    }

    try {
      if (editTask) {
        const response = await tasksService.updateTask(editTask.id, form);
        toast.success(response.message);

      } else {
        const response = await tasksService.addTask(form);
        toast.success(response.message);

      }
      fetchTasks();
      handleCloseDialog();
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response?.data?.errors) {
          handleValidationErrors(error.response.data.errors);
        }
        if (error.response?.data?.error) {
          toast.error(error.response.data.error);
        }
      } else {
        console.log(error);
      }
    }
  }, [form, editTask, fetchTasks, handleCloseDialog]);

  const handleDeleteTask = useCallback(
    async (id) => {
      if (!window.confirm("Delete this task?")) return;

      try {
        await tasksService.deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    [fetchTasks]
  );

  // Drag and drop functionality
  const handleUpdateTaskPriority = useCallback(
    async (task, newPriority) => {
      try {
        await tasksService.updateTask(task.id, {
          ...task,
          priority: newPriority,
        });
        fetchTasks();
      } catch (error) {
        console.error("Error updating task priority:", error);
      }
    },
    [fetchTasks]
  );

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const { source, destination, draggableId } = result;
      if (source.droppableId !== destination.droppableId) {
        const task = tasks.find((t) => t.id === draggableId);
        if (task) {
          handleUpdateTaskPriority(task, destination.droppableId);
        }
      }
    },
    [tasks, handleUpdateTaskPriority]
  );

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <Sidebar
        className="w-56 bg-white border-r border-gray-200"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <ClientTopbar user={user} />

        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-navy">
                Task Management (Eisenhower Matrix)
              </h2>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaPlus />}
                onClick={() => handleOpenDialog()}
              >
                Add Task
              </Button>
            </div>

            {/* Matrix Section */}
            <section className="mb-8">
              <Typography variant="body1" className="mb-4 text-gray-600">
                Organize your tasks using the Eisenhower Matrix. Drag and drop
                tasks between quadrants to reprioritize.
              </Typography>

              <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PRIORITY_MATRIX.map((quadrant) => (
                    <Droppable
                      droppableId={quadrant.value}
                      key={quadrant.value}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`bg-white border border-gray-200 rounded-lg p-4 min-h-[300px] shadow-none flex flex-col ${
                            snapshot.isDraggingOver ? "bg-blue-50" : ""
                          }`}
                        >
                          <h3 className="text-lg font-semibold text-brand-navy mb-2">
                            {quadrant.label}
                          </h3>

                          {getTasksByPriority(quadrant.value).map(
                            (task, idx) => (
                              <Draggable
                                draggableId={task.id}
                                index={idx}
                                key={task.id}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`mb-3 p-3 rounded border ${
                                      snapshot.isDragging
                                        ? "bg-blue-100"
                                        : "bg-gray-50"
                                    } shadow-sm flex flex-col cursor-pointer`}
                                    onClick={() => handleOpenDialog(task)}
                                  >
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium text-gray-900">
                                        {task.title}
                                      </span>
                                      <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
                                        {task.status}
                                      </span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      Due: {task.due_date}
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            )
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              </DragDropContext>
            </section>
          </div>

          {/* Task Dialog */}
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>{editTask ? "Edit Task" : "Add Task"}</DialogTitle>
            <DialogContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Due Date"
                  name="due_date"
                  type="date"
                  value={form.due_date}
                  onChange={handleFormChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  select
                  label="Priority (Quadrant)"
                  name="priority"
                  value={form.priority}
                  onChange={handleFormChange}
                  fullWidth
                >
                  {PRIORITY_MATRIX.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
            
              </div>
              {formError && <Typography color="error">{formError}</Typography>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                onClick={handleSaveTask}
                variant="contained"
                color="primary"
              >
                {editTask ? "Update" : "Add"}
              </Button>
              {editTask && (
                <Button
                  onClick={() => handleDeleteTask(editTask.id)}
                  color="error"
                >
                  Delete
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
