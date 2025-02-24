"use client";

import AnimationLottie from "./animation-lottie";
import spaceLoading from "../../assets/lottie/space-loading.json";

const LoadingScreen = ({ title = "Loading..." }) => {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#10002b] via-[#3c096c] to-[#ff4d6d] 
                 z-[9999] backdrop-blur-lg shadow-lg text-white"
    >
      <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
        <AnimationLottie animationPath={spaceLoading} />
      </div>
      <p className="mt-4 text-lg font-semibold">{title}</p>
    </div>
  );
};

export default LoadingScreen;
