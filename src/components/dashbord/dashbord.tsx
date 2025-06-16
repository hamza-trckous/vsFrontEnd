"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo1 from "../../../public/Logos/window.svg";
import Logo2 from "../../../public/Logos/file.svg";
import Logo3 from "../../../public/Logos/equalizer_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import Logo4 from "../../../public/Logos/bus-svgrepo-com.svg";
import Logo5 from "../../../public/Logos/facebook-svgrepo-com.svg";
import Logo6 from "../../../public/Logos/google-sheets-svgrepo-com.svg";
import Logo7 from "../../../public/Logos/identity_platform_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import Logo8 from "../../../public/Logos/pages-svgrepo-com.svg";
import Logo9 from "../../../public/Logos/user-settings-svgrepo-com.svg";
import { Links } from "@/utils/dashboard";
import LoadingComp from "@/components/Loading";
import { useLanguage } from "@/context/languageColorContext";
import { themeColors } from "@/utils/theme";
import { useTheme } from "@/context/themeContext";
const Dashboard = () => {
  const { dataOflang, lang } = useLanguage();
  const { currentColor } = useTheme();
  const [, startTransition] = useTransition();
  const router = useRouter();
  const { isAdmin, isLoggedIn } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility
  const [isHovered, setIsHovered] = useState(false); // State to control hover effect
  const [loading, setLoading] = useState(false);
  const [loadingForDash, setloadingForDash] = useState(false);

  const [activePath, setActivePath] = useState("");

  const path = usePathname();
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setActivePath(href);
    setLoading(true);
    setloadingForDash(true);
    setTimeout(() => {
      setloadingForDash(false);
    }, 300);
    startTransition(() => {
      router.push(href);
      setLoading(false);
    });
  };
  useEffect(() => {
    setActivePath(path || "");
  }, [path]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { items } = Links({
    Logo1,
    Logo2,
    Logo3,
    Logo4,
    Logo5,
    Logo6,
    Logo7,
    Logo8,
    Logo9,
    dataOflang
  });

  const asideClasse = () => {
    return `bg-${
      themeColors[currentColor ?? "teal"]?.basics
    }-500 shadow-lg md:p-2 p-0 md:min-h-[180vh] h-max  sm:block rounded-md   md:flex text-sm text-center fixed ${
      lang === "AR" ? "right" : "left"
    }-0 transition-all w-full md:w-16 z-10   ${
      isMenuOpen ? "h-auto text-end" : "h-10"
    } ${isHovered ? "md:w-56" : "md:w-16"}`;
  };

  return (
    <>
      {loading && <LoadingComp />}
      {isAdmin && isLoggedIn && (
        <aside
          dir="rtl"
          className={asideClasse()}
          style={{ top: `${scrollY > 20 ? 63 : 95}px` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <button
            className="md:hidden items-center text-white p-2 ml-auto flex w-full justify-center"
            onClick={toggleMenu}>
            {isMenuOpen
              ? dataOflang?.dashboardBar.closeMenu
              : dataOflang?.dashboardBar.openMenu}
          </button>
          <ul
            className={`space-y-1 flex md:flex-col relative transition-all duration-300  h-screen overflow-y-auto sm:w-full ${
              isMenuOpen ? "flex-col " : "hidden md:flex"
            }`}>
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  onClick={(e) => handleClick(e, item.Link)}
                  onMouseEnter={() => setActivePath(item.Link)}
                  href={item.Link}
                  className={`${
                    activePath?.includes(item.Link) &&
                    ` transition-all  ${
                      activePath && loadingForDash
                        ? ` hover:bg-${
                            themeColors[currentColor ?? "teal"]?.secondary
                          }-600  bg-${
                            themeColors[currentColor ?? "teal"]?.secondary
                          }-600 `
                        : ` bg-${
                            themeColors[currentColor ?? "teal"]?.basics
                          }-200   hover:bg-${
                            themeColors[currentColor ?? "teal"]?.basics
                          }-100 `
                    }  rounded-s-3xl  shadow-xl w-full  ${
                      activePath && loadingForDash
                        ? `hover:bg-${
                            themeColors[currentColor ?? "teal"]?.secondary
                          }-600  bg-${
                            themeColors[currentColor ?? "teal"]?.secondary
                          }-600`
                        : ` hover:bg-${
                            themeColors[currentColor ?? "teal"]?.basics
                          }-600 hover:rounded-s-3xl`
                    }`
                  } ${
                    activePath && loadingForDash
                      ? `hover:bg-${
                          themeColors[currentColor ?? "teal"]?.secondary
                        }-600`
                      : `hover:bg-${
                          themeColors[currentColor ?? "teal"]?.basics
                        }-600`
                  }  p-1 hover:rounded-s-3xl   rounded text-white hover:text-black/70 items-center relative flex md:text-right justify-between content-end transition-all duration-300`}>
                  <Image
                    width={24}
                    height={24}
                    src={item.icon}
                    alt={item.name}
                    className={`m-1 `}
                  />
                  {isHovered && (
                    <span className="hidden sm:flex">{item.name}</span>
                  )}
                  <span className="flex sm:hidden">{item.name}</span>
                </Link>

                {isHovered &&
                  activePath?.includes(item.Link) &&
                  item.sections &&
                  item.sections.length > 0 &&
                  item.sections.map((section, index) => (
                    <div
                      className={`w-full m-1 flex justify-end items-end content-end`}
                      key={index}>
                      <Link
                        id="subLink"
                        href={section.Link}
                        onClick={(e) => handleClick(e, section.Link)}
                        className={`p-2 rounded text-white text-sm hover:text-white relative flex w-1/2 justify-end transition-all duration-300 ${
                          // Check if current path exactly matches this section's link
                          activePath === section.Link
                            ? // Active section styling
                              `bg-${
                                themeColors[currentColor ?? "teal"]?.secondary
                              }-600 rounded-s-3xl ${
                                loadingForDash
                                  ? `hover:bg-${
                                      themeColors[currentColor ?? "teal"]
                                        ?.secondary
                                    }-700`
                                  : `hover:bg-${
                                      themeColors[currentColor ?? "teal"]
                                        ?.secondary
                                    }-500`
                              }`
                            : // Inactive section styling
                              `hover:bg-${
                                themeColors[currentColor ?? "teal"]?.basics
                              }-600 hover:rounded-s-3xl`
                        }`}>
                        {isHovered && <span>{section.name} ◉ </span>}
                      </Link>
                    </div>
                  ))}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
};

export default Dashboard;
