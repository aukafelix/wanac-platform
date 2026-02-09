"use client";
import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaLink,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaFileDownload,
  FaPlus,
  FaStickyNote,
  FaTimes,
  FaRobot,
  FaArrowLeft
} from "react-icons/fa";
import { sessionsService } from "../../../../../services/api/sessions.service";
import { clientsService } from '../../../../../services/api/clients.service';
import CoachSidebar from "../../../../../../components/dashboardcomponents/CoachSidebar";
import ClientTopbar from "../../../../../../components/dashboardcomponents/clienttopbar";
import Sidebar from "../../../../../../components/dashboardcomponents/sidebar";
import { useRouter } from "next/navigation";

export default function SessionDetailsClient({ sessionId, readOnly = false, useClientLayout = false }) {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showAddResource, setShowAddResource] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [clients, setClients] = useState([]);
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [addParticipantLoading, setAddParticipantLoading] = useState(false);
  const [addParticipantError, setAddParticipantError] = useState("");
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clientsError, setClientsError] = useState("");
  const [resourceName, setResourceName] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [resourceFile, setResourceFile] = useState(null);
  const [resourceLink, setResourceLink] = useState("");
  const [addResourceLoading, setAddResourceLoading] = useState(false);
  const [addResourceError, setAddResourceError] = useState("");
  const [noteText, setNoteText] = useState("");
  const [addNoteLoading, setAddNoteLoading] = useState(false);
  const [addNoteError, setAddNoteError] = useState("");

  // Fetch clients when modal opens
  useEffect(() => {
    if (showAddParticipant) {
      setClientsLoading(true);
      setClientsError("");
      clientsService.getClients()
        .then((data) => setClients(Array.isArray(data.clients) ? data.clients : []))
        .catch(() => setClientsError("Failed to fetch clients."))
        .finally(() => setClientsLoading(false));
    }
  }, [showAddParticipant]);

  // Filtered clients for autocomplete
  const filteredClients = Array.isArray(clients) ? clients.filter(
    (client) =>
      (client.user && client.user.name && client.user.name.toLowerCase().includes(clientSearch.toLowerCase())) ||
      (client.user && client.user.email && client.user.email.toLowerCase().includes(clientSearch.toLowerCase()))
  ) : [];

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await sessionsService.getSession(sessionId);
        setSession(data.session ?? data);
      } catch (err) {
        console.error("Failed to fetch session", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <div className="p-4 text-sm">Loading session...</div>;
  if (!session) return <div className="p-4 text-sm">Session not found.</div>;

  const dateObj = session.scheduled_at ? new Date(session.scheduled_at) : null;
  const dateStr = dateObj?.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = dateObj?.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const backHref = useClientLayout ? "/client/session" : "/coach/sessions";
  const SidebarComponent = useClientLayout ? Sidebar : CoachSidebar;

  return (
    <div className="flex min-h-screen bg-white font-body">
      <SidebarComponent className={useClientLayout ? "w-56 bg-white border-r border-gray-200" : undefined} />
      <div className="flex-1 flex flex-col min-h-screen">
        <ClientTopbar user={{ name: useClientLayout ? "Client" : "Coach" }} />
        <main className="flex-1 min-h-0 overflow-x-hidden px-3 md:px-4 py-3 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-3">
            {/* Back Button */}
            <button
              onClick={() => router.push(backHref)}
              className="flex items-center gap-2 text-[#002147] hover:text-orange-500 transition-colors text-xs font-medium group"
            >
              <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Sessions
            </button>

            {/* Header with gradient */}
            <div className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-lg p-4 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img 
                  src="/veterancommunity.png" 
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                  <h1 className="text-lg font-bold text-white mb-1">
                  {session.title}
                </h1>
                  <p className="text-xs text-white/90 max-w-xl">
                  {session.description || "No description provided."}
                </p>
              </div>
              {session.session_link && (
                <button
                    className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 whitespace-nowrap shadow-sm transition-colors"
                  onClick={() => window.open(session.session_link, "_blank")}
                >
                    <FaCheckCircle className="text-xs" /> Join Session
                </button>
              )}
              </div>
            </div>

            {/* Session Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-2.5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-blue-600 flex items-center gap-1.5 font-semibold text-xs">
                  <FaCalendarAlt className="text-xs" /> Scheduled
                </div>
                <div className="text-sm font-bold text-[#002147] mt-1.5">
                  {dateStr || "N/A"}
                </div>
                <div className="text-[10px] text-gray-600">{timeStr}{session.duration_minutes ? ` • ${session.duration_minutes} min` : ""}</div>
              </div>
              <div className="rounded-lg border border-green-100 bg-gradient-to-br from-green-50 to-white p-2.5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-green-600 flex items-center gap-1.5 font-semibold text-xs">
                  <FaUser className="text-xs" /> Participants
                </div>
                <div className="text-sm font-bold text-[#002147] mt-1.5">
                  {session.session_members?.length || 0} Members
                </div>
                <div className="text-[10px] text-gray-600">All confirmed</div>
              </div>
              <div className="rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-2.5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-emerald-600 flex items-center gap-1.5 font-semibold text-xs">
                  <FaLink className="text-xs" /> Session Link
                </div>
                <div className="text-sm font-bold text-[#002147] mt-1.5">
                  {session.session_link ? "Ready to Join" : "N/A"}
                </div>
                <div className="text-[10px] text-gray-600 break-all truncate">
                  {session.session_link || "No link available"}
                </div>
              </div>
            </div>

            {/* Participants & Resources - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Participants */}
              <section className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-[#002147] flex items-center gap-1.5">
                    <FaUser className="text-orange-500 text-xs" />
                    Participants
                    {session.session_members?.length > 0 && (
                      <span className="text-[10px] text-gray-500 font-normal">({session.session_members.length})</span>
                    )}
                </h2>
                  {!readOnly && (
                  <button 
                    className="text-[10px] px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1 transition-colors font-medium" 
                    onClick={() => setShowAddParticipant(true)}
                  >
                    <FaPlus className="text-[10px]" /> Add
                </button>
                  )}
              </div>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {session.session_members?.map((member, i) => (
                  <div
                    key={i}
                      className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded px-2 py-1.5 flex justify-between items-center hover:from-blue-100 hover:to-blue-50 transition-colors"
                  >
                    <div>
                        <div className="font-semibold text-gray-900 text-xs">
                        {member.client?.user?.name}
                      </div>
                        <div className="text-[10px] text-gray-600 truncate max-w-[150px]">
                        {member.client?.user?.email}
                      </div>
                    </div>
                      <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded font-medium whitespace-nowrap">
                      Confirmed
                    </span>
                  </div>
                ))}
                {session.session_members?.length === 0 && (
                    <p className="text-xs text-gray-500 text-center py-2">No participants yet.</p>
                )}
              </div>
            </section>

            {/* Resources */}
              <section className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-[#002147] flex items-center gap-1.5">
                    <FaFileDownload className="text-orange-500 text-xs" />
                    Resources
                    {session.session_resources?.length > 0 && (
                      <span className="text-[10px] text-gray-500 font-normal">({session.session_resources.length})</span>
                    )}
                </h2>
                  {!readOnly && (
                  <button 
                    className="text-[10px] px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1 transition-colors font-medium" 
                    onClick={() => setShowAddResource(true)}
                  >
                    <FaPlus className="text-[10px]" /> Add
                </button>
                  )}
              </div>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {session.session_resources?.map((res, i) => {
                  const resourceUrl = res.link || res.url;
                  return (
                  <div
                    key={i}
                      className="bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded px-2 py-1.5 flex justify-between items-center hover:from-purple-100 hover:to-purple-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-xs truncate">{res.name}</div>
                        <div className="text-[10px] text-gray-600 truncate">{res.description}</div>
                    </div>
                      {resourceUrl ? (
                        <a href={resourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-[10px] font-medium transition-colors ml-2 whitespace-nowrap">
                          <FaFileDownload className="text-[10px]" /> Open
                        </a>
                      ) : (
                        <span className="text-gray-400 text-[10px] ml-2">—</span>
                      )}
                  </div>
                );})}
                {session.session_resources?.length === 0 && (
                    <p className="text-xs text-gray-500 text-center py-2">No resources yet.</p>
                )}
              </div>
            </section>
            </div>

            {/* Notes */}
            <section className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-sm font-semibold text-[#002147] mb-2 flex items-center gap-1.5">
                <FaStickyNote className="text-orange-500 text-xs" />
                Session Notes
              </h2>
              {!readOnly && (
              <>
              <textarea
                placeholder="Enter session observations, feedback, or action items..."
                className="w-full border-2 border-gray-300 rounded p-2 mb-2 resize-none focus:outline-none focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 text-xs transition-all"
                rows={2}
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                disabled={addNoteLoading}
              />
              <button
                className="bg-[#002147] text-white px-3 py-1.5 rounded hover:bg-[#003875] mb-2 disabled:opacity-60 text-xs font-medium transition-colors shadow-sm"
                onClick={async () => {
                  if (!noteText.trim()) {
                    setAddNoteError("Note cannot be empty.");
                    return;
                  }
                  setAddNoteLoading(true);
                  setAddNoteError("");
                  try {
                    await sessionsService.addNote({ session_id: sessionId, content: noteText });
                    setNoteText("");
                    const data = await sessionsService.getSession(sessionId);
                    setSession(data.session ?? data);
                  } catch (err) {
                    setAddNoteError("Failed to add note. Please try again.");
                  } finally {
                    setAddNoteLoading(false);
                  }
                }}
                disabled={addNoteLoading}
              >
                {addNoteLoading ? "Adding..." : "+ Add Note"}
              </button>
              </>
              )}
              {addNoteError && (
                <div className="text-red-600 text-xs mb-2 bg-red-50 border border-red-200 rounded p-2">{addNoteError}</div>
              )}
              <div className="space-y-2">
                {session.session_notes?.map((note, i) => (
                  <div key={i} className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded p-2.5 shadow-sm hover:shadow transition-shadow">
                    <div className="text-gray-800 text-xs font-medium">{note.note || note.content}</div>
                    <div className="text-[10px] text-gray-600 mt-1.5 flex items-center gap-1">
                      <FaStickyNote className="text-[10px]" />
                      {note.created_at ? new Date(note.created_at).toLocaleString() : null}
                    </div>
                  </div>
                ))}
                {session.session_notes?.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-2">No notes yet.</p>
                )}
              </div>
            </section>

            {/* AI Summary */}
            <section className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-sm font-semibold text-[#002147] mb-2 flex items-center gap-1.5">
                <FaRobot className="text-purple-500 text-xs" />
                AI Summary
              </h2>
              <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-white border border-purple-200 rounded p-2.5 shadow-sm">
                <p className="text-gray-600 text-xs">
                  AI summary will appear here once available for this session.
                </p>
                <div className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
                  <FaRobot className="text-[10px] text-purple-500" />
                  <span>Coming soon</span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Add Participant Modal */}
      {showAddParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-md relative border-2 border-gray-200">
            <button 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 transition-colors" 
              onClick={() => {
              setShowAddParticipant(false);
              setClientSearch("");
              setSelectedClient(null);
              setAddParticipantError("");
              }}
            >
              <FaTimes className="text-sm" />
            </button>
            <h3 className="text-sm font-bold text-[#002147] mb-3 flex items-center gap-2">
              <FaUser className="text-orange-500" />
              Add Participant
            </h3>
            {clientsLoading ? (
              <div className="text-gray-500 text-xs">Loading clients...</div>
            ) : clientsError ? (
              <div className="text-red-600 text-xs">{clientsError}</div>
            ) : (
            <form className="space-y-3" onSubmit={async (e) => {
              e.preventDefault();
              if (!selectedClient) {
                setAddParticipantError("Please select a client.");
                return;
              }
              setAddParticipantLoading(true);
              setAddParticipantError("");
              try {
                await sessionsService.addSessionMember(sessionId, selectedClient.id);
                setShowAddParticipant(false);
                setClientSearch("");
                setSelectedClient(null);
                const data = await sessionsService.getSession(sessionId);
                setSession(data.session ?? data);
              } catch (err) {
                setAddParticipantError("Failed to add participant. Please try again.");
              } finally {
                setAddParticipantLoading(false);
              }
            }}>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Search Client</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none transition-all"
                  placeholder="Type name or email..."
                  value={clientSearch}
                  onChange={(e) => {
                    setClientSearch(e.target.value);
                    setSelectedClient(null);
                  }}
                  autoComplete="off"
                />
                {clientSearch && (
                  <div className="border-2 border-gray-200 rounded-lg bg-white mt-2 max-h-32 overflow-y-auto shadow-lg">
                    {filteredClients.length === 0 && (
                      <div className="p-3 text-gray-500 text-xs text-center">No clients found.</div>
                    )}
                    {filteredClients.map((client) => (
                      <div
                        key={client.id}
                        className={`p-2.5 cursor-pointer hover:bg-green-50 transition-colors ${selectedClient?.id === client.id ? "bg-green-100 border-l-4 border-green-500" : ""}`}
                        onClick={() => {
                          setSelectedClient(client);
                          setClientSearch((client.user?.name || "") + (client.user?.email ? " (" + client.user.email + ")" : ""));
                        }}
                      >
                        <div className="font-semibold text-xs">{client.user?.name}</div>
                        <div className="text-[10px] text-gray-600">{client.user?.email}</div>
                      </div>
                    ))}
                  </div>
                )}
                {selectedClient && (
                  <div className="mt-2 text-green-700 text-xs bg-green-50 border border-green-200 rounded p-2 font-medium">
                    ✓ Selected: {selectedClient.user?.name} ({selectedClient.user?.email})
                  </div>
                )}
              </div>
              {addParticipantError && (
                <div className="text-red-600 text-xs bg-red-50 border border-red-200 rounded p-2">{addParticipantError}</div>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setShowAddParticipant(false);
                    setClientSearch("");
                    setSelectedClient(null);
                    setAddParticipantError("");
                  }}
                  disabled={addParticipantLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs font-medium transition-colors shadow-sm disabled:opacity-50"
                  disabled={addParticipantLoading}
                >
                  {addParticipantLoading ? "Adding..." : "Add Participant"}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      )}

      {/* Add Resource Modal */}
      {showAddResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-md relative border-2 border-gray-200">
            <button 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 transition-colors" 
              onClick={() => {
              setShowAddResource(false);
              setResourceName("");
              setResourceDescription("");
              setResourceFile(null);
              setResourceLink("");
              setAddResourceError("");
              }}
            >
              <FaTimes className="text-sm" />
            </button>
            <h3 className="text-sm font-bold text-[#002147] mb-3 flex items-center gap-2">
              <FaFileDownload className="text-orange-500" />
              Add Resource
            </h3>
            <form className="space-y-3" onSubmit={async (e) => {
              e.preventDefault();
              setAddResourceError("");
              if (!resourceName) {
                setAddResourceError("Resource name is required.");
                return;
              }
              if (!resourceFile && !resourceLink) {
                setAddResourceError("Please provide a file or a link.");
                return;
              }
              if (resourceFile && resourceLink) {
                setAddResourceError("Please provide only one: file or link, not both.");
                return;
              }
              setAddResourceLoading(true);
              try {
                await sessionsService.addSessionResource({
                  session_id: sessionId,
                  name: resourceName,
                  description: resourceDescription,
                  file: resourceFile,
                  link: resourceLink
                });
                setShowAddResource(false);
                setResourceName("");
                setResourceDescription("");
                setResourceFile(null);
                setResourceLink("");
                const data = await sessionsService.getSession(sessionId);
                setSession(data.session ?? data);
              } catch (err) {
                setAddResourceError("Failed to add resource. Please try again.");
              } finally {
                setAddResourceLoading(false);
              }
            }}>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Resource Name</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none transition-all"
                  placeholder="Enter resource name"
                  value={resourceName}
                  onChange={e => setResourceName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Description (optional)</label>
                <textarea
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none transition-all"
                  placeholder="Enter description"
                  value={resourceDescription}
                  onChange={e => setResourceDescription(e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">File Upload</label>
                <input
                  type="file"
                  className="w-full text-xs border-2 border-gray-300 rounded-lg p-1.5 file:mr-2 file:px-3 file:py-1 file:rounded file:border-0 file:text-xs file:bg-[#002147] file:text-white hover:file:bg-[#003875] transition-all"
                  onChange={e => {
                    setResourceFile(e.target.files[0] || null);
                    if (e.target.files[0]) setResourceLink("");
                  }}
                  disabled={!!resourceLink}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Or Link</label>
                <input
                  type="url"
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none transition-all"
                  placeholder="https://example.com/resource"
                  value={resourceLink}
                  onChange={e => {
                    setResourceLink(e.target.value);
                    if (e.target.value) setResourceFile(null);
                  }}
                  disabled={!!resourceFile}
                />
              </div>
              {addResourceError && (
                <div className="text-red-600 text-xs bg-red-50 border border-red-200 rounded p-2">{addResourceError}</div>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setShowAddResource(false);
                    setResourceName("");
                    setResourceDescription("");
                    setResourceFile(null);
                    setResourceLink("");
                    setAddResourceError("");
                  }}
                  disabled={addResourceLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs font-medium transition-colors shadow-sm disabled:opacity-50"
                  disabled={addResourceLoading}
                >
                  {addResourceLoading ? "Adding..." : "Add Resource"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
