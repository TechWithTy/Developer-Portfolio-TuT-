"use client";
// @flow strict
import { useState, useRef } from "react";
import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from "../../../assets/lottie/code.json";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Experience() {
  const [showAll, setShowAll] = useState(false);
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

  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <div
      ref={experienceRef}
      id="experience"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

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
                    <Image
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-center">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        {experience.duration}
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center px-3 py-5">
                      <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                        <BsPersonWorkspace size={36} />
                      </div>
                      <div>
                        <p className="text-lg sm:text-2xl font-semibold uppercase text-center">
                          {experience.title}
                        </p>
                        <p className="text-md sm:text-lg text-gray-400 text-center">
                          {experience.company}
                        </p>
                      </div>
                    </div>

                    {/* Full Summary (No Truncation) */}
                    <p className="text-sm text-gray-300 mt-2">
                      {experience.summary}
                    </p>
                  </div>
                </GlowCard>
              ))}
            </div>

            {/* Show More / Show Less Button for Experiences */}
            {experiences.length > 3 && (
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
