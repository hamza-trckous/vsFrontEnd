import { InputTitleProps } from "@/Types/Policy";
import { getValue, handleOnChange } from "@/utils/policys";
import React from "react";

const TextArea = ({
  forEditing,
  newPolicy,
  setNewPolicy,
  setEditingPolicy,
  editingPolicy,
}: InputTitleProps) => {
  return (
    <textarea
      placeholder={!forEditing ? "المحتوى" : undefined}
      value={getValue({
        forEditing,
        newPolicy: newPolicy || { title: "", content: "" },
        editingPolicy: editingPolicy || null,
        item: "content",
      })}
      onChange={(e) =>
        handleOnChange(
          e,
          forEditing,
          setEditingPolicy,
          editingPolicy || null,
          setNewPolicy,
          newPolicy,
          "content"
        )
      }
      className="border rounded-lg p-2 mb-2 w-full text-right"
    />
  );
};

export default TextArea;
