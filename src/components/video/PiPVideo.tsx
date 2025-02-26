import React, { useRef } from "react";

export const PiPVideo : React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const enablePiP = () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      videoRef.current.requestPictureInPicture();
    }
  };

  return (
    <div>
      <video ref={videoRef} src={src} controls className="w-full" />
      <button onClick={enablePiP} className="mt-2 px-4 py-2 bg-blue-500 text-white">Enable PiP</button>
    </div>
  );
};

