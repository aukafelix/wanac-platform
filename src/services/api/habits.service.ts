import { apiClient } from './config';

export const habitsService = {
  async addDailyHabit(data: any) {
    const response = await apiClient.post('/api/v1/daily-habits/add', data);
    return response.data;
  },
  async updateDailyHabit(data: any) {
    const response = await apiClient.put('/api/v1/daily-habits/update', data);
    return response.data;
  },
  async getTodayDailyHabit() {
    const response = await apiClient.get('/api/v1/daily-habits/today');
    return response.data;
  },
  async getDailyHabitsHistory() {
    const response = await apiClient.get('/api/v1/daily-habits/history');
    return response.data;
  },
  async addWholeLifeAssessment(data: any) {
    const response = await apiClient.post('/api/v1/whole-life-scores/add', data);
    return response.data;
  },
  async updateWholeLifeAssessment(data: any) {
    const response = await apiClient.put('/api/v1/whole-life-scores/update', data);
    return response.data;
  },
  async getWholeLifeHistory() {
    const response = await apiClient.get('/api/v1/whole-life-scores');
    return response.data;
  },
}; 