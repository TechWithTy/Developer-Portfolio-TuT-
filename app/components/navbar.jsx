"use client";
import { useState, useEffect } from "react";
import MobileNavbar from "./homepage/nav/mobileNav";
import DesktopNavbar from "./homepage/nav/desktop";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
}

export default Navbar;
