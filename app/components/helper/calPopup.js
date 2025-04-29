"use client";

import React from "react";
import { useCal } from "../../hooks/use-cal";

const CalPopup = ({ calendarLink }) => {
  useCal();

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <button
        data-cal-link={calendarLink}
        data-cal-config='{"theme":"dark"}'
        className="bg-cyber-purple text-white font-semibold py-3 px-6 rounded-lg shadow flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <span role="img" aria-label="calendar">
          📅
        </span>
        Schedule Time To Talk
      </button>
    </div>
  );
};

export default CalPopup;
