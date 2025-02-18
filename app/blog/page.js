"use client"; // ✅ Marks this as a Client Component

import { useState, useEffect } from "react";
import { getBlogs } from "@/utils/getBlogs";
import BlogCard from "@/app/components/homepage/blog/blog-card";

export default function Page() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getBlogs();
      setBlogs(data);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {blogs.length > 0 ? (
          blogs.map((blog, i) => <BlogCard blog={blog} key={i} />)
        ) : (
          <p className="text-center text-white">No blogs available.</p>
        )}
      </div>
    </div>
  );
}
