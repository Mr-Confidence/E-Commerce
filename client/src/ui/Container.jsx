import React from "react";
import { twMerge } from "tailwind-merge";
function Container({ children, className }) {
  const newClassName = twMerge(
    "max-w-screen-xl mx-auto py-10 px-4 lg:px-0",
    className
  );
  return <div className={newClassName}>{children}</div>;
}

export default Container;
