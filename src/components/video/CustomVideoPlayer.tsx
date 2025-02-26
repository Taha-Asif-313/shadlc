import React, { useRef, useState } from "react";


interface CustomVideoPlayerProps {
  src: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  shadow?: boolean;
  controlsColor?: string;
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  src,
  width = "100%",
  height = "auto",
  borderRadius = "8px",
  shadow = true,
  controlsColor = "#ffffff",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const percentage =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time =
        (parseFloat(event.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(parseFloat(event.target.value));
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const volumeLevel = parseFloat(event.target.value);
      videoRef.current.volume = volumeLevel;
      setVolume(volumeLevel);
    }
  };

  const enablePiP = () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      videoRef.current.requestPictureInPicture();
    }
  };

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto ${
        shadow ? "shadow-lg" : ""
      }`}
      style={{ borderRadius }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(true)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        className="w-full rounded-lg"
        onTimeUpdate={handleProgress}
        style={{ width, height, borderRadius }}
      />

      {/* Custom Play/Pause Button */}
      <button
        onClick={togglePlay}
        className={`absolute inset-0 flex justify-center items-center ${
          playing ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      >
        <div className="bg-black bg-opacity-50 p-4 rounded-full">
          {playing ? (
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6"
              />
            </svg>
          ) : (
            <svg
              className="w-12 h-12 text-white"
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
          )}
        </div>
      </button>

      {/* Custom Controls */}
      {showControls && (
        <div
          className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-70 rounded-b-lg flex items-center justify-between transition-opacity duration-300"
          style={{ color: controlsColor }}
        >
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="text-white px-3 py-1 rounded-md text-sm"
          >
            {playing ? (
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6"
                />
              </svg>
            ) : (
              <svg
                className="w-12 h-12 text-white"
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
            )}
          </button>

          {/* Seek Bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-2/4 mx-2"
          />

          {/* Volume Control */}
          <div className="flex">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="text-2xl"
            >
              <g id="Volume_High">
                <g>
                  <path d="M13.816,19.937a1.446,1.446,0,0,1-.717-.194L9.43,17.623a3.257,3.257,0,0,0-1.625-.434H4.439a2.379,2.379,0,0,1-2.375-2.376V9.187A2.378,2.378,0,0,1,4.439,6.812H7.805A3.257,3.257,0,0,0,9.43,6.376L13.1,4.259A1.437,1.437,0,0,1,15.255,5.5V18.5a1.424,1.424,0,0,1-.718,1.245A1.445,1.445,0,0,1,13.816,19.937ZM4.439,7.812A1.377,1.377,0,0,0,3.064,9.187v5.626a1.378,1.378,0,0,0,1.375,1.376H7.805a4.254,4.254,0,0,1,2.125.569L13.6,18.876a.439.439,0,0,0,.657-.38V5.5a.438.438,0,0,0-.657-.379L9.93,7.242a4.251,4.251,0,0,1-2.125.57Z"></path>
                  <path d="M18.407,6.262a7.79,7.79,0,0,1,.021,11.476c-.474.437.235,1.143.707.707a8.793,8.793,0,0,0-.021-12.89c-.474-.434-1.184.272-.707.707Z"></path>
                  <path d="M16.91,9.031a4.021,4.021,0,0,1,.012,5.938c-.474.438.234,1.143.707.707a5.025,5.025,0,0,0-.012-7.352c-.474-.434-1.183.272-.707.707Z"></path>
                </g>
              </g>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full mx-2"
            />
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={() => videoRef.current?.requestFullscreen()}
            className="text-white px-3 rounded-md hover:bg-gray-700"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.75 15a.75.75 0 0 1 .75.75v3.5c0 .138.112.25.25.25h3.5a.75.75 0 0 1 0 1.5h-3.5A1.75 1.75 0 0 1 3 19.25v-3.5a.75.75 0 0 1 .75-.75Zm16.5 0a.75.75 0 0 1 .75.75v3.5A1.75 1.75 0 0 1 19.25 21h-3.5a.75.75 0 0 1 0-1.5h3.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 .75-.75ZM4.75 4.5a.25.25 0 0 0-.25.25v3.5a.75.75 0 0 1-1.5 0v-3.5C3 3.784 3.784 3 4.75 3h3.5a.75.75 0 0 1 0 1.5ZM15 3.75a.75.75 0 0 1 .75-.75h3.5c.966 0 1.75.784 1.75 1.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.25.25 0 0 0-.25-.25h-3.5a.75.75 0 0 1-.75-.75Z"></path>
            </svg>
          </button>
          {/* Fullscreen Button */}
          <button
            onClick={enablePiP}
            className="text-white px-3 rounded-md hover:bg-gray-700"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="text-xl"
            >
              <g id="Minimize_1">
                <g>
                  <path d="M11,17.78a.5.5,0,0,1-1,0V14.71L3.92,20.79a.5.5,0,0,1-.71-.71c.29-.29.58-.57.87-.86C5.82,17.48,7.55,15.74,9.3,14H6.22a.5.5,0,0,1,0-1H10.5a.429.429,0,0,1,.34.14c.01.01.02.01.02.02a.384.384,0,0,1,.13.26Z"></path>
                  <path d="M14.7,10h3.08a.5.5,0,0,1,0,1H13.5a.429.429,0,0,1-.34-.14c-.01-.01-.02-.01-.02-.02a.384.384,0,0,1-.13-.26L13,6.22a.5.5,0,0,1,1,0V9.29l.01-.01,6.07-6.07a.5.5,0,0,1,.71.71Z"></path>
                </g>
              </g>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
