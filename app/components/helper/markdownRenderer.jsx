"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

export default function MarkdownRenderer({ content }) {
  console.log("🔍 Markdown Content Before Rendering:", content);

  return (
    <div className="prose lg:prose-xl mt-6 text-gray-200">
      <Markdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          p: ({ node, children }) => <p className="mb-4">{children}</p>,
          br: () => <br />, // ✅ Force line breaks
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
