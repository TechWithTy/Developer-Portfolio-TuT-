"use client";

import { useEffect, useState } from "react";
import AnimationLottie from "./animation-lottie";

const ScopedLottieLoadingScreen = ({ title = "Loading..." }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    import("../../assets/lottie/space-loading.json").then((data) =>
      setAnimationData(data.default)
    );
  }, []);

  if (!animationData) return null; // Prevent SSR issues

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-16 h-16 sm:w-20 sm:h-20">
        <AnimationLottie animationPath={animationData} />
      </div>
      <p className="mt-2 text-sm sm:text-base font-semibold text-white">{title}</p>
    </div>
  );
};

export default ScopedLottieLoadingScreen;
