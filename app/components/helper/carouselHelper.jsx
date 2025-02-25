"use client";

import { useState, useEffect, Children } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable"; // Import swipe handler

const CarouselHelper = ({ children, isBottom: isBottomProp = false, nextSlideTitles = [] }) => {
  const slides = Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBottom, setIsBottom] = useState(isBottomProp);
  const totalSlides = slides.length;

  // Detect mobile screen size on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsBottom(window.innerWidth < 768); // Adjust threshold as needed
    };

    checkIfMobile(); // Run once on mount
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Enable swipe gestures for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true, // Enables swiping on desktop with a mouse
  });

  if (totalSlides === 0) return null; // Handle empty state gracefully

  // Get next slide title
  const nextTitle = nextSlideTitles.length > 0 ? nextSlideTitles[(currentIndex + 1) % totalSlides] : "";

  return (
    <div
      {...swipeHandlers}
      className="relative w-full max-w-2xl mx-auto text-center sm:text-left overflow-hidden"
    >
      {/* Carousel Content */}
      <div className={`p-6 mx-auto ${isBottom ? "w-full" : "max-w-lg"}`}>
        {slides[currentIndex]}
      </div>

      {/* Next Slide Title */}
      {nextTitle && (
        <p className="text-gray-500 text-xs text-center mt-2">Next: {nextTitle}</p>
      )}

      {/* Navigation Buttons - Side or Bottom */}
      {isBottom ? (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={prevSlide}
            className="p-2 bg-violet-500 rounded-md hover:bg-violet-600 transition-all duration-300"
          >
            <FaChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="p-2 bg-violet-500 rounded-md hover:bg-violet-600 transition-all duration-300"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-violet-500 rounded-md hover:bg-violet-600 transition-all duration-300"
          >
            <FaChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-violet-500 rounded-md hover:bg-violet-600 transition-all duration-300"
          >
            <FaChevronRight size={24} />
          </button>
        </>
      )}

      {/* Slide Indicator - Always Below */}
      <div className="mt-4 text-center text-gray-700 text-sm">
        {currentIndex + 1} / {totalSlides}
      </div>
    </div>
  );
};

export default CarouselHelper;
