'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProgramsService } from "../../../../services/api/programs.service";
import { cohortService } from "../../../../services/api/cohort.service";
import AdminSidebar from "../../../../../components/dashboardcomponents/adminsidebar";

export default function ProgramDetailsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [program, setProgram] = useState(null);
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError("Failed to fetch program details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

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
          </>
        )}
          </div>
        </main>
      </div>
    </div>
  );
}
