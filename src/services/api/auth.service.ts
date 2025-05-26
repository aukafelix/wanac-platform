import { apiClient } from './config';
import {
  RegisterRequest,
  LoginRequest,
  ResetPasswordRequest,
  ForgotPasswordRequest,
  AuthResponse,
} from './types';

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/register', data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await apiClient.post('/api/v1/auth/reset-password', data);
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await apiClient.post('/api/v1/auth/forgot-password', data);
  },

  async updatePassword(data: { password: string }): Promise<void> {
    await apiClient.post('/api/v1/auth/update-password', data);
  },

  logout(): void {
    localStorage.removeItem('auth_token');
  },
}; 