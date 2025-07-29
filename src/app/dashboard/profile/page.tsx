"use client";
import React, { useState, useEffect } from "react";
import AlertModal from "@/components/AlertModal"; // Import AlertModal
import { getSettingsProfile } from "@/api/profile";

import { useAlert } from "@/context/useAlert";
import TitleRtl from "@/components/dashbord/multualCompenents/Title";
import Container from "@/components/dashbord/multualCompenents/Container";
import Settings from "@/components/dashbord/Profile/settings";
import ConfigColor from "@/components/dashbord/Profile/ConfigColor";
import { useLanguage } from "@/context/languageColorContext";
import { setCookie } from "cookies-next";
import { ColorName } from "@/utils/theme";
import { useProfileContext } from "@/context/ProfileContext";

const IntegrationPage = () => {
  const { lang } = useLanguage();
  const { setProfile } = useProfileContext();
  const [coverType, setCoverType] = useState<"image" | "video">("image");
  const { alertMessage, alertType, setAlertMessage } = useAlert();
  const fetchSettings = async () => {
    try {
      const settings = await getSettingsProfile();
      setProfile({
        ...settings,
        color: settings.color as ColorName
      });
      setCookie("ColorText", settings.color);
      // Optional: determine cover type from file extension
      const isVideo = settings.cover?.name?.match(/\.(mp4|webm|ogg)$/);
      setCoverType(isVideo ? "video" : "image");
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <Container lang={lang}>
      <TitleRtl
        title="   
Store settings
        "
      />
      <ConfigColor />
      <Settings
        coverType={coverType}
        fetchSettings={fetchSettings}
        setCoverType={setCoverType}
      />

      {alertMessage && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </Container>
  );
};

export default IntegrationPage;
