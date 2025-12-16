"use client"

// app/(public)/layout.tsx
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";
import { useLoggedIn, useUserType } from "@/hooks";
import { useRouter } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loggedIn } = useLoggedIn();
  const { userType } = useUserType();
  const router = useRouter();

  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    setReadyToRender(false);
    if (loggedIn) {
      router.replace(`/${userType}s`);
    } else setReadyToRender(true);
  }, [loggedIn, router, userType]);

  return (
    readyToRender && (
      <>
        <Header />
        {children}
        <Footer />
      </>
    )
  );
}
