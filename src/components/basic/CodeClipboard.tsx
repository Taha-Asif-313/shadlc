import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "../../CodeClipboard.css"; // ✅ Import External Styles

interface CodeClipboardProps {
  code: string;
  language?: string;
}

export const CodeClipboard: React.FC<CodeClipboardProps> = ({
  code,
  language = "javascript",
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="code-container relative">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={`copy-btn ${copied ? "copied" : ""}`}
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      {/* Code Block */}
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
