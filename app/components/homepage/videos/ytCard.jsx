import Image from "next/image";
import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";

function YouTubeCard({ video }) {
  // ✅ Select the highest resolution thumbnail available
  const bestThumbnail = video.thumbnail?.thumbnails?.slice(-1)[0]?.url || "/placeholder-image.jpg";

  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group mx-auto w-full max-w-[450px]">
      {/* Clickable Thumbnail */}
      <Link href={video.url} target="_blank">
        <div className="h-44 lg:h-52 w-full cursor-pointer overflow-hidden rounded-t-lg relative">
          <Image
            src={bestThumbnail}
            layout="fill" // ✅ Ensures full width and height
            objectFit="cover" // ✅ Prevents stretching, maintains aspect ratio
            alt={video.title}
            className="group-hover:scale-110 transition-all duration-300"
            unoptimized // ⚡ Ensures images load correctly from YouTube
          />
          {/* Play Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaPlayCircle className="text-white text-5xl" />
          </div>
        </div>
      </Link>

      <div className="p-2 sm:p-3 flex flex-col">
        {/* Channel & Duration */}
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <p>{video.channel}</p>
          <span className="bg-[#16f2b3] text-[#1b203e] px-2 py-1 rounded-full text-xs font-semibold">
            {video.duration}
          </span>
        </div>

        {/* Clickable Title */}
        <Link target="_blank" href={video.url}>
          <p className="my-2 lg:my-3 cursor-pointer text-lg text-white sm:text-xl font-medium hover:text-violet-500 text-center">
            {video.title}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default YouTubeCard;
