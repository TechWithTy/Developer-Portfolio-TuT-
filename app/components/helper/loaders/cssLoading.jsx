"use client";

const CssLoadingScreen = ({ title = "Loading...", size = 48 }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white z-[99999]">
      <div
        className="loader"
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
      <p className="mt-4 text-lg font-semibold">{title}</p>
    </div>
  );
};

export default CssLoadingScreen;
