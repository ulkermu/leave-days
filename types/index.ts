import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  disable?: boolean;
}

export interface CustomNavLinkProps {
  title: string;
  containerStyles?: string;
  href: string;
}