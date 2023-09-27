import { RegisterForm } from "@/components";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Leave Days | Sign Up",
  description: "Register & Destroy",
};

const Register = () => {
  return (
    <main className="max-w-[1280px] w-full p-5">
      <Toaster position="top-right" />
      <RegisterForm />
    </main>
  );
};

export default Register;
