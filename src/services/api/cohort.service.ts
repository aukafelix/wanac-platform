import { apiClient } from './config';

export const cohortService = {
  async getCohorts() {
    const response = await apiClient.get('/api/v1/cohorts');
    return response.data;
  },

  async createCohort(data: {
    program_id: string | number;
    name: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    coaches?: number[];
    clients?: number[];
  }) {
    const response = await apiClient.post('/api/v1/programs/cohort/add', {
      program_id: data.program_id,
      name: data.name,
      description: data.description ?? '',
      start_date: data.start_date ?? '',
      end_date: data.end_date ?? '',
      coaches: data.coaches ?? [],
      clients: data.clients ?? [],
    });
    return response.data;
  },

  async addCohortMember(data: { cohort_id: number; member_id: number; role: string }) {
    console.log('API call with data:', data);
    
    // Prepare payload based on role
    const payload = {
      cohort_id: data.cohort_id,
      [data.role === 'client' ? 'client_id' : 'coach_id']: data.member_id
    };
    
    console.log('API payload:', payload);
    const response = await apiClient.post('/api/v1/programs/cohort-member/add', payload);
    console.log('API response:', response.data);
    return response.data;
  },
  async getCoaches() {
    const response = await apiClient.get('/api/v1/coaches');
    return response.data;
  },
};
