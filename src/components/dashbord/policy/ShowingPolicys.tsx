"use client";
import { Policy } from "@/Types/Policy";
import React, { useState } from "react";
import InpuTTitle from "./CreatPolicy/components/InpuTTitle";
import TextArea from "./CreatPolicy/components/TextArea";
import Buttonupdat from "./ShowingPolicys/Updat";
import Delete from "./ShowingPolicys/Delete";
import GoUpdat from "./ShowingPolicys/GoUpdat";

const ShowingPolicys = ({
  fetchPolicies,
  policies,
  setAlertMessage,
  setAlertType,
}: {
  setAlertMessage: (message: string) => void;
  setAlertType: (type: "success" | "error") => void;
  fetchPolicies: () => Promise<void>;
  policies: Policy[];
}) => {
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);

  return (
    <div>
      {policies
        .slice()
        .reverse()
        .map((policy) => (
          <div key={policy._id} className="mb-4">
            {editingPolicy && editingPolicy._id === policy._id ? (
              <>
                <InpuTTitle
                  setEditingPolicy={setEditingPolicy}
                  forEditing={true}
                  editingPolicy={editingPolicy}
                />
                <TextArea
                  setEditingPolicy={setEditingPolicy}
                  forEditing={true}
                  editingPolicy={editingPolicy}
                />

                <Buttonupdat
                  editingPolicy={editingPolicy}
                  setAlertMessage={setAlertMessage}
                  setAlertType={setAlertType}
                  policy={policy}
                  fetchPolicies={fetchPolicies}
                  setEditingPolicy={setEditingPolicy}
                />
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">{policy.title}</h2>
                <p>{policy.content}</p>

                <GoUpdat policy={policy} setEditingPolicy={setEditingPolicy} />
                <Delete
                  setAlertMessage={setAlertMessage}
                  setAlertType={setAlertType}
                  policy={policy}
                  fetchPolicies={fetchPolicies}
                />
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default ShowingPolicys;
