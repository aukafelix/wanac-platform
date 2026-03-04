import { apiClient } from './config';
import { Profile } from './types';

export const profileService = {
  async getProfile(): Promise<Profile> {
    const response = await apiClient.get<Profile>('/api/v1/profile');
    return response.data;
  },

  async updateProfile(data: Partial<Profile>): Promise<Profile> {
    // The public docs list GET `/api/v1/profile/update`, but updating via GET is atypical.
    // Prefer a JSON body update first; fall back to GET-with-params if the backend expects it.
    try {
      const response = await apiClient.put<Profile>('/api/v1/profile/update', data);
      return response.data;
    } catch (err) {
      const status = err?.response?.status;
      // Common "wrong method" statuses: 404/405/422 (varies by backend)
      if (status === 404 || status === 405 || status === 422) {
        const response = await apiClient.get<Profile>('/api/v1/profile/update', { params: data });
        return response.data;
      }
      throw err;
    }
  },
}; 