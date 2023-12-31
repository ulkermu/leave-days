import { SignInForm } from "@/components";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Leave Days | Sign In",
  description: "Login & Destroy",
};

const Login = () => {
  return (
    <main className="max-w-[1280px] w-full p-5">
      <Toaster position="top-right" />
      <SignInForm />
    </main>
  );
};

export default Login;
