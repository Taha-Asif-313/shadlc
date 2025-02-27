import React , {JSX} from "react";

interface TextProps {
  as?: keyof JSX.IntrinsicElements; // Corrected type for `as` prop
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
  as: Tag = "p", // Default to "p" tag
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
  // Determine text decoration
  const textDecoration = [
    underline ? "underline" : "",
    strikethrough ? "line-through" : "",
  ]
    .filter(Boolean)
    .join(" ");

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
        textDecoration: textDecoration || "none", // Fallback to "none" if empty
        fontStyle: italic ? "italic" : "normal",
      }}
    >
      {children}
    </Tag>
  );
};