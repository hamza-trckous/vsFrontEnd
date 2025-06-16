"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { LanguageConfig } from "@/Types/LanguageConfig";
import { getLanguage } from "@/api/Language";
import { getCookie, setCookie } from "cookies-next"; // إضافي

interface LanguageContextType {
  dataOflang: LanguageConfig | undefined;
  lang: "AR" | "EN" | undefined;
}
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a language provider");
  }
  return context;
};

export const LanguageProvider = ({
  children,
  language,
  LanguageData
}: {
  children: ReactNode;
  language: string;
  LanguageData: LanguageConfig | undefined;
}) => {
  const [dataOflang, setDataOflang] = useState<LanguageConfig | undefined>(
    LanguageData
  );
  const [lang, setLang] = useState<"AR" | "EN" | undefined>(
    language as "AR" | "EN"
  );

  useEffect(() => {
    const fetchLanguage = async () => {
      // نحاول نجيب الكوكي
      let langCookie = getCookie("language") as "AR" | "EN" | undefined;

      // إذا ما فيه كوكي، نستخدم لغة المتصفح
      if (!langCookie) {
        langCookie = navigator.language.startsWith("ar") ? "AR" : "EN";
        setCookie("language", langCookie, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30
        });
      }

      const data = await getLanguage(langCookie);
      setDataOflang(data);
      setLang(langCookie);
    };

    fetchLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ dataOflang, lang }}>
      {children}
    </LanguageContext.Provider>
  );
};
