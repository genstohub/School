"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import {  useLoggedIn, useUser, useUserType } from "@/hooks";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardsLayout({ children }: DashboardLayoutProps) {
  const { user } = useUser();
  const { loggedIn } = useLoggedIn();
  const { userType } = useUserType();
  const router = useRouter();

  useEffect(() => {
    if (!user || !loggedIn) {
      // No account? Redirect to login
      router.push("/signin");
      return;
    } else {
      router.push(`/${userType}s`);
    }
  }, [user, loggedIn, router, userType]);

  // Loading while checking auth/role

  return (
    // <div className="min-h-screen bg-gray-50">
    //   {/* TOP NAV */}
    //   <header className="bg-white shadow-md p-4 flex justify-between items-center">
    //     <h2 className="text-xl font-semibold">Dashboard</h2>
    //     <p className="text-gray-600">Role: {user.role}</p>
    //   </header>

    //   {/* PAGE CONTENT */}
    //   <main className="p-6">{children}</main>
    // </div>
    <>{children}</>
  );
}
