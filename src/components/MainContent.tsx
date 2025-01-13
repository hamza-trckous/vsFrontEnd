// MainContent.tsx
"use client";
import React from "react";
import { FaSpinner } from "react-icons/fa"; // Import the loading icon
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook
import dynamic from "next/dynamic";
import useFetchSettings from "@/hooks/useFetchSettings";
import useTrackPageView from "@/hooks/useTrackPageView";

const FacebookPixelProvider = dynamic(
  () =>
    import("@/context/FacebookPixelContext").then(
      (mod) => mod.FacebookPixelProvider
    ),
  {
    ssr: false,
  }
);

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
  const { pixelId, loading: settingsLoading } = useFetchSettings();

  if (authLoading || settingsLoading) {
    return <Loading />;
  }

  return (
    <FacebookPixelProvider pixelId={pixelId!}>
      {!isAdmin && <PageViewTracker />}
      {children}
    </FacebookPixelProvider>
  );
};

const PageViewTracker: React.FC = () => {
  useTrackPageView();
  return null;
};

export default MainContent;
