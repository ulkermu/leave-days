"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from "@mui/material"
import Link from "next/link";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleTheme = (mode: any) => {
    setTheme(mode);
    console.log(mode, theme)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;

  return (
    <header className="header">
      <nav className="nav">
        <Link href={"/"}>Home</Link>
        <Link href={"/login"}>Login</Link>
      </nav>
      <IconButton sx={{ width: '40px', height: '40px' }} onClick={() => handleTheme(theme === "light" ? "dark" : "light")}>
        {theme === "dark" ? <DarkModeIcon sx={{ color: 'var(--text)' }} /> : <LightModeIcon sx={{ color: 'var(--text)' }} />}
      </IconButton>
    </header>
  )
}

export default Header