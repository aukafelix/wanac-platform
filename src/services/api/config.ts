import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Update base URL to match the documentation
export const BASE_URL = 'https://wanac-api.kuzasports.com/';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true // Enable sending cookies in cross-origin requests
  // NOTE: When withCredentials is true, the server MUST specify an explicit
  // Access-Control-Allow-Origin value and cannot use wildcard (*)
  // The server must also set Access-Control-Allow-Credentials: true
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