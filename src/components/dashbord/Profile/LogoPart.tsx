import { profile } from "@/Types/Profile";
import { handlePhotoChange } from "@/utils/dashboard/Profile";
import { LOGO_VALIDATION } from "@/utils/validationMedia/validationPhoto";
import React from "react";

const LogoPart = ({
  setprofile,
  setAlertMessage,
  setAlertType,
  logo
}: {
  setprofile: React.Dispatch<React.SetStateAction<profile>>;
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "success" | "error") => void;
  logo: string;
}) => {
  return (
    <div className={` flex items-center justify-around  w-full`}>
      <div className="flex  flex-col h-full w-full justify-center items-center">
        <label
          className="block  text-gray-700 text-sm font-bold mb-2"
          htmlFor="logo">
          Logo (Max 2MB, JPEG/PNG/WebP)
        </label>
        <div className="flex flex-col items-center">
          <label
            htmlFor="logo"
            className="w-[250px] h-[250px] rounded-lg cursor-pointer bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-500 transition relative overflow-hidden"
            style={{
              backgroundImage: logo ? `url(${logo})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}>
            {!logo && <span className="text-center">Click to upload logo</span>}
            <input
              type="file"
              id="logo"
              accept={LOGO_VALIDATION.allowedTypes?.join(",")}
              onChange={(e) =>
                handlePhotoChange(e, setAlertMessage, setAlertType, setprofile)
              }
              className="hidden"
            />
          </label>
        </div>
      </div>{" "}
    </div>
  );
};

export default LogoPart;
