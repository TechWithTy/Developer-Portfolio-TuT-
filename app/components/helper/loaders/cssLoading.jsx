"use client";

const CssLoadingScreen = ({ title = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-[99999]">
      <div className="loader"></div>
      <p className="mt-4 text-lg font-semibold">{title}</p>
    </div>
  );
};

export default CssLoadingScreen;
