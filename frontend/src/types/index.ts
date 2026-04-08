// --------------------
// Types
// --------------------

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sex: string;
  country: string;
  school: string;
  department: string;
  phoneNumber: string | number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  user_id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sex: string;
  country: string;
  school: string;
  department: string;
  phoneNumber: string | number;
  role: "student" | "worker" | "instructor" | "admin";
}

export interface AuthResponse {
  user: User;
  emailVerification: {
    status: string;
  };
  message?: string;
}

export interface AuthSignInResponse {
  user_id: string | number;
  first_name: string;
  last_name: string;
  sex: string;
  email: string;
  phone_number: string | number;
  role: string;
  country: string;
  date_created: string | Date;
  department: string;
  school: string;
  err: string;
}

// Error shape for axios-like errors
export interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export interface Course {
  id: string;
  code: string;
  level: "100L" | "200L";
  title: string;
  description: string;
  drafts: number;
  published: number;
}

export interface Notification {
  notification_id: string;
  notification: string;
  notification_type: "course" | "quiz" | "message" | "general";
  date_updated: string;
  status: "read" | "unread";
}

export interface FullMaterialTopicType {
  topic_id: string | number;
  course_id: string;
  user_id: string | number;
  topic: string;
  content_uri: string;
  status: string;
  date_uploaded: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  sex: string;
  phone_number: string;
  school: string;
  department: string;
  country: string;
  date_created: string;
  course_code: string;
  course_title: string;
  course_desc: string;
  course_level: string;
}
