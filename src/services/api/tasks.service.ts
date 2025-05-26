import { apiClient } from './config';
import { Task } from './types';

export const tasksService = {
  async getTasks(): Promise<Task[]> {
    const response = await apiClient.get<Task[]>('/api/v1/tasks');
    return response.data;
  },

  async addTask(data: Partial<Task>): Promise<Task> {
    const response = await apiClient.post<Task>('/api/v1/tasks/add', data);
    return response.data;
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const response = await apiClient.put<Task>(`/api/v1/tasks/update/${id}`, data);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/tasks/delete/${id}`);
  },
}; 