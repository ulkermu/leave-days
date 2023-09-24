import { CustomNavLinkProps } from "@/types";
import Link from "next/link";

const CustomNavLink = ({
  href,
  title,
  containerStyles,
}: CustomNavLinkProps) => {
  return (
    <Link className={containerStyles} href={href}>
      {title}
    </Link>
  );
};

export default CustomNavLink;
