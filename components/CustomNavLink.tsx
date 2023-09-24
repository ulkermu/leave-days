import { CustomNavLinkProps } from "@/types"
import Link from "next/link"

const CustomNavLink = ({ href, title, containerStyles }: CustomNavLinkProps) => {
  const cst = containerStyles === undefined ? "" : containerStyles

  return (
    <Link className={`dark:hover:bg-slate-500 hover:bg-slate-100 ease-out duration-150 py-1 px-2 rounded-md font-bold ${cst}`} href={href}>{title}</Link>
  )
}

export default CustomNavLink