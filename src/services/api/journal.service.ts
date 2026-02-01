import { apiClient } from './config';

export const journalService = {
  async getJournals() {
    const response = await apiClient.get('/api/v1/journals');
    return response.data;
  },

  async addJournal({ title, content, prompt_number, day_number }: { title: string; content?: string; prompt_number?: number; day_number?: number }) {
    const response = await apiClient.post('/api/v1/journals/add', { title, content, prompt_number, day_number });
    return response.data;
  },

  async updateJournal(id: string, { title, content, prompt_number, day_number }: { title: string; content?: string; prompt_number?: number; day_number?: number }) {
    const response = await apiClient.put(`/api/v1/journals/${id}`, { title, content, prompt_number, day_number });
    return response.data;
  },

  async deleteJournal(id: string) {
    const response = await apiClient.delete(`/api/v1/journals/${id}`);
    return response.data;
  },
}; 