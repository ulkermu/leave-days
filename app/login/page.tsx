import LoginForm from "@/components/loginForm/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leave Days | Sign In",
  description: "Login & Destroy",
};


const Login = () => {
  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default Login;
