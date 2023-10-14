"use client";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";

const Loading = () => {
  return (
    <Lottie
      className="lottie max-w-xl max-[500px]:mx-auto"
      animationData={loadingAnimation}
    />
  );
};

export default Loading;
