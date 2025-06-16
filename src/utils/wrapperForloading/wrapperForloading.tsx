// AppLoaderWrapper.tsx
"use client";
import React, { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/themeContext";
import LoadingComp from "@/components/Loading";
import { useProfileContext } from "@/context/ProfileContext";

const AppLoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const { loading: authLoading } = useAuth();
  const { currentColor } = useTheme();
  const { Profile, LoadingProfile } = useProfileContext();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!authLoading && currentColor && Profile && !LoadingProfile) {
      setIsReady(true);
    }
  }, [authLoading, currentColor, Profile, LoadingProfile]);

  if (!isReady) {
    return <LoadingComp />; // or your custom spinner
  }

  return <>{children}</>;
};

export default AppLoaderWrapper;
