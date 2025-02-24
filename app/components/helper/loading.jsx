"use client";
import AnimationLottie from "./animation-lottie";
import spaceLoading from "../../assets/lottie/space-loading.json";

const LoadingScreen = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#10002b] via-[#3c096c] to-[#ff4d6d] z-[9999] 
                 backdrop-blur-lg shadow-lg"
    >
      <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
        <AnimationLottie animationPath={spaceLoading} />
      </div>
    </div>
  );
};

export default LoadingScreen;
