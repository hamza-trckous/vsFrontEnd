import React from "react";

const TitleRtl = ({ title }: { title: string | undefined }) => {
  return (
    <div className="text-2xl font-bold mb-4 w-full text-center ">{title}</div>
  );
};

export default TitleRtl;
