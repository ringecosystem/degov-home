'use client';

import { useState } from 'react';

import { Accordion, generateFaqJsonLd } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import FooterSection from '@/sections/home/footer/FooterSection';

const timelineSteps = [
  {
    time: 'Day 1',
    title: 'Onboarding',
    description:
      'Your instance is live with hosted infrastructure and routine maintenance at no cost.',
    highlight: 'Cost: $0'
  },
  {
    time: 'Month 6',
    title: 'Choose: Self-Host or Managed',
    description:
      'Continue with managed hosting ($200/mo), or migrate to your own infrastructure for free. No lock-in.'
  },
  {
    time: 'Ongoing',
    title: 'Keep Shipping',
    description:
      'Stay on managed hosting if you want us to operate the infrastructure, or self-host on your own release schedule.'
  }
];

const selfHostedFeatures = [
  'Proposal tracking, voting, and delegation UI',
  'OpenZeppelin Governor compatible',
  'Full source code access',
  'MIT License',
  'Community support (GitHub Issues)',
  'Multi-chain support'
];

const selfHostedResponsibilities = [
  'Server costs & deployment',
  'Security patches',
  'Manual updates from GitHub'
];

const managedFeatures = [
  'Everything in Self-Hosted, plus:',
  'Hosted infrastructure operated by our team',
  'Routine updates applied to the managed service',
  'SSL certificates & CDN setup',
  'Infrastructure monitoring',
  'Operational maintenance',
  'Support for managed-environment issues'
];

const includedCards = [
  {
    title: 'Infrastructure Management',
    description:
      'We run the managed deployment, SSL certificates, and routine scaling work so your team does not need to handle DevOps.'
  },
  {
    title: 'Managed Updates',
    description:
      'We deploy routine platform updates to the managed service. Self-hosted teams can pull the same code from GitHub on their own schedule.'
  },
  {
    title: 'Security',
    description:
      'We maintain the hosted environment and apply routine patches to the managed deployment.'
  },
  {
    title: 'Managed Service Support',
    description:
      'We help with onboarding, deployment questions, and issues inside the managed environment.'
  }
];

const pricingFaqs = [
  {
    question: 'What happens during the 6-month onboarding period?',
    answer:
      'Your DeGov instance is hosted by our team at no cost for 6 months. We handle deployment and routine maintenance so your DAO can launch quickly.'
  },
  {
    question: 'What happens after the 6 months?',
    answer:
      'You choose: continue with our managed hosting at $200/mo (or $2,000/yr), or migrate to self-hosting at no cost. DeGov is fully open-source, so you\'re never locked in.'
  },
  {
    question: 'What does self-hosting require?',
    answer:
      'Self-hosting is free, but your team is responsible for server costs, deployment, security patches, and manual updates from the DeGov GitHub repository.'
  },
  {
    question: 'What is included in managed hosting and support?',
    answer:
      'Managed hosting covers the deployed infrastructure, routine updates we apply to the hosted service, and support for issues in the managed environment. Self-hosted teams use the same open-source codebase, but run updates and operations themselves.'
  },
  {
    question: 'What are the managed hosting plans?',
    answer:
      'You can choose monthly billing at $200/month or yearly billing at $2,000/year, which saves $400 per year compared with the monthly plan.'
  }
];

const pricingFaqJsonLd = generateFaqJsonLd(pricingFaqs);

export default function PricingClient() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <main className="flex w-full flex-col text-white">
      <PricingHero />
      <PricingTimeline />
      <PricingCards billing={billing} onBillingChange={setBilling} />
      <WhatsIncluded />
      <PricingFaq />
      <PricingCta />
      <FooterSection />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: pricingFaqJsonLd }}
      />
    </main>
  );
}

function PricingHero() {
  const { ref, animatedStyles } = useScrollAnimation({ delay: 0.1 });

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container flex flex-col items-center text-center" ref={ref} style={animatedStyles}>
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-6xl">
          Start Free. Scale When Ready.
        </h1>
        <p className="mt-6 max-w-[560px] text-lg text-text-secondary md:text-xl">
          Every DeGov instance starts with 6 months of free managed hosting. After that, self-host
          for free or keep us operating the infrastructure for you.
        </p>
      </div>
    </section>
  );
}

