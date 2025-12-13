"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardsLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // No account? Redirect to login
      router.push("/login");
      return;
    }

    // Role-based dashboard redirection
    const roleDashboardMap: Record<string, string> = {
      student: "/dashboard/students",
      worker: "/dashboard/workers",
      instructor: "/dashboard/instructors",
      admin: "/dashboard/admin",
    };

    const currentPath = window.location.pathname;
    const allowedPaths = Object.values(roleDashboardMap);

    // If user tries to access a dashboard that doesn't match their role, redirect
    if (!currentPath.startsWith(roleDashboardMap[user.role])) {
      router.push(roleDashboardMap[user.role] || "/login");
    }
  }, [user, router]);

  // Loading while checking auth/role
  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-600">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP NAV */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-gray-600">Role: {user.role}</p>
      </header>

      {/* PAGE CONTENT */}
      <main className="p-6">{children}</main>
    </div>
  );
}
