"use client";
import Lottie from "lottie-react";
import calenderAnimation from "@/assets/calender-employee.json";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-5 w-full max-w-[1280px] mx-auto">
      <div className="flex gap-2.5 justify-between max-[900px]:flex-col max-[900px]:justify-center">
        <div className="flex flex-col justify-center gap-2.5 sm:min-w-[384px]">
          <div className="flex flex-col justify-center gap-2.5 sm:min-w-[384px]">
            <h1 className="gradient-text text-5xl max-[500px]:text-3xl font-bold text-center">
              Track Leave Days
            </h1>
            <h3 className="my-4 text-2xl max-[500px]:text-sm">
              Track every trace of your employees leave days and evasion. For
              more efficient days, do not neglect to use us.
            </h3>
            <Link className="w-fit mx-auto" href="/register">
              <button className="flex gap-2 rounded-md font-bold ease-out duration-300 px-6 py-3 max-[500px]:px-2 max-[500px]:py-2 text-xl max-[500px]:text-sm bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-500 w-fit mx-auto text-slate-200	dark:text-slate-800">
                <TravelExploreIcon /> Explore
              </button>
            </Link>
          </div>
        </div>
        <Lottie
          className="lottie max-w-xl max-[900px]:mx-auto"
          animationData={calenderAnimation}
        />
      </div>
    </main>
  );
}
