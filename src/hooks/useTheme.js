import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import useLocalStorage from "./useLocalStorage";

const useTheme = () => {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { value, getState } = useLocalStorage();
  const [themeMode, setThemeMode] = useState(
    darkMode && value === "dark" ? "dark" : "light"
  );

  const themeCheck = useCallback(() => {
    const themeValue = getState("mode");
    if (themeValue === "dark") {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    themeCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    themeMode,
    setThemeMode,
  };
};

export default useTheme;
