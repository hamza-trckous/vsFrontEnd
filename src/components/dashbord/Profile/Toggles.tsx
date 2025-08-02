"use client";
import React from "react";
import ToggleSwitch from "@/components/Togle";
import { useProfileContext } from "@/context/ProfileContext";
import { profile } from "@/Types/Profile";

// Only keys of Profile that have an `enable` field
type ToggleableKey = keyof Pick<
  profile,
  "logo" | "nameOfBrand" | "cover" | "slogon" | "category" | "email"
>;

const Toggles = () => {
  const { Profile, setProfile } = useProfileContext();

  const baseToggleFields: { key: ToggleableKey; label: string }[] = [
    { key: "logo", label: "Enable Logo?" },
    { key: "nameOfBrand", label: "Enable Name of Brand?" },
    { key: "cover", label: "Enable Cover?" },
    { key: "slogon", label: "Enable Slogon?" },
    { key: "category", label: "Enable Category?" },
    { key: "email", label: "Enable Showing email?" },
  ];

  return (
    <div className="w-full flex flex-col justify-end items-end gap-3">
      {/* Static toggles */}
      {baseToggleFields.map(({ key, label }) => (
        <ToggleSwitch
          key={key}
          label={label}
          checked={Profile[key]?.enable ?? false}
          onChange={(checked) =>
            setProfile((prev) => ({
              ...prev,
              [key]: {
                ...prev[key],
                enable: checked,
              },
            }))
          }
        />
      ))}

      {/* Dynamic account toggles */}
      {Profile.accounts?.map((account, index) => (
        <ToggleSwitch
          key={`account-${index}`}
          label={`Enable ${account.name || `Account #${index + 1}`}`}
          checked={account.enable}
          onChange={(checked) => {
            const updated = [...Profile.accounts];
            updated[index].enable = checked;
            setProfile((prev) => ({
              ...prev,
              accounts: updated,
            }));
          }}
        />
      ))}
    </div>
  );
};

export default Toggles;
