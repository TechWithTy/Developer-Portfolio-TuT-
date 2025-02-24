"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const AnimationLottie = ({ animationPath, width }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("../../assets/lottie/space-loading.json").then((data) =>
        setAnimationData(data.default)
      );
    }
  }, []);

  if (!animationData) return null; // Prevent rendering before data loads

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: width || "95%" }}
    />
  );
};

export default AnimationLottie;
