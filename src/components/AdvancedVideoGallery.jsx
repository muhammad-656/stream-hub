import React from 'react';
import AdvancedVideoCard from './AdvancedVideoCard';
import ScrollAnimation from './ScrollAnimation';

const AdvancedVideoGallery = ({ videos, onPlayVideo, onAddToMyList, myList, title = "Popular Videos" }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ScrollAnimation animation="fadeUp" delay={100}>
        <h2 className="text-4xl font-bold text-white mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {title}
        </h2>
      </ScrollAnimation>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {videos.map((video, index) => (
          <ScrollAnimation 
            key={video.id} 
            animation="fadeUp" 
            delay={index * 100}
            threshold={0.1}
          >
            <AdvancedVideoCard
              video={video}
              onPlayVideo={onPlayVideo}
              onAddToMyList={onAddToMyList}
              myList={myList}
              index={index}
            />
          </ScrollAnimation>
        ))}
      </div>
      
      {videos.length === 0 && (
        <ScrollAnimation animation="scale" delay={200}>
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-4">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No videos found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        </ScrollAnimation>
      )}
    </div>
  );
};

export default AdvancedVideoGallery;
