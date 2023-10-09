"use client";

import { logoutHandle } from "@/app/redux/features/auth/authSlice";
import { RootState } from "@/app/redux/store";
import { logOut } from "@/app/firabase";
import { CustomNavLink, ThemeSwitcher } from "@/components/index";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "@/types";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const logout = async () => {
    await logOut();
    dispatch(logoutHandle());
    router.push("/");
  };

  const navLinks: NavLink[] = user
    ? [{ title: "Dashboard", href: "/dashboard" }]
    : [{ title: "Home", href: "/" }];

  const signLinks = [
    { title: "Sign In", href: "/login" },
    { title: "Sign Up", href: "/register" },
  ];

  return (
    <header className="flex max-w-[1280px] w-full justify-between p-5">
      <nav className="flex items-center gap-2">
        {navLinks.map((link, key) => (
          <CustomNavLink
            key={key}
            title={link.title}
            href={link.href}
            containerStyles={`dark:hover:bg-slate-500 hover:bg-slate-100 ease-out duration-300 py-1 px-2 rounded-md font-bold ${
              link.href === pathname && "text-sky-600 dark:text-sky-400"
            }`}
          />
        ))}
      </nav>
      <div className="flex gap-2 items-center">
        {user && (
          <button
            className="dark:hover:bg-slate-500 hover:bg-slate-100 ease-out duration-300 py-1 px-2 rounded-md font-bold"
            onClick={logout}
          >
            Logout
          </button>
        )}
        {!user &&
          signLinks.map((link, key) => (
            <CustomNavLink
              key={key}
              title={link.title}
              href={link.href}
              containerStyles={`dark:hover:bg-slate-500 hover:bg-slate-100 ease-out duration-300 py-1 px-2 rounded-md font-bold ${
                link.href === pathname && "text-sky-600 dark:text-sky-400"
              }`}
            />
          ))}
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
