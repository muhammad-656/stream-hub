import React, { useState, useRef } from 'react';
import Rating from './Rating';

const PremiumVideoCard = ({ video, onPlayVideo, onAddToMyList, myList, index }) => {
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
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
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
        transform: `perspective(1200px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) scale(${isHovered ? 1.03 : 1})`,
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl hover:shadow-3xl transition-all duration-500">
        {/* Video Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            style={{
              filter: isHovered ? 'brightness(0.6) contrast(1.1)' : 'brightness(0.9) contrast(1)',
            }}
          />
          
          {/* Premium Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
            style={{
              background: isHovered 
                ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
                : 'transparent'
            }}
          />
          
          {/* Premium Play Button */}
          <div 
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
            onClick={() => onPlayVideo(video)}
          >
            <div className="relative transform transition-transform duration-300 hover:scale-110">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              
              {/* Play Button */}
              <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-full p-6 cursor-pointer shadow-2xl border border-primary-500/30">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToMyList(video);
              }}
              className="group/btn relative p-3 rounded-xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-700/50 hover:bg-neutral-800/80 transition-all duration-300 hover:scale-110"
            >
              <svg 
                className={`w-5 h-5 transition-colors duration-300 ${
                  isInMyList ? 'text-primary-500' : 'text-neutral-300 group-hover/btn:text-white'
                }`} 
                fill={isInMyList ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              
              {/* Tooltip */}
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {isInMyList ? 'Remove from List' : 'Add to List'}
              </div>
            </button>
            
            <button className="group/btn relative p-3 rounded-xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-700/50 hover:bg-neutral-800/80 transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5 text-neutral-300 group-hover/btn:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
              </svg>
              
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                More Info
              </div>
            </button>
          </div>

          {/* Premium Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            <div className="px-3 py-1.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-bold rounded-lg shadow-lg">
              HD
            </div>
            {video.isNew && (
              <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-bold rounded-lg shadow-lg animate-pulse">
                NEW
              </div>
            )}
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-neutral-900/90 backdrop-blur-xl text-white text-sm font-medium rounded-lg border border-neutral-700/50">
            {video.duration}
          </div>
        </div>
        
        {/* Premium Content Section */}
        <div className="p-6 bg-gradient-to-b from-neutral-900 to-neutral-950">
          <h3 
            className="text-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors duration-300 cursor-pointer leading-tight"
            onClick={() => onPlayVideo(video)}
          >
            {video.title}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 text-neutral-400 text-sm">
              <span className="font-medium">{video.year}</span>
              <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
              <span className="px-2.5 py-1 bg-neutral-800 rounded-lg text-xs font-medium border border-neutral-700">
                {video.category}
              </span>
            </div>
          </div>

          {/* Rating and Views */}
          <div className="flex items-center justify-between">
            <Rating rating={video.rating || 4.5} readonly size="sm" />
            <div className="text-neutral-500 text-sm font-medium">
              {video.views || '1.2M'} views
            </div>
          </div>
        </div>

        {/* Premium Shimmer Effect */}
        <div className="absolute inset-0 -top-2 h-8 bg-gradient-to-r from-transparent via-primary-500/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shimmer pointer-events-none"></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default PremiumVideoCard;
