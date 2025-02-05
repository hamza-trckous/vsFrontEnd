// MainContent.tsx
"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import useTrackPageView from "@/hooks/useTrackPageView";

import Loading from "@/components/Loading";

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
