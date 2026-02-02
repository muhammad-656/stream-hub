import React from 'react';

const VideoGallery = ({ videos, onPlayVideo, onAddToMyList, myList }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Popular Videos</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {videos.map((video) => {
          const isInMyList = myList.some(item => item.id === video.id);
          
          return (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  onClick={() => onPlayVideo(video)}
                />
                
                {/* Overlay with play button */}
                <div 
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center"
                  onClick={() => onPlayVideo(video)}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-red-600 rounded-full p-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* My List button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToMyList(video);
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-full p-2 hover:bg-opacity-80 transition-all duration-200"
                >
                  <svg 
                    className={`w-5 h-5 ${isInMyList ? 'text-red-600' : 'text-white'}`} 
                    fill={isInMyList ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-white text-xs">
                  {video.duration}
                </div>
              </div>
              
              <div className="mt-3">
                <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-red-500 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1">{video.year} • {video.category}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoGallery;
