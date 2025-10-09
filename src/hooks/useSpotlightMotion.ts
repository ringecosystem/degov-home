'use client';

import { useCallback } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import {
  MotionStyle,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring
} from 'framer-motion';

export type SpotlightMotionOptions = {
  radius?: number;
  intensity?: number;
  stiffness?: number;
  damping?: number;
};

type SpotlightMotionHandlers = {
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
};

type SpotlightMotionResult = SpotlightMotionHandlers & {
  style: MotionStyle;
};

export function useSpotlightMotion(
  {
    radius = 680,
    intensity = 0.55,
    stiffness = 180,
    damping = 28
  }: SpotlightMotionOptions = {}
): SpotlightMotionResult {
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const active = useMotionValue(prefersReducedMotion ? 1 : 0);

  const springX = useSpring(pointerX, {
    stiffness,
    damping,
    mass: 0.25
  });
  const springY = useSpring(pointerY, {
    stiffness,
    damping,
    mass: 0.25
  });
  const springActive = useSpring(active, {
    stiffness: stiffness * 1.2,
    damping,
    mass: 0.4
  });

  const gradient = useMotionTemplate`radial-gradient(${radius}px circle at ${springX}px ${springY}px, rgba(96, 155, 255, ${intensity}) 0%, rgba(171, 91, 255, ${intensity *
    0.42}) 36%, rgba(34, 35, 46, 0) 72%)`;

  const style: MotionStyle = prefersReducedMotion
    ? {
        background:
          'radial-gradient(70% 70% at 50% 20%, rgba(95,155,255,0.25) 0%, rgba(34,35,46,0) 65%)',
        opacity: 1
      }
    : {
        background: gradient,
        opacity: springActive
      };

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;

      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();

      pointerX.set(event.clientX - rect.left);
      pointerY.set(event.clientY - rect.top);
      active.set(1);
    },
    [active, pointerX, pointerY, prefersReducedMotion]
  );

  const onPointerLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    active.set(0);
  }, [active, prefersReducedMotion]);

  return {
    onPointerMove,
    onPointerLeave,
    style
  };
}
