import React from "react";

export default function Title({ children }) {
  return (
    <h1 className="text-xl font-semibold dark:text-white text-secondary text-center">
      {children}
    </h1>
  );
}
