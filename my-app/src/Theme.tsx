import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { SunDim } from "phosphor-react";
import { FaMoon } from "react-icons/fa";

interface ThemeProviderProps {
  children: ReactNode;
}

// Step 1: Create a ThemeContext
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// Step 2: Create a ThemeProvider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.style.setProperty("--black-color", "#000000");
      root.style.setProperty("--white-color", "#ffffff");
      root.style.setProperty("--primary-color", "#e0e0e0");
      root.style.setProperty("--secondary-color", "#333333");
    } else {
      root.style.setProperty("--black-color", "#ffffff");
      root.style.setProperty("--white-color", "#000000");
      root.style.setProperty("--primary-color", "#333333");
      root.style.setProperty("--secondary-color", "#e0e0e0");
    }
  }, [theme]);
  const toggleTheme = () => {
    console.log("toggleTheme");
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Step 4: Create a ThemeButton component
export const ThemeButton = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return theme === "light" ? (
    <SunDim onClick={toggleTheme} size={40} cursor={"pointer"}>
      Toggle Theme
    </SunDim>
  ) : (
    <FaMoon onClick={toggleTheme} size={40}>
      Toggle Theme
    </FaMoon>
  );
};
