'use client';

import { useRef, type MutableRefObject } from 'react';
import {
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
  type UseScrollOptions
} from 'framer-motion';

export type MotionRange = [number, number];

type ParallaxScrollOffset = UseScrollOptions['offset'];

const DEFAULT_OFFSET: ParallaxScrollOffset = ['0 1', '1 0'];

export type ParallaxMotionOptions = {
  offset?: ParallaxScrollOffset;
  yRange?: MotionRange;
  rotateRange?: MotionRange;
  scaleRange?: MotionRange;
};

type ParallaxMotionResult = {
  ref: MutableRefObject<HTMLDivElement | null>;
  style: MotionStyle;
};

export function useParallaxMotion({
  offset = DEFAULT_OFFSET,
  yRange,
  rotateRange,
  scaleRange
}: ParallaxMotionOptions = {}): ParallaxMotionResult {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  });

  const yKeyframes: MotionRange = yRange ?? [0, 0];
  const rotateKeyframes: MotionRange = rotateRange ?? [0, 0];
  const scaleKeyframes: MotionRange = scaleRange ?? [1, 1];

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : yKeyframes);
  const rotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : rotateKeyframes);
  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : scaleKeyframes);

  const style: MotionStyle = {};

  if (typeof yRange !== 'undefined') {
    style.y = y;
  }

  if (typeof rotateRange !== 'undefined') {
    style.rotate = rotate;
  }

  if (typeof scaleRange !== 'undefined') {
    style.scale = scale;
  }

  return {
    ref,
    style
  };
}
