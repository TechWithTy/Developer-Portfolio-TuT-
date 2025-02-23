"use client"; // ✅ Forces client-side rendering

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose lg:prose-xl mt-6 text-gray-200">
      <Markdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </Markdown>
    </div>
  );
}
