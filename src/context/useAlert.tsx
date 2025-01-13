"use client";
import React, { createContext, useContext, useState } from "react";

interface AlertContextProps {
  alertMessage: string | null;
  alertType: "success" | "error";
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "success" | "error") => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = React.useState<"success" | "error">(
    "success"
  );

  return (
    <AlertContext.Provider
      value={{ alertMessage, alertType, setAlertMessage, setAlertType }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
