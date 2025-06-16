"use client";

import { useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";

const LanguageSetter = () => {
  useEffect(() => {
    let lang = getCookie("language");

    if (!lang) {
      lang = navigator.language.startsWith("ar") ? "AR" : "EN";
      setCookie("language", lang, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30
      });
    }
  }, []);

  return null;
};

export default LanguageSetter;
