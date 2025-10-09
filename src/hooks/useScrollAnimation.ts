'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, UseInViewOptions, useReducedMotion } from 'framer-motion';

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
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    handleChange(mediaQuery);

    const listener = (event: MediaQueryListEvent) => handleChange(event);
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener);

      return () => {
        mediaQuery.removeEventListener('change', listener);
      };
    }

    mediaQuery.addListener(listener);

    return () => {
      mediaQuery.removeListener(listener);
    };
  }, []);

  const inView = useInView(ref, {
    once: true,
    amount: isMobile ? 0.1 : 0.3,
    ...options
  });

  const isInView = prefersReducedMotion ? true : inView;

  const activeDelay = isMobile ? (mobileDelay ?? delay / 2) : delay;
  const activeDuration = isMobile ? (mobileDuration ?? Math.min(0.2, duration)) : duration;

  const animatedStyles: ScrollAnimationStyles = {
    opacity: isInView ? opacityValue : 0,
    transform: prefersReducedMotion || isInView ? 'none' : 'translateY(25px)',
    transition: prefersReducedMotion
      ? 'none'
      : `all ${activeDuration}s cubic-bezier(0.17, 0.55, 0.55, 1) ${activeDelay}s`
  };

  return { ref, animatedStyles, isMobile };
}
