// MainContent.tsx
"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import useTrackPageView from "@/hooks/useTrackPageView";

const MainContent: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { isAdmin } = useAuth();

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
