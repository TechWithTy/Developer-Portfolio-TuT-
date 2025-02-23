// ✅ This is now a SERVER COMPONENT (no "use client")
import { notFound } from "next/navigation";
import Image from "next/image";
import Markdown from "react-markdown";

// Fetch blog data from API (Server-Side)
async function getBlogPost(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/getBlogs/${id}`
  );

  if (!res.ok) {
    return null; // Handle errors properly
  }

  return res.json();
}

// ✅ Blog Page Component
export default async function BlogPost({ params }) {
  const blog = await getBlogPost(params.id);

  if (!blog) {
    notFound(); // Automatically show 404 page if blog is missing
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-white">
      {/* Blog Cover Image */}
      {blog.cover_image && (
        <div className="w-full h-60 md:h-80 relative rounded-lg overflow-hidden">
          <Image
            src={blog.cover_image}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mt-6">{blog.title}</h1>

      {/* Metadata */}
      <p className="text-gray-400 text-sm mt-2">
        Published on {new Date(blog.published_at).toLocaleDateString()} by{" "}
        <span className="text-violet-400">{blog.user.name}</span>
      </p>

      {/* Tags */}
      {Array.isArray(blog.tag_list) && blog.tag_list.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.tag_list.map((tag, index) => (
            <span
              key={index}
              className="bg-[#16f2b3] text-[#1b203e] px-3 py-1 rounded-full text-xs font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Blog Content (Markdown) */}
      <div className="prose lg:prose-xl mt-6 text-gray-200">
        <Markdown>{blog.body_markdown}</Markdown>
      </div>
    </div>
  );
}
