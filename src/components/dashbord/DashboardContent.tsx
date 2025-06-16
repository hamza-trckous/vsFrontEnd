"use client";
import React, { ReactNode, useEffect } from "react";
import Dashboard from "../../components/dashbord/dashbord";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const DashboardContent = ({ children }: { children: ReactNode }) => {
  const { isAdmin, isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push("/");
    }
    console.log(isAdmin, "isAdmin", "isLoggedIn", isLoggedIn);
  }, [isAdmin, router, isLoggedIn, loading]);
  return (
    <>
      {isAdmin && isLoggedIn && (
        <>
          <Dashboard />
          {children}
        </>
      )}
    </>
  );
};

export default DashboardContent;
