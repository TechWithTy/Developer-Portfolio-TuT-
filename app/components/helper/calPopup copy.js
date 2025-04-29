"use client";

import React, { useState, useEffect } from "react";
import { useCal } from "../../hooks/use-cal";
import { personalData } from "@/utils/data/personal-data";

/**
 * CalPopup component: responsive button opens a modal to choose call type,
 * then triggers the Cal.com modal for the selected link using data attributes.
 */
const CalPopup = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useCal();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <button
        className={`bg-cyber-purple text-white font-semibold py-3 px-6 rounded-lg shadow flex items-center gap-2 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-cyber-purple/50 ${
          isMobile ? "w-full text-base px-4 py-2" : "text-lg"
        }`}
        aria-haspopup="true"
        aria-expanded={showOptions}
        onClick={() => setShowOptions((show) => !show)}
      >
        <span role="img" aria-label="calendar">
          📅
        </span>
        {isMobile ? "Book Call" : "Schedule Time To Talk"}
      </button>

      {showOptions && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-cyber-purple rounded-lg shadow-lg p-0 max-w-md w-full mx-4 animate-fade-in">
            <div className="bg-cyber-purple rounded-t-lg px-6 py-4">
              <h3 className="text-xl font-bold text-white text-center">
                Choose Call Type
              </h3>
            </div>
            <div className="bg-white rounded-b-lg px-6 py-6 flex flex-col gap-3">
              <button
                data-cal-link={personalData.initial_call}
                data-cal-config='{"theme":"dark"}'
                className="w-full bg-cyber-purple/90 text-white py-3 px-4 rounded hover:bg-cyber-purple focus:outline-none focus:ring-2 focus:ring-cyber-purple/50 transition"
                onClick={() => setShowOptions(false)}
              >
                Initial Call
              </button>
              <button
                data-cal-link={personalData.technicalInterview}
                data-cal-config='{"theme":"dark"}'
                className="w-full bg-cyber-purple/90 text-white py-3 px-4 rounded hover:bg-cyber-purple focus:outline-none focus:ring-2 focus:ring-cyber-purple/50 transition"
                onClick={() => setShowOptions(false)}
              >
                Technical Interview
              </button>
              <button
                onClick={() => setShowOptions(false)}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400/50 transition mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalPopup;
