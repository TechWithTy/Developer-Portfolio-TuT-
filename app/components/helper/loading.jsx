"use client";
import { useEffect, useState } from "react";
import AnimationLottie from "./animation-lottie";

const LoadingScreen = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    import("../../assets/lottie/space-loading.json").then((data) =>
      setAnimationData(data.default)
    );
  }, []);

  if (!animationData) return null; // Prevent rendering before data loads

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#10002b] via-[#3c096c] to-[#ff4d6d] 
                 z-[9999] backdrop-blur-lg shadow-lg"
    >
      <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
        <AnimationLottie animationPath={animationData} />
      </div>
    </div>
  );
};

export default LoadingScreen;
