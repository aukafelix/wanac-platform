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
      // Check authentication status
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      console.log("Auth token present:", !!token);
      console.log("Auth token value:", token ? `${token.substring(0, 20)}...` : 'null');
      
      const res = await apiClient.get('/api/v1/fireteams');
      console.log("Raw API response for getFireteams:", res.data);
      console.log("Response type:", typeof res.data);
      console.log("Is array:", Array.isArray(res.data));
      console.log("Response status:", res.status);
      console.log("Response headers:", res.headers);
      
      // Try different approaches to get the data
      let fireteamsData = res.data;
      
      // If it's already an array, return it
      if (Array.isArray(fireteamsData)) {
        console.log("Data is already an array, returning as-is");
        return fireteamsData;
      }
      
      // Try to extract from common response patterns
      if (fireteamsData && typeof fireteamsData === 'object') {
        if (Array.isArray(fireteamsData.data)) {
          console.log("Found data in response.data");
          return fireteamsData.data;
        }
        if (Array.isArray(fireteamsData.fireteams)) {
          console.log("Found data in response.fireteams");
          return fireteamsData.fireteams;
        }
        if (Array.isArray(fireteamsData.fireTeams)) {
          console.log("Found data in response.fireTeams");
          return fireteamsData.fireTeams;
        }
        if (Array.isArray(fireteamsData.fireTeams?.data)) {
          console.log("Found data in response.fireTeams.data");
          return fireteamsData.fireTeams.data;
        }
        if (Array.isArray(fireteamsData.results)) {
          console.log("Found data in response.results");
          return fireteamsData.results;
        }
      }
      
      console.log("No valid array found, returning empty array");
      return [];
    } catch (error: any) {
      console.error("Error fetching fireteams:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      
      // If it's a 401 error, the user needs to log in
      if (error.response?.status === 401) {
        console.error("Authentication required. Please log in first.");
        // Don't throw the error, just return empty array to prevent crashes
        return [];
      }
      
      throw error;
    }
  },
  async getFireteam(id: string | number) {
    const res = await apiClient.get(`/api/v1/fireteams/${id}`);
    return unwrapItem(res.data);
  },
  async addFireteam(data: {
    cohort_id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    link: string;
  }) {
    const res = await apiClient.post('/api/v1/fireteams/add', data);
    return unwrapItem(res.data);
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
  async deleteFireteamMember(fireteamMemberId: string | number) {
    const res = await apiClient.delete(`/api/v1/fireteams/member/delete/${fireteamMemberId}`);
    return res.data;
  },
};
