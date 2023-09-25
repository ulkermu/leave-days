import { RegisterForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leave Days | Sign Up",
  description: "Register & Destroy",
};

const Register = () => {
  return (
    <main className="max-w-[1280px] w-full p-5">
      <RegisterForm />
    </main>
  );
};

export default Register;
