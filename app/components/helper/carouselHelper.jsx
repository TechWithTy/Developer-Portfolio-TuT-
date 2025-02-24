"use client";
import { useState, Children, ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CarouselHelper = ({ children }) => {
  const slides = Children.toArray(children); // Ensure children is an array
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  if (slides.length === 0) return null; // Handle edge case where no slides exist

  return (
    <div className="relative w-full max-w-2xl mx-auto text-center sm:text-left overflow-hidden">
      {/* Chevron Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-80 transition"
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Carousel Content */}
      <div className="p-4">{slides[currentIndex]}</div>

      {/* Chevron Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-80 transition"
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
};

export default CarouselHelper;
