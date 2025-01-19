// MainContent.tsx
"use client";
import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import useTrackPageView from "@/hooks/useTrackPageView";

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="flex flex-col items-center">
      <FaSpinner className="animate-spin text-teal-500 text-4xl mb-4" />
      <p className="text-teal-500 text-lg">Loading...</p>
    </div>
  </div>
);

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading: authLoading, isAdmin } = useAuth();

  if (authLoading) {
    return <Loading />;
  }

  return (
    <>
      {!isAdmin && <PageViewTracker />}
      {children}
    </>
  );
};

const PageViewTracker: React.FC = () => {
  useTrackPageView();
  return null;
};

export default MainContent;
