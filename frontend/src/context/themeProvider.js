import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const defaultTheme = "light";
const darkTheme = "dark";

export default function ThemeProvider({ children }) {
  const toggleTheme = () => {
    let oldTheme = getTheme();
    let newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;

    // document.documentElement.classList.remove(oldTheme);
    // document.documentElement.classList.add(newTheme);

    //Refactor Code
    updateTheme(newTheme, oldTheme);

    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    let theme = getTheme();
    if (!theme) updateTheme(defaultTheme);
    else updateTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

//Refactoring the Code
const getTheme = () => localStorage.getItem("theme");

const updateTheme = (theme, removeTheme) => {
  document.documentElement.classList.remove(removeTheme);
  document.documentElement.classList.add(theme);

  localStorage.setItem("theme", theme);
};
