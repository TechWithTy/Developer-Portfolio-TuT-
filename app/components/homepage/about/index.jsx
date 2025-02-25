import dynamic from "next/dynamic";
import Image from "next/image";
import { personalData } from "@/utils/data/personal-data";

// Dynamically import the client-side AboutCarousel
const AboutCarousel = dynamic(() => import("./carousel"), { ssr: false });

function AboutSection() {
  return (
    <div id="about" className="my-3 lg:my-16 relative">
      {/* About Me Label */}
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>

      {/* Grid Layout for AboutCarousel & Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* AboutCarousel on the left */}
        <div className="order-2 lg:order-1">
          <AboutCarousel />
        </div>

        {/* Profile Image on the right */}
        <div className="flex justify-center order-1 lg:order-2">
          <Image
            src={personalData.profile}
            width={280}
            height={280}
            alt="Abu Said"
            className="rounded-lg transition-all duration-1000 hover:scale-110 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
