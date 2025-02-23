"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

// ✅ Universal iFrame Embed Component
const IframeEmbed = ({ src }) => (
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

// ✅ GitHub Gist Embed Component (Fix for Gists not rendering)
const GistEmbed = ({ gistUrl }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const fetchGist = async () => {
      const gistId = gistUrl.split("/").pop();
      const apiUrl = `https://gist.github.com/${gistId}.json`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setHtml(data.div); // ✅ Fetch and set the Gist HTML content
      } catch (error) {
        console.error("Error loading Gist:", error);
      }
    };

    fetchGist();
  }, [gistUrl]);

  return <div dangerouslySetInnerHTML={{ __html: html }} className="my-4" />;
};

export default function MarkdownRenderer({ content }) {
  // ✅ Preprocess markdown to replace `{% embed %}` and `{% gist %}`

  const preprocessContent = (text) => {
    return text
      .replace(/{% embed (.*?) %}/g, (_, url) => `<iframe src="${url}" />`) // ✅ Handle iframes
      .replace(/{% gist (.*?) %}/g, (_, url) => `{%GIST:${url}%}`); // ✅ Placeholder for GistEmbed
  };

  return (
    <div className="prose prose-invert lg:prose-xl mt-6 text-gray-200">
      <Markdown
        remarkPlugins={[remarkGfm, remarkBreaks]} // Enables GitHub Flavored Markdown (GFM)
        rehypePlugins={[rehypeRaw]} // Allows raw HTML inside Markdown
        components={{
          p: ({ node, children }) => <p className="mb-4">{children}</p>,
          br: () => <br />,

          // ✅ Unordered List (Bulleted Lists)
          ul: ({ node, children }) => (
            <ul className="list-disc list-inside space-y-2 pl-4">{children}</ul>
          ),

          // ✅ Ordered List (Numbered Lists)
          ol: ({ node, children }) => (
            <ol className="list-decimal list-inside space-y-2 pl-4">
              {children}
            </ol>
          ),

          // ✅ List Items (Ensures proper spacing)
          li: ({ node, children }) => <li className="ml-4">{children}</li>,
          a: ({ node, href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {children}
            </a>
          ),
          // ✅ Code Blocks (for aliases & bash scripts)
          gist: ({ node, "data-url": gistUrl }) => (
            <GistEmbed gistUrl={gistUrl} />
          ),
          code: ({ children, inline }) => {
            const text = String(children).trim();

            if (inline) {
              return (
                <code className="px-1 py-0.5 bg-gray-800 text-green-400 rounded">
                  {text}
                </code>
              );
            }

            return (
              <pre className="p-4 bg-gray-900 rounded-lg overflow-x-auto">
                <code className="text-green-400">{text}</code>
              </pre>
            );
          },
        }}
      >
        {preprocessContent(content)}
      </Markdown>
    </div>
  );
}
