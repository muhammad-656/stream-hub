import React, { useState, useRef } from 'react';
import Rating from './Rating';

const AdvancedVideoCard = ({ video, onPlayVideo, onAddToMyList, myList, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const isInMyList = myList.some(item => item.id === video.id);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) scale(${isHovered ? 1.05 : 1})`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
        {/* Video Thumbnail */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            style={{
              filter: isHovered ? 'brightness(0.7)' : 'brightness(1)',
            }}
          />
          
          {/* Glassmorphism Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              backdropFilter: 'blur(10px)',
            }}
          />
          
          {/* Play Button Animation */}
          <div 
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={() => onPlayVideo(video)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-full animate-ping"></div>
              <div className="relative bg-red-600 hover:bg-red-700 rounded-full p-6 transform transition-transform duration-300 hover:scale-110 cursor-pointer">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToMyList(video);
              }}
              className="bg-black/50 backdrop-blur-md rounded-full p-3 hover:bg-black/70 transition-all duration-200 transform hover:scale-110"
            >
              <svg 
                className={`w-5 h-5 ${isInMyList ? 'text-red-500' : 'text-white'}`} 
                fill={isInMyList ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <button className="bg-black/50 backdrop-blur-md rounded-full p-3 hover:bg-black/70 transition-all duration-200 transform hover:scale-110">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
              </svg>
            </button>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">{video.duration}</span>
          </div>

          {/* Quality Badge */}
          <div className="absolute top-3 left-3 bg-red-600 backdrop-blur-md px-3 py-1 rounded-full">
            <span className="text-white text-xs font-bold">HD</span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4 bg-gradient-to-b from-transparent to-black/30">
          <h3 
            className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors duration-300 cursor-pointer"
            onClick={() => onPlayVideo(video)}
          >
            {video.title}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>{video.year}</span>
              <span>•</span>
              <span className="px-2 py-1 bg-gray-700/50 rounded-full text-xs">{video.category}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <Rating rating={video.rating || 4.5} readonly size="sm" />
            <div className="text-gray-400 text-xs">
              {video.views || '1.2M'} views
            </div>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 -top-2 h-4 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default AdvancedVideoCard;
