"use client";

import { createContext, useState, useCallback, type ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { User } from "@/types/user";

type LoginInput = {
  email: string;
  password: string;
  role: "admin" | "teacher";
};

type RegisterInput = {
  email: string;
  name: string;
  password: string;
  institutionName: string;
};

type AuthPayload = {
  token: string;
  user: User;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  registerAdmin: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "edutrack_token";
const USER_KEY = "edutrack_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });
  const loading = false;

  const loginMutation = useMutation({
    mutationFn: (input: LoginInput) =>
      apiClient<AuthPayload>("/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: (data) => {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (input: RegisterInput) =>
      apiClient<AuthPayload>("/auth/register-admin", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: (data) => {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () =>
      apiClient<null>("/auth/logout", { method: "POST" }).catch(() => {}),
    onSettled: () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
    },
  });

  const login = useCallback(
    async (input: LoginInput) => {
      await loginMutation.mutateAsync(input);
    },
    [loginMutation],
  );

  const registerAdmin = useCallback(
    async (input: RegisterInput) => {
      await registerMutation.mutateAsync(input);
    },
    [registerMutation],
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading: loading,
        login,
        registerAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
