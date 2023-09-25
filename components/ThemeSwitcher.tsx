"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleTheme = (mode: any) => {
    setTheme(mode);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <IconButton sx={{ width: "40px", height: "40px" }}>
        {theme === "dark" ? (
          <DarkModeIcon sx={{ color: "var(--text)" }} />
        ) : (
          <LightModeIcon sx={{ color: "var(--text)" }} />
        )}
      </IconButton>
    );

  return (
    <IconButton
      sx={{ width: "40px", height: "40px" }}
      onClick={() => handleTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "dark" ? (
        <DarkModeIcon sx={{ color: "var(--text)" }} />
      ) : (
        <LightModeIcon sx={{ color: "var(--text)" }} />
      )}
    </IconButton>
  );
};

export default ThemeSwitcher;
