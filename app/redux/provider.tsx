"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

const Providers = ({ children }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
