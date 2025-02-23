// ✅ This is now a SERVER COMPONENT (no "use client")
import { notFound } from "next/navigation";
import Image from "next/image";
import MarkdownRenderer from "@/app/components/helper/markdownRenderer";
// Fetch blog data from API (Server-Side)
async function getBlogPost(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/getBlogs/${id}`
  );

  if (!res.ok) {
    return null; // Handle errors properly
  }

  const data = await res.json();

  // ✅ Ensure tag_list is always an array
  return {
    ...data,
    tag_list: Array.isArray(data.tag_list)
      ? data.tag_list
      : typeof data.tag_list === "string"
      ? data.tag_list.split(",").map((tag) => tag.trim())
      : [],
  };
}

// ✅ Blog Page Component
export default async function BlogPost({ params }) {
  const blog = await getBlogPost(params.id);

  if (!blog) {
    notFound(); // Automatically show 404 page if blog is missing
  }
  console.log("📌 Full Blog Data:", blog);
  console.log("📌 Tag List Type:", typeof blog.tag_list);
  console.log("📌 Tag List Value:", blog.tag_list);

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
      <h1 className="text-3xl md:text-4xl font-bold mt-6 text-center">
        {blog.title}
      </h1>
      <div className="mt-4 text-center">
        <a
          href={blog.url} // ✅ Dev.to link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          View Blog on Dev.to
        </a>
      </div>
      {/* Metadata */}
      <p className="text-gray-400 text-sm mt-2 text-center">
        Published on {new Date(blog.published_at).toLocaleDateString()} by{" "}
        <span className="text-violet-400">{blog.user.name}</span>
      </p>

      {/* Tags */}
      {Array.isArray(blog.tag_list) && blog.tag_list.length > 0 && (
        <div className="flex justify-center mt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {blog.tag_list.map((tag, index) => (
              <span
                key={index}
                className="bg-[#16f2b3] text-[#1b203e] px-3 py-1 rounded-full text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Blog Content (Markdown) */}
      <MarkdownRenderer content={blog.body_markdown} />
    </div>
  );
}
