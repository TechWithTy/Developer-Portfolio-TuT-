"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200); // Becomes sticky after 200px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full bg-opacity-80 backdrop-blur-md z-[1000] transition-all duration-300 ${
          isSticky ? "shadow-lg" : ""
        }`}
      >
        <div className="flex items-center justify-between py-5 px-4">
          <Link href="/" className="text-[#16f2b3] text-3xl font-bold">
            Tyrique Daniel
          </Link>

          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[1001]">
          <ul className="flex flex-col items-center py-8 space-y-4">
            {[
              "ABOUT",
              "EXPERIENCE",
              "SKILLS",
              "EDUCATION",
              "PROJECTS",
              "BLOGS",
              "TUTORIALS",
            ].map((item) => (
              <li key={item}>
                <Link
                  href={`/#${item.toLowerCase()}`}
                  className="text-white text-lg hover:text-pink-600"
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default MobileNavbar;
