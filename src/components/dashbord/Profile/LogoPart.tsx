import { handlePhotoChange } from "@/utils/dashboard/Profile";
import { LOGO_VALIDATION } from "@/utils/validationMedia/validationPhoto";
import Image from "next/image";
import React from "react";

const LogoPart = ({
  setlogo,
  setAlertMessage,
  setAlertType,
  logo,
}: {
  setlogo: React.Dispatch<React.SetStateAction<string>>;
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "success" | "error") => void;
  logo: string;
}) => {
  return (
    <div className={` flex items-center justify-around`}>
      <div className="flex  flex-col h-full w-full">
        <label
          className="block  text-gray-700 text-sm font-bold mb-2"
          htmlFor="logo">
          Logo (Max 2MB, JPEG/PNG/WebP)
        </label>
        <input
          type="file"
          id="logo"
          accept={LOGO_VALIDATION.allowedTypes?.join(",")}
          onChange={(e) =>
            handlePhotoChange(e, setAlertMessage, setAlertType, setlogo)
          }
          className="content-center  p-2  
          rounded-lg mr-auto w-max  max-w-max m-2 min-h-56 object-cover mb-4 border-none"
          placeholder="Enter your logo"
          style={{
            width: "250px",
            height: "250px",
            backgroundImage: `url(${logo || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>{" "}
      <div className="flex flex-col w-full ">
        {logo && (
          <Image
            width={200}
            height={200}
            src={logo}
            alt="logo"
            className="rounded-lg mr-auto w-max  max-w-max m-2 h-56 object-cover mb-4"
          />
        )}
      </div>
    </div>
  );
};

export default LogoPart;
