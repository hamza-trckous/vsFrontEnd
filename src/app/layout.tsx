import React from "react";
import "../styles/globals.css";
import Nav from "../components/Nav";
import TopNavBar from "@/components/topNavBar";
import { AuthProvider } from "@/context/AuthContext";
import MainContent from "@/components/MainContent"; // Import the MainContent component
import { UserProvider } from "@/context/UserContext";
import AlertProvider from "@/context/useAlert";
import ClientFacebookWrapper from "@/components/ClientFacebookWrapper";
import { CategoryProvider } from "@/context/CategoryContext";
import UseQueryProvider from "@/components/useQueryProvider";
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <title>Babybloom</title>
      </head>
      <body className="antialiased">
        <UseQueryProvider>
          <AlertProvider>
            <CategoryProvider>
              <UserProvider>
                <AuthProvider>
                  <ClientFacebookWrapper>
                    <TopNavBar />
                    <Nav />
                    <MainContent>{children}</MainContent>
                  </ClientFacebookWrapper>
                </AuthProvider>
              </UserProvider>
            </CategoryProvider>
          </AlertProvider>{" "}
        </UseQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
