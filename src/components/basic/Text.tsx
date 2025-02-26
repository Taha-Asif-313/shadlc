import React from "react";

interface TextProps {
  as?: "p" | "span" | "strong" | "em" | "a" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: "normal" | "bold" | "lighter" | "bolder" | number;
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
  letterSpacing?: string;
  lineHeight?: string;
  underline?: boolean;
  italic?: boolean;
  bold?: boolean;
  strikethrough?: boolean;
}

export const Text: React.FC<TextProps> = ({
  as: Tag = "p",
  children,
  className = "",
  color = "#333",
  fontSize = "16px",
  fontWeight = "normal",
  textAlign = "left",
  textTransform = "none",
  letterSpacing = "normal",
  lineHeight = "normal",
  underline = false,
  italic = false,
  bold = false,
  strikethrough = false,
}) => {
  return (
    <Tag
      className={className}
      style={{
        color,
        fontSize,
        fontWeight: bold ? "bold" : fontWeight,
        textAlign,
        textTransform,
        letterSpacing,
        lineHeight,
        textDecoration: `${underline ? "underline" : ""} ${
          strikethrough ? "line-through" : ""
        }`.trim(),
        fontStyle: italic ? "italic" : "normal",
      }}
    >
      {children}
    </Tag>
  );
};
