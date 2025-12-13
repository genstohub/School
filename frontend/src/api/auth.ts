// src/api/auth.ts
import axios from "axios";

const BASE_URL = "https://your-backend-url.com/api/auth";

// --------------------
// Types
// --------------------

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: "student" | "worker" | "instructor" | "admin";
}

export interface AuthResponse {
    user: User;
    message?: string;
}

// Error shape for axios-like errors
interface AxiosErrorResponse {
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
}

// Utility to extract API error safely, WITHOUT using any
function extractError(err: unknown): string {
    const e = err as AxiosErrorResponse;

    return (
        e?.response?.data?.message ||
        e?.message ||
        "Something went wrong"
    );
}

// --------------------
// API Calls
// --------------------

export const register = async (data: RegisterPayload): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${BASE_URL}/register`,
            data,
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        throw new Error(extractError(err));
    }
};

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${BASE_URL}/login`,
            data,
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        throw new Error(extractError(err));
    }
};

export const logout = async (): Promise<void> => {
    try {
        await axios.post(
            `${BASE_URL}/logout`,
            {},
            { withCredentials: true }
        );
    } catch (err) {
        console.warn(extractError(err));
    }
};

export const getCurrentUser = async (): Promise<User> => {
    try {
        const response = await axios.get<User>(`${BASE_URL}/me`, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        throw new Error(extractError(err));
    }
};
