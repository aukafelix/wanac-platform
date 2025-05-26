import { apiClient } from './config';
import { Profile } from './types';

export const profileService = {
  async getProfile(): Promise<Profile> {
    const response = await apiClient.get<Profile>('/api/v1/profile');
    return response.data;
  },

  async updateProfile(data: Partial<Profile>): Promise<Profile> {
    const response = await apiClient.get<Profile>('/api/v1/profile/update', { params: data });
    return response.data;
  },
}; 