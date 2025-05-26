// Auth Types
export interface RegisterRequest {
  name: string;
  email: string;
  role: string;
  password: string;
  phone?: string;
  timezone?: string;
  bio?: string;
  specialty?: string;
  referralCode?: string;
  preferredContact?: string;
  profilePic?: string | null;
}

export interface LoginRequest {
  email: string;
  role: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Profile Types
export interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add other profile fields as needed
}

// Session Types
export interface Session {
  id: string;
  title: string;
  description: string;
  date: string;
  // Add other session fields as needed
}

export interface SessionNote {
  id: string;
  content: string;
  session_id: string;
  // Add other note fields as needed
}

export interface SessionResource {
  id: string;
  title: string;
  url: string;
  session_id: string;
  // Add other resource fields as needed
}

// Task Types
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
  // Add other task fields as needed
}

// Post Types
export interface Post {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  // Add other post fields as needed
}

export interface Comment {
  id: string;
  content: string;
  post_id: string;
  user_id: string;
  created_at: string;
  // Add other comment fields as needed
} 