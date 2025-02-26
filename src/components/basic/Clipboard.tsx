import React, { useState } from "react";

interface CodeClipboardProps {
  text: string;
  language?: string; // Optional, for future syntax highlighting
  className?: string;
}

export const Clipboard: React.FC<CodeClipboardProps> = ({
  text,
  language = "javascript",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div
      className={`relative bg-gray-900 text-white p-4 rounded-lg ${className}`}
    >
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute text-[12px] top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md flex items-center gap-1 transition"
      >
        {copied ? "Copied!" : "Copy"}
        <span className="text-lg">
          {copied ? (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="10px"
              width="10px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M317.5 210.3c1.7-1.8 1.8-4.7 0-6.5l-19.8-21c-.8-.9-2-1.4-3.2-1.4-1.2 0-2.4.5-3.2 1.4l-66.5 69.1 26.4 27.1 66.3-68.7zM123.8 253.1c-.9-.9-2-1.4-3.2-1.4-1.2 0-2.3.5-3.2 1.4l-20.1 20.7c-1.8 1.8-1.8 4.8 0 6.6l63.2 65c4 4.2 9 6.6 13.2 6.6 6 0 11.1-4.5 13.1-6.4l.1-.1 13.4-13.8-76.5-78.6z"></path>
              <path d="M414.7 182.4l-19.8-21c-.8-.9-2-1.4-3.2-1.4-1.2 0-2.4.5-3.2 1.4L250.7 304.1l-50.1-51.6c-.9-.9-2-1.4-3.2-1.4-1.2 0-2.3.5-3.2 1.4l-20.1 20.7c-1.8 1.8-1.8 4.8 0 6.6l63.2 65c4 4.2 9 6.6 13.2 6.6 6 0 11.1-4.5 13.1-6.4l.1-.1 151-156.1c1.7-1.7 1.7-4.6 0-6.4z"></path>
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="10px"
              width="10px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path>
            </svg>
          )}
        </span>
      </button>

      {/* Code Block */}
      <pre className="overflow-x-auto">
        <code className={`block text-sm whitespace-pre-wrap`}>{text}</code>
      </pre>
    </div>
  );
};
