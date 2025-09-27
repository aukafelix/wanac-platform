import { apiClient } from './config';

function unwrapItem(payload: any): any {
  if (payload?.data && typeof payload.data === 'object') return payload.data;
  return payload;
}

export const experienceService = {
  async getExperiences(fireteamId: string | number) {
    try {
      const res = await apiClient.get(`/api/v1/fireteams/experiences/${fireteamId}`);
      console.log("Raw API response for getExperiences:", res.data);
      const data = unwrapItem(res.data);
      return Array.isArray(data) ? data : (data.fireteamExperiences || []);
    } catch (error: any) {
      console.error("Error fetching experiences:", error);
      console.error("Error response:", error.response?.data);
      return [];
    }
  },

  async addExperience(data: {
    fire_team_id: string | number;
    title: string;
    experience: string;
  }) {
    try {
      const res = await apiClient.post('/api/v1/fireteams/experience/add', data);
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error("Error adding experience:", error);
      throw error;
    }
  },

  async deleteExperience(experienceId: string | number) {
    try {
      const res = await apiClient.delete(`/api/v1/fireteams/experience/delete/${experienceId}`);
      return res.data;
    } catch (error: any) {
      console.error("Error deleting experience:", error);
      throw error;
    }
  },

  async updateExperience(experienceId: string | number, data: {
    title: string;
    experience: string;
  }) {
    try {
      const res = await apiClient.put(`/api/v1/fireteams/experience/update/${experienceId}`, data);
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error("Error updating experience:", error);
      throw error;
    }
  },

  async startExperience(experienceId: string | number) {
    // This might need to be implemented based on your backend
    // For now, just return success
    console.log("Starting experience:", experienceId);
    return { success: true };
  },

  async endExperience(experienceId: string | number) {
    // This might need to be implemented based on your backend
    // For now, just return success
    console.log("Ending experience:", experienceId);
    return { success: true };
  }
};