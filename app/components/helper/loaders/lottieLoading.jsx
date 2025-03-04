"use client";

import { useEffect, useState } from "react";
import AnimationLottie from "../animation-lottie";

const LottieLoadingScreen = ({ title = "Loading..." }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    import("../../assets/lottie/space-loading.json").then((data) =>
      setAnimationData(data.default)
    );
  }, []);

  if (!animationData) return null; // Prevent SSR issues

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#10002b] via-[#3c096c] to-[#ff4d6d] 
                 z-[9999] backdrop-blur-lg shadow-lg text-white"
    >
      <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
        <AnimationLottie animationPath={animationData} />
      </div>
      <p className="mt-4 text-lg font-semibold">{title}</p>
    </div>
  );
};

export default LottieLoadingScreen;
