"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

// ✅ Universal iFrame Embed Component
const IframeEmbed = ({ src }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg my-4">
      <iframe
        src={src}
        width="100%"
        height="450"
        className="rounded-lg border-2 border-gray-700"
        allowFullScreen
      />
    </div>
  );
};

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose lg:prose-xl mt-6 text-gray-200">
      <Markdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          p: ({ node, children }) => <p className="mb-4">{children}</p>,
          br: () => <br />,
          // ✅ Detect `{% embed URL %}` and replace with `<IframeEmbed />`
          code: ({ children }) => {
            const text = String(children);
            if (text.startsWith("{% embed ")) {
              const embedUrl = text.match(/{% embed (.*?) %}/)?.[1]; // Extract URL
              return embedUrl ? <IframeEmbed src={embedUrl} /> : null;
            }
            return <code>{text}</code>;
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
