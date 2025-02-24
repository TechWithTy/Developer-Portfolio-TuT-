"use client";

import { useEffect, useState } from "react";
import CssLoadingScreen from "./loaders/cssLoading";
export default function ClientOnly({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 500); // Simulating a slight delay for better UX
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return <CssLoadingScreen title="Loading Content..." />;
  }

  return <>{children}</>;
}
