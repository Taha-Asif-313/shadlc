import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  width?: string;
  height?: string;
  borderRadius?: string;
  backgroundColor?: string;
  primaryColor?: string;
  className?: string;
  padding?:string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
  loop = false,
  controls = false,
  width = "100%",
  height = "auto",
  borderRadius = "12px",
  backgroundColor = "#1e1e1e",
  primaryColor = "#ff4081",
  padding= '10px',
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Number(e.target.value);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: padding,
        width: width,
        maxWidth: "800px",
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        color: "#fff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        controls={controls}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        style={{
          width: "100%",
          maxHeight: "500px",
          height: height,
          borderRadius: borderRadius,
          backgroundColor: "#000",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "8px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: "10px",
          }}
        >

          {/* Play/Pause button */}
          <button
            onClick={togglePlayPause}
            style={{
              background: primaryColor,
              padding: "10px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontSize: "1.2rem",
            }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          {/* Seek bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "80%",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "14px", whiteSpace: "nowrap" }}>
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              style={{ flex: "1", accentColor: primaryColor }}
            />
            <span style={{ fontSize: "14px", whiteSpace: "nowrap" }}>
              {formatTime(duration)}
            </span>
          </div>

          {/* End controls button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              width: "20%",
              gap: "10px",
            }}
          >
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              {volume > 0 ? (
                <FaVolumeUp size={20} />
              ) : (
                <FaVolumeMute size={20} />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 600px) {
            div {
              padding: 8px;
            }
            video {
              max-height: 300px;
            }
            input[type="range"] {
              width: 100%;
            }
            button {
              font-size: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
};
