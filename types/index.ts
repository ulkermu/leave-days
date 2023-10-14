import { MouseEventHandler, ReactNode } from "react";

export interface CustomButtonProps {
  title?: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  disable?: boolean;
  icon?: ReactNode; // ReactNode, React bileşeni, string, number, null, ve birkaç başka tipi kabul eder
}

export interface CustomNavLinkProps {
  title: string;
  containerStyles?: string;
  href: string;
}

export interface SignUpProps {
  email: string;
  password: string;
}

export interface NavLink {
  title: string;
  href: string;
}

export interface EmployeeFormProps {
  handleCloseEmployeeModal: () => void;
}
