import { apiClient } from './config';

export const journalService = {
  async getJournals() {
    const response = await apiClient.get('/api/v1/journals');
    return response.data;
  },

  async addJournal({ title, content }: { title: string; content?: string }) {
    const response = await apiClient.post('/api/v1/journals/add', { title, content });
    return response.data;
  },
}; 