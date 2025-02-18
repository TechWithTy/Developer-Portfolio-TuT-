"use client"; // ✅ Ensures this runs only on the client side

import { personalData } from "@/utils/data/personal-data";
import React, { useEffect, useState } from "react";
import { PopupWidget } from "react-calendly";

const CalendlyPopup = () => {
  const [rootElement, setRootElement] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      setRootElement(document.body);

      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile(); // ✅ Only runs after hydration
      window.addEventListener("resize", checkMobile);

      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  // ✅ Only render the PopupWidget after hydration
  if (!rootElement) return null;

  return (
    <PopupWidget
      url={personalData.calendly}
      rootElement={rootElement}
      text={isMobile ? "📆 Book Time" : "📆 Schedule Time To Talk"} // ✅ Emoji only on mobile
      textColor="#ffffff"
      color="#953ddb"
      className="calendly-popup" // ✅ Add custom class for styling
    />
  );
};

export default CalendlyPopup;
