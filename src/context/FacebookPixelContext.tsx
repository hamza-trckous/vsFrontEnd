"use client";
import React, { createContext, useContext, useEffect } from "react";
import { injectFacebookPixel } from "@/api/TrackConversion";
import trackFacebookEvent from "@/utils/trackFacebookEvent";

interface FacebookPixelContextProps {
  trackPageView: (
    eventData?: Record<string, string | number | boolean | object>,
    isAdmin?: boolean
  ) => void;
}

const FacebookPixelContext = createContext<
  FacebookPixelContextProps | undefined
>(undefined);

export const useFacebookPixel = () => {
  const context = useContext(FacebookPixelContext);
  if (!context) {
    throw new Error(
      "useFacebookPixel must be used within a FacebookPixelProvider"
    );
  }
  return context;
};

export const FacebookPixelProvider: React.FC<{
  pixelId: string;
  children: React.ReactNode;
}> = ({ pixelId, children }) => {
  useEffect(() => {
    injectFacebookPixel(pixelId);
  }, [pixelId]);

  const trackPageView = (
    eventData?: Record<string, string | number | boolean | object>,
    isAdmin?: boolean
  ) => {
    trackFacebookEvent({
      eventName: "PageView",
      data: eventData || {},
      isAdmin: isAdmin || false,
    });
  };

  return (
    <FacebookPixelContext.Provider value={{ trackPageView }}>
      {children}
    </FacebookPixelContext.Provider>
  );
};
