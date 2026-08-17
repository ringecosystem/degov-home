'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

import { SiteHeader } from '@/components/layout/site-header';
import { MotionButtonContent } from '@/components/layout/motion-button-content';
import { SiteFooter } from '@/components/layout/site-footer';

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
    question: 'Is Atlas included in DeGov pricing?',
    answer:
      'No. This page applies to DeGov hosting. Atlas data access and integration work are scoped separately to real product requirements.'
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

function readSavedBilling(): BillingPeriod | null {
  try {
    const savedBilling = window.localStorage.getItem('degov-pricing-billing');
    return savedBilling === 'monthly' || savedBilling === 'yearly' ? savedBilling : null;
  } catch {
    return null;
  }
}

function persistBilling(billing: BillingPeriod) {
  try {
    window.localStorage.setItem('degov-pricing-billing', billing);
  } catch {
    // Storage can be unavailable; the in-memory billing interaction must still work.
  }
}

export default function PricingClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const [displayBilling, setDisplayBilling] = useState<BillingPeriod>('monthly');
  const [isChanging, setIsChanging] = useState(false);

  useGSAP(
    (context, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;

      const select = <T extends Element>(selector: string) => gsap.utils.toArray<T>(selector, root);
      const timelineItems = select<HTMLElement>('.time');
      const plans = select<HTMLElement>('.plan');
      const media = gsap.matchMedia();

      media.add(
        {
          isDesktop: '(min-width: 821px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
          allowHover: '(hover: hover) and (pointer: fine)'
        },
        (mediaContext) => {
          const isDesktop = Boolean(mediaContext.conditions?.isDesktop);
          const reduceMotion = Boolean(mediaContext.conditions?.reduceMotion);
          const allowHover = Boolean(mediaContext.conditions?.allowHover);
          const motionDistance = isDesktop ? 58 : 24;
          let cancelled = false;
          let refreshFrame = 0;

          const refreshTriggers = () => {
            if (!cancelled) ScrollTrigger.refresh();
          };

          refreshFrame = window.requestAnimationFrame(refreshTriggers);
          void document.fonts?.ready.then(refreshTriggers);

          if (reduceMotion) {
            return () => {
              cancelled = true;
              window.cancelAnimationFrame(refreshFrame);
            };
          }

          gsap
            .timeline({
              defaults: { ease: 'power4.out' },
              onComplete: () =>
                gsap.set('.pricing-site .hero h1, .pricing-site .hero-copy > *', {
                  clearProps: 'willChange,clipPath,opacity,visibility,transform'
                })
            })
            .set('.pricing-site .hero h1, .pricing-site .hero-copy > *', {
              willChange: 'transform,clip-path,opacity'
            })
            .fromTo(
              '.pricing-site .hero h1',
              { autoAlpha: 0, yPercent: 22, clipPath: 'inset(0 0 100% 0)' },
              {
                autoAlpha: 1,
                yPercent: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.82
              }
            )
            .fromTo(
              '.pricing-site .hero-copy > *',
              { autoAlpha: 0, x: motionDistance * 0.6, clipPath: 'inset(0 0 0 100%)' },
              {
                autoAlpha: 1,
                x: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.66,
                stagger: 0.09
              },
              '-=0.52'
            );

          gsap.fromTo(
            "[data-od-id='pricing-timeline'] .section-heading > *",
            { autoAlpha: 0, y: 28, clipPath: 'inset(0 0 100% 0)' },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.74,
              stagger: 0.1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: "[data-od-id='pricing-timeline']",
                start: 'top 76%',
                once: true
              }
            }
          );
          timelineItems.forEach((target, index) => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: target,
                  start: 'top 84%',
                  once: true
                },
                defaults: { ease: 'power4.out' }
              })
              .fromTo(
                target,
                {
                  autoAlpha: 0.18,
                  y: motionDistance * 0.5,
                  clipPath: 'inset(100% 0 0 0)'
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  clipPath: 'inset(0% 0 0 0)',
                  duration: 0.72
                }
              )
              .fromTo(
                target.children,
                { autoAlpha: 0, y: 14 },
                { autoAlpha: 1, y: 0, duration: 0.46, stagger: 0.07 },
                '-=0.42'
              );
            gsap.set(target, { zIndex: timelineItems.length - index });
          });

          gsap.fromTo(
            '.billing-head > *',
            {
              autoAlpha: 0,
              x: (index) => (index === 0 ? -motionDistance : motionDistance),
              clipPath: (index) =>
                index === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
            },
            {
              autoAlpha: 1,
              x: 0,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.82,
              stagger: 0.08,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: '.section-operational',
                start: 'top 74%',
                once: true
              }
            }
          );

          const planContents = plans.flatMap((plan) => Array.from(plan.children));
          const splitTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.pricing-site .plans',
              start: 'top 88%',
              once: true,
              onToggle: (self) => {
                gsap.set([self.trigger, ...plans], {
                  willChange: self.isActive ? 'transform,clip-path,opacity' : 'auto'
                });
              }
            }
          });
          splitTimeline
            .fromTo(
              '.pricing-site .plans',
              {
                clipPath: isDesktop
                  ? 'inset(10% 49.8% 10% 49.8%)'
                  : 'inset(0 0 100% 0)'
              },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.84,
                ease: 'power4.out'
              }
            )
            .fromTo(
              plans,
              {
                autoAlpha: 0.4,
                xPercent: (index) => (isDesktop ? (index === 0 ? 10 : -10) : 0),
                yPercent: (index) => (!isDesktop ? 6 + index * 2 : 0),
                rotationY: (index) => (isDesktop ? (index === 0 ? 6 : -6) : 0)
              },
              {
                autoAlpha: 1,
                xPercent: 0,
                yPercent: 0,
                rotationY: 0,
                duration: 0.76,
                ease: 'power4.out'
              },
              0
            )
            .fromTo(
              planContents,
              { autoAlpha: 0, y: 22 },
              { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.025, ease: 'power3.out' },
              0.42
            );

          gsap.fromTo(
            "[data-od-id='responsibility-comparison'] .section-heading > *",
            { autoAlpha: 0, y: 26, clipPath: 'inset(0 0 100% 0)' },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.7,
              stagger: 0.1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: "[data-od-id='responsibility-comparison']",
                start: 'top 76%',
                once: true
              }
            }
          );
          select<HTMLElement>('.comparison tbody tr').forEach((row, index) => {
            gsap.fromTo(
              row,
              {
                autoAlpha: 0.24,
                x: index % 2 === 0 ? -motionDistance * 0.5 : motionDistance * 0.5,
                clipPath: index % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
              },
              {
                autoAlpha: 1,
                x: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.68,
                ease: 'power4.out',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 90%',
                  once: true
                }
              }
            );
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: "[data-od-id='pricing-ownership']",
                start: 'top 76%',
                once: true
              },
              defaults: { ease: 'power4.out' }
            })
            .fromTo(
              '.ownership-statement span',
              {
                autoAlpha: 0,
                x: (index) => (index === 0 ? -motionDistance : motionDistance),
                clipPath: (index) =>
                  index === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
              },
              {
                autoAlpha: 1,
                x: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.8,
                stagger: 0.1
              }
            )
            .fromTo(
              '.ownership-copy > p',
              { autoAlpha: 0, y: 22, clipPath: 'inset(0 0 100% 0)' },
              { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.62, stagger: 0.1 },
              '-=0.4'
            );

          gsap
            .timeline({
              scrollTrigger: {
                trigger: "[data-od-id='pricing-faq']",
                start: 'top 76%',
                once: true
              },
              defaults: { ease: 'power4.out' }
            })
            .fromTo(
              "[data-od-id='pricing-faq'] .section-heading > *",
              { autoAlpha: 0, y: 26, clipPath: 'inset(0 0 100% 0)' },
              { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.7, stagger: 0.1 }
            )
            .fromTo(
              '.pricing-site .faq details',
              { autoAlpha: 0.18, x: motionDistance * 0.5, clipPath: 'inset(0 0 0 100%)' },
              {
                autoAlpha: 1,
                x: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.66,
                stagger: 0.07
              },
              '-=0.34'
            );

          gsap.fromTo(
            '.pricing-closing__art',
            { scale: 1.18, clipPath: 'circle(10% at 25% 62%)' },
            {
              scale: 1,
              clipPath: 'circle(86% at 38% 54%)',
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.pricing-site .closing',
                start: 'top 92%',
                once: true
              }
            }
          );
          gsap.fromTo(
            '.pricing-site .closing .container > *',
            { autoAlpha: 0, y: 34, clipPath: 'inset(0 0 100% 0)' },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.76,
              stagger: 0.1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: '.pricing-site .closing',
                start: 'top 70%',
                once: true
              }
            }
          );
          gsap.fromTo(
            '.pricing-site .arc-footer__brand, .pricing-site .arc-footer__links > div',
            { autoAlpha: 0, y: 18, clipPath: 'inset(0 0 100% 0)' },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.62,
              stagger: 0.08,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: '.pricing-site .arc-footer',
                start: 'top 94%',
                once: true
              }
            }
          );

          const cleanupHover: Array<() => void> = [];

          if (allowHover) {
            const motionButtons = select<HTMLElement>('.motion-btn');
            const motionIcons = motionButtons.flatMap((button) =>
              Array.from(button.querySelectorAll<HTMLElement>('.btn-icon'))
            );
            const motionFills = motionButtons.flatMap((button) =>
              Array.from(button.querySelectorAll<HTMLElement>('.btn-fill'))
            );
            // Take ownership of the initial offset. Otherwise GSAP reads the
            // CSS percentage transform as a pixel translate and the fill never
            // reaches the visible state on first hover.
            gsap.set(motionFills, { x: 0, xPercent: -101 });
            gsap.set(motionIcons, { x: 15, autoAlpha: 0 });

            const enterMotionButton = (event: PointerEvent) => {
              const button = event.currentTarget as HTMLElement;
              const fill = button.querySelector<HTMLElement>('.btn-fill');
              const label = button.querySelector<HTMLElement>('.btn-label');
              const icon = button.querySelector<HTMLElement>('.btn-icon');
              if (!fill || !label || !icon) return;

              const fillText = getComputedStyle(button).getPropertyValue('--button-fill-text').trim();
              const labelShift = -12;
              const iconGap = 12;
              const labelRect = label.getBoundingClientRect();
              const iconRect = icon.getBoundingClientRect();
              const currentIconX = Number(gsap.getProperty(icon, 'x')) || 0;
              const iconBaseLeft = iconRect.left - currentIconX;
              const iconTargetX = labelRect.right + labelShift + iconGap - iconBaseLeft;
              gsap.set([fill, label, icon], { willChange: 'transform,opacity,color' });
              gsap.to(fill, { xPercent: 0, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' });
              gsap.to(label, {
                x: labelShift,
                color: fillText,
                duration: 0.36,
                ease: 'power2.out',
                overwrite: 'auto'
              });
              gsap.to(icon, {
                x: iconTargetX,
                autoAlpha: 1,
                color: fillText,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            };
            const leaveMotionButton = (event: PointerEvent) => {
              const button = event.currentTarget as HTMLElement;
              const fill = button.querySelector<HTMLElement>('.btn-fill');
              const label = button.querySelector<HTMLElement>('.btn-label');
              const icon = button.querySelector<HTMLElement>('.btn-icon');
              if (!fill || !label || !icon) return;

              gsap.to(fill, {
                xPercent: 101,
                duration: 0.5,
                ease: 'power2.inOut',
                overwrite: 'auto',
                onComplete: () => gsap.set(fill, { x: 0, xPercent: -101, willChange: 'auto' })
              });
              gsap.to(label, {
                x: 0,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
                onComplete: () => gsap.set(label, { clearProps: 'color,willChange' })
              });
              gsap.to(icon, {
                x: 15,
                autoAlpha: 0,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
                onComplete: () => gsap.set(icon, { clearProps: 'color,willChange' })
              });
            };
            const onMotionEnter = contextSafe ? contextSafe(enterMotionButton) : enterMotionButton;
            const onMotionLeave = contextSafe ? contextSafe(leaveMotionButton) : leaveMotionButton;

            motionButtons.forEach((button) => {
              button.addEventListener('pointerenter', onMotionEnter);
              button.addEventListener('pointerleave', onMotionLeave);
            });
            cleanupHover.push(() => {
              gsap.killTweensOf([motionButtons, motionIcons]);
              motionButtons.forEach((button) => {
                button.removeEventListener('pointerenter', onMotionEnter);
                button.removeEventListener('pointerleave', onMotionLeave);
              });
            });
          }

          return () => {
            cancelled = true;
            window.cancelAnimationFrame(refreshFrame);
            cleanupHover.forEach((cleanup) => cleanup());
          };
        }
      );

      return () => media.revert();
    },
    { scope: rootRef }
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedBilling = readSavedBilling();
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
    persistBilling(nextBilling);
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
              <h1>Start managed. Stay in control</h1>
            </div>
            <div className="hero-copy">
              <p className="lead">
                Run the open-source degov stack yourself, or let our team deploy and maintain it.
                Managed hosting starts with six months at no cost
              </p>
              <p className="hero-playground" data-od-id="pricing-playground-entry">
                New to DeGov?{' '}
                <a data-od-id="pricing-playground-link" href="https://playground.degov.ai/">
                  Try the Playground on Base.
                </a>
              </p>
              <a
                className="btn btn-primary motion-btn"
                data-od-id="pricing-primary-cta"
                href="mailto:support@degov.ai?subject=DeGov%20managed%20hosting"
              >
                <MotionButtonContent label="Request managed hosting" />
              </a>
            </div>
          </div>
        </section>

        <section className="section" data-od-id="pricing-timeline" data-ledger="01 / LAUNCH">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Managed hosting timeline</p>
              <h2 className="h2">Launch now. Choose later</h2>
            </div>
            <div className="timeline">
              <article className="time" data-od-id="timeline-day-one">
                <div className="time-num">01 · Day one</div>
                <h3>Launch managed</h3>
                <p>DeGov deploys your governance interface and production infrastructure</p>
              </article>
              <article className="time" data-od-id="timeline-month-six">
                <div className="time-num">02 · Months 1–6</div>
                <h3>Pay $0</h3>
                <p>Establish your governance workflow without a hosting charge</p>
              </article>
              <article className="time" data-od-id="timeline-ongoing">
                <div className="time-num">03 · Ongoing</div>
                <h3>Stay or self-host</h3>
                <p>
                  Continue managed service or migrate. The open-source code remains available to run
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
                <h2 className="h2">Same product. A different owner for the operational work</h2>
              </div>
              <div
                className="toggle"
                data-billing={billing}
                role="group"
                aria-label="Managed billing period"
              >
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
                <h3>Your infrastructure</h3>
                <div className="price-block">
                  <p className="price-kicker">Software cost</p>
                  <div className="price-line">
                    <span className="price-value">$0</span>
                  </div>
                  <p className="price-after">No recurring fee</p>
                </div>
                <p className="plan-summary">
                  Deploy and operate the open-source Square stack on infrastructure your team
                  controls
                </p>
                <ul>
                  <li>Same open-source DeGov code</li>
                  <li>Full infrastructure ownership</li>
                  <li>Your team handles deployment</li>
                  <li>Your team handles updates and monitoring</li>
                </ul>
                <a
                  className="btn btn-ghost btn-external motion-btn"
                  data-od-id="self-hosted-cta"
                  href="https://github.com/ringecosystem/degov"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MotionButtonContent label="Deploy yourself" />
                </a>
                <div className="operation-track" aria-label="Self-hosted operating sequence">
                  <span>Fork</span>
                  <span>Deploy</span>
                  <span>Operate</span>
                </div>
              </article>
              <article className="plan" data-od-id="managed-plan">
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
                    ? 'Save $400 (approximately 17%) with annual billing. DeGov operates the production instance'
                    : 'DeGov deploys, maintains, monitors, and updates your production instance'}
                </p>
                <ul>
                  <li>Infrastructure deployment and hosting</li>
                  <li>Ongoing software updates</li>
                  <li>SSL and CDN configuration</li>
                  <li>Monitoring and maintenance</li>
                  <li>Operational support</li>
                </ul>
                <div className="plan-action">
                  <p className="plan-note">We’ll confirm deployment requirements with your team</p>
                  <a
                    className="btn btn-primary motion-btn"
                    data-od-id="managed-cta"
                    href="mailto:support@degov.ai?subject=DeGov%20managed%20hosting"
                  >
                    <MotionButtonContent label="Request managed hosting" />
                  </a>
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
              <h2 className="h2">A clear division of work</h2>
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
                  <th scope="row" data-label="Responsibility">
                    <strong>Open-source governance UI</strong>
                  </th>
                  <td data-label="Self-hosted">Included</td>
                  <td data-label="Managed">Included</td>
                </tr>
                <tr>
                  <th scope="row" data-label="Responsibility">
                    <strong>Infrastructure and deployment</strong>
                  </th>
                  <td data-label="Self-hosted">Your team</td>
                  <td data-label="Managed">DeGov</td>
                </tr>
                <tr>
                  <th scope="row" data-label="Responsibility">
                    <strong>Updates and maintenance</strong>
                  </th>
                  <td data-label="Self-hosted">Your team</td>
                  <td data-label="Managed">DeGov</td>
                </tr>
                <tr>
                  <th scope="row" data-label="Responsibility">
                    <strong>SSL, CDN, and monitoring</strong>
                  </th>
                  <td data-label="Self-hosted">Your team</td>
                  <td data-label="Managed">DeGov</td>
                </tr>
                <tr>
                  <th scope="row" data-label="Responsibility">
                    <strong>Migration freedom</strong>
                  </th>
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
              <span>Open by design</span>
              <span>Managed when needed</span>
            </p>
            <div className="ownership-copy">
              <p>Self-hosted and managed deployments run the same open-source DeGov code</p>
              <p>
                Start with operational support, then stay managed or move to infrastructure your
                team controls
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="faq" data-od-id="pricing-faq" data-ledger="05 / CLARITY">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Pricing FAQ</p>
              <h2 className="h2">
                <span>Operational clarity</span>
                <span>before you commit</span>
              </h2>
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
          <div className="pricing-closing__art" aria-hidden="true" />
          <div className="container">
            <p className="eyebrow">Run governance your way</p>
            <h2 className="h2">Launch without locking in</h2>
            <p>
              Begin with six months of managed hosting at no cost. Keep the service or take
              operations in-house
            </p>
            <a
              className="btn btn-primary motion-btn"
              data-od-id="pricing-closing-cta"
              href="mailto:support@degov.ai?subject=DeGov%20managed%20hosting"
            >
              <MotionButtonContent label="Talk to DeGov" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter variant="pricing" />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: pricingFaqJsonLd }}
      />
    </div>
  );
}
