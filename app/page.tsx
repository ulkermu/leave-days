"use client";
import Lottie from "lottie-react";
import calenderAnimation from "@/assets/calender-employee.json";
import { CustomNavLink } from "@/components";

export default function Home() {
  return (
    <main className="p-5 w-full max-w-[1280px] mx-auto">
      <div className="flex g-5 justify-between max-[900px]:flex-col max-[900px]:justify-center">
        <div className="flex flex-col justify-center g-5 min-w-[384px]">
          <h1 className="gradient-text text-6xl font-bold text-center">
            Track Leave Days
          </h1>
          <h3 className="my-2 text-3xl">
            Track every trace of your employees' leave days and evasion. For
            more efficient days, do not neglect to use us.
          </h3>
          <CustomNavLink
            title="Explore"
            href="/register"
            containerStyles="px-6 py-3 text-xl bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-500 w-fit mx-auto text-slate-200	dark:text-slate-800"
          />
        </div>
        <Lottie
          className="lottie max-w-xl max-[900px]:mx-auto"
          animationData={calenderAnimation}
        />
      </div>
    </main>
  );
}
