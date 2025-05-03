'use client';

import { useRef } from 'react';
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
}

export function useScrollAnimation({
  delay = 0,
  duration = 0.3,
  opacityValue = 1,
  ...options
}: ScrollAnimationOptions = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
    ...options
  });

  const animatedStyles: ScrollAnimationStyles = {
    opacity: isInView ? opacityValue : 0,
    transform: isInView ? 'none' : 'translateY(50px)',
    transition: `all ${duration}s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
  };

  return { ref, animatedStyles };
}
