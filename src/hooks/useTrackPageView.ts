"use client";
import { useEffect } from "react";
import { useFacebookPixel } from "@/context/FacebookPixelContext";

const useTrackPageView = (
  eventData?: Record<string, string | number | boolean | object>
) => {
  const { trackPageView } = useFacebookPixel();

  useEffect(() => {
    trackPageView(eventData);
  }, [trackPageView, eventData]);
};

export default useTrackPageView;
