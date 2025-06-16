"use client";
import { useTheme } from "@/context/themeContext";
import { Policy } from "@/Types/Policy";
import { handleUpdate } from "@/utils/policys";
import { themeColors } from "@/utils/theme";
import React from "react";

const Buttonupdat = ({
  policy,
  fetchPolicies,
  editingPolicy,
  setEditingPolicy,
  setAlertMessage,
  setAlertType,
}: {
  setAlertMessage: (message: string) => void;
  setAlertType: (type: "success" | "error") => void;
  policy: Policy;
  fetchPolicies: () => Promise<void>;
  editingPolicy: Policy | null;
  setEditingPolicy: React.Dispatch<React.SetStateAction<Policy | null>>;
}) => {
  const { currentColor } = useTheme();

  return (
    <button
      onClick={() =>
        policy._id &&
        handleUpdate(
          policy._id,
          editingPolicy,
          setAlertMessage,
          setAlertType,
          fetchPolicies,
          setEditingPolicy
        )
      }
      className={`bg-${
        themeColors[currentColor ?? "teal"]?.basics
      }-500 text-white px-4 py-2 rounded-lg w-full mb-2`}>
      تحديث
    </button>
  );
};

export default Buttonupdat;
