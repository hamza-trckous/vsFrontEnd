import { UseCardItems } from "@/hooks/useCardItems";
import React from "react";
import { FaTrash } from "react-icons/fa";

const BtnHandleRemove = ({
  id,
  setAlertType,
  setAlertMessage,
}: {
  id: string;
  setAlertType: (type: "success" | "error") => void;
  setAlertMessage: (message: string | null) => void;
}) => {
  const { handleRemoveItem } = UseCardItems();
  const logiCForRemove = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const removeReponse = await handleRemoveItem(id);
    if (removeReponse === "تمت الإزالة من السلة") {
      setAlertType("success");
      setAlertMessage("تمت الإزالة من السلة");
    } else {
      setAlertType("error");
      setAlertMessage("حدث خطأ أثناء الإزالة من السلة");
    }
  };
  return (
    <button
      onClick={(e) => logiCForRemove(e)}
      className="bg-red-400 rounded-md p-1 m-2 justify-center items-center flex text-white z-20">
      حذف
      <FaTrash className="m-1" />
    </button>
  );
};

export default BtnHandleRemove;
