import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const defaultTheme = "light";
const darkTheme = "dark";

export default function ThemeProvider({ children }) {
  const toggleTheme = () => {
    let oldTheme = localStorage.getItem("theme");
    let newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;

    document.documentElement.classList.remove(oldTheme);
    document.documentElement.classList.add(newTheme);

    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (!theme) document.documentElement.classList.add(defaultTheme);
    else document.documentElement.classList.add(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
