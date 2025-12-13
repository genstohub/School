"use client";

import { createContext, useContext, useState, useEffect } from "react";
import * as authAPI from "@/api/auth";
import {
  User,
  RegisterPayload,
  LoginPayload,
  AuthResponse
} from "@/api/auth";

interface AuthContextType {
  user: User | null;
  register: (data: RegisterPayload) => Promise<void>;
  login: (data: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load current session from cookies
  useEffect(() => {
    authAPI
      .getCurrentUser()
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, []);

  const register = async (payload: RegisterPayload) => {
    const res: AuthResponse = await authAPI.register(payload);
    setUser(res.user);
  };

  const login = async (payload: LoginPayload) => {
    const res: AuthResponse = await authAPI.login(payload);
    setUser(res.user);
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
