import DashboardContent from "@/components/dashbord/DashboardContent";
import React from "react";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <DashboardContent>{children}</DashboardContent>
    </>
  );
};

export default RootLayout;
