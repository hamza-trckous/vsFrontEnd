"use client";
import React, { ReactNode, useEffect } from "react";
import Dashboard from "../../components/dashbord/dashbord";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const DashboardContent = ({ children }: { children: ReactNode }) => {
  const { isAdmin, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push("/");
    }
  }, [isAdmin, router, isLoggedIn]);
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
