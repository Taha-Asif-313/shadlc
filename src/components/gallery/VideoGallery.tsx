import React, { useState } from "react";

interface VideoGalleryProps {
  videos: { src: string; poster?: string }[];
  columns?: number;
  gap?: string;
  layout?: "grid" | "masonry";
  lightbox?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  columns = 3,
  gap = "10px",
  layout = "grid",
  lightbox = true,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  className = "",
}) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className={`w-full ${className}`}>
      {/* Video Grid */}
      <div
        className={`grid ${layout === "masonry" ? "grid-flow-dense" : ""}`}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
        }}
      >
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => lightbox && setSelectedVideo(video.src)}
          >
            <video
              src={video.src}
              poster={video.poster}
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              controls={controls}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightbox && selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <video
            src={selectedVideo}
            autoPlay
            controls
            className="max-w-full max-h-full"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={() => setSelectedVideo(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
