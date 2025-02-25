"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar Wrapper */}
      <div className={`${isSticky ? "" : "relative"} w-full`}>
        {/* Navbar */}
        <nav
          className={`w-full bg-opacity-80 backdrop-blur-md z-[1000] transition-all duration-300 ${
            isSticky ? "fixed top-0 left-0 shadow-lg" : "relative"
          }`}
        >
          <div className="flex items-center justify-between py-5 px-4">
            <Link href="/" className="text-[#16f2b3] text-3xl font-bold">
              Tyrique Daniel
            </Link>

            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Slides Up */}
      <div
        className={`fixed bottom-0 left-0 w-full h-full bg-black z-[1001] transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={closeMenu}
          className="absolute top-5 right-5 text-white text-3xl hover:text-pink-600 transition"
        >
          <HiX size={32} />
        </button>

        {/* Navigation Links */}
        <ul className="flex flex-col items-center justify-center h-full space-y-6">
          {[
            "ABOUT",
            "EXPERIENCE",
            "SKILLS",
            "EDUCATION",
            "PROJECTS",
            "BLOG",
            "TUTORIALS",
          ].map((item) => (
            <li key={item}>
              <Link
                href={
                  item === "BLOG" || item === "TUTORIALS"
                    ? `/${item.toLowerCase()}`
                    : `/#${item.toLowerCase()}`
                }
                className="text-white text-2xl font-medium hover:text-[#c769a8] transition"
                onClick={closeMenu} // Closes the menu when clicking a link
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MobileNavbar;
