import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col  p-4 mr-24 bg-red-50 " dir="rtl">
      {children}
    </div>
  );
};

export default Container;
