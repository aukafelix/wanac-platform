import { apiClient } from './config';

export interface MeetingSession {
  id?: number;
  experience_id: number;
  fireteam_id: number;
  meeting_link: string;
  meeting_token?: string;
  started_at?: string;
  ended_at?: string;
  duration?: number;
  status: 'scheduled' | 'in_progress' | 'ended';
  participants?: number;
}

export interface MeetingRecording {
  id?: number;
  session_id?: number;
  fireteam_id: number;
  experience_id: number;
  file_url?: string;
  transcript?: string;
  summaries?: any;
  metadata?: any;
  created_at?: string;
}

export const meetingService = {
  /**
   * Generate or retrieve secure meeting link
   */
  async getMeetingLink(experienceId: number, fireteamId: number): Promise<{
    meetingLink: string;
    token?: string;
  }> {
    try {
      // Try to get existing meeting link from backend
      const response = await apiClient.get(
        `/api/v1/fireteams/${fireteamId}/experiences/${experienceId}/meeting-link`
      );
      
      return {
        meetingLink: response.data.meeting_link || response.data.meetingLink,
        token: response.data.token,
      };
    } catch (error: any) {
      // If no link exists (404), generate one
      if (error.response?.status === 404) {
        console.log('No existing meeting link, generating new one...');
        
        // Generate secure token
        const token = this.generateSecureToken();
        const jitsiDomain = process.env.NEXT_PUBLIC_JITSI_DOMAIN || 'meet.jit.si';
        const meetingLink = `https://${jitsiDomain}/wanac-exp-${experienceId}-${token}`;
        
        // Try to save to backend
        try {
          await this.saveMeetingLink(experienceId, fireteamId, meetingLink, token);
        } catch (saveError) {
          console.warn('Could not save meeting link to backend:', saveError);
          // Continue anyway with generated link
        }
        
        return { meetingLink, token };
      }
      
      // For other errors, generate temporary link
      console.warn('Error fetching meeting link, generating temporary:', error);
      const token = this.generateSecureToken();
      const jitsiDomain = process.env.NEXT_PUBLIC_JITSI_DOMAIN || 'meet.jit.si';
      return {
        meetingLink: `https://${jitsiDomain}/wanac-exp-${experienceId}-${token}`,
        token,
      };
    }
  },

  /**
   * Save meeting link to backend
   */
  async saveMeetingLink(
    experienceId: number,
    fireteamId: number,
    meetingLink: string,
    token?: string
  ): Promise<void> {
    try {
      await apiClient.post(
        `/api/v1/fireteams/${fireteamId}/experiences/${experienceId}/meeting-link`,
        {
          meeting_link: meetingLink,
          token: token,
        }
      );
    } catch (error) {
      console.error('Failed to save meeting link:', error);
      throw error;
    }
  },

  /**
   * Generate secure random token
   */
  generateSecureToken(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback for older browsers
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  },

  /**
   * Start meeting session (tracking)
   */
  async startSession(data: {
    experience_id: number;
    fireteam_id: number;
    meeting_link: string;
  }): Promise<MeetingSession> {
    try {
      const response = await apiClient.post('/api/v1/meetings/sessions/start', {
        ...data,
        started_at: new Date().toISOString(),
        status: 'in_progress',
      });
      
      return response.data.data || response.data;
    } catch (error) {
      console.error('Failed to start session:', error);
      // Return mock session if backend not ready
      return {
        experience_id: data.experience_id,
        fireteam_id: data.fireteam_id,
        meeting_link: data.meeting_link,
        started_at: new Date().toISOString(),
        status: 'in_progress',
      };
    }
  },

  /**
   * End meeting session
   */
  async endSession(sessionId: number, data: {
    ended_at?: string;
    duration?: number;
    participants?: number;
  }): Promise<void> {
    try {
      await apiClient.post(`/api/v1/meetings/sessions/${sessionId}/end`, {
        ...data,
        ended_at: data.ended_at || new Date().toISOString(),
        status: 'ended',
      });
    } catch (error) {
      console.error('Failed to end session:', error);
      // Don't throw, session ending is not critical
    }
  },

  /**
   * Upload meeting recording with metadata
   */
  async uploadRecording(
    fireteamId: number,
    experienceId: number,
    recordingBlob: Blob,
    metadata: {
      transcript?: string;
      summaries?: any;
      participants?: any[];
      start_time?: string;
      end_time?: string;
      duration?: string;
      user_id?: string;
      user_name?: string;
      attendance_log?: any[];
    }
  ): Promise<MeetingRecording> {
    try {
      const formData = new FormData();
      
      // Add file
      formData.append('file', recordingBlob, `meeting-${experienceId}-${Date.now()}.webm`);
      
      // Add fireteam ID
      formData.append('fire_team_id', String(fireteamId));
      
      // Add experience ID
      formData.append('experience_id', String(experienceId));
      
      // Add metadata as JSON string
      formData.append('metadata', JSON.stringify(metadata));
      
      const response = await apiClient.post(
        '/api/v1/fireteams/recordings/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 300000, // 5 minutes for large files
        }
      );
      
      console.log('✅ Recording uploaded successfully:', response.data);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('❌ Failed to upload recording:', error);
      throw new Error(
        'Failed to upload recording: ' + 
        (error.response?.data?.message || error.message)
      );
    }
  },

  /**
   * Get meeting recordings for a fireteam
   */
  async getRecordings(fireteamId: number): Promise<MeetingRecording[]> {
    try {
      const response = await apiClient.get(
        `/api/v1/fireteams/${fireteamId}/recordings`
      );
      
      const data = response.data.data || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to get recordings:', error);
      return [];
    }
  },

  /**
   * Get recording by ID
   */
  async getRecording(recordingId: number): Promise<MeetingRecording | null> {
    try {
      const response = await apiClient.get(
        `/api/v1/fireteams/recordings/${recordingId}`
      );
      
      return response.data.data || response.data;
    } catch (error) {
      console.error('Failed to get recording:', error);
      return null;
    }
  },

  /**
   * Delete recording
   */
  async deleteRecording(recordingId: number): Promise<void> {
    try {
      await apiClient.delete(`/api/v1/fireteams/recordings/${recordingId}`);
    } catch (error) {
      console.error('Failed to delete recording:', error);
      throw error;
    }
  },
};

