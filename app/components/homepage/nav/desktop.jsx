// components/DesktopNavbar.tsx
import Link from "next/link";

function DesktopNavbar() {
  return (
    <nav className="bg-transparent w-full">
      <div className="flex items-center justify-between py-5 px-4">
        <Link href="/" className="text-[#16f2b3] text-3xl font-bold">
          Tyrique Daniel DS
        </Link>

        <ul className="hidden md:flex space-x-4">
          {["ABOUT", "EXPERIENCE", "SKILLS", "EDUCATION", "PROJECTS", "BLOGS", "TUTORIALS"].map(
            (item) => (
              <li key={item}>
                <Link
                  href={item === "BLOGS" || item === "TUTORIALS" ? `/${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
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
  );
}

export default DesktopNavbar;
