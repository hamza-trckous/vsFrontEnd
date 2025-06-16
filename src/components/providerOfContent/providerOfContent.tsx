// components/ProvidersWrapper.tsx
"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import AlertProvider from "@/context/useAlert";
import { CategoryProvider } from "@/context/CategoryContext";
import UseQueryProvider from "@/components/useQueryProvider";
import ClientFacebookWrapper from "@/components/ClientFacebookWrapper";
import TopNavBar from "@/components/topNavBar";
import Nav from "@/components/home/nav/Nav";
import MainContent from "@/components/MainContent";
import { ProfileProvider, useProfileContext } from "@/context/ProfileContext";
import { LanguageProvider } from "@/context/languageColorContext";
import ThemeWraper from "@/utils/ThemeWraper";
import LanguageSetter from "@/components/LoaderLanguage";
import { LanguageConfig } from "@/Types/LanguageConfig";
import { profile as ProfileType } from "@/Types/Profile";

export default function ProvidersWrapper({
  children,
  language,
  LanguageData,
  profile
}: {
  children?: React.ReactNode;
  language: string;
  LanguageData: LanguageConfig;
  profile: ProfileType;
}) {
  return (
    <ProfileProvider profile={profile}>
      <ThemeWraper initialColor={profile?.color}>
        <LanguageProvider LanguageData={LanguageData} language={language}>
          <LanguageSetter />
          <UseQueryProvider>
            <AlertProvider>
              <CategoryProvider>
                <UserProvider>
                  <AuthProvider>
                    <ClientFacebookWrapper>
                      <ProfileDependentUI>{children}</ProfileDependentUI>
                    </ClientFacebookWrapper>
                  </AuthProvider>
                </UserProvider>
              </CategoryProvider>
            </AlertProvider>
          </UseQueryProvider>
        </LanguageProvider>
      </ThemeWraper>
    </ProfileProvider>
  );
}

// This component will have access to the context since it's nested inside the Provider
function ProfileDependentUI({ children }: { children: React.ReactNode }) {
  const { Profile } = useProfileContext();

  return (
    <>
      {Profile?.slogon?.enable && <TopNavBar />}
      <Nav />
      <MainContent>{children}</MainContent>
    </>
  );
}
