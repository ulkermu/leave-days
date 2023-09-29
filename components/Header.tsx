import { CustomNavLink, ThemeSwitcher } from "@/components/index";

const Header = () => {
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
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
