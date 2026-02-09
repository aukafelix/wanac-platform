import { apiClient } from './config';
import { Session, SessionNote, SessionResource, GetSessionResponse } from './types';

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

  async getSession(id: string): Promise<GetSessionResponse> {
    const response = await apiClient.get<GetSessionResponse | Session>(`/api/v1/sessions/${id}`);
    const data = response.data;
    return (data && typeof data === 'object' && 'session' in data)
      ? (data as GetSessionResponse)
      : { session: data as Session };
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

  async addSessionMember(sessionId: string, clientId: number): Promise<any> {
    const response = await apiClient.post('/api/v1/sessions/members/add', {
      session_id: sessionId,
      client_id: clientId,
    });
    return response.data;
  },

  // Add Session Resource with file upload support
  async addSessionResource({ session_id, name, description, file, link }: { session_id: string | number, name: string, description?: string, file?: File | null, link?: string }): Promise<any> {
    let body: FormData | object;
    let headers: Record<string, string> = {};
    if (file) {
      const formData = new FormData();
      formData.append('session_id', String(session_id));
      formData.append('name', name);
      if (description) formData.append('description', description);
      if (link) formData.append('link', link);
      formData.append('file', file);
      body = formData;
      // Do not set Content-Type for FormData so browser sets boundary
    } else {
      body = {
        session_id,
        name,
        ...(description ? { description } : {}),
        ...(link ? { link } : {})
      };
      headers = { 'Content-Type': 'application/json' };
    }
    const response = await apiClient.post('/api/v1/sessions/resources/add', body, headers ? { headers } : undefined);
    return response.data;
  },
}; 