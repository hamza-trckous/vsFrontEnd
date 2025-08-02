import { Policy } from "@/Types/Policy";
import React from "react";

const GoUpdat = ({
  policy,
  setEditingPolicy,
}: {
  policy: Policy;
  setEditingPolicy: (value: React.SetStateAction<Policy | null>) => void;
}) => {
  return (
    <button
      onClick={() => setEditingPolicy(policy)}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-2"
    >
      تعديل
    </button>
  );
};

export default GoUpdat;
