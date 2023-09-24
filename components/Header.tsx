"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from "@mui/material"
import { CustomNavLink } from "@/components/index"

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
    <header className="flex max-w-[1280px] w-full justify-between p-5">
      <nav className="flex items-center gap-2">
        <CustomNavLink title="Home" href="/" />
      </nav>
      <div className="flex gap-2 items-center">
        <CustomNavLink title="Login" href="/login" />
        <CustomNavLink title="Register" href="/register" />
        <IconButton sx={{ width: '40px', height: '40px' }} onClick={() => handleTheme(theme === "light" ? "dark" : "light")}>
          {theme === "dark" ? <DarkModeIcon sx={{ color: 'var(--text)' }} /> : <LightModeIcon sx={{ color: 'var(--text)' }} />}
        </IconButton>
      </div>
    </header>
  )
}

export default Header