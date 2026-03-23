'use client';

import Script from 'next/script';

import { Accordion, generateFaqJsonLd } from '@/components/ui/accordion';
import { SectionLabel } from '@/components/ui/section-label';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const faqs = [
  {
    question: 'What Governor contracts does DeGov support?',
    answer:
      'DeGov works natively with all OpenZeppelin Governor variants — Governor, GovernorTimelockControl, GovernorCountingSimple, GovernorVotes, and custom extensions. If your DAO uses OpenZeppelin Governor, it works out of the box. No contract modifications needed.'
  },
  {
    question: 'Can I run DeGov on my own infrastructure?',
    answer:
      'Yes. DeGov is designed for self-hosting. Clone the repo, configure your DAO, deploy anywhere — Vercel, AWS, your own server. You own the infrastructure and the data. We also offer a managed hosting plan if you prefer.'
  },
  {
    question: 'Which chains are supported?',
    answer:
      'All major EVM-compatible chains: Ethereum, Arbitrum, Optimism, Polygon, Base, and more. Adding a new chain is a configuration change, not a code change.'
  },
  {
    question: 'How does DeGov compare to Tally or Snapshot?',
    answer:
      'DeGov is an open-source Governor frontend, not a managed governance platform. It gives you a self-hostable UI for OpenZeppelin Governor contracts — you own the code, data, and infrastructure. It does not replace off-chain signaling tools like Snapshot or full-service platforms like Tally; it focuses on giving your DAO a dedicated, sovereign governance interface.'
  },
  {
    question: 'Is DeGov free?',
    answer:
      'DeGov is open-source and free to self-host forever. We also offer a managed hosting plan for teams that want us to operate the infrastructure. Every instance starts with 6 months free.'
  },
  {
    question: 'How customizable is the governance platform?',
    answer:
      'Fully. Branding, colors, logo, domain, supported chains, DAO selection — all configurable via environment variables and config files. The code is open-source, so you can modify anything to fit your needs.'
  }
];

const faqJsonLd = generateFaqJsonLd(faqs);

export default function FaqSection() {
  const { ref: headerRef, animatedStyles: headerStyles } = useScrollAnimation({ delay: 0.1 });
  const { ref: accordionRef, animatedStyles: accordionStyles } = useScrollAnimation({ delay: 0.2 });

  return (
    <SectionWrapper paddings="py-[110px] lg:py-[140px]" className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="w-full max-w-[860px]">
          <div className="mb-3 text-center">
            <SectionLabel>FAQ</SectionLabel>
          </div>
          <h2
            className="text-center text-4xl font-bold tracking-[-0.03em] text-text-primary lg:text-6xl"
            ref={headerRef}
            style={headerStyles}
          >
            Common Questions
          </h2>

          <div className="mt-12" ref={accordionRef} style={accordionStyles}>
            <Accordion items={faqs} defaultOpenIndex={0} />
          </div>
        </div>

        <Script
          id="faq-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      </div>
    </SectionWrapper>
  );
}
