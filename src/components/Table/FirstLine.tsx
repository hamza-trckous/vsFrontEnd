import { useLanguage } from "@/context/languageColorContext";
import React from "react";

const FirstLineOfTable = ({ tableTitles }: { tableTitles: string[] }) => {
  const { lang } = useLanguage();

  return (
    <thead dir={lang === "AR" ? "rtl" : "ltr"} className="bg-gray-200">
      <tr>
        {tableTitles.map((title) => (
          <th key={title} className="px-2 py-1 border border-gray-400 w-20">
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default FirstLineOfTable;
