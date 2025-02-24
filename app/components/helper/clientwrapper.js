"use client";
import { useEffect, useState } from "react";
import LoadingScreen from "./loading";
export default function ClientOnly({ children }) {
  const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!isClient) {
  //       setIsClient(true);
  //     }
  //   }, 300); // Rechecks every 300ms

  //   return () => clearInterval(interval); // Cleanup interval on unmount
  // }, [isClient]);

  if (!isClient) return <LoadingScreen />; // Show loading screen until true

  return <>{children}</>;
}
