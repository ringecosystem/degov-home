'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.17, 0.55, 0.55, 1],
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.17, 0.55, 0.55, 1],
    },
  },
};

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const initialState = prefersReducedMotion ? 'visible' : 'hidden';

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden pt-24 lg:pt-32"
    >
      <motion.div
        className="relative z-10 container flex w-full flex-col items-center py-16 pb-16 lg:py-24 lg:pb-20"
        variants={containerVariants}
        initial={initialState}
        animate="visible"
      >
        {/* Title block */}
        <div className="flex max-w-[900px] flex-col items-center gap-6 text-center">
          {/* Badge */}
          <motion.div variants={prefersReducedMotion ? undefined : badgeVariants}>
            <Badge className="gap-2 border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              Open-Source DAO Governance
            </Badge>
          </motion.div>

          <motion.div variants={prefersReducedMotion ? undefined : childVariants}>
            <h1 className="text-5xl leading-[0.95] font-extrabold tracking-[-0.03em] text-text-primary md:text-7xl lg:text-8xl">
              The Governor Platform{' '}
              Your DAO Deserves
            </h1>
          </motion.div>

          <motion.div variants={prefersReducedMotion ? undefined : childVariants}>
            <p className="max-w-[600px] text-xl text-text-secondary">
              Open-source, self-hosted governance UI built on OpenZeppelin Governor. Track proposals, vote, delegate — across multiple EVM chains.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row"
            variants={prefersReducedMotion ? undefined : childVariants}
          >
            <Button
              variant="primary"
              size="lg"
              arrow
              href="https://github.com/ringecosystem/degov"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
            <Button
              variant="secondary"
              size="lg"
              arrow
              href="/pricing"
            >
              View Pricing
            </Button>
          </motion.div>

          <motion.p
            className="mt-2 text-sm text-text-secondary"
            variants={prefersReducedMotion ? undefined : childVariants}
          >
            OpenZeppelin Governor · Self-Hosted · Open Source · Multi-Chain
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
