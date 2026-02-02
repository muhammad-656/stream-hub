import React from 'react';

const VideoCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-700 rounded-lg h-64 mb-3"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
  </div>
);

const HeroSkeleton = () => (
  <div className="relative h-screen animate-pulse">
    <div className="absolute inset-0 bg-gray-800"></div>
    <div className="relative z-10 h-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="h-16 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-5/6 mb-8"></div>
          <div className="flex space-x-4">
            <div className="h-12 bg-gray-700 rounded w-32"></div>
            <div className="h-12 bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LoadingSkeleton = ({ type = 'video' }) => {
  if (type === 'hero') return <HeroSkeleton />;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <VideoCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
