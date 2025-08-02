import { InputTitleProps } from "@/Types/Policy";
import { getValue, handleOnChange } from "@/utils/policys";
import React from "react";

const InpuTTitle = ({
  forEditing,
  newPolicy,
  setNewPolicy,
  setEditingPolicy,
  editingPolicy,
}: InputTitleProps) => {
  return (
    <input
      required
      type="text"
      placeholder={!forEditing ? "العنوان" : undefined}
      value={getValue({
        forEditing,
        newPolicy: newPolicy || { title: "", content: "" },
        editingPolicy: editingPolicy || null,
        item: "title",
      })}
      onChange={(e) =>
        handleOnChange(
          e,
          forEditing,
          setEditingPolicy,
          editingPolicy || null,
          setNewPolicy,
          newPolicy,
          "title",
        )
      }
      className="border rounded-lg p-2 mb-2 w-full text-right"
    />
  );
};

export default InpuTTitle;
