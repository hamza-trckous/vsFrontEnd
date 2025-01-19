"use client";

import { FacebookPixelProvider } from "@/context/FacebookPixelContext";
import useFetchSettings from "@/hooks/useFetchSettings";
import { ReactNode } from "react";

const ClientFacebookWrapper = ({ children }: { children: ReactNode }) => {
  const { pixelId } = useFetchSettings() || { pixelId: "" };
  const validPixelId = pixelId || "";
  return (
    <FacebookPixelProvider pixelId={validPixelId}>
      {children}
    </FacebookPixelProvider>
  );
};
export default ClientFacebookWrapper;
