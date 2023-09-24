import { RegisterForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leave Days | Sign Up",
  description: "Register & Destroy",
};

const Register = () => {
  return (
    <main>
      <RegisterForm />
    </main>
  );
};

export default Register;
