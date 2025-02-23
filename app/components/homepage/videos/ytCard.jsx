"use client";

import { useState } from "react";
import Image from "next/image";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss"; // ✅ Import the modal styles
import { FaPlayCircle } from "react-icons/fa";

function YouTubeCard({ video }) {
  // ✅ Manage modal open state
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Pick the highest resolution thumbnail
  const bestThumbnail =
    video.thumbnail?.thumbnails?.slice(-1)[0]?.url || "/placeholder-image.jpg";

  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group mx-auto w-full max-w-[450px]">
      {/* 🔥 Modal for YouTube Video */}
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={video.id} // Must be the video ID, e.g. "xDy_brNvN5k"
        onClose={() => setIsOpen(false)}
        // Additional YouTube options:
        youtube={{
          mute: 0,
          autoplay: 1,
          rel: 0,
        }}
      />

      {/* Thumbnail Button -> Opens Modal */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative w-full h-44 lg:h-52 overflow-hidden rounded-t-lg group cursor-pointer"
      >
        <Image
          src={bestThumbnail}
          alt={video.title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-all duration-300"
          unoptimized
        />
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaPlayCircle className="text-white text-5xl" />
        </div>
      </button>

      <div className="p-2 sm:p-3 flex flex-col">
        {/* Channel & Duration */}
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <p>{video.channel}</p>
          <span className="bg-[#16f2b3] text-[#1b203e] px-2 py-1 rounded-full text-xs font-semibold">
            {video.duration}
          </span>
        </div>

        {/* Video Title (static text) */}
        <p className="my-2 lg:my-3 text-lg text-white sm:text-xl font-medium text-center">
          {video.title}
        </p>
      </div>
    </div>
  );
}

export default YouTubeCard;
