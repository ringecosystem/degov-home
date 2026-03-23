'use client';

import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Terminal } from '@/components/ui/terminal';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const terminalLines = [
  { type: 'command' as const, text: 'git clone https://github.com/ringecosystem/degov && cd degov' },
  { type: 'command' as const, text: 'cp .env.example .env && vim degov.yml' },
  { type: 'command' as const, text: 'docker-compose up -d' },
  { type: 'output' as const, text: '' },
  { type: 'success' as const, text: 'All services started. Open http://localhost:3000' },
];

export default function OpenSourceSection() {
  const { ref: textRef, animatedStyles: textStyles } = useScrollAnimation({ delay: 0.1 });
  const { ref: termRef, animatedStyles: termStyles } = useScrollAnimation({ delay: 0.25 });

  return (
    <SectionWrapper className="relative overflow-hidden bg-white/[0.02]">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: text */}
        <div className="flex w-full max-w-none flex-col" ref={textRef} style={textStyles}>
          <SectionLabel className="mb-4">Open Source</SectionLabel>
          <h2 className="text-4xl font-bold tracking-[-0.03em] text-text-primary lg:text-6xl">
            Fork it. Ship it. Own it.
          </h2>

          <p className="mt-6 text-xl text-text-secondary">
            Fully open-source. Clone, configure, and deploy your DAO&apos;s governance in minutes.
          </p>

          <div className="mt-8">
            <Button
              variant="primary"
              arrow
              href="https://github.com/ringecosystem/degov"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
          </div>
        </div>

        {/* Right: terminal */}
        <div className="w-full" ref={termRef} style={termStyles}>
          <Terminal lines={terminalLines} animated />
        </div>
      </div>
    </SectionWrapper>
  );
}
