import { apiClient } from './config';

function normalizeExperienceList(payload: any): any[] {
  // Handle empty array case first
  if (Array.isArray(payload)) return payload;
  
  // Handle nested data structures
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.experiences)) return payload.experiences;
    if (Array.isArray(payload.results)) return payload.results;
  }
  
  // Return empty array if no valid array found
  return [];
}

function unwrapItem(payload: any): any {
  if (payload?.data && typeof payload.data === 'object') return payload.data;
  return payload;
}

export const experienceService = {
  async getExperiences(fireteamId?: string | number) {
    try {
      // Use the correct endpoint for fireteam experiences
      const url = fireteamId ? `/api/v1/fireteams/experiences/${fireteamId}` : '/api/v1/experiences';
      const res = await apiClient.get(url);
      console.log("Raw API response for getExperiences:", res.data);
      return normalizeExperienceList(res.data);
    } catch (error: any) {
      console.error("Error fetching experiences:", error);
      if (error.response?.status === 401) {
        console.error("Authentication required. Please log in first.");
        return [];
      }
      throw error;
    }
  },
  
  async getExperience(id: string | number) {
    const res = await apiClient.get(`/api/v1/experiences/${id}`);
    return unwrapItem(res.data);
  },
  
  async addExperience(data: {
    fireteam_id: string | number;
    title: string;
    experience: string;
  }) {
    try {
      // Use the correct endpoint and payload as per API docs
      const apiPayload = {
        fire_team_id: String(data.fireteam_id),
        title: data.title,
        experience: data.experience
      };
      
      console.log("Sending experience data to correct API:", apiPayload);
      const res = await apiClient.post('/api/v1/fireteams/experience/add', apiPayload);
      console.log("API response:", res.data);
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error("Error adding experience:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      throw error;
    }
  },
  
  async updateExperience(id: string | number, data: {
    title?: string;
    subtitle?: string;
    description?: string;
    agenda?: Array<{ title: string; duration: string; subtitle?: string }>;
    scheduled_at?: string;
    duration_minutes?: number;
  }) {
    const res = await apiClient.put(`/api/v1/experiences/update/${id}`, data);
    return unwrapItem(res.data);
  },
  
  async deleteExperience(id: string | number) {
    const res = await apiClient.delete(`/api/v1/experiences/delete/${id}`);
    return res.data;
  },
  
  async startExperience(id: string | number) {
    const res = await apiClient.post(`/api/v1/experiences/${id}/start`);
    return unwrapItem(res.data);
  },
  
  async endExperience(id: string | number) {
    const res = await apiClient.post(`/api/v1/experiences/${id}/end`);
    return unwrapItem(res.data);
  },

  // Generate Jitsi meeting room for experience
  generateMeetingRoom(experienceId: string | number, fireteamId: string | number, title?: string) {
    const roomName = `wanac-experience-${fireteamId}-${experienceId}-${Date.now()}`;
    const meetingUrl = `https://meet.jit.si/${roomName}`;
    
    return {
      roomName,
      meetingUrl,
      meetingId: roomName,
      title: title || 'Experience Discussion',
      config: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        disableDeepLinking: true,
        enableInsecureRoomNameWarning: false,
        enableNoisyMicDetection: true,
        enableTalkWhileMuted: false,
        enableLayerSuspension: true,
        startScreenSharing: false,
        enableRemb: true,
        enableTcc: true,
        useStunTurn: true,
        enableIceRestart: true,
        enableP2P: true,
        p2p: {
          enabled: true,
          stunServers: [
            { urls: 'stun:meet-jit-si-turnrelay.jitsi.net:443' }
          ]
        }
      }
    };
  },
};
