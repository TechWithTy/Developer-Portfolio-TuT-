"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Navbar - Always on top */}
      <nav className="fixed top-0 left-0 w-full bg-transparent z-[1000]">
        <div className="flex items-center justify-between py-5 px-4 bg-black bg-opacity-80 backdrop-blur-md">
          <Link href="/" className="text-[#16f2b3] text-3xl font-bold">
            Tyrique Daniel
          </Link>

          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="block md:hidden text-white focus:outline-none"
          >
            {isOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4">
            {["ABOUT", "EXPERIENCE", "SKILLS", "EDUCATION", "PROJECTS", "BLOGS", "TUTORIALS"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    className="text-sm text-white transition-colors duration-300 hover:text-pink-600"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Highest z-index */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[1001]">
          <div className="flex justify-between items-center py-5 px-4 bg-black bg-opacity-80 backdrop-blur-md">
            <Link href="/" className="text-[#16f2b3] text-3xl font-bold">
              Tyrique Daniel
            </Link>
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <HiX size={28} />
            </button>
          </div>

          <ul className="flex flex-col items-center py-8 space-y-4">
            {["ABOUT", "EXPERIENCE", "SKILLS", "EDUCATION", "PROJECTS", "BLOGS", "TUTORIALS"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    className="text-white text-lg hover:text-pink-600"
                    onClick={toggleMenu}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
