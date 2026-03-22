'use client';

import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/* Corner bracket positions: [top, left, rotationDeg] */
const CORNER_BRACKETS: [string, string, number][] = [
  ['12px', '12px', 0],
  ['12px', 'calc(100% - 36px)', 90],
  ['calc(100% - 36px)', 'calc(100% - 36px)', 180],
  ['calc(100% - 36px)', '12px', 270],
];

export default function CtaSection() {
  const { ref: headingRef, animatedStyles: headingStyles } = useScrollAnimation({ delay: 0.1 });
  const { ref: descRef, animatedStyles: descStyles } = useScrollAnimation({ delay: 0.2 });
  const { ref: buttonsRef, animatedStyles: buttonsStyles } = useScrollAnimation({ delay: 0.3 });

  return (
    <SectionWrapper paddings="py-16 lg:py-20" className="bg-white/[0.02]">
      <div
        className="relative overflow-hidden rounded-[20px] border border-white/[0.10] bg-bg-card"
        style={{ boxShadow: '0 0 80px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)' }}
      >
        {/* Blueprint decorations */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* Layer 1: Fine grid — major 40px + minor 8px */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: [
                'repeating-linear-gradient(to right, rgba(255,255,255,0.5) 0 1px, transparent 1px 40px)',
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0 1px, transparent 1px 40px)',
                'repeating-linear-gradient(to right, rgba(255,255,255,0.25) 0 1px, transparent 1px 8px)',
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.25) 0 1px, transparent 1px 8px)',
              ].join(', '),
            }}
          />

          {/* Layer 2: Tick marks on all four edges */}
          {/* Top edge */}
          <div
            className="absolute top-0 right-0 left-0 h-3 opacity-[0.12]"
            style={{
              backgroundImage: [
                'repeating-linear-gradient(to right, rgba(255,255,255,0.8) 0 1px, transparent 1px 40px)',
                'repeating-linear-gradient(to right, rgba(255,255,255,0.4) 0 1px, transparent 1px 8px)',
              ].join(', '),
              backgroundSize: '40px 12px, 8px 6px',
              backgroundPosition: '0 0, 0 0',
              backgroundRepeat: 'repeat-x',
            }}
          />
          {/* Bottom edge */}
          <div
            className="absolute right-0 bottom-0 left-0 h-3 opacity-[0.12]"
            style={{
              backgroundImage: [
                'repeating-linear-gradient(to right, rgba(255,255,255,0.8) 0 1px, transparent 1px 40px)',
                'repeating-linear-gradient(to right, rgba(255,255,255,0.4) 0 1px, transparent 1px 8px)',
              ].join(', '),
              backgroundSize: '40px 12px, 8px 6px',
              backgroundPosition: '0 bottom, 0 bottom',
              backgroundRepeat: 'repeat-x',
            }}
          />
          {/* Left edge */}
          <div
            className="absolute top-0 bottom-0 left-0 w-3 opacity-[0.12]"
            style={{
              backgroundImage: [
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.8) 0 1px, transparent 1px 40px)',
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.4) 0 1px, transparent 1px 8px)',
              ].join(', '),
              backgroundSize: '12px 40px, 6px 8px',
              backgroundPosition: '0 0, 0 0',
              backgroundRepeat: 'repeat-y',
            }}
          />
          {/* Right edge */}
          <div
            className="absolute top-0 right-0 bottom-0 w-3 opacity-[0.12]"
            style={{
              backgroundImage: [
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.8) 0 1px, transparent 1px 40px)',
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.4) 0 1px, transparent 1px 8px)',
              ].join(', '),
              backgroundSize: '12px 40px, 6px 8px',
              backgroundPosition: 'right 0, right 0',
              backgroundRepeat: 'repeat-y',
            }}
          />

          {/* Layer 3: Corner L-brackets */}
          {CORNER_BRACKETS.map(([top, left, rotation], i) => (
            <svg
              key={i}
              className="absolute opacity-[0.2]"
              style={{ top, left, transform: `rotate(${rotation}deg)` }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M0 0 L0 24 M0 0 L24 0" stroke="rgba(255,255,255,1)" strokeWidth="1.5" />
            </svg>
          ))}

          {/* Layer 4: Center crosshair — dashed lines + ring */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
            <div
              className="absolute h-px w-full"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, rgba(255,255,255,0.8) 0 4px, transparent 4px 10px)',
              }}
            />
            <div
              className="absolute h-full w-px"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(255,255,255,0.8) 0 4px, transparent 4px 10px)',
              }}
            />
            <div className="h-6 w-6 rounded-full border border-white/80" />
          </div>

          {/* Layer 5: Radial glow mask — protect center readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 55% at 50% 50%, transparent 0%, #151517 80%)',
              opacity: 0.75,
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-16 text-center md:py-20">
          <h2
            className="max-w-[600px] text-4xl font-bold tracking-[-0.03em] text-text-primary md:text-5xl"
            ref={headingRef}
            style={headingStyles}
          >
            Start governing in 10 minutes
          </h2>

          <p
            className="max-w-[500px] text-xl text-text-secondary"
            ref={descRef}
            style={descStyles}
          >
            Launch with self-hosted docs or review the managed option. Open-source. Self-hosted. Fully yours.
          </p>

          <div
            className="flex flex-col items-center gap-4 sm:flex-row"
            ref={buttonsRef}
            style={buttonsStyles}
          >
            <Button
              variant="primary"
              size="lg"
              arrow
              href="https://docs.degov.ai/integration/deploy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Self-Host Guide
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/pricing"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
