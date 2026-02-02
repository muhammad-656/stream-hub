import React from 'react';

const Hero = ({ featuredVideo, onPlayVideo }) => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <img
          src={featuredVideo.thumbnail}
          alt={featuredVideo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {featuredVideo.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 line-clamp-3">
              {featuredVideo.description}
            </p>
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-gray-300">{featuredVideo.year}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">{featuredVideo.duration}</span>
              <span className="text-gray-300">•</span>
              <span className="px-2 py-1 bg-red-600 text-white text-sm rounded">
                {featuredVideo.category}
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onPlayVideo(featuredVideo)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg flex items-center space-x-2 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                <span>Play Now</span>
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg flex items-center space-x-2 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
