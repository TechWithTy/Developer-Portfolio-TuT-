"use client";

import { useState, Children } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CarouselHelper = ({ children, isBottom = false }) => {
  const slides = Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  if (slides.length === 0) return null; // Handle empty state gracefully

  return (
    <div className={`relative w-full max-w-2xl mx-auto text-center sm:text-left overflow-hidden`}>
      {/* Carousel Content */}
      <div className={`p-6 mx-auto ${isBottom ? "w-full" : "max-w-lg"}`}>
        {slides[currentIndex]}
      </div>

      {/* Navigation Buttons - Side or Bottom */}
      {isBottom ? (
        // ✅ Buttons on the bottom
        <div className="flex justify-center gap-4 ">
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
        // ✅ Buttons on the side (default)
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
    </div>
  );
};

export default CarouselHelper;
