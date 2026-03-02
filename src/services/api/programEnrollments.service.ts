import { apiClient } from './config';

/**
 * Service for managing program enrollments.
 *
 * NOTE: This assumes the backend exposes REST endpoints under:
 * - GET    /api/v1/program-enrollments?client_id=...&program_id=...
 * - POST   /api/v1/program-enrollments
 * - DELETE /api/v1/program-enrollments/:id
 *
 * Adjust the URLs or response shape as needed to match the actual API.
 */

export interface ProgramEnrollment {
  id: number;
  client_id: number;
  program_id: number;
  status?: string;
  enrolled_at?: string;
  // Optional nested client/program objects if the backend includes them
  client?: any;
  program?: any;
}

export const programEnrollmentsService = {
  async getForClient(clientId: number | string): Promise<ProgramEnrollment[]> {
    const response = await apiClient.get('/api/v1/program-enrollments', {
      params: { client_id: clientId },
    });
    const data = response.data;
    return Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
  },

  async getForProgram(programId: number | string): Promise<ProgramEnrollment[]> {
    const response = await apiClient.get('/api/v1/program-enrollments', {
      params: { program_id: programId },
    });
    const data = response.data;
    return Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
  },

  async create(payload: {
    client_id: number | string;
    program_id: number | string;
    status?: string;
  }): Promise<ProgramEnrollment> {
    const response = await apiClient.post('/api/v1/program-enrollments', payload);
    return response.data;
  },

  async delete(id: number | string): Promise<void> {
    await apiClient.delete(`/api/v1/program-enrollments/${id}`);
  },
};

