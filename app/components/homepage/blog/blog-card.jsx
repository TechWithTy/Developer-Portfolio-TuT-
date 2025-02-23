import { timeConverter } from "@/utils/time-converter";
import Image from "next/image";
import Link from "next/link";
import { BsHeartFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";

function BlogCard({ blog }) {
  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group mx-auto w-full max-w-[450px] flex flex-col">
      {/* Clickable Image */}
      <Link href={`/blog/${blog.id}`} passHref>
        <div className="w-full cursor-pointer overflow-hidden rounded-t-lg">
          <Image
            src={blog?.cover_image}
            width={1920}
            height={1080}
            alt={blog.title}
            className="w-full h-auto object-cover group-hover:scale-110 transition-all duration-300"
          />
        </div>
      </Link>

      <div className="p-3 flex flex-col flex-grow">
        {/* Metadata */}
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <p>{timeConverter(blog.published_at)}</p>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1">
              <BsHeartFill />
              <span>{blog.public_reactions_count}</span>
            </p>
            {blog.comments_count > 0 && (
              <p className="flex items-center gap-1">
                <FaCommentAlt />
                <span>{blog.comments_count}</span>
              </p>
            )}
          </div>
        </div>

        {/* Clickable Title */}
        <Link href={`/blog/${blog.id}`} passHref>
          <p className="mt-2 text-lg text-white sm:text-xl font-medium hover:text-violet-500 text-center cursor-pointer">
            {blog.title}
          </p>
        </Link>

        {/* Tag List */}
        {blog.tag_list?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 my-2">
            {blog.tag_list.map((tag, index) => (
              <span
                key={index}
                className="bg-[#16f2b3] text-[#1b203e] px-3 py-1 rounded-full text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Reading Time */}
        <p className="text-sm text-[#16f2b3] text-center">
          {`${blog.reading_time_minutes} Min Read`}
        </p>

        {/* Blog Description - Shorter text means smaller card */}
        <p
          className={`text-sm lg:text-base text-[#d3d8e8] text-center ${
            blog.description.length > 100 ? "line-clamp-3" : ""
          }`}
        >
          {blog.description}
        </p>
      </div>
    </div>
  );
}

export default BlogCard;
