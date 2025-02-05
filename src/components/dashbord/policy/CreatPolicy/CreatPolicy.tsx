"use client";
import { Policy } from "@/Types/Policy";
import React, { useState } from "react";
import TextArea from "./components/TextArea";
import InpuTTitle from "./components/InpuTTitle";
import ButtonCreatingPolicy from "./components/ButtonCreatPolicy";
import { handleCreatePolicy } from "@/utils/policys";
const CreatPolicy = ({
  setAlertMessage,
  setAlertType,
  fetchPolicies,
}: {
  fetchPolicies: () => Promise<void>;
  setAlertMessage: (message: string) => void;
  setAlertType: (type: "success" | "error") => void;
}) => {
  const [newPolicy, setNewPolicy] = useState<Policy>({
    title: "",
    content: "",
    _id: "",
  });

  return (
    <div className="mb-4">
      <InpuTTitle
        forEditing={false}
        newPolicy={newPolicy}
        setNewPolicy={setNewPolicy}
      />
      <TextArea
        forEditing={false}
        newPolicy={newPolicy}
        setNewPolicy={setNewPolicy}
      />
      <ButtonCreatingPolicy
        handleCreate={() =>
          handleCreatePolicy({
            newPolicy,
            setAlertMessage,
            setAlertType,
            fetchPolicies,
          })
        }
      />
    </div>
  );
};

export default CreatPolicy;
