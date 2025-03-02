import React, { JSX } from "react";

interface TextProps {
  as?: keyof JSX.IntrinsicElements;
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
  padding?: string;
  margin?: string;
  maxWidth?: string;
  wordBreak?: "normal" | "break-word" | "break-all" | "keep-all";
  shadow?: boolean;
  shadowColor?: string;
  bgColor?: string;
  borderRadius?: string;
  hoverColor?: string;
  hoverBgColor?: string;
  hoverTextDecoration?: "underline" | "line-through" | "none";
  activeColor?: string;
  activeBgColor?: string;
  transitionDuration?: string;
  onClick?: () => void;
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
  padding,
  margin,
  maxWidth,
  wordBreak = "normal",
  shadow = false,
  shadowColor = "rgba(0, 0, 0, 0.2)",
  bgColor,
  borderRadius,
  hoverColor,
  hoverBgColor,
  hoverTextDecoration,
  activeColor,
  activeBgColor,
  transitionDuration = "0.3s",
  onClick,
}) => {
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
        textDecoration: textDecoration || "none",
        fontStyle: italic ? "italic" : "normal",
        padding,
        margin,
        maxWidth,
        wordBreak,
        backgroundColor: bgColor || "transparent",
        borderRadius,
        boxShadow: shadow ? `2px 2px 10px ${shadowColor}` : "none",
        cursor: onClick ? "pointer" : "default",
        transition: `all ${transitionDuration} ease-in-out`,
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hoverColor) e.currentTarget.style.color = hoverColor;
        if (hoverBgColor) e.currentTarget.style.backgroundColor = hoverBgColor;
        if (hoverTextDecoration)
          e.currentTarget.style.textDecoration = hoverTextDecoration;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = color;
        e.currentTarget.style.backgroundColor = bgColor || "transparent";
        e.currentTarget.style.textDecoration = textDecoration || "none";
      }}
      onMouseDown={(e) => {
        if (activeColor) e.currentTarget.style.color = activeColor;
        if (activeBgColor) e.currentTarget.style.backgroundColor = activeBgColor;
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.color = hoverColor || color;
        e.currentTarget.style.backgroundColor = hoverBgColor || bgColor || "transparent";
      }}
    >
      {children}
    </Tag>
  );
};
