"use client";
import React, { useEffect } from "react";

interface AlertModalProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  onConfirm?: () => void;
  withConfirm?: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  message,
  type,
  onClose,
  withConfirm,
  onConfirm,
}) => {
  useEffect(() => {
    if (!withConfirm) {
      const timer = setTimeout(onClose, 2500); // Close after 2 seconds
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [onClose, withConfirm]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-center  AlertModal">
      <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-1/3 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-teal-500"
          onClick={onClose}>
          &times;
        </button>
        <div
          className={`p-4 rounded-lg ${
            type === "success" ? "bg-green-100" : "bg-red-100"
          }`}>
          <p
            className={`text-lg break-words ${
              type === "success" ? "text-green-700" : "text-red-700"
            }`}>
            {message}
          </p>
        </div>
        {withConfirm && (
          <div className="mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg m-2"
              onClick={onClose}>
              Cancel
            </button>

            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={onConfirm}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertModal;
