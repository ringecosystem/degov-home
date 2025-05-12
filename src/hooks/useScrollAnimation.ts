'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, UseInViewOptions } from 'framer-motion';

interface ScrollAnimationStyles {
  opacity: number;
  transform: string;
  transition: string;
}

interface ScrollAnimationOptions extends UseInViewOptions {
  delay?: number;
  duration?: number;
  opacityValue?: number;
  mobileDelay?: number;
  mobileDuration?: number;
}

export function useScrollAnimation({
  delay = 0,
  duration = 0.3,
  mobileDelay,
  mobileDuration,
  opacityValue = 1,
  ...options
}: ScrollAnimationOptions = {}) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const isInView = useInView(ref, {
    once: true,
    amount: isMobile ? 0.1 : 0.3,
    ...options
  });

  const activeDelay = isMobile ? (mobileDelay ?? delay / 2) : delay;
  const activeDuration = isMobile ? (mobileDuration ?? Math.min(0.2, duration)) : duration;

  const animatedStyles: ScrollAnimationStyles = {
    opacity: isInView ? opacityValue : 0,
    transform: isInView ? 'none' : 'translateY(25px)',
    transition: `all ${activeDuration}s cubic-bezier(0.17, 0.55, 0.55, 1) ${activeDelay}s`
  };

  return { ref, animatedStyles, isMobile };
}
