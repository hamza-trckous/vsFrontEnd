import React from "react";
import "../styles/globals.css";
import Nav from "../components/Nav";
import TopNavBar from "@/components/topNavBar";
import { AuthProvider } from "@/context/AuthContext";
import MainContent from "@/components/MainContent"; // Import the MainContent component
import { UserProvider } from "@/context/UserContext";
import { ShippingProvider } from "@/context/ShippingContext";
import AlertProvider from "@/context/useAlert";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://drive.google.com/file/d/1upWwNK73-wThO4PHQMazxvMm8iNnO9U3/view?usp=drive_link"
          type="image/png"
        />
        <title>Babybloom</title>
      </head>
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
