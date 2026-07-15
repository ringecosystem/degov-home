'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { SiteHeader } from '@/components/layout/site-header';

type BillingPeriod = 'monthly' | 'yearly';

const pricingFaqs = [
  {
    odId: 'faq-free-period',
    question: 'What happens after the first six months?',
    answer:
      'You can continue managed hosting for $200 per month or $2,000 per year, or move to self-hosting. There is no software lock-in.'
  },
  {
    odId: 'faq-code-difference',
    question: 'Is managed hosting different software?',
    answer:
      'No. Both models run the same open-source DeGov code. The difference is who owns deployment, infrastructure, updates, monitoring, and maintenance.'
  },
  {
    odId: 'faq-annual',
    question: 'What does annual billing save?',
    answer:
      'Annual managed hosting costs $2,000 per year, saving $400—approximately 17%—compared with twelve monthly payments.'
  },
  {
    odId: 'faq-atlas',
    question: 'Is Atlas included in Square pricing?',
    answer:
      'No. This page applies to Square hosting. Atlas data access and integration work are scoped separately to real product requirements.'
  }
];

const pricingFaqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pricingFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export default function PricingClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const [displayBilling, setDisplayBilling] = useState<BillingPeriod>('monthly');
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const timelineItems = root.querySelectorAll<HTMLElement>('.time');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      timelineItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    timelineItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedBilling = window.localStorage.getItem('degov-pricing-billing');
      if (savedBilling === 'yearly') {
        setBilling('yearly');
        setDisplayBilling('yearly');
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(
    () => () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    },
    []
  );

  const changeBilling = (nextBilling: BillingPeriod) => {
    if (nextBilling === billing) return;

    setBilling(nextBilling);
    setIsChanging(true);
    window.localStorage.setItem('degov-pricing-billing', nextBilling);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setDisplayBilling(nextBilling);
      setIsChanging(false);
    }, 120);
  };

  const yearly = displayBilling === 'yearly';
  const transitionClass = isChanging ? 'billing-value is-changing' : 'billing-value';

  return (
    <div className="degov-site pricing-site" ref={rootRef}>
      <SiteHeader variant="pricing" />

      <main id="site-content">
        <section className="hero" data-od-id="pricing-hero">
          <div className="hero-grid container">
            <div>
              <p className="eyebrow">Square pricing · no lock-in</p>
              <h1>Start managed. Stay in control.</h1>
            </div>
            <div className="hero-copy">
              <p className="lead">
                Run the open-source Square stack yourself, or let DeGov deploy and maintain it.
                Managed hosting starts with six months at no cost.
              </p>
              <a
                className="btn btn-primary"
                data-od-id="pricing-primary-cta"
                href="mailto:contact@degov.ai?subject=DeGov%20managed%20hosting"
              >
                Request managed hosting
              </a>
              <p className="hero-note">
                Same code · two operating models · migrate when you choose
              </p>
            </div>
          </div>
        </section>

        <section className="section" data-od-id="pricing-timeline" data-ledger="01 / LAUNCH">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Managed hosting timeline</p>
              <h2 className="h2">Launch first. Choose your long-term model later.</h2>
            </div>
            <div className="timeline">
              <article className="time" data-od-id="timeline-day-one">
                <div className="time-num">01 · Day one</div>
                <h3>Launch managed</h3>
                <p>DeGov deploys your governance interface and production infrastructure.</p>
              </article>
              <article className="time" data-od-id="timeline-month-six">
                <div className="time-num">02 · Months 1–6</div>
                <h3>Pay $0</h3>
                <p>Establish your governance workflow without a hosting charge.</p>
              </article>
              <article className="time" data-od-id="timeline-ongoing">
                <div className="time-num">03 · Ongoing</div>
                <h3>Stay or self-host</h3>
                <p>
                  Continue managed service or migrate. The open-source code remains available to
                  run.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="section section-operational"
          id="models"
          data-od-id="pricing-plans"
          data-ledger="02 / OPERATE"
        >
          <div className="container">
            <div className="billing-head">
              <div>
                <p className="eyebrow">Choose an operating model</p>
                <h2 className="h2">Same product. A different owner for the operational work.</h2>
              </div>
              <div className="toggle" role="group" aria-label="Managed billing period">
                <button
                  id="monthlyButton"
                  data-od-id="billing-monthly"
                  type="button"
                  aria-pressed={billing === 'monthly'}
                  onClick={() => changeBilling('monthly')}
                >
                  Monthly
                </button>
                <button
                  id="yearlyButton"
                  data-od-id="billing-yearly"
                  type="button"
                  aria-pressed={billing === 'yearly'}
                  onClick={() => changeBilling('yearly')}
                >
                  Yearly · save $400
                </button>
              </div>
            </div>
            <div className="plans">
              <article className="plan" data-od-id="self-hosted-plan">
                <p className="meta">Self-hosted</p>
                <h3>Your infrastructure</h3>
                <div className="price-block">
                  <p className="price-kicker">Software cost</p>
                  <div className="price-line">
                    <span className="price-value">$0</span>
                    <span className="price-period">forever</span>
                  </div>
                </div>
                <p className="plan-summary">
                  Deploy and operate the open-source Square stack on infrastructure your team
                  controls.
                </p>
                <ul>
                  <li>Same open-source DeGov code</li>
                  <li>Full infrastructure ownership</li>
                  <li>Your team handles deployment</li>
                  <li>Your team handles updates and monitoring</li>
                </ul>
                <a
                  className="btn btn-ghost btn-external"
                  data-od-id="self-hosted-cta"
                  href="https://github.com/ringecosystem/degov"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Deploy yourself
                </a>
                <div className="operation-track" aria-label="Self-hosted operating sequence">
                  <span>Fork</span>
                  <span>Deploy</span>
                  <span>Operate</span>
                </div>
              </article>
              <article className="plan" data-od-id="managed-plan">
                <p className="meta">Managed hosting</p>
                <h3>DeGov operated</h3>
                <div className="price-block" aria-live="polite" aria-atomic="true">
                  <p className="price-kicker">Your first six months</p>
                  <div className="price-line">
                    <span className="price-value">$0</span>
                  </div>
                  <p className="price-after">
                    Then <strong className={transitionClass}>{yearly ? '$2,000' : '$200'}</strong>{' '}
                    <span className={transitionClass}>{yearly ? '/ year' : '/ month'}</span>
                  </p>
                </div>
                <p className={`plan-summary ${transitionClass}`}>
                  {yearly
                    ? 'Save $400 (approximately 17%) with annual billing. DeGov operates the production instance.'
                    : 'DeGov deploys, maintains, monitors, and updates your production instance.'}
                </p>
                <ul>
                  <li>Infrastructure deployment and hosting</li>
                  <li>Ongoing software updates</li>
                  <li>SSL and CDN configuration</li>
                  <li>Monitoring and maintenance</li>
                  <li>Operational support</li>
                </ul>
                <div>
                  <a
                    className="btn btn-primary"
                    data-od-id="managed-cta"
                    href="mailto:contact@degov.ai?subject=DeGov%20managed%20hosting"
                  >
                    Request managed hosting
                  </a>
                  <p className="plan-note">We’ll confirm deployment requirements with your team.</p>
                </div>
                <div className="operation-track" aria-label="Managed operating sequence">
                  <span>Deploy</span>
                  <span>Maintain</span>
                  <span>Monitor</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="section"
          id="responsibilities"
          data-od-id="responsibility-comparison"
          data-ledger="03 / RESPONSIBILITY"
        >
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Responsibility ledger</p>
              <h2 className="h2">A clear division of work.</h2>
            </div>
            <table className="comparison">
              <thead>
                <tr>
                  <th>Responsibility</th>
                  <th>Self-hosted</th>
                  <th>Managed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Responsibility">
                    <strong>Open-source governance UI</strong>
                  </td>
                  <td data-label="Self-hosted">Included</td>
                  <td data-label="Managed">Included</td>
                </tr>
                <tr>
                  <td data-label="Responsibility">
                    <strong>Infrastructure and deployment</strong>
                  </td>
                  <td data-label="Self-hosted">Your team</td>
                  <td data-label="Managed">DeGov</td>
                </tr>
                <tr>
                  <td data-label="Responsibility">
                    <strong>Updates and maintenance</strong>
                  </td>
                  <td data-label="Self-hosted">Your team</td>
                  <td data-label="Managed">DeGov</td>
                </tr>
                <tr>
                  <td data-label="Responsibility">
                    <strong>SSL, CDN, and monitoring</strong>
                  </td>
                  <td data-label="Self-hosted">Your team</td>
                  <td data-label="Managed">DeGov</td>
                </tr>
                <tr>
                  <td data-label="Responsibility">
                    <strong>Migration freedom</strong>
                  </td>
                  <td data-label="Self-hosted">Full control</td>
                  <td data-label="Managed">Move to self-hosting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="section" data-od-id="pricing-ownership" data-ledger="04 / OWNERSHIP">
          <div className="ownership-grid container">
            <p className="ownership-statement">
              Open by design.
              <br />
              Managed when needed.
            </p>
            <div className="ownership-copy">
              <p>Self-hosted and managed deployments run the same open-source DeGov code.</p>
              <p>
                Start with operational support, then stay managed or move to infrastructure your
                team controls.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="faq" data-od-id="pricing-faq" data-ledger="05 / CLARITY">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Pricing FAQ</p>
              <h2 className="h2">Operational clarity before you commit.</h2>
            </div>
            <div className="faq">
              {pricingFaqs.map((faq) => (
                <details key={faq.question} data-od-id={faq.odId}>
                  <summary>{faq.question}</summary>
                  <div className="faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section closing" data-od-id="pricing-closing" data-ledger="06 / DECIDE">
          <div className="container">
            <p className="eyebrow">Run governance your way</p>
            <h2 className="h2">Launch without locking in.</h2>
            <p>
              Begin with six months of managed hosting at no cost. Keep the service or take
              operations in-house.
            </p>
            <a
              className="btn btn-primary"
              data-od-id="pricing-closing-cta"
              href="mailto:contact@degov.ai?subject=DeGov%20managed%20hosting"
            >
              Talk to DeGov
            </a>
          </div>
        </section>
      </main>

      <footer className="footer" id="site-footer" data-od-id="pricing-footer">
        <div className="footer-inner container">
          <Link
            className="brand"
            data-od-id="pricing-footer-brand"
            href="/"
            aria-label="DeGov.AI home"
          >
            <Image
              className="brand-logo"
              src="/images/logo.svg"
              alt="DeGov.AI"
              width={136}
              height={30}
            />
          </Link>
          <span>Better governance for better communities.</span>
        </div>
      </footer>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: pricingFaqJsonLd }}
      />
    </div>
  );
}
