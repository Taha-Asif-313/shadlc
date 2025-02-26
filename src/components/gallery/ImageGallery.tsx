import React, { useState } from "react";

interface ImageGalleryProps {
  images: { src: string; alt?: string }[];
  columns?: number;
  gap?: string;
  layout?: "grid" | "masonry";
  lightbox?: boolean;
  className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  gap = "10px",
  layout = "grid",
  lightbox = true,
  className = "",
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className={`w-full ${className}`}>
      {/* Gallery Grid */}
      <div
        className={`grid ${
          layout === "masonry" ? "grid-flow-dense" : ""
        }`}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => lightbox && setSelectedImage(image.src)}
          >
            <img
              src={image.src}
              alt={image.alt || "Gallery Image"}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightbox && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Preview" className="max-w-full max-h-full" />
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
