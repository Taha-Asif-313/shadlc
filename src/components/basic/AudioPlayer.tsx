import React, { useRef, useState, useEffect } from "react";
import {
  FaPause,
  FaPlay,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  backgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  borderRadius?: string;
  className?: string;
  padding?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  autoPlay = false,
  loop = false,
  backgroundColor = "#1e1e1e",
  primaryColor = "#ff4081",
  secondaryColor = "#fff",
  borderRadius = "12px",
  padding = "15px",
  className,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!isFullscreen) {
        if (playerRef.current.requestFullscreen) {
          playerRef.current.requestFullscreen();
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
      ref={playerRef}
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: padding,
        width: "100%",
        maxWidth: "400px",
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        color: secondaryColor,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "10px",
        }}
      >
        {/* Play/Pause Button */}
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

        {/* Seek Bar */}
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

        {/* Buttons controls  */}
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
              color: secondaryColor,
            }}
          >
            {volume > 0 ? <FaVolumeUp size={18} /> : <FaVolumeMute size={18} />}
          </button>
          <button
            onClick={toggleFullscreen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: secondaryColor,
            }}
          >
            {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};
