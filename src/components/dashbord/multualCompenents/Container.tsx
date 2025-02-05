import React from "react";

const Container = ({
  children,
  forCategorys = false,
}: {
  children: React.ReactNode;
  forCategorys?: boolean;
}) => {
  return (
    <div
      className={`card-container bg-white shadow-md rounded-lg p-4 w-full  ${
        forCategorys ? "md:w-full" : "md:w-11/12"
      }`}
      dir="rtl">
      {children}
    </div>
  );
};

export default Container;
