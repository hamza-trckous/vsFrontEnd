"use client";
import { useState, useEffect, useRef } from "react";
import { getSettings } from "@/api/settings";

const useFetchSettings = () => {
  const [pixelId, setPixelId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const handleLoad = () => {
      // Wait for two animation frames to ensure all UI updates are complete
      requestAnimationFrame(() => {
        requestAnimationFrame(async () => {
          try {
            const settings = await getSettings();
            setPixelId(settings.pixelId || "");
          } catch (error) {
            console.error("Error fetching settings:", error);
          } finally {
            setLoading(false);
          }
        });
      });
    };

    // If document is already loaded, execute with a small delay
    if (document.readyState === "complete") {
      setTimeout(handleLoad, 100);
    } else {
      // Otherwise wait for load event
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);
  return { pixelId, loading };
};

export default useFetchSettings;
