import React from "react";

interface AvatarGroupProps {
  avatars: string[];
  size?: "small" | "medium" | "large";
  maxVisible?: number;
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = "medium",
  maxVisible = 3,
  className = "",
}) => {
  const avatarSizes: Record<string, string> = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div className="flex -space-x-2">
      {avatars.slice(0, maxVisible).map((src, index) => (
        <img
          key={index}
          src={src}
          className={`rounded-full border-2 border-white object-cover ${avatarSizes[size]} ${className}`}
        />
      ))}
      {avatars.length > maxVisible && (
        <span className={`rounded-full border-2 border-white bg-gray-500 text-white flex items-center justify-center ${avatarSizes[size]}`}>
          +{avatars.length - maxVisible}
        </span>
      )}
    </div>
  );
};
