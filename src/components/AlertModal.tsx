"use client";
import React, { useEffect } from "react";

interface AlertModalProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); // Close after 2 seconds
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-center">
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
      </div>
    </div>
  );
};

export default AlertModal;
