"use client";
import AnimationLottie from "./animation-lottie";
import spaceLoading from '../../assets/lottie/space-loading.json'
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
      <AnimationLottie animationPath={spaceLoading} width="100px" />
    </div>
  );
};

export default LoadingScreen;
a