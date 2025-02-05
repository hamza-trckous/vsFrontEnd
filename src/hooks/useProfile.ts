import { getSettingsProfile } from "@/api/profile";
import { profile } from "@/Types/Profile";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const [Profile, setProfile] = useState<profile | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getSettingsProfile();
        setProfile(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return { Profile, setProfile };
};
