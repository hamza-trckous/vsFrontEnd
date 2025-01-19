"use client";
import { useState, useEffect } from "react";
import { getSettings } from "@/api/settings";

const useFetchSettings = () => {
  const [pixelId, setPixelId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // Push to the end of the event queue
    Promise.resolve()
      .then(() => Promise.resolve()) // Push it even further back
      .then(async () => {
        try {
          console.log("Fetching settings...");
          const settings = await getSettings();
          setPixelId(settings.pixelId || "");
        } catch (error) {
          console.error("Error fetching settings:", error);
        } finally {
          setLoading(false);
        }
      });
  }, []);
  return { pixelId, loading };
};

export default useFetchSettings;
