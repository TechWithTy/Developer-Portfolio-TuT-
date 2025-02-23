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
      .replace(/{% embed (.*?) %}/g, (_, url) => `<iframe src="${url}" />`) // Replace embeds
      .replace(/{% gist (.*?) %}/g, (_, url) => `<gist data-url="${url}" />`); // Replace Gists
  };

  return (
    <div className="prose lg:prose-xl mt-6 text-gray-200">
      <Markdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          p: ({ node, children }) => <p className="mb-4">{children}</p>,
          br: () => <br />,
          code: ({ children }) => {
            const text = String(children).trim();

            // ✅ Handle `{% embed URL %}`
            if (text.startsWith("<iframe src=")) {
              const embedUrl = text.match(/<iframe src="(.*?)" \/>/)?.[1];
              return embedUrl ? <IframeEmbed src={embedUrl} /> : null;
            }

            // ✅ Handle `{% gist URL %}`
            if (text.startsWith("<gist data-url=")) {
              const gistUrl = text.match(/<gist data-url="(.*?)" \/>/)?.[1];
              return gistUrl ? <GistEmbed gistUrl={gistUrl} /> : null;
            }

            return <code>{text}</code>;
          },
        }}
      >
        {preprocessContent(content)}
      </Markdown>
    </div>
  );
}
