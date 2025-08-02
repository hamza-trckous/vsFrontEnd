"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getSettingsProfile } from "@/api/profile";
import { profile } from "@/Types/Profile";

type ProfileContextType = {
  Profile: profile;
  setProfile: React.Dispatch<React.SetStateAction<profile>>;
  LoadingProfile: boolean;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: profile;
}) => {
  const [Profile, setProfile] = useState<profile>(profile);
  const [LoadingProfile, setLoadingProfile] = useState(!profile);
  useEffect(() => {
    if (!profile) {
      const fetchProfile = async () => {
        try {
          const response = await getSettingsProfile();
          setProfile(response);
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoadingProfile(false);
        }
      };

      fetchProfile();
    }
  }, [profile]);
  return (
    <ProfileContext.Provider value={{ Profile, setProfile, LoadingProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
