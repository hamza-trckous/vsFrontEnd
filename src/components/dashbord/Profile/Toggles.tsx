"use client";
import ToggleSwitch from "@/components/Togle";
import { useProfileContext } from "@/context/ProfileContext";
import { profile } from "@/Types/Profile";
import React from "react";

const Toggles = () => {
  const { Profile, setProfile } = useProfileContext();
  return (
    <div className="w-full flex flex-col justify-end items-end ">
      <ToggleSwitch
        label="Enable Logo?"
        checked={Profile?.logo?.enable ?? false}
        onChange={(checked) =>
          setProfile((prev: profile) => ({
            ...prev,
            logo: { ...prev.logo, enable: checked }
          }))
        }
      />

      <ToggleSwitch
        label="Enable Name of Brand?"
        checked={Profile?.nameOfBrand?.enable ?? false}
        onChange={(checked) =>
          setProfile((prev: profile) => ({
            ...prev,
            nameOfBrand: { ...prev.nameOfBrand, enable: checked }
          }))
        }
      />

      <ToggleSwitch
        label="Enable Cover?"
        checked={Profile?.cover?.enable ?? false}
        onChange={(checked) =>
          setProfile((prev: profile) => ({
            ...prev,
            cover: { ...prev.cover, enable: checked }
          }))
        }
      />

      <ToggleSwitch
        label="Enable Slogon?"
        checked={Profile?.slogon?.enable ?? false}
        onChange={(checked) =>
          setProfile((prev: profile) => ({
            ...prev,
            slogon: { ...prev.slogon, enable: checked }
          }))
        }
      />

      <ToggleSwitch
        label="Enable Category?"
        checked={Profile?.category?.enable ?? false}
        onChange={(checked) =>
          setProfile((prev: profile) => ({
            ...prev,
            category: { ...prev.category, enable: checked } // <--- spread to keep other properties
          }))
        }
      />
    </div>
  );
};

export default Toggles;
