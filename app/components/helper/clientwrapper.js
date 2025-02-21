"use client"; // This ensures it runs only on the client

import { useEffect, useState } from "react";

export default function ClientOnly({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevents SSR issues

  return <>{children}</>;
}
