"use client";

import { setAuth } from "@/app/redux/features/auth/authSlice";
import { RootState } from "@/app/redux/store";
import { getCurrentUser, logOut } from "@/app/firabase";
import { CustomNavLink, ThemeSwitcher } from "@/components/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "@/types";
import { useRouter } from "next/navigation";

const Header = () => {
  const auth = useSelector((state: RootState) => state.auth.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    logOut().then(() => {
      dispatch(setAuth(null));
      router.push("/");
    });
  };

  const navLinks: NavLink[] = auth
    ? [{ title: "Dashboard", href: "/dashboard" }]
    : [{ title: "Home", href: "/" }];

  const signLinks = [
    { title: "Sign In", href: "/login" },
    { title: "Sign Up", href: "/register" },
  ];

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) {
        dispatch(setAuth(null));
      }
      dispatch(setAuth(user));
    });
  }, [auth]);

  return (
    <header className="flex max-w-[1280px] w-full justify-between p-5">
      <nav className="flex items-center gap-2">
        {navLinks.map((link, key) => (
          <CustomNavLink
            key={key}
            title={link.title}
            href={link.href}
            containerStyles="dark:hover:bg-slate-500 hover:bg-slate-100 ease-out duration-300 py-1 px-2 rounded-md font-bold"
          />
        ))}
      </nav>
      <div className="flex gap-2 items-center">
        {auth && (
          <button
            className="dark:hover:bg-slate-500 hover:bg-slate-100 ease-out duration-300 py-1 px-2 rounded-md font-bold"
            onClick={logout}
          >
            Logout
          </button>
        )}
        {!auth &&
          signLinks.map((link, key) => (
            <CustomNavLink
              key={key}
              title={link.title}
              href={link.href}
              containerStyles="dark:hover:bg-slate-500 hover:bg-slate-100 ease-out duration-300 py-1 px-2 rounded-md font-bold"
            />
          ))}
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
