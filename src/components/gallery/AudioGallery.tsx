import React, { useRef, useState } from "react";

interface AudioTrack {
  src: string;
  title: string;
}

interface AudioGalleryProps {
  tracks: AudioTrack[];
  className?: string;
}

export const AudioGallery: React.FC<AudioGalleryProps> = ({
  tracks,
  className = "",
}) => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const playTrack = (index: number) => {
    if (currentTrack === index) {
      if (audioRef.current?.paused) {
        audioRef.current?.play();
        setIsPlaying(true);
      } else {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    } else {
      setCurrentTrack(index);
      setTimeout(() => {
        audioRef.current?.play();
        setIsPlaying(true);
      }, 100);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value);
      setVolume(parseFloat(e.target.value));
    }
  };

  return (
    <div
      className={`w-full max-w-md p-4 bg-white rounded-lg shadow-md ${className}`}
    >
      <h2 className="text-lg font-bold mb-3">🎵 Audio Gallery</h2>

      {/* Track List */}
      <div className="space-y-3">
        {tracks.map((track, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
            onClick={() => playTrack(index)}
          >
            <span className="text-sm font-medium">{track.title}</span>
            <button className="text-lg">
              {currentTrack === index && isPlaying ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
                </svg>
              ) : (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Audio Player */}
      {currentTrack !== null && (
        <div className="mt-4 p-3 bg-gray-200 rounded-lg">
          <p className="text-sm font-semibold">{tracks[currentTrack].title}</p>

          {/* Progress Bar */}
          <input
            type="range"
            value={progress}
            onChange={handleSeek}
            className="w-full cursor-pointer mt-2"
          />

          {/* Volume Control */}
          <div className="flex items-center mt-2">
            🔊
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="ml-2 w-full cursor-pointer"
            />
          </div>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={tracks[currentTrack].src}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      )}
    </div>
  );
};
