"use client";

import { useLanguage } from "@/context/languageColorContext";
import { setCookie } from "cookies-next";

const LanguageSelector = () => {
  const { lang } = useLanguage();

  const languages = ["AR", "EN"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value;
    setCookie("language", target, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    window.location.reload();
  };
  return (
    <div className="flex items-center space-x-2 ml-3">
      <select
        onChange={handleChange}
        value={lang}
        className="border border-gray-300 rounded-lg  p-1  w-14 h-6  text-[0.6rem] "
      >
        {languages.map((languages, index) => (
          <option key={index} value={languages}>
            {languages}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
