import { apiClient } from './config';
import { AuthResponse } from './types';

export const googleAuthService = {
  async loginWithGoogle(credential: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/google', { credential });
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  }
}; 