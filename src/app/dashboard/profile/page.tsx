"use client";
import React, { useState, useEffect } from "react";
import AlertModal from "@/components/AlertModal"; // Import AlertModal
import { getSettingsProfile } from "@/api/profile";
import Image from "next/image";

import { useAlert } from "@/context/useAlert";
import TitleRtl from "@/components/dashbord/multualCompenents/Title";
import Container from "@/components/dashbord/multualCompenents/Container";
import Settings from "@/components/dashbord/Profile/settings";

const IntegrationPage = () => {
  const [logo, setlogo] = useState("");
  const [nameOfBrand, setnameOfBrand] = useState("");
  const [cover, setCover] = useState("");
  const [coverType, setCoverType] = useState<"image" | "video">("image");
  const { alertMessage, alertType, setAlertMessage, setAlertType } = useAlert();

  const fetchSettings = async () => {
    try {
      const settings = await getSettingsProfile();
      setlogo(settings.logo || "");
      setnameOfBrand(settings.nameOfBrand || "");
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <Container>
      <TitleRtl
        title="   
        اعدادات المتجر
        "
      />
      <Settings
        setnameOfBrand={setnameOfBrand}
        cover={cover}
        fetchSettings={fetchSettings}
        logo={logo}
        setlogo={setlogo}
        setAlertMessage={setAlertMessage}
        setAlertType={setAlertType}
        setCover={setCover}
        setCoverType={setCoverType}
        nameOfBrand={nameOfBrand}
      />
      <div className="bg-white shadow-md grid grid-cols-2 rounded-lg p-4 mt-3">
        {cover && (
          <div className="mt-2">
            {coverType === "image" ? (
              <Image
                src={cover}
                alt="Cover preview"
                width={400}
                height={200}
                className="rounded-lg object-cover w-full"
              />
            ) : (
              <video controls className="rounded-lg w-full" src={cover}>
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>
      {/* Cover Preview */}

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
