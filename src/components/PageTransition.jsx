import React from 'react';

const PageTransition = ({ children, isVisible = true }) => {
  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
