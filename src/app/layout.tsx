import React from "react";
import "../styles/globals.css";
import Nav from "../components/Nav";
import TopNavBar from "@/components/topNavBar";
import { AuthProvider } from "@/context/AuthContext";
import MainContent from "@/components/MainContent";
import { UserProvider } from "@/context/UserContext";
import { ShippingProvider } from "@/context/ShippingContext";
import AlertProvider from "@/context/useAlert";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Babybloom",
  icons: {
    icon: "/favicon.png",
    // You can also add these for better compatibility
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased">
        <AlertProvider>
          <ShippingProvider>
            <UserProvider>
              <AuthProvider>
                <TopNavBar />
                <Nav />
                <MainContent>{children}</MainContent>
              </AuthProvider>
            </UserProvider>
          </ShippingProvider>
        </AlertProvider>
      </body>
    </html>
  );
};

export default RootLayout;
