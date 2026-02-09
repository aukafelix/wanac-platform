import { apiClient } from './config';

function normalizeFireteamList(payload: any): any[] {
  // Handle empty array case first
  if (Array.isArray(payload)) return payload;
  
  // Handle nested data structures
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.fireteams)) return payload.fireteams;
    if (Array.isArray(payload.fireTeams)) return payload.fireTeams;
    if (Array.isArray(payload.fireTeams?.data)) return payload.fireTeams.data;
    if (Array.isArray(payload.fire_teams)) return payload.fire_teams;
    if (Array.isArray(payload.fire_teams?.data)) return payload.fire_teams.data;
    if (Array.isArray(payload.result)) return payload.result;
  }
  
  // Return empty array if no valid array found
  return [];
}

function unwrapItem(payload: any): any {
  if (payload?.data && typeof payload.data === 'object') return payload.data;
  return payload;
}

export const fireteamService = {
  async getFireteams() {
    try {
      const res = await apiClient.get('/api/v1/fireteams');
      let fireteamsData = res.data;

      if (Array.isArray(fireteamsData)) return fireteamsData;

      if (fireteamsData && typeof fireteamsData === 'object') {
        if (Array.isArray(fireteamsData.data)) return fireteamsData.data;
        if (Array.isArray(fireteamsData.fireteams)) return fireteamsData.fireteams;
        if (Array.isArray(fireteamsData.fireTeams)) return fireteamsData.fireTeams;
        if (Array.isArray(fireteamsData.fireTeams?.data)) return fireteamsData.fireTeams.data;
        if (Array.isArray(fireteamsData.results)) return fireteamsData.results;
      }

      return [];
    } catch (error: any) {
      if (error.response?.status === 401) {
        return [];
      }
      console.error("Error fetching fireteams:", error.response?.data ?? error.message);
      throw error;
    }
  },
  async getFireteam(id: string | number) {
    try {
      const res = await apiClient.get(`/api/v1/fireteams/${id}`);
      return unwrapItem(res.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw error;
      }
      console.error("Error fetching fireteam:", error.response?.data ?? error.message);
      throw error;
    }
  },
  async addFireteam(data: {
    cohort_id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    link: string;
  }) {
    try {
      const payload = { ...data, cohort_id: String(data.cohort_id) };
      const res = await apiClient.post('/api/v1/fireteams/add', payload);
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error("Error adding fireteam:", error.response?.data ?? error.message);
      throw error;
    }
  },
  async updateFireteam(id: string | number, data: {
    cohort_id: string | number;
    title: string;
    description: string;
    date: string;
    time: string;
  }) {
    const res = await apiClient.put(`/api/v1/fireteams/update/${id}`, data);
    return unwrapItem(res.data);
  },
  async deleteFireteam(id: string | number) {
    const res = await apiClient.delete(`/api/v1/fireteams/delete/${id}`);
    return res.data;
  },
  async addFireteamMember(data: { client_id: string | number; fire_team_id: string | number; }) {
    const res = await apiClient.post('/api/v1/fireteams/member/add', data);
    return unwrapItem(res.data);
  },
  async getFireteamMembers(fireteamId: string | number) {
    const res = await apiClient.get(`/api/v1/fireteams/members/${fireteamId}`);
    const data = unwrapItem(res.data);
    return Array.isArray(data) ? data : [];
  },
  async deleteFireteamMember(fireteamMemberId: string | number) {
    const res = await apiClient.delete(`/api/v1/fireteams/member/delete/${fireteamMemberId}`);
    return res.data;
  },
  async addObjective(data: { 
    fire_team_experience_id: string | number; 
    objective: string;
    added_by?: string | number;
  }) {
    try {
      const res = await apiClient.post('/api/v1/fireteams/objectives/add', data);
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error('Error adding objective:', error.response?.data ?? error.message);
      throw error;
    }
  },
  async deleteObjective(id: string | number) {
    const res = await apiClient.delete(`/api/v1/fireteams/objectives/delete/${id}`);
    return res.data;
  },
};
