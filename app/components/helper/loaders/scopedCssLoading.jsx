"use client";

const ScopedCssLoadingScreen = ({ title = "Loading...", size = 48 }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div
          className="loader"
          style={{ width: `${size}px`, height: `${size}px` }}
        ></div>
        <p className="mt-2 text-sm sm:text-base font-semibold text-white">
          {title}
        </p>
      </div>
    </div>
  );
};

export default ScopedCssLoadingScreen;
