"use client";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./firabase";

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setMounted(true);
    getCurrentUser().then((user) => {
      setUser(user);
    });
  }, []);

  if (!mounted) return <>{children}</>;

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
