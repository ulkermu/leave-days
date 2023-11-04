import { CustomNavLinkProps } from "@/types";
import Link from "next/link";

const CustomNavLink = ({
  href,
  title,
  icon,
  containerStyles,
}: CustomNavLinkProps) => {
  return (
    <Link className={containerStyles} href={href}>
      {icon}
      <span className="max-[640px]:hidden">{title}</span>
    </Link>
  );
};

export default CustomNavLink;
