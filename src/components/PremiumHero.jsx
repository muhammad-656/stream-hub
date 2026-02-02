import React, { useState, useEffect } from 'react';

const PremiumHero = ({ featuredVideo, onPlayVideo }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background with sophisticated overlay */}
      <div className="absolute inset-0">
        <img
          src={featuredVideo.thumbnail}
          alt={featuredVideo.title}
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.4) contrast(1.1) saturate(1.2)',
          }}
        />
        
        {/* Multi-layer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-accent-600/20 animate-pulse"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            {/* Premium Badge */}
            <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-primary-600/20 backdrop-blur-xl border border-primary-500/30 rounded-full mb-6 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-primary-400 text-sm font-semibold">FEATURED</span>
            </div>

            {/* Title with sophisticated typography */}
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="block bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                {featuredVideo.title.split(' ').slice(0, -1).join(' ')}
              </span>
              <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                {featuredVideo.title.split(' ').slice(-1).join(' ')}
              </span>
            </h1>

            {/* Description */}
            <p className={`text-xl md:text-2xl text-neutral-300 mb-8 leading-relaxed max-w-2xl transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {featuredVideo.description}
            </p>

            {/* Metadata */}
            <div className={`flex flex-wrap items-center gap-6 mb-12 transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center space-x-2 text-neutral-300">
                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{featuredVideo.year}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-neutral-300">
                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{featuredVideo.duration}</span>
              </div>
              
              <div className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold rounded-xl border border-primary-500/30 shadow-lg">
                {featuredVideo.category}
              </div>
              
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-neutral-300 ml-2 font-medium">4.8</span>
              </div>
            </div>

            {/* Premium Action Buttons */}
            <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button
                onClick={() => onPlayVideo(featuredVideo)}
                className="group relative px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-primary-500/25 transform hover:scale-105 flex items-center space-x-3"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                
                <div className="relative flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <span>Play Now</span>
                </div>
              </button>
              
              <button className="group px-10 py-4 bg-neutral-800/80 backdrop-blur-xl hover:bg-neutral-700/80 text-white font-bold text-lg rounded-2xl transition-all duration-300 border border-neutral-700/50 hover:border-neutral-600/50 transform hover:scale-105 flex items-center space-x-3">
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sophisticated Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-neutral-400 text-sm font-medium">Scroll</span>
          <div className="w-6 h-10 border-2 border-neutral-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-neutral-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-500/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PremiumHero;
