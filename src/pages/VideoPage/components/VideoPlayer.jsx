import React, { useEffect,useRef, useState } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im'; // Import spinner icon
import axios from 'axios';
import logo from '../../../assets/icon_3_white.png';

const VideoPlayer = ({ courseId, video }) => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const token = localStorage.getItem("token");
  const [thumbnailSource, setThumbnailSource] = useState('');

  useEffect(() => {
    const fetchThumbnail = async () => {
      if (!video?.thumbnail) return; // Check if thumbnail exists before proceeding
  
      try {
        console.log(video.thumbnail);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get/image/${video.thumbnail}`
        );
        setThumbnailSource(`data:${response.data.type};base64,${response.data.data}`);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
  
    fetchThumbnail();
  }, [video?.thumbnail]);
  


  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && videoRef.current.duration) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newTime = clickPosition * videoRef.current.duration;
      if (isFinite(newTime)) {
        videoRef.current.currentTime = newTime;
        setProgress(clickPosition * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const toggleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handlePlaying = () => {
    setIsBuffering(false);
  };

  return (
    <div className="relative w-full h-full rounded-sm overflow-hidden">
      {/* Thumbnail while video loads initially */}
      {!isVideoLoaded && video.thumbnail && (
        <img
          src={thumbnailSource || logo}
          alt="Video thumbnail"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      )}

      {/* Loading Spinner */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ImSpinner2 className="animate-spin text-4xl text-white" />
        </div>
      )}

      <video
        ref={videoRef}
        src={`${import.meta.env.VITE_API_URL}/stream/video/${courseId}/${video.id}/${token}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onContextMenu={handleContextMenu}
        controlsList="nodownload"
        onLoadStart={() => setIsVideoLoaded(false)}
        onCanPlay={() =>{ setIsVideoLoaded(true);setIsBuffering(false);}}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        className="w-full h-full cursor-pointer"
        onClick={togglePlay}
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
        <div 
          ref={progressBarRef}
          className="w-full h-2 bg-gray-600 cursor-pointer mb-4 relative" 
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-yellow-300 absolute top-0 left-0" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={togglePlay}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            
            <button 
              onClick={toggleMute}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <button 
            onClick={toggleFullScreen}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <FaExpand />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;