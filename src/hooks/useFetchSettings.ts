"use client";
import { useState, useEffect } from "react";
import { getSettings } from "@/api/settings";

const useFetchSettings = () => {
  const [pixelId, setPixelId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const storePixelId = localStorage.getItem("pixelId");
        if (storePixelId) {
          setPixelId(storePixelId);
          setLoading(false);
          return;
        }
        console.log("Fetching settings...");
        const settings = await getSettings();
        localStorage.setItem("pixelId", settings.pixelId || "");
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
