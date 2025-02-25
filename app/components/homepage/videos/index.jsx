"use client"; // ✅ Ensures fetching happens in the browser

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { fetchYoutubeVideos } from "@/utils/fetchYoutubeVideos"; // ✅ Import utility function
import YouTubeCard from "./ytCard";
import ScopedCssLoadingScreen from "../../helper/loaders/scopedCssLoading";
import CarouselHelper from "../../helper/carouselHelper";

function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideosScoped() {
      const data = await fetchYoutubeVideos();
      setVideos(data.slice(0, 6)); // ✅ Only keep the first 6 videos
    }
    fetchVideosScoped();
  }, []);

  return (
    <div
      id="videos"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      {/* Blurred Background Effect */}
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

      {/* Top Line Decoration */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="block lg:hidden">
        <div className="flex justify-center my-5 lg:py-8">
          <div className="flex items-center">
            <span className="w-24 h-[2px] bg-[#1a1443]"></span>
            <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
              Videos
            </span>
            <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          </div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {videos.length > 0 ? (
          videos.map((video, i) => <YouTubeCard video={video} key={i} />)
        ) : (
          <div className="col-span-full flex items-center justify-center">
            <div className="w-64 h-64 flex items-center justify-center">
              <ScopedCssLoadingScreen title="Fetching Data..." size={80} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Carousel */}
      <div className="block lg:hidden">
        {videos.length > 0 ? (
          <CarouselHelper isBottom>
            {videos.map((video, i) => (
              <YouTubeCard video={video} key={i} />
            ))}
          </CarouselHelper>
        ) : (
          <div className="flex justify-center items-center my-5">
            <ScopedCssLoadingScreen title="Fetching Data..." size={80} />
          </div>
        )}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-5 lg:mt-12">
        <Link
          className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
          role="button"
          href="/videos"
        >
          <span>View More</span>
          <FaArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default Videos;
