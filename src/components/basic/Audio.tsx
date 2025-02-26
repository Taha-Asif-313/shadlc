import React, { useRef, useState, useEffect } from "react";

interface AudioProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  defaultVolume?: number;
  background?: string;
  progressColor?: string;
  playIcon?: React.ReactNode;
  pauseIcon?: React.ReactNode;
  className?: string;
}

export const Audio: React.FC<AudioProps> = ({
  src,
  autoPlay = false,
  loop = false,
  defaultVolume = 1,
  background = "#f4f4f4",
  progressColor = "#007bff",
  playIcon,
  pauseIcon,
  className = "",
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [volume, setVolume] = useState(defaultVolume);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = defaultVolume;
    }
  }, [defaultVolume]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percent);
      setCurrentTime(formatTime(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newVolume = parseFloat(e.target.value);
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${className}`} style={{ background }}>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Custom Controls */}
      <div className="flex items-center space-x-4">
        {/* Play / Pause Button */}
        <button
          onClick={togglePlay}
          className={`p-2 rounded-full bg-transparent`}

        >
          {isPlaying ? pauseIcon || "⏸" : playIcon || "▶️"}
        </button>

        {/* Timeline & Progress Bar */}
        <div className="flex items-center space-x-2 w-full">
          <span className="text-xs text-gray-700">{currentTime}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full cursor-pointer"
            style={{ accentColor: progressColor }}
          />
          <span className="text-xs text-gray-700">{duration}</span>
        </div>

        {/* Volume Control */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 cursor-pointer"
        />
      </div>
    </div>
  );
};
