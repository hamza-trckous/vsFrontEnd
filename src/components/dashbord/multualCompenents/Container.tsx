import React from "react";

const Container = ({
  children,
  forCategorys = false,
  lang,
}: {
  children: React.ReactNode;
  forCategorys?: boolean;
  lang?: "AR" | "EN" | undefined;
}) => {
  return (
    <div
      className={`card-container ${
        lang === "EN" ? "text-left" : "text-right "
      } mx-auto mt-10 sm:mt-0 bg-white shadow-md rounded-lg p-4 w-full text-left ${
        forCategorys ? "md:w-full" : "md:w-[85%]"
      }`}
      dir={lang === "EN" ? "rtl" : "ltr"}
    >
      {children}
    </div>
  );
};

export default Container;
