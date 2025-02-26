import React, { useState } from "react";

interface AvatarWithStatusProps {
  src: string;
  alt?: string;
  status?: "online" | "offline" | "away" | "busy";
  size?: "small" | "medium" | "large";
  className?: string;
}

export const AvatarWithStatus: React.FC<AvatarWithStatusProps> = ({
  src,
  alt = "User Avatar",
  status = "online",
  size = "medium",
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  const avatarSizes: Record<string, { size: string; statusSize: string }> = {
    small: { size: "w-8 h-8", statusSize: "w-2 h-2" },
    medium: { size: "w-12 h-12", statusSize: "w-3 h-3" },
    large: { size: "w-16 h-16", statusSize: "w-4 h-4" },
  };

  const statusColors: Record<string, string> = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  return (
    <div className={`relative inline-block ${avatarSizes[size].size}`}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          aria-label={alt} // Added for accessibility
          className={`rounded-full object-cover ${avatarSizes[size].size} ${className}`}
          onError={() => setImageError(true)}
        />
      ) : (
        <svg
          aria-label="Placeholder for user avatar" // Added for accessibility
          className={`rounded-full bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400 ${avatarSizes[size].size}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9c0-3 3-5 7-5s7 2 7 5v1H5v-1z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <span
        className={`z-[1000] w-full h-full absolute bottom-0 right-0 border-2 border-white rounded-full ${statusColors[status]} ${avatarSizes[size].statusSize}`}
      />
    </div>
  );
};
