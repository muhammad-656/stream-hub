import React from 'react';

const WatchHistory = ({ watchHistory, onPlayVideo, onClearHistory }) => {
  const formatWatchTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (watchHistory.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">No Watch History</h2>
          <p className="text-gray-400">Start watching videos to see your history here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Watch History</h2>
        <button
          onClick={onClearHistory}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {watchHistory.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                onClick={() => onPlayVideo(item)}
              />
              
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                <div 
                  className="h-full bg-red-600"
                  style={{ width: `${item.progress || 0}%` }}
                ></div>
              </div>

              {/* Overlay with play button */}
              <div 
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center"
                onClick={() => onPlayVideo(item)}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-600 rounded-full p-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Watched time badge */}
              <div className="absolute top-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-white text-xs">
                {formatWatchTime(item.watchedAt)}
              </div>
            </div>
            
            <div className="mt-3">
              <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-red-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {item.year} • {item.category} • {Math.round((item.progress || 0) / 10) * 10}% watched
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchHistory;
