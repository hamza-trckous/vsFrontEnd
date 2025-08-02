"use client";
import { themeColors } from "@/utils/theme";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa"; // Import icons
import LanguageSelector from "./home/nav/TopNav/languageSelector";
import Slogon from "./topNavBAr/Slogon";
import { useTheme } from "@/context/themeContext";
const TopNavBar = () => {
  //const {currentColor} = ( ?? "red") as keyof typeof themeColors;
  const { currentColor } = useTheme();

  return (
    <>
      <div
        className={`bg-gradient-to-r ${
          themeColors[currentColor ?? "teal"]?.gradient
        } p-1 shadow-lg transition-all duration-300 hover:shadow-xl opacity-85 flex  justify-between `}
      >
        {" "}
        <div className="container mx-auto flex justify-between items-center text-sm">
          <a
            href="https://www.facebook.com/profile.php?id=61569429093427"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-white hover:text-${
              themeColors[currentColor ?? "teal"]?.basics
            }-500 transition-colors duration-200`}
          >
            <FaFacebook size={20} />
          </a>
          {/* language slector */}
          <LanguageSelector />
          <Slogon />

          <a
            href="https://www.instagram.com/babybloom_dz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className={`text-white  hover:text-${
              themeColors[currentColor ?? "teal"]?.basics
            }-500 transition-colors duration-200`}
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
