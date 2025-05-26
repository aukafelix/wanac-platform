import { apiClient } from './config';
import { Session, SessionNote, SessionResource } from './types';

export const sessionsService = {
  async getSessions(): Promise<Session[]> {
    const response = await apiClient.get<Session[]>('/api/v1/sessions');
    return response.data;
  },

  async addSession(data: Partial<Session>): Promise<Session> {
    const response = await apiClient.post<Session>('/api/v1/sessions/add', data);
    return response.data;
  },

  async updateSession(id: string, data: Partial<Session>): Promise<Session> {
    const response = await apiClient.put<Session>(`/api/v1/sessions/update/${id}`, data);
    return response.data;
  },

  async deleteSession(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/sessions/delete/${id}`);
  },

  // Session Notes
  async addNote(data: Partial<SessionNote>): Promise<SessionNote> {
    const response = await apiClient.post<SessionNote>('/api/v1/sessions/notes/add', data);
    return response.data;
  },

  async updateNote(id: string, data: Partial<SessionNote>): Promise<SessionNote> {
    const response = await apiClient.put<SessionNote>(`/api/v1/sessions/notes/update/${id}`, data);
    return response.data;
  },

  async deleteNote(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/sessions/notes/delete/${id}`);
  },

  // Session Resources
  async addResource(data: Partial<SessionResource>): Promise<SessionResource> {
    const response = await apiClient.post<SessionResource>('/api/v1/sessions/resources/add', data);
    return response.data;
  },

  async updateResource(id: string, data: Partial<SessionResource>): Promise<SessionResource> {
    const response = await apiClient.put<SessionResource>(`/api/v1/sessions/resources/update/${id}`, data);
    return response.data;
  },

  async deleteResource(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/sessions/resources/delete/${id}`);
  },
}; 