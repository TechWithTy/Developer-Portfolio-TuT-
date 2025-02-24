"use client"; // ✅ Marks this as a Client Component

import { useState, useEffect } from "react";
import { fetchBlogs } from "@/utils/getBlogs";
import BlogCard from "@/app/components/homepage/blog/blog-card";
import ScopedCssLoadingScreen from "../components/helper/loaders/scopedCssLoading";
export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Search state

  useEffect(() => {
    async function fetchBlogsScoped() {
      const data = await fetchBlogs();
      setBlogs(data);
    }
    fetchBlogsScoped();
  }, []);

  // ✅ Filtered blogs based on title or tags
  const filteredBlogs = blogs.filter((blog) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(lowerQuery) ||
      blog.tag_list.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });

  return (
    <div className="py-8">
      {/* Section Title */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blogs
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* ✅ Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by title or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 text-white bg-[#1a1443] border border-[#3b3670] rounded-lg focus:ring-2 focus:ring-[#16f2b3] outline-none"
        />
      </div>

      {/* ✅ Grid of Blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10 auto-rows-fr">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, i) => <BlogCard blog={blog} key={i} />)
        ) : (
          // ✅ Make sure the loader takes the full width of the grid and centers itself
          <div className="col-span-full flex items-center justify-center">
            <div className="w-64 h-64 flex items-center justify-center">
              <ScopedCssLoadingScreen title="Fetching Data..." size={80} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
