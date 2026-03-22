'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TerminalLine {
  type: 'command' | 'output' | 'success';
  text: string;
}

interface TerminalProps {
  lines: TerminalLine[];
  title?: string;
  className?: string;
  animated?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.17, 0.55, 0.55, 1] },
  },
};

function Terminal({ lines, title = 'Terminal', className, animated = false }: TerminalProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = animated && !prefersReducedMotion;
  const cursorDelay = lines.length * 0.3 + 0.3;

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden rounded-[20px] border border-white/[0.06] bg-bg-terminal',
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#febc2e' }} />
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#28c840' }} />
        <span className="ml-2 text-xs text-text-tertiary">{title}</span>
      </div>

      {/* Content */}
      {shouldAnimate ? (
        <motion.div
          className="overflow-x-auto p-4 font-mono text-sm leading-relaxed whitespace-nowrap"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {lines.map((line, i) => (
            <motion.div key={i} className="flex" variants={lineVariants}>
              <LineContent line={line} />
            </motion.div>
          ))}
          <motion.span
            className="inline-block h-4 w-2 bg-text-primary"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
            transition={
              isInView
                ? {
                    duration: 1,
                    delay: cursorDelay,
                    times: [0, 0.2, 0.8, 1],
                    ease: 'linear',
                    repeat: Infinity
                  }
                : { duration: 0 }
            }
          />
        </motion.div>
      ) : (
        <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed whitespace-nowrap">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <LineContent line={line} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LineContent({ line }: { line: TerminalLine }) {
  if (line.type === 'command') {
    return (
      <>
        <span className="mr-2 select-none text-success">$</span>
        <span className="text-text-code">{line.text}</span>
      </>
    );
  }
  if (line.type === 'output') {
    return <span className="text-text-secondary">{line.text}</span>;
  }
  return <span className="text-success">{line.text}</span>;
}

export { Terminal };
export type { TerminalLine, TerminalProps };
