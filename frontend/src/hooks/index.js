import { useContext } from "react";
import { ThemeContext } from "../context/themeProvider";

export const useTheme = () => useContext(ThemeContext);
