"use client";

const ScopedCssLoadingScreen = ({ title = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="loader"></div>
      <p className="mt-2 text-sm sm:text-base font-semibold text-white">
        {title}
      </p>
    </div>
  );
};

export default ScopedCssLoadingScreen;
