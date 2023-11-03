import { Timestamp } from "firebase/firestore";
import { MouseEventHandler, ReactNode } from "react";

type ButtonType = "button" | "submit" | "reset";

export type EmployeeLeave = {
  id: string;
  employeeID: string;
  leave_start_date: any;
  leave_end_date: any;
  leave_reason: string;
};

export interface CustomButtonProps {
  title?: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  disable?: boolean;
  icon?: ReactNode; // ReactNode, React bileşeni, string, number, null, ve birkaç başka tipi kabul eder
  type?: ButtonType;
}

export interface CustomNavLinkProps {
  title: string;
  containerStyles?: string;
  href: string;
  icon?: ReactNode;
}

export interface SignUpProps {
  email: string;
  password: string;
}

export interface NavLink {
  title: string;
  href: string;
  icon?: ReactNode;
}
