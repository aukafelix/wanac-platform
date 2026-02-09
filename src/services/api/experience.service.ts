import { apiClient } from './config';

function unwrapItem(payload: any): any {
  if (payload?.data && typeof payload.data === 'object') return payload.data;
  return payload;
}

export const experienceService = {
  async getExperiences(fireteamId: string | number) {
    try {
      const res = await apiClient.get(`/api/v1/fireteams/experiences/${fireteamId}`);
      const data = unwrapItem(res.data);

      if (Array.isArray(data)) return data;
      if (data?.fireTeamExperiences && Array.isArray(data.fireTeamExperiences)) return data.fireTeamExperiences;
      if (data?.fireteamExperiences && Array.isArray(data.fireteamExperiences)) return data.fireteamExperiences;
      if (data?.experiences && Array.isArray(data.experiences)) return data.experiences;

      return [];
    } catch (error: any) {
      console.error("Error fetching experiences:", error.response?.data ?? error.message);
      return [];
    }
  },

  async addExperience(data: {
    fire_team_id: string | number;
    title: string;
    experience: string;
    link?: string;
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
    title?: string;
    experience?: string;
    link?: string;
    status?: string;
    report?: string;
    summary?: string;
    admin?: string | number;
    agenda?: Array<{ id?: string | number; title: string; duration?: string }>;
    exhibits?: Array<{ id?: string | number; name: string; type: string; link?: string }>;
  }) {
    try {
      const res = await apiClient.put(`/api/v1/fireteams/experience/update/${experienceId}`, data);
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error("Error updating experience:", error.response?.data ?? error.message);
      throw error;
    }
  },

  async startExperience(experienceId: string | number) {
    return { success: true };
  },

  async endExperience(experienceId: string | number) {
    return { success: true };
  },

  async addAgendaStep(data: {
    fire_team_experience_id: string | number;
    title: string;
    description?: string;
    duration?: string;
    order?: number;
  }) {
    try {
      const res = await apiClient.post('/api/v1/fireteams/experience/agenda-step/add', data);
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error('Error adding agenda step:', error.response?.data ?? error.message);
      throw error;
    }
  },

  async updateAgendaStep(agendaStepId: string | number, data: {
    title?: string;
    description?: string;
    duration?: string;
    order?: number;
  }) {
    try {
      const res = await apiClient.put(`/api/v1/fireteams/experience/agenda-step/update/${agendaStepId}`, data);
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error('Error updating agenda step:', error.response?.data ?? error.message);
      throw error;
    }
  },

  async deleteAgendaStep(agendaStepId: string | number) {
    try {
      const res = await apiClient.delete(`/api/v1/fireteams/experience/agenda-step/delete/${agendaStepId}`);
      return res.data;
    } catch (error: any) {
      console.error('Error deleting agenda step:', error.response?.data ?? error.message);
      throw error;
    }
  },

  // Exhibit methods
  async addExhibit(data: {
    fire_team_experience_id: string | number;
    name: string;
    type: string;
    link?: string;
  }) {
    try {
      const res = await apiClient.post('/api/v1/fireteams/experience/exhibit/add', data);
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error('Error adding exhibit:', error);
      throw error;
    }
  },


  async updateExhibit(exhibitId: string | number, data: {
    name?: string;
    type?: string;
    link?: string;
  }) {
    try {
      const res = await apiClient.put(`/api/v1/fireteams/experience/exhibit/update/${exhibitId}`, data);
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error('Error updating exhibit:', error);
      throw error;
    }
  },

  async deleteExhibit(exhibitId: string | number) {
    try {
      const res = await apiClient.delete(`/api/v1/fireteams/experience/exhibit/delete/${exhibitId}`);
      return res.data;
    } catch (error: any) {
      console.error('Error deleting exhibit:', error);
      throw error;
    }
  },

  // REMOVED: getExperienceDetails, getAgendaSteps, getExhibits - API endpoints not available
  // Experience details (including agenda and exhibits) should be fetched from the fireteam data instead
};