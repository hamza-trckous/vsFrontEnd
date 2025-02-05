import React from "react";

const Title = ({ title }: { title: string }) => {
  return <header className="text-2xl font-bold mb-4">{title}</header>;
};

export default Title;