function PricingTimeline() {
  const { ref, animatedStyles } = useScrollAnimation({ delay: 0.15 });

  return (
    <SectionWrapper paddings="py-16 md:py-24">
      <div ref={ref} style={animatedStyles}>
        <div className="hidden lg:block">
          <div className="relative flex items-start justify-between">
            <div className="absolute top-2 right-0 left-0 h-0.5 bg-white/[0.12]" />

            {timelineSteps.map((step, i) => (
              <div key={i} className="relative flex w-1/3 flex-col items-center px-4">
                <div className={cn(
                  'relative z-10 h-4 w-4 rounded-full',
                  i === 0 ? 'bg-brand-blue shadow-[0_0_12px_rgba(255,255,255,0.15)]' : 'bg-bg-elevated'
                )} />
                <span className="mt-3 text-sm font-semibold text-white">{step.time}</span>
                <h3 className="mt-2 text-center text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-center text-sm text-text-secondary">
                  {step.description}
                </p>
                {step.highlight && (
                  <span className="mt-2 text-sm font-semibold text-success">
                    {step.highlight}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          <div className="relative flex flex-col gap-8 pl-8">
            <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-white/[0.12]" />

            {timelineSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className={cn(
                  'absolute -left-8 top-1 h-4 w-4 rounded-full',
                  i === 0 ? 'bg-brand-blue shadow-[0_0_12px_rgba(255,255,255,0.15)]' : 'bg-bg-elevated'
                )} />
                <span className="text-sm font-semibold text-white">{step.time}</span>
                <h3 className="mt-1 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{step.description}</p>
                {step.highlight && (
                  <span className="mt-1 inline-block text-sm font-semibold text-success">
                    {step.highlight}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function PricingCards({
  billing,
  onBillingChange
}: {
  billing: 'monthly' | 'yearly';
  onBillingChange: (b: 'monthly' | 'yearly') => void;
}) {
  const { ref, animatedStyles } = useScrollAnimation({ delay: 0.15 });
  const managedPrice = billing === 'yearly' ? '$2,000' : '$200';
  const managedPeriod = billing === 'yearly' ? '/yr' : '/mo';

  return (
    <SectionWrapper paddings="py-16 md:py-24">
      <div className="flex flex-col items-center" ref={ref} style={animatedStyles}>
        <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">After your 6-month free period</h2>

        <div className="mt-8 inline-flex items-center gap-1 rounded-full bg-bg-card p-1">
          <button
            type="button"
            onClick={() => onBillingChange('monthly')}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-all',
              billing === 'monthly'
                ? 'bg-white text-black'
                : 'text-text-secondary hover:text-white'
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => onBillingChange('yearly')}
            className={cn(
              'flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all',
              billing === 'yearly'
                ? 'bg-white text-black'
                : 'text-text-secondary hover:text-white'
            )}
          >
            Yearly
            <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs text-success">
              Save 17%
            </span>
          </button>
        </div>

        <div className="mt-12 grid w-full max-w-[900px] grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col rounded-2xl border border-white/[0.06] bg-bg-card p-8 md:p-10">
            <h3 className="text-xl font-semibold text-text-primary">Self-Hosted</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold text-text-primary">$0</span>
              <span className="ml-2 text-text-secondary">forever</span>
            </div>

            <div className="mt-6 border-t border-white/[0.06] pt-6">
              <ul className="flex flex-col gap-3">
                {selfHostedFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 text-success">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-white/[0.06] pt-6">
              <p className="text-xs font-medium text-text-secondary">You handle:</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {selfHostedResponsibilities.map((r) => (
                  <li key={r} className="text-xs text-text-secondary">
                    &middot; {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-8">
              <Button
                variant="secondary"
                href="https://github.com/ringecosystem/degov"
                target="_blank"
                rel="noopener noreferrer"
                arrow
                className="w-full"
              >
                View on GitHub
              </Button>
            </div>
          </div>

          <div className="relative flex flex-col rounded-2xl border border-white/20 bg-bg-card p-8 shadow-[0_0_20px_rgba(255,255,255,0.04)] md:p-10">
            <span className="absolute -top-3 right-6 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
              RECOMMENDED
            </span>

            <h3 className="text-xl font-semibold text-text-primary">Managed Hosting</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold text-text-primary">{managedPrice}</span>
              <span className="ml-2 text-text-secondary">{managedPeriod}</span>
            </div>
            {billing === 'monthly' && (
              <p className="mt-1 text-xs text-text-tertiary">
                or $2,000/yr (save 17%)
              </p>
            )}

            <div className="mt-6 border-t border-white/[0.06] pt-6">
              <ul className="flex flex-col gap-3">
                {managedFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 text-success">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-8">
              <Button
                variant="primary"
                href="https://docs.degov.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                Read the Docs
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-[600px] rounded-xl bg-bg-card p-4 text-center text-sm text-text-secondary">
          Both options run the same open-source codebase. The difference is who operates the
          infrastructure and when updates are applied.
        </div>
      </div>
    </SectionWrapper>
  );
}

function WhatsIncluded() {
  const { ref, animatedStyles } = useScrollAnimation({ delay: 0.1 });

  return (
    <SectionWrapper paddings="py-16 md:py-24">
      <div ref={ref} style={animatedStyles}>
        <h2 className="text-center text-2xl font-semibold text-text-primary md:text-3xl">
          What $200/mo Gets You
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {includedCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-bg-card p-6 transition-all duration-300 hover:border-white/[0.12] hover:shadow-lg"
            >
              <h3 className="text-base font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm text-text-secondary">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function PricingFaq() {
  const { ref, animatedStyles } = useScrollAnimation({ delay: 0.1 });

  return (
    <SectionWrapper paddings="py-16 md:py-24">
      <div className="flex flex-col items-center" ref={ref} style={animatedStyles}>
        <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">Pricing FAQ</h2>
        <div className="mt-12 w-full max-w-[800px]">
          <Accordion items={pricingFaqs} defaultOpenIndex={0} />
        </div>
      </div>
    </SectionWrapper>
  );
}

function PricingCta() {
  const { ref, animatedStyles } = useScrollAnimation({ delay: 0.1 });

  return (
    <SectionWrapper paddings="py-16 md:py-24">
      <div ref={ref} style={animatedStyles}>
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-[0.04] blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center md:py-24">
            <h2 className="max-w-[500px] text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
              Get your instance — free for 6 months
            </h2>
            <p className="max-w-[440px] text-base text-text-secondary">
              Start with the docs, then choose whether your team or ours operates the deployment.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button
                variant="primary"
                href="https://docs.degov.ai/integration/deploy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Self-Host Guide
              </Button>
              <Button
                variant="secondary"
                href="https://github.com/ringecosystem/degov"
                target="_blank"
                rel="noopener noreferrer"
                arrow
              >
                View GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
