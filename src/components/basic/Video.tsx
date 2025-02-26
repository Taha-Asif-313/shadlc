import React, { useState, useRef } from "react";

interface VideoProps {
  src: string;
  poster?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  shadow?: boolean;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  overlayText?: string;
  overlayColor?: string;
  className?: string;
  responsive?: boolean;
}

export const Video: React.FC<VideoProps> = ({
  src,
  poster,
  width = "100%",
  height = "auto",
  borderRadius = "8px",
  shadow = false,
  controls = true,
  autoplay = false,
  loop = false,
  muted = false,
  overlayText,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  className = "",
  responsive = true,
}) => {
  const [playing, setPlaying] = useState(autoplay);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div
      className={`relative ${className} ${
        responsive ? "w-full max-w-[500px] sm:max-w-[700px] md:max-w-[900px]" : ""
      }`}
      style={{ width, height }}
    >
      {!playing && poster ? (
        // Show poster with play button
        <div
          className="relative w-full h-full flex items-center justify-center cursor-pointer"
          onClick={handlePlay}
        >
          <img
            src={poster}
            alt="Video Thumbnail"
            className="w-full h-auto rounded-lg"
            style={{
              borderRadius,
              boxShadow: shadow ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
            }}
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
            <button className="bg-white p-4 rounded-full">
              <svg
                className="w-12 h-12 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-5.197-3.692A1 1 0 008 8v8a1 1 0 001.555.832l5.197-3.692a1 1 0 000-1.664z"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        // Video Player
        <video
          ref={videoRef}
          src={src}
          controls={controls}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          style={{
            width: responsive ? "100%" : width,
            height: responsive ? "auto" : height,
            borderRadius,
            boxShadow: shadow ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
          }}
          className="w-full h-auto"
        />
      )}

      {/* Overlay with text (optional) */}
      {overlayText && (
        <div
          className="absolute inset-0 flex justify-center items-center text-white text-lg font-bold"
          style={{ backgroundColor: overlayColor }}
        >
          {overlayText}
        </div>
      )}
    </div>
  );
};
