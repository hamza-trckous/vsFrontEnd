"use client";
import React, { useEffect, useState } from "react";
import AccessTokenPixlId from "@/components/dashbord/integration/AccessToken";
import Save from "@/components/dashbord/integration/Save";
import PixlId from "@/components/dashbord/integration/pixlId";
import Testing from "@/components/dashbord/integration/Testing";
import SuceesMessage from "@/components/dashbord/integration/SuccesMessage";
import { getSettings } from "@/api/settings";
const Main = ({
  setAlertType,
  setAlertMessage,
}: {
  setAlertType: React.Dispatch<React.SetStateAction<"success" | "error">>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [pixelId, setPixelId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const fetchSettings = async () => {
    try {
      const settings = await getSettings();
      setPixelId(settings.pixelId || "");
      setAccessToken(settings.accessToken || "");
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <PixlId pixelId={pixelId} setPixelId={setPixelId} />
      <AccessTokenPixlId
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />
      <Save
        accessToken={accessToken}
        pixelId={pixelId}
        fetchSettings={fetchSettings}
        setIsSaved={setIsSaved}
        setAlertType={setAlertType}
        setAlertMessage={setAlertMessage}
      />
      {isSaved && <SuceesMessage />}
      <Testing
        setAlertType={setAlertType}
        setAlertMessage={setAlertMessage}
        pixelId={pixelId}
      />
    </div>
  );
};

export default Main;
