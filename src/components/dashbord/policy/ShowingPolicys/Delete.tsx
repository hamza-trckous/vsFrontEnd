import { Policy } from "@/Types/Policy";
import { handleDelete } from "@/utils/policys";
import React from "react";

const Delete = ({
  policy,
  fetchPolicies,
  setAlertMessage,
  setAlertType,
}: {
  setAlertMessage: (message: string) => void;
  setAlertType: (type: "success" | "error") => void;
  policy: Policy;
  fetchPolicies: () => Promise<void>;
}) => {
  return (
    <button
      onClick={() =>
        policy._id &&
        handleDelete(policy._id, setAlertMessage, setAlertType, fetchPolicies)
      }
      className="bg-red-500 text-white px-4 py-2 rounded-lg w-full">
      حذف
    </button>
  );
};

export default Delete;
