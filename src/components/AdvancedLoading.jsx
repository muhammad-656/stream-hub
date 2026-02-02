import React from 'react';

const AdvancedVideoCardSkeleton = () => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/30">
    {/* Shimmer effect container */}
    <div className="relative h-72 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-shimmer"></div>
      
      {/* Simulated overlay elements */}
      <div className="absolute top-3 left-3 w-12 h-6 bg-red-600/30 rounded-full animate-pulse"></div>
      <div className="absolute top-3 right-3 w-8 h-8 bg-black/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-3 right-3 w-16 h-6 bg-black/30 rounded-full animate-pulse"></div>
    </div>
    
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-700/50 rounded-lg animate-pulse"></div>
      <div className="h-4 bg-gray-700/30 rounded w-3/4 animate-pulse"></div>
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="h-4 bg-gray-700/30 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-700/30 rounded w-20 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-700/30 rounded w-12 animate-pulse"></div>
      </div>
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

const AdvancedHeroSkeleton = () => (
  <div className="relative h-screen overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-pulse"></div>
    
    {/* Animated gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
    </div>
    
    <div className="relative z-10 h-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          {/* Title skeleton with shimmer */}
          <div className="relative h-20 bg-gray-800/50 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-shimmer"></div>
          </div>
          
          {/* Description lines */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-800/30 rounded-lg animate-pulse"></div>
            <div className="h-6 bg-gray-800/30 rounded w-5/6 animate-pulse"></div>
          </div>
          
          {/* Metadata */}
          <div className="flex items-center space-x-4">
            <div className="h-4 bg-gray-800/30 rounded w-16 animate-pulse"></div>
            <div className="h-4 bg-gray-800/30 rounded w-20 animate-pulse"></div>
            <div className="h-6 bg-gray-800/30 rounded w-24 animate-pulse"></div>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-4">
            <div className="h-14 bg-red-600/30 rounded-xl w-32 animate-pulse"></div>
            <div className="h-14 bg-gray-700/30 rounded-xl w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
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

const PulseLoader = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse delay-75"></div>
    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse delay-150"></div>
  </div>
);

const AdvancedLoading = ({ type = 'video', count = 1 }) => {
  if (type === 'hero') return <AdvancedHeroSkeleton />;
  if (type === 'pulse') return <PulseLoader />;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <AdvancedVideoCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default AdvancedLoading;
