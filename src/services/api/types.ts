// Auth Types
export interface RegisterRequest {
  name: string;
  email: string;
  role: string;
  password: string;
  password_confirmation: string;
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

// Session Types (aligned with API)
export interface SessionMember {
  id?: string | number;
  client?: { user?: { name?: string; email?: string } };
}

export interface SessionResourceApi {
  id?: string | number;
  name?: string;
  description?: string;
  link?: string;
  url?: string;
}

export interface SessionNoteApi {
  id?: string | number;
  content?: string;
  note?: string;
  created_at?: string;
}

export interface Session {
  id: string;
  title: string;
  description?: string;
  date?: string;
  scheduled_at?: string;
  session_link?: string;
  meeting_link?: string;
  status?: string;
  session_members?: SessionMember[];
  session_resources?: SessionResourceApi[];
  session_notes?: SessionNoteApi[];
  duration_minutes?: number;
}

export interface GetSessionResponse {
  session: Session;
}

export interface SessionNote {
  id: string;
  content: string;
  session_id: string;
  created_at?: string;
}

export interface SessionResource {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  url?: string;
  link?: string;
  session_id: string;
}

// Eisenhower Matrix Priority Type
export type Priority =
  | 'urgent_important'
  | 'not_urgent_important'
  | 'urgent_not_important'
  | 'not_urgent_not_important';

// Task Types
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
  who?: string;
  what?: string;
  when?: string;
  where?: string;
  why?: string;
  how?: string;
  priority?: Priority;
  priority_justification?: string;
  notes?: string;
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