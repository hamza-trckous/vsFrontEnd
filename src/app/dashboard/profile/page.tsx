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
import { useTheme } from "@/context/themeContext";
import { ColorName } from "@/utils/theme";
import { useProfileContext } from "@/context/ProfileContext";

const IntegrationPage = () => {
  const { lang } = useLanguage();
  const { Profile, setProfile } = useProfileContext();
  // const [profile, setprofile] = useState<profile>({
  //   logo: { src: "", enable: true },
  //   nameOfBrand: { name: "", enable: true },
  //   cover: { name: "", enable: true, title: "", subtitle: "" },
  //   color: "teal" as ColorName,
  //   slogon: { name: "", enable: true },
  //   category: { enable: true }
  // });
  const [coverType, setCoverType] = useState<"image" | "video">("image");
  const { alertMessage, alertType, setAlertMessage, setAlertType } = useAlert();
  const { currentColor } = useTheme();
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
      <ConfigColor currentColor={currentColor} />
      <Settings
        coverType={coverType}
        setprofile={setProfile}
        currentColor={currentColor}
        fetchSettings={fetchSettings}
        profile={Profile}
        setAlertMessage={setAlertMessage}
        setAlertType={setAlertType}
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
