import { CustomNavLink } from "@/components/index"
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  return (
    <header className="flex max-w-[1280px] w-full justify-between p-5">
      <nav className="flex items-center gap-2">
        <CustomNavLink title="Home" href="/" />
      </nav>
      <div className="flex gap-2 items-center">
        <CustomNavLink title="Login" href="/login" />
        <CustomNavLink title="Register" href="/register" />
        <ThemeSwitcher />
      </div>
    </header>
  )
}

export default Header