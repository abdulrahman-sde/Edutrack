"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export function useAdminSession(options: { skip?: boolean } = {}) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (options.skip || isLoading) return;

    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, options.skip, router]);

  return {
    ready: !isLoading,
    session: user
      ? {
          name: user.name,
          email: user.email,
          institutionName: user.institutionName,
        }
      : null,
  };
}
