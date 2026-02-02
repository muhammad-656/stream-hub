import React, { useEffect, useRef, useState } from 'react';

const ScrollAnimation = ({ children, animation = 'fadeUp', threshold = 0.1, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, delay]);

  const animations = {
    fadeUp: {
      initial: 'opacity-0 translate-y-10',
      visible: 'opacity-100 translate-y-0'
    },
    fadeDown: {
      initial: 'opacity-0 -translate-y-10',
      visible: 'opacity-100 translate-y-0'
    },
    fadeLeft: {
      initial: 'opacity-0 translate-x-10',
      visible: 'opacity-100 translate-x-0'
    },
    fadeRight: {
      initial: 'opacity-0 -translate-x-10',
      visible: 'opacity-100 translate-x-0'
    },
    scale: {
      initial: 'opacity-0 scale-95',
      visible: 'opacity-100 scale-100'
    },
    rotate: {
      initial: 'opacity-0 rotate-3',
      visible: 'opacity-100 rotate-0'
    }
  };

  const selectedAnimation = animations[animation] || animations.fadeUp;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${selectedAnimation.initial} ${
        isVisible ? selectedAnimation.visible : ''
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
