"use client";
import { useLanguage } from "@/context/languageColorContext";
import { useProfileContext } from "@/context/ProfileContext";
import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";

const Footer = () => {
  const { dataOflang } = useLanguage();
  const { currentColor } = useTheme();
  const { Profile } = useProfileContext();
  return (
    <footer className="bg-gray-800 text-white p-2  ">
      <div className="container mx-auto text-center grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              {Profile?.nameOfBrand?.name || "not selected Yet"}
            </h2>
            <p className="text-sm" style={{ fontFamily: "Cairo, sans-serif" }}>
              {dataOflang?.copyright || "© 2023 جميع الحقوق محفوظة"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-right">
          <div>
            <h3
              className="text-md font-bold mb-2 text-white"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              {dataOflang?.quick_links || "روابط سريعة"}
            </h3>
            <ul className="list-none space-y-1">
              <li>
                <a
                  href="/about"
                  className={`hover:text-${
                    themeColors[currentColor ?? "teal"]?.basics
                  }-500 text-white`}
                >
                  {dataOflang?.about_us || "معلومات عنا"}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className={`hover:text-${
                    themeColors[currentColor ?? "teal"]?.basics
                  }-500 text-white`}
                >
                  {dataOflang?.contact || "اتصل بنا"}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3
            className="text-md font-bold mb-2 text-white"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            {dataOflang?.policies || "سياسات"}
          </h3>
          <ul className="list-none space-y-1">
            <li>
              <a
                href="/policies"
                className={`hover:text-${
                  themeColors[currentColor ?? "teal"]?.basics
                }-500 text-white`}
              >
                {dataOflang?.privacy_policy || "سياسة الخصوصية"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
