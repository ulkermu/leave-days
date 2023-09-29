"use client";

import { Provider, useSelector, useDispatch } from "react-redux";
import { RootState, store } from "./store";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../firabase";
import { setAuth } from "./Features/auth/authSlice";

const Providers = ({ children }: any) => {
  // const auth = useSelector((state: RootState) => state.auth.value);
  // const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // getCurrentUser().then((user) => {
    //   dispatch(setAuth(user));
    // });
  }, []);

  // console.log(auth)

  // if (!mounted) return <>{children}</>;
  if (!mounted) return null;
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
