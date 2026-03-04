'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProgramsService } from "../../../../services/api/programs.service";
import { cohortService } from "../../../../services/api/cohort.service";
import { clientsService } from "../../../../services/api/clients.service";
import { programEnrollmentsService } from "../../../../services/api/programEnrollments.service";
import AdminSidebar from "../../../../../components/dashboardcomponents/adminsidebar";

export default function ProgramDetailsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [program, setProgram] = useState(null);
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [clients, setClients] = useState([]);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState("");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const prog = await ProgramsService.getById(id);
        const resolvedProgram = prog?.program ?? prog;
        setProgram(resolvedProgram);

        const cohortsResponse = await cohortService.getCohorts();
        const rawCohorts = Array.isArray(cohortsResponse)
          ? cohortsResponse
          : (Array.isArray(cohortsResponse?.data)
              ? cohortsResponse.data
              : (Array.isArray(cohortsResponse?.cohorts)
                  ? cohortsResponse.cohorts
                  : []));
        const filtered = rawCohorts.filter(c => {
          const programIdFromCohort = c.program_id ?? c.programId ?? c.program?.id;
          return String(programIdFromCohort) === String(resolvedProgram?.id);
        });
        setCohorts(filtered);

        // Load clients and enrollments for this program
        setEnrollmentLoading(true);
        setEnrollmentError(null);
        try {
          const clientData = await clientsService.getClients();
          const clientList = Array.isArray(clientData)
            ? clientData
            : (Array.isArray(clientData?.clients) ? clientData.clients : []);
          setClients(clientList);

          if (resolvedProgram?.id) {
            const enrollmentData = await programEnrollmentsService.getForProgram(
              resolvedProgram.id
            );
            setEnrollments(Array.isArray(enrollmentData) ? enrollmentData : []);
          }
        } catch (e) {
          setEnrollmentError("Failed to load enrollments.");
        } finally {
          setEnrollmentLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch program details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  const resolveClientName = (clientId) => {
    const c = clients.find((client) => String(client.id) === String(clientId));
    if (!c) return `Client #${clientId}`;
    return c.name || c.full_name || c.email || `Client #${clientId}`;
  };

  const handleEnrollClient = async () => {
    if (!selectedClientId || !program?.id) return;
    try {
      setEnrollmentLoading(true);
      const created = await programEnrollmentsService.create({
        client_id: selectedClientId,
        program_id: program.id,
        status: "active",
      });
      setEnrollments((prev) => [...prev, created]);
      setShowEnrollModal(false);
      setSelectedClientId("");
    } catch (e) {
      setEnrollmentError("Failed to enroll client in this program.");
    } finally {
      setEnrollmentLoading(false);
    }
  };

  const handleUnenroll = async (enrollmentId) => {
    try {
      setEnrollmentLoading(true);
      await programEnrollmentsService.delete(enrollmentId);
      setEnrollments((prev) => prev.filter((e) => e.id !== enrollmentId));
    } catch (e) {
      setEnrollmentError("Failed to remove enrollment.");
    } finally {
      setEnrollmentLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition"
              onClick={() => router.push("/admin/programmanagement")}
            >
              ← Back to Program Management
            </button>
          </div>
        </div>

        {!id ? (
          <div className="text-center py-8 text-red-500">No program selected. Please go back and select a program.</div>
        ) : loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : !program ? (
          <div className="text-center py-8 text-gray-500">Program not found.</div>
        ) : (
          <>
            {program.description && (
              <p className="text-gray-600 mb-6">{program.description}</p>
            )}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-[#002147] tracking-tight">
                {program.name || program.title}
              </h1>
              <span className="inline-flex gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                  onClick={() => {}}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded border border-red-600 text-red-600 hover:bg-red-50 transition"
                  onClick={() => {}}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
                  onClick={() => {}}
                >
                  Add Session
                </button>
              </span>
            </div>

            <h2 className="text-lg font-semibold text-[#002147] mb-4">Cohorts</h2>
            {Array.isArray(cohorts) && cohorts.length > 0 ? (
              <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {cohorts.map(cohort => {
                      const memberCount = Array.isArray(cohort.members)
                        ? cohort.members.length
                        : (Array.isArray(cohort.cohort_members)
                            ? cohort.cohort_members.length
                            : (cohort.members_count ?? cohort.member_count ?? cohort.total_members ?? 0));
                      const startDateRaw = cohort.start_date ?? cohort.startDate ?? cohort.starts_at ?? cohort.startAt;
                      const endDateRaw = cohort.end_date ?? cohort.endDate ?? cohort.ends_at ?? cohort.endAt;
                      const startDate = startDateRaw ? new Date(startDateRaw).toLocaleDateString() : '—';
                      const endDate = endDateRaw ? new Date(endDateRaw).toLocaleDateString() : '—';
                      return (
                        <tr
                          key={cohort.id}
                          className="hover:bg-gray-50 transition cursor-pointer"
                          onClick={() => router.push(`/admin/cohortmanagement/${cohort.id}`)}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{cohort.name || cohort.title || `Cohort ${cohort.id}`}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{memberCount}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{startDate}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{endDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <button
                              type="button"
                              className="px-3 py-1.5 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm"
                              onClick={e => {
                                e.stopPropagation();
                                router.push(`/admin/cohortmanagement/${cohort.id}`);
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No cohorts for this program.</p>
            )}

            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#002147]">
                  Enrolled Clients
                </h2>
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
                  onClick={() => setShowEnrollModal(true)}
                >
                  Enroll Client
                </button>
              </div>
              {enrollmentError && (
                <p className="text-sm text-red-600 mb-3">{enrollmentError}</p>
              )}
              {enrollmentLoading && (
                <p className="text-sm text-gray-500 mb-3">Updating enrollments...</p>
              )}
              {Array.isArray(enrollments) && enrollments.length > 0 ? (
                <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Enrolled At
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {enrollments.map((enrollment) => {
                        const clientName =
                          enrollment.client?.name ||
                          enrollment.client?.full_name ||
                          resolveClientName(enrollment.client_id);
                        const enrolledAtRaw =
                          enrollment.enrolled_at ||
                          enrollment.created_at ||
                          enrollment.createdAt;
                        const enrolledAt = enrolledAtRaw
                          ? new Date(enrolledAtRaw).toLocaleDateString()
                          : "—";
                        const status =
                          enrollment.status ||
                          enrollment.state ||
                          "active";
                        return (
                          <tr key={enrollment.id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {clientName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              <span
                                className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                                  status === "active"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : status === "completed"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {enrolledAt}
                            </td>
                            <td className="px-6 py-4 text-sm text-right">
                              <button
                                type="button"
                                className="px-3 py-1.5 rounded border border-red-600 text-red-600 hover:bg-red-50 text-xs"
                                onClick={() => handleUnenroll(enrollment.id)}
                              >
                                Unenroll
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No clients are currently enrolled in this program.
                </p>
              )}
            </div>
          </>
        )}
          </div>
        </main>
      </div>

      {showEnrollModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#002147]">
                Enroll Client in Program
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowEnrollModal(false);
                  setSelectedClientId("");
                }}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="px-5 py-4 space-y-3">
              <p className="text-xs text-gray-600">
                Select a client to enroll in{" "}
                <span className="font-semibold">
                  {program?.name || program?.title}
                </span>
                .
              </p>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Client
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
              >
                <option value="">Select a client...</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name || client.full_name || client.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-end gap-2 bg-gray-50">
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-medium text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => {
                  setShowEnrollModal(false);
                  setSelectedClientId("");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-60"
                disabled={!selectedClientId}
                onClick={handleEnrollClient}
              >
                Enroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
