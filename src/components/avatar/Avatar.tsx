import React from "react";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User Avatar",
  size = "medium",
  className = "",
}) => {
  const avatarSizes: Record<string, string> = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${avatarSizes[size]} ${className}`}
    />
  );
};
