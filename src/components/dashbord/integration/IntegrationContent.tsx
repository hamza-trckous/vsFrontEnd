"use client";
import React, { useState } from "react";
import AlertModal from "@/components/AlertModal"; // Import AlertModal

import Title from "@/components/dashbord/integration/Title";
import Main from "@/components/dashbord/integration/main";
import Container from "../multualCompenents/Container";

const IntegrationPage = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  return (
    <Container>
      <Title title={"setting"} />
      <Main setAlertType={setAlertType} setAlertMessage={setAlertMessage} />
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
