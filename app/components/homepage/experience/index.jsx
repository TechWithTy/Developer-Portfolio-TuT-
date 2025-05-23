"use client";
// @flow strict
import { useState, useRef } from "react";
import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from "../../../assets/lottie/code.json";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import { personalData } from "@/utils/data/personal-data";
function Experience() {
  const [showAll, setShowAll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const experienceRef = useRef(null);
  const lastExperienceRef = useRef(null);

  // Toggle showing more/less experiences
  const toggleExperiences = () => {
    setShowAll(!showAll);
    setTimeout(() => {
      if (!showAll) {
        lastExperienceRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else {
        experienceRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // Show only 2 experiences initially
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 2);

  return (
    <div
      ref={experienceRef}
      id="experience"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      {/* Background Image - Centered & Enlarged */}
      <Image
        src="/section.svg"
        alt="Hero"
        width={2000}
        height={1000}
        className="absolute inset-0 mx-auto my-auto -z-10 w-[90%] max-w-[1800px] h-auto"
      />

      {/* Section Title */}
      <div className="flex justify-center sm:my1  lg:my-3 lg:py-4 mt-4">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Experience
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Resume Link */}
      <div className="buttons">
        <a
          href={personalData.resume}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button className="blob-btn">
            Get My Resume
            <span className="blob-btn__inner">
              <span className="blob-btn__blobs">
                <span className="blob-btn__blob"></span>
                <span className="blob-btn__blob"></span>
                <span className="blob-btn__blob"></span>
                <span className="blob-btn__blob"></span>
              </span>
            </span>
          </button>
        </a>

        {/* Only show SVG when hovered */}
        {isHovered && (
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  result="blur"
                  stdDeviation="10"
                ></feGaussianBlur>
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                  result="goo"
                ></feColorMatrix>
                <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
              </filter>
            </defs>
          </svg>
        )}
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Animated Image */}
          <div className="flex justify-center items-center">
            <div className="w-[90%] max-w-[400px] lg:h-[90vw] max-h-[400px] sm:max-w-[200px] sm:max-h-[200px] lg:max-w-[600px] lg:max-h-[600px]">
              {" "}
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          {/* Experience Cards */}
          <div>
            <div className="flex flex-col gap-6">
              {visibleExperiences.map((experience, index) => (
                <GlowCard
                  key={experience.id}
                  identifier={`experience-${experience.id}`}
                  ref={
                    index === visibleExperiences.length - 1
                      ? lastExperienceRef
                      : null
                  }
                >
                  <div className="p-3 relative">
                    {/* Background Blur */}
                    <Image
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />

                    {/* Duration */}
                    <div className="flex justify-center">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        {experience.duration}
                      </p>
                    </div>

                    {/* Title & Company - Centered */}
                    <div className="flex flex-col items-center text-center px-3 py-5">
                      <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                        <BsPersonWorkspace size={36} />
                      </div>
                      <div>
                        <p className="text-lg sm:text-2xl font-semibold uppercase">
                          {experience.title}
                        </p>
                        <p className="text-md sm:text-lg text-gray-400">
                          {experience.company}
                        </p>
                      </div>
                    </div>

                    {/* Full Summary */}
                    <p className="text-sm text-gray-300 mt-2">
                      {experience.summary}
                    </p>
                  </div>
                </GlowCard>
              ))}
            </div>

            {/* Show More / Show Less Button */}
            {experiences.length > 2 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={toggleExperiences}
                  className="px-6 py-2 text-white bg-violet-500 rounded-md hover:bg-violet-600 transition-all duration-300"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
