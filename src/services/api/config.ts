import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Base URL for the WANAC backend API. Prefer NEXT_PUBLIC_API_BASE_URL; fall back to NEXT_PUBLIC_API_URL or production.
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://api.wanac.org';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true // Enable sending cookies in cross-origin requests
  // NOTE: When withCredentials is true, the server MUST specify an explicit
  // Access-Control-Allow-Origin value and cannot use wildcard (*)
  // The server must also set Access-Csontrol-Allow-Credentials: true
});

// Add a request interceptor for authentication
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('auth_token');
    }
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
); 