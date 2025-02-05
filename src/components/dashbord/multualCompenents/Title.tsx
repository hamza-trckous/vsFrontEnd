import React from "react";

const TitleRtl = ({ title }: { title: string }) => {
  return (
    <h1 className="text-2xl font-bold mb-4 w-full text-center mt-2">{title}</h1>
  );
};

export default TitleRtl;
