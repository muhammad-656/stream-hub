import React, { useState } from 'react';

const Rating = ({ rating, onRate, readonly = false, size = 'sm' }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= (hoverRating || rating || 0);
      
      return (
        <button
          key={index}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onRate && onRate(starValue)}
          onMouseEnter={() => !readonly && setHoverRating(starValue)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'} transition-colors duration-200`}
        >
          <svg
            className={`${sizeClasses[size]} ${
              isFilled ? 'text-yellow-400' : 'text-gray-600'
            } ${!readonly && 'hover:text-yellow-400'}`}
            fill={isFilled ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      );
    });
  };

  return (
    <div className="flex items-center space-x-1">
      {renderStars()}
      {rating !== undefined && (
        <span className="text-gray-400 text-sm ml-2">
          {rating.toFixed(1)} / 5.0
        </span>
      )}
    </div>
  );
};

export default Rating;
