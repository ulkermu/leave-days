"use client";
import { setAuth } from "@/app/GlobalRedux/Features/auth/authSlice";
import { RootState } from "@/app/GlobalRedux/store";
import { getCurrentUser, logOut } from "@/app/firabase";
import { CustomNavLink, ThemeSwitcher } from "@/components/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Header = () => {
  const auth = useSelector((state: RootState) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser().then((user) => {
      dispatch(setAuth(user));
    });
  }, []);

  console.log(auth);
  return (
    <header className="flex max-w-[1280px] w-full justify-between p-5">
      <nav className="flex items-center gap-2">
        <CustomNavLink
          title="Home"
          href="/"
          containerStyles="dark:hover:bg-slate-500 hover:bg-slate-100 ease-out duration-300 py-1 px-2 rounded-md font-bold"
        />
        <CustomNavLink
          title="Play Ground"
          href="/play-ground"
          containerStyles="dark:hover:bg-slate-500 hover:bg-slate-100 ease-out duration-300 py-1 px-2 rounded-md font-bold"
        />
      </nav>
      <div className="flex gap-2 items-center">
        {auth && <button onClick={logOut}>Logout</button>}
        {!auth && (
          <>
            <CustomNavLink
              title="Sign In"
              href="/login"
              containerStyles="dark:hover:bg-slate-500 hover:bg-slate-100 ease-out duration-300 py-1 px-2 rounded-md font-bold"
            />
            <CustomNavLink
              title="Sign Up"
              href="/register"
              containerStyles="dark:hover:bg-slate-500 hover:bg-slate-100 ease-out duration-300 py-1 px-2 rounded-md font-bold"
            />
          </>
        )}
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
