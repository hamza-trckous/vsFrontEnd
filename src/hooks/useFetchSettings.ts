"use client";
import { useState, useEffect } from "react";
import { getSettings } from "@/api/settings";

const useFetchSettings = () => {
  const [pixelId, setPixelId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getSettings();
        setPixelId(settings.pixelId || "");
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { pixelId, loading };
};

export default useFetchSettings;
