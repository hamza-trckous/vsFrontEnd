"use client";
import React from "react";
import { useProfileContext } from "@/context/ProfileContext";

const AccountsPart = () => {
  const { Profile, setProfile } = useProfileContext();

  const handleAccountNameChange = (index: number, value: string) => {
    const updatedAccounts = [...(Profile?.accounts || [])];
    updatedAccounts[index] = {
      ...updatedAccounts[index],
      name: value
    };
    setProfile((prev) => ({
      ...prev,
      accounts: updatedAccounts
    }));
  };

  const addAccount = () => {
    setProfile((prev) => ({
      ...prev,
      accounts: [...(prev.accounts || []), { name: "", enable: true }]
    }));
  };

  const removeAccount = (index: number) => {
    const updatedAccounts = [...(Profile?.accounts || [])];
    updatedAccounts.splice(index, 1);
    setProfile((prev) => ({
      ...prev,
      accounts: updatedAccounts
    }));
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Additional Email Accounts</h2>
      {(Profile?.accounts || []).map((account, index) => (
        <div key={index} className="mb-3 flex items-center gap-2">
          <input
            type="text"
            value={account.name}
            onChange={(e) => handleAccountNameChange(index, e.target.value)}
            placeholder="Enter email address"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={() => removeAccount(index)}
            className="text-red-500 px-2 py-1 hover:underline">
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addAccount}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Email
      </button>
    </div>
  );
};

export default AccountsPart;
