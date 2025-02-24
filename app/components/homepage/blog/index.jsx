"use client"; // ✅ Run fetch in the browser

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import BlogCard from "./blog-card";
import { fetchBlogs } from "@/utils/getBlogs"; // ✅ Import utility function
import ScopedCssLoadingScreen from "../../helper/loaders/scopedCssLoading";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogsScoped() {
      const data = await fetchBlogs();
      setBlogs(data);
    }
    fetchBlogsScoped();
  }, []);

  return (
    <div
      id="blogs"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Blogs
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {blogs.length > 0 ? (
          blogs.map((blog, i) => <BlogCard blog={blog} key={i} />)
        ) : (
          // ✅ Make sure the loader takes the full width of the grid and centers itself
          <div className="col-span-full flex items-center justify-center">
            <div className="w-64 h-64 flex items-center justify-center">
              <ScopedCssLoadingScreen title="Fetching Data..." size={80} />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-5 lg:mt-12">
        <Link
          className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
          role="button"
          href="/blog"
        >
          <span>View More</span>
          <FaArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default Blog;
