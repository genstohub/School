// src/api/auth.ts
import axios from "axios";
import {  AuthSignInResponse, AxiosErrorResponse, LoginPayload,  User } from "@/types";
import { REST_API } from "@/constants";

// const BASE_URL = "https://your-backend-url.com/api/auth";


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

// export const createAccount = async (data: RegisterPayload) => {
//     try {
//        await fetch(`${REST_API}/auth_create/create_account`, {
//             method: "post",
//             headers: { "content-Type": "application/json" },
//             credentials: "include",
//             body: JSON.stringify(data)
//         }).then(response => response.json())
//             .then(res => {
//                 if (res.user.user_id && res.emailVerification.status === "sent") { 
//                     return res
//                 }
//             }).catch(err => {
//             console.log(err)
//         })
        
//     } catch (err) {
//         throw new Error(extractError(err));
//     }
// };

export const login = async (data: LoginPayload): Promise<AuthSignInResponse> => {
    try {
        const response = await axios.post<AuthSignInResponse>(
            `${REST_API}/auth_sign/signin`,
            data,
            { withCredentials: true }
        );
        console.log(response.data)
        return response.data;
    } catch (err) {
        throw new Error(extractError(err));
    }
};

export const logout = async (): Promise<void> => {
    try {
        await axios.post(
            `${REST_API}/logout`,
            {},
            { withCredentials: true }
        );
    } catch (err) {
        console.warn(extractError(err));
    }
};

export const getCurrentUser = async (): Promise<User> => {
    try {
        const response = await axios.get<User>(`${REST_API}/me`, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        throw new Error(extractError(err));
    }
};
