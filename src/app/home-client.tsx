'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { SiteHeader } from '@/components/layout/site-header';
import { MotionButtonContent } from '@/components/layout/motion-button-content';
import { SiteFooter } from '@/components/layout/site-footer';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HERO_VISUAL = {
  poster: '/images/hero/degov-governance-temporal-field-f885cd9c.png',
  motion: '/images/hero/degov-governance-temporal-field-loop-hd.mp4',
  useMotion: true
} as const;

const AGENT_SKILLS_INSTALL_COMMAND = 'npx skills add ringecosystem/degov-agent-skills';

function AtlasMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`arc-atlas-mark ${className}`.trim()}
      viewBox="0 0 114 112"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M-2 78.925c19.193-19.8 38.386-29.701 57.579-29.701s38.386 9.9 57.579 29.7"
        transform="rotate(216 55.58 64.074)"
      />
      <path
        d="M5.451 52.254c19.193-14.667 38.386-22 57.579-22s34.866 4.768 47.02 14.304"
        transform="rotate(336 57.751 41.254)"
      />
      <path
        d="M22.615 54.013c9.306-9.624 23.555-14.435 42.748-14.435s38.386 8.333 57.579 25"
        transform="rotate(456 72.778 52.078)"
      />
      <circle cx="84.851" cy="23" r="7" transform="rotate(216 84.851 23)" fill="currentColor" stroke="none" />
      <circle cx="26.077" cy="51.556" r="7" transform="rotate(216 26.077 51.556)" fill="currentColor" stroke="none" />
      <circle cx="70.794" cy="85.281" r="7" transform="rotate(216 70.794 85.281)" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowMark() {
  return (
    <svg className="arc-arrow-mark" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9h11M10 4l5 5-5 5" />
    </svg>
  );
}

type JourneyMarkKind = 'atlas' | 'community' | 'square' | 'record';

function JourneyMark({ kind }: { kind: JourneyMarkKind }) {
  if (kind === 'atlas') {
    return <AtlasMark className="arc-journey__icon" />;
  }

  if (kind === 'community') {
    return (
      <svg className="arc-journey__icon" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <circle cx="28" cy="15" r="5" />
        <circle cx="13" cy="38" r="4" />
        <circle cx="43" cy="38" r="4" />
        <path d="M24.5 19 16 34M31.5 19 40 34M17 39h22" />
        <circle cx="28" cy="30" r="2" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (kind === 'square') {
    return (
      <svg className="arc-journey__icon" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <path d="M8 21V8h13M35 8h13v13M48 35v13H35M21 48H8V35" />
        <path d="M20 28h16M28 20v16" />
        <circle cx="28" cy="28" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg className="arc-journey__icon" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path d="M13 7h23l7 7v35H13zM36 7v8h7" />
      <path d="M20 24h16M20 31h16M20 38h11" />
      <circle cx="36" cy="38" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function HomeClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const copyResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  useEffect(
    () => () => {
      if (copyResetTimerRef.current) clearTimeout(copyResetTimerRef.current);
    },
    []
  );

  const copyAgentSkillsCommand = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(AGENT_SKILLS_INSTALL_COMMAND);
      } else {
        const copyField = document.createElement('textarea');
        copyField.value = AGENT_SKILLS_INSTALL_COMMAND;
        copyField.setAttribute('readonly', '');
        copyField.style.position = 'fixed';
        copyField.style.opacity = '0';
        document.body.append(copyField);
        copyField.select();
        const copied = document.execCommand('copy');
        copyField.remove();
        if (!copied) throw new Error('Copy command was unavailable');
      }

      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }

    if (copyResetTimerRef.current) clearTimeout(copyResetTimerRef.current);
    copyResetTimerRef.current = setTimeout(() => setCopyStatus('idle'), 2200);
  };

  useGSAP(
    (context, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;

      const select = <T extends Element>(selector: string) => gsap.utils.toArray<T>(selector, root);
      const proofSystems = select<HTMLElement>('.arc-proof__system');
      const signalSteps = select<HTMLElement>('.arc-community__step, .arc-agent__step');
      const heroPaths = select<HTMLElement>('.arc-path');
      const media = gsap.matchMedia();

      media.add(
        {
          isDesktop: '(min-width: 821px)',
          isMobile: '(max-width: 820px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
          allowHover: '(hover: hover) and (pointer: fine)'
        },
        (mediaContext) => {
          const isDesktop = Boolean(mediaContext.conditions?.isDesktop);
          const reduceMotion = Boolean(mediaContext.conditions?.reduceMotion);
          const allowHover = Boolean(mediaContext.conditions?.allowHover);
          const motionDistance = isDesktop ? 52 : 24;
          let cancelled = false;
          let refreshFrame = 0;

          const refreshTriggers = () => {
            if (!cancelled) ScrollTrigger.refresh();
          };

          refreshFrame = window.requestAnimationFrame(refreshTriggers);
          void document.fonts?.ready.then(refreshTriggers);

          if (reduceMotion) {
            [...proofSystems, ...signalSteps].forEach((target) =>
              target.classList.add('is-visible')
            );
            return () => {
              cancelled = true;
              window.cancelAnimationFrame(refreshFrame);
            };
          }

          const heroTitleLines = select<HTMLElement>('.arc-hero__title span');
          const heroSupportingCopy = select<HTMLElement>('.arc-hero__summary');
          const heroFocus = select<HTMLElement>('.arc-hero__focus');
          const heroArt = select<HTMLElement>('.arc-hero__art');
          const heroTimeline = gsap.timeline({
            defaults: { ease: 'power4.out' },
            onComplete: () =>
              gsap.set(
                [...heroTitleLines, ...heroSupportingCopy, ...heroFocus, ...heroPaths],
                { clearProps: 'willChange,clipPath,opacity,visibility,transform' }
              )
          });

          heroTimeline
            .set([...heroTitleLines, ...heroSupportingCopy, ...heroFocus, ...heroPaths], {
              willChange: 'transform,clip-path,opacity'
            })
            .addLabel('signal')
            .fromTo(
              heroTitleLines[0],
              { autoAlpha: 0, x: -motionDistance, clipPath: 'inset(0 100% 0 0)' },
              { autoAlpha: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.72 },
              'signal'
            )
            .fromTo(
              heroTitleLines[1],
              { autoAlpha: 0, x: motionDistance, clipPath: 'inset(0 0 0 100%)' },
              { autoAlpha: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.72 },
              'signal+=0.08'
            )
            .fromTo(
              heroSupportingCopy,
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.08 },
              'signal+=0.3'
            )
            .fromTo(
              heroFocus,
              { autoAlpha: 0, scale: 0.36, rotation: -24 },
              { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.68 },
              'signal+=0.24'
            )
            .addLabel('paths', 'signal+=0.48')
            .fromTo(
              '.arc-path--square',
              { autoAlpha: 0, x: -motionDistance, clipPath: 'inset(0 100% 0 0)' },
              { autoAlpha: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.64 },
              'paths'
            )
            .fromTo(
              '.arc-path--atlas',
              { autoAlpha: 0, x: motionDistance, clipPath: 'inset(0 0 0 100%)' },
              { autoAlpha: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.64 },
              'paths'
            );

          gsap.fromTo(
            heroArt,
            { scale: isDesktop ? 1.025 : 1.012 },
            { scale: 1, duration: 2.4, ease: 'power2.out' }
          );

          const productsHeader = select<HTMLElement>('.arc-products__header > *');
          const productRows = select<HTMLElement>('.arc-product-row');
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.arc-products',
                start: 'top 76%',
                once: true
              },
              defaults: { ease: 'power4.out' }
            })
            .fromTo(
              productsHeader,
              { autoAlpha: 0, y: 26, clipPath: 'inset(0 0 100% 0)' },
              { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.72, stagger: 0.1 }
            )
            .fromTo(
              productRows[0],
              {
                autoAlpha: 0.3,
                x: -motionDistance,
                clipPath: 'inset(0 100% 0 0)'
              },
              { autoAlpha: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.84 },
              '-=0.38'
            )
            .fromTo(
              productRows[1],
              {
                autoAlpha: 0.3,
                x: motionDistance,
                clipPath: 'inset(0 0 0 100%)'
              },
              { autoAlpha: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.84 },
              '-=0.62'
            )
            .fromTo(
              '.arc-product-row__signal i',
              { autoAlpha: 0, scaleX: 0, transformOrigin: 'left center' },
              { autoAlpha: 1, scaleX: 1, duration: 0.46, stagger: 0.05 },
              '-=0.42'
            );

          gsap.fromTo(
            '.arc-journey__intro > *',
            { autoAlpha: 0, x: -motionDistance * 0.7, clipPath: 'inset(0 100% 0 0)' },
            {
              autoAlpha: 1,
              x: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.76,
              stagger: 0.1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: '.arc-journey',
                start: 'top 74%',
                once: true
              }
            }
          );

          const journeySteps = select<HTMLElement>('.arc-journey__step');
          const journeyTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.arc-journey__track',
              start: 'top 80%',
              once: true
            },
            defaults: { ease: 'power4.out' }
          });
          journeySteps.forEach((step, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            journeyTimeline.fromTo(
              step,
              {
                autoAlpha: 0.24,
                x: direction * motionDistance * 0.6,
                clipPath:
                  direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
              },
              {
                autoAlpha: 1,
                x: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.72
              },
              index * 0.12
            );
          });

          gsap.fromTo(
            '.arc-lower__header > *',
            { autoAlpha: 0, y: 28, clipPath: 'inset(0 0 100% 0)' },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.76,
              stagger: 0.11,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: '.arc-proof',
                start: 'top 76%',
                once: true
              }
            }
          );

          proofSystems.forEach((target) => {
            const entersFromRight = target.classList.contains('arc-proof__system--atlas');
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: target,
                  start: 'top 78%',
                  once: true
                },
                defaults: { ease: 'power4.out' },
                onStart: () => target.classList.add('is-visible')
              })
              .fromTo(
                target,
                {
                  autoAlpha: 0.2,
                  x: entersFromRight ? motionDistance : -motionDistance,
                  clipPath: entersFromRight ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
                },
                {
                  autoAlpha: 1,
                  x: 0,
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 0.86
                }
              )
              .fromTo(
                target.querySelectorAll('.arc-proof__head > *, .arc-proof__screen > *'),
                { autoAlpha: 0, y: 18 },
                { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.055 },
                '-=0.54'
              );
          });

          gsap.fromTo(
            '.arc-community__intro > h2, .arc-community__intro > p',
            { autoAlpha: 0, x: -motionDistance, clipPath: 'inset(0 100% 0 0)' },
            {
              autoAlpha: 1,
              x: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.8,
              stagger: 0.12,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: '.arc-community',
                start: 'top 74%',
                once: true
              }
            }
          );
          gsap.fromTo(
            '.arc-community__orbit',
            { autoAlpha: 0.32, scale: 0.72, rotation: -42 },
            {
              autoAlpha: 1,
              scale: 1,
              rotation: isDesktop ? 72 : 28,
              duration: 1.1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: '.arc-community',
                start: 'top 88%',
                once: true
              }
            }
          );
          select<HTMLElement>('.arc-community__step').forEach((target, index) => {
            gsap.fromTo(
              target,
              {
                autoAlpha: 0.25,
                x: index % 2 === 0 ? motionDistance * 0.6 : -motionDistance * 0.6,
                clipPath: index % 2 === 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
              },
              {
                autoAlpha: 1,
                x: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.72,
                ease: 'power4.out',
                onStart: () => target.classList.add('is-visible'),
                scrollTrigger: {
                  trigger: target,
                  start: 'top 84%',
                  once: true
                }
              }
            );
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.arc-index',
                start: 'top 74%',
                once: true
              },
              defaults: { ease: 'power4.out' }
            })
            .fromTo(
              '.arc-index__header > *',
              { autoAlpha: 0, y: 26, clipPath: 'inset(0 0 100% 0)' },
              { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.72, stagger: 0.1 }
            )
            .fromTo(
              '.arc-index__metrics > div',
              { autoAlpha: 0.18, y: 48, clipPath: 'inset(100% 0 0 0)' },
              {
                autoAlpha: 1,
                y: 0,
                clipPath: 'inset(0% 0 0 0)',
                duration: 0.72,
                stagger: 0.09
              },
              '-=0.36'
            );

          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.arc-agents',
                start: 'top 75%',
                once: true
              },
              defaults: { ease: 'power4.out' }
            })
            .fromTo(
              '.arc-agents__header > *',
              { autoAlpha: 0, y: 28, clipPath: 'inset(0 0 100% 0)' },
              { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.74, stagger: 0.1 }
            )
            .fromTo(
              '.arc-agents__rail > span',
              { autoAlpha: 0, x: (index) => (index === 0 ? -24 : 24) },
              { autoAlpha: 1, x: 0, duration: 0.58, stagger: 0.08 },
              '-=0.3'
            );
          select<HTMLElement>('.arc-agent__step').forEach((target) => {
            gsap.fromTo(
              target,
              { autoAlpha: 0.2, y: 34, clipPath: 'inset(100% 0 0 0)' },
              {
                autoAlpha: 1,
                y: 0,
                clipPath: 'inset(0% 0 0 0)',
                duration: 0.68,
                ease: 'power4.out',
                onStart: () => target.classList.add('is-visible'),
                scrollTrigger: {
                  trigger: target,
                  start: 'top 86%',
                  once: true
                }
              }
            );
          });
          const commercialPaths = select<HTMLElement>('.arc-commercial__path');
          const commercialTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.arc-commercial',
              start: 'top 78%',
              once: true
            },
            defaults: { ease: 'power4.out' }
          });
          commercialTimeline
            .fromTo(
              commercialPaths[0],
              { autoAlpha: 0.25, xPercent: -12, clipPath: 'inset(0 100% 0 0)' },
              { autoAlpha: 1, xPercent: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.9 }
            )
            .fromTo(
              commercialPaths[1],
              { autoAlpha: 0.25, xPercent: 12, clipPath: 'inset(0 0 0 100%)' },
              { autoAlpha: 1, xPercent: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9 },
              '<'
            )
            .fromTo(
              '.arc-commercial__path > *',
              { autoAlpha: 0, y: 22 },
              { autoAlpha: 1, y: 0, duration: 0.54, stagger: 0.055 },
              '-=0.56'
            );

          gsap.fromTo(
            '.arc-closing__art',
            { scale: 1.18, xPercent: -3 },
            {
              scale: 1,
              xPercent: 0,
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.arc-closing',
                start: 'top bottom',
                once: true
              }
            }
          );
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.arc-closing',
                start: 'top 72%',
                once: true
              },
              defaults: { ease: 'power4.out' }
            })
            .fromTo(
              '.arc-closing h2 span',
              {
                autoAlpha: 0,
                x: (index) => (index % 2 === 0 ? -motionDistance : motionDistance),
                clipPath: (index) =>
                  index % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
              },
              {
                autoAlpha: 1,
                x: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.72,
                stagger: 0.08
              }
            )
            .fromTo(
              '.arc-closing__copy > *',
              { autoAlpha: 0, y: 22, clipPath: 'inset(0 0 100% 0)' },
              { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.66, stagger: 0.1 },
              '-=0.42'
            );

          gsap.fromTo(
            '.arc-footer__brand, .arc-footer__links > div',
            { autoAlpha: 0, y: 22, clipPath: 'inset(0 0 100% 0)' },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.68,
              stagger: 0.08,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: '.arc-footer',
                start: 'top 92%',
                once: true
              }
            }
          );

          const cleanupHover: Array<() => void> = [];

          if (allowHover) {
            const enter = (event: PointerEvent) => {
              const target = event.currentTarget as HTMLElement;
              gsap.set(target, { willChange: 'transform' });
              gsap.to(target, {
                x: target.classList.contains('arc-path--atlas') ? -10 : 10,
                scale: 1.01,
                duration: 0.38,
                ease: 'power3.out',
                overwrite: 'auto'
              });
            };
            const leave = (event: PointerEvent) => {
              const target = event.currentTarget as HTMLElement;
              gsap.to(target, {
                x: 0,
                scale: 1,
                duration: 0.52,
                ease: 'power3.out',
                overwrite: 'auto',
                onComplete: () => gsap.set(target, { willChange: 'auto' })
              });
            };
            const onPointerEnter = contextSafe ? contextSafe(enter) : enter;
            const onPointerLeave = contextSafe ? contextSafe(leave) : leave;

            heroPaths.forEach((target) => {
              target.addEventListener('pointerenter', onPointerEnter);
              target.addEventListener('pointerleave', onPointerLeave);
            });

            cleanupHover.push(() => {
              gsap.killTweensOf(heroPaths);
              heroPaths.forEach((target) => {
                target.removeEventListener('pointerenter', onPointerEnter);
                target.removeEventListener('pointerleave', onPointerLeave);
              });
            });

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

  return (
    <div className="degov-site home-site" ref={rootRef}>
      <SiteHeader variant="home" />

      <main id="site-content">
        <div id="top" />
        <section className="arc-hero" data-od-id="home-hero">
          <div className="arc-hero__art" aria-hidden="true">
            <Image
              className="arc-hero__poster"
              src={HERO_VISUAL.poster}
              alt=""
              fill
              priority
              sizes="100vw"
            />
            {HERO_VISUAL.useMotion ? (
              <video
                className="arc-hero__video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={HERO_VISUAL.poster}
                tabIndex={-1}
              >
                <source src={HERO_VISUAL.motion} type="video/mp4" />
              </video>
            ) : null}
          </div>
          <div className="arc-hero__inner">
            <div className="arc-hero__intro" data-od-id="hero-copy">
              <h1 className="arc-hero__title" data-od-id="hero-title">
                <span>Better Governance</span>
                <span>For Better Communities</span>
              </h1>
              <p className="arc-hero__summary">
                Strong communities understand decisions, participate with confidence, and verify the
                outcome
              </p>
            </div>

            <div className="arc-hero__focus" aria-hidden="true">
              <span className="arc-hero__ember" />
            </div>

            <div className="arc-hero__paths" aria-label="Choose a DeGov product">
              <div className="arc-path arc-path--square">
                <span className="arc-path__identity">
                  <svg
                    className="arc-path__glyph"
                    viewBox="0 0 56 56"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M7 22V8h14M35 8h14v14M49 35v14H35M21 49H7V35" />
                  </svg>
                  <span>Square</span>
                </span>
                <span className="arc-path__description">Onchain governance layer</span>
                <a
                  className="arc-path__action motion-btn"
                  data-od-id="hero-square-cta"
                  href="https://square.degov.ai/"
                >
                  <MotionButtonContent label="Run with Square" />
                </a>
              </div>

              <div className="arc-path arc-path--atlas">
                <span className="arc-path__identity">
                  <AtlasMark className="arc-path__glyph" />
                  <span>Atlas</span>
                </span>
                <span className="arc-path__description">Governance intelligence</span>
                <a
                  className="arc-path__action motion-btn"
                  data-od-id="hero-atlas-cta"
                  href="https://atlas.degov.ai/"
                >
                  <MotionButtonContent label="Understand with Atlas" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="arc-section arc-products" id="products" data-od-id="product-paths">
          <div className="arc-section__inner">
            <div className="arc-section__header arc-products__header">
              <h2 data-od-id="paths-title">
                One domain
                <br />
                Two ways in
              </h2>
              <p>
                Square carries a community through a decision. Atlas keeps the context around that
                decision visible
              </p>
            </div>

            <div className="arc-products__list" data-od-id="paths-chooser">
              <a
                className="arc-product-row arc-product-row--square"
                data-od-id="square-path-card"
                href="https://square.degov.ai/"
                aria-label="Enter DeGov Square"
              >
                <span className="arc-product-row__identity">
                  <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
                    <path d="M7 22V8h14M35 8h14v14M49 35v14H35M21 49H7V35" />
                  </svg>
                  <span>Square</span>
                </span>
                <span className="arc-product-row__body">
                  <strong>Run the decision</strong>
                  <span>
                    Launch governance, delegate, vote, and execute with an open layer built on
                    OpenZeppelin Governor
                  </span>
                  <span className="arc-product-row__signal" aria-hidden="true">
                    <i>Propose</i>
                    <i>Vote</i>
                    <i>Queue</i>
                    <i>Execute</i>
                  </span>
                </span>
                <span className="arc-product-row__action">
                  Enter Square
                  <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 9h11M10 4l5 5-5 5" />
                  </svg>
                </span>
              </a>

              <a
                className="arc-product-row arc-product-row--atlas"
                data-od-id="atlas-path-card"
                href="https://atlas.degov.ai/"
                aria-label="Explore DeGov Atlas"
              >
                <span className="arc-product-row__identity">
                  <AtlasMark />
                  <span>Atlas</span>
                </span>
                <span className="arc-product-row__body">
                  <strong>Understand the record</strong>
                  <span>
                    Reveal the meaning behind proposals through community behavior and the data
                    surrounding them
                  </span>
                  <span className="arc-product-row__signal" aria-hidden="true">
                    <i>Discover</i>
                    <i>Track</i>
                    <i>Explain</i>
                  </span>
                </span>
                <span className="arc-product-row__action">
                  Explore Atlas
                  <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 9h11M10 4l5 5-5 5" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="arc-section arc-journey" data-od-id="governance-journey">
          <div className="arc-journey__atmosphere" aria-hidden="true" />
          <div className="arc-section__inner arc-journey__layout">
            <div className="arc-journey__intro">
              <h2 data-od-id="journey-title">From signal to shared result</h2>
              <p>Square and Atlas connect the work a healthy community does together</p>
            </div>
            <ol className="arc-journey__track" data-od-id="journey-track">
              <li className="arc-journey__step" data-od-id="journey-discover">
                <span className="arc-journey__identity">
                  <JourneyMark kind="atlas" />
                  <strong>Atlas</strong>
                </span>
                <p>A proposal enters the feed with clear context and status</p>
              </li>
              <li className="arc-journey__step" data-od-id="journey-understand">
                <span className="arc-journey__identity">
                  <JourneyMark kind="community" />
                  <strong>Community</strong>
                </span>
                <p>Members understand the stakes and know when to act</p>
              </li>
              <li className="arc-journey__step" data-od-id="journey-decide">
                <span className="arc-journey__identity">
                  <JourneyMark kind="square" />
                  <strong>Square</strong>
                </span>
                <p>Delegation and voting turn participation into a decision</p>
              </li>
              <li className="arc-journey__step" data-od-id="journey-remember">
                <span className="arc-journey__identity">
                  <JourneyMark kind="record" />
                  <strong>Record</strong>
                </span>
                <p>Execution closes the loop and records what changed</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="arc-lower arc-proof" id="evidence" data-od-id="product-evidence">
          <div className="arc-lower__inner">
            <header className="arc-lower__header">
              <h2 data-od-id="evidence-title">
                Not a promise
                <br />A visible governance system
              </h2>
              <p className="arc-lower__summary">
                Public index samples show what each product makes possible
              </p>
            </header>

            <div className="arc-proof__systems">
              <article
                className="arc-proof__system arc-proof__system--square"
                data-od-id="square-evidence-panel"
              >
                <header className="arc-proof__head">
                  <span className="arc-proof__identity">
                    <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
                      <path d="M8 21V8h13M35 8h13v13M48 35v13H35M21 48H8V35" />
                    </svg>
                    Square / governance in action
                  </span>
                  <h3>See participation move toward execution</h3>
                </header>

                <div className="arc-proof__screen">
                  <p className="arc-proof__proposal">
                    Return rsETH Price Feeds on WETH and wstETH Markets (Mainnet)
                  </p>
                  <div
                    className="arc-proof__metrics"
                    aria-label="DeGov Square public index metrics"
                  >
                    <span>
                      <b>199</b>
                      <small>Proposals</small>
                    </span>
                    <span>
                      <b>220,249</b>
                      <small>Members</small>
                    </span>
                    <span>
                      <b>9,404</b>
                      <small>Votes</small>
                    </span>
                  </div>
                  <div className="arc-proof__lifecycle" aria-label="Proposal lifecycle">
                    <span>Propose</span>
                    <span>Vote</span>
                    <span>Queue</span>
                    <span>Execute</span>
                  </div>
                  <footer className="arc-proof__foot">
                    <a data-od-id="square-evidence-cta" href="https://square.degov.ai/">
                      Open Square
                      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path d="M3 9h11M10 4l5 5-5 5" />
                      </svg>
                    </a>
                  </footer>
                </div>
              </article>

              <article
                className="arc-proof__system arc-proof__system--atlas"
                data-od-id="atlas-evidence-panel"
              >
                <header className="arc-proof__head">
                  <span className="arc-proof__identity">
                    <AtlasMark />
                    Atlas / governance intelligence
                  </span>
                  <h3>Turn distributed events into shared context</h3>
                </header>

                <div className="arc-proof__screen">
                  <div className="arc-proof__feed">
                    <a data-od-id="atlas-feed-ens-treasury" href="https://atlas.degov.ai/">
                      <span>ENS</span>
                      <strong>Treasury Flow Automation</strong>
                      <small>
                        Proposal
                        <ArrowMark />
                      </small>
                    </a>
                    <a data-od-id="atlas-feed-ens-delegation" href="https://atlas.degov.ai/">
                      <span>ENS</span>
                      <strong>Delegation Incentives Program — Funding Transfer</strong>
                      <small>
                        Executable
                        <ArrowMark />
                      </small>
                    </a>
                    <a data-od-id="atlas-feed-compound" href="https://atlas.degov.ai/">
                      <span>Compound</span>
                      <strong>Return rsETH Price Feeds on Mainnet Markets</strong>
                      <small>
                        Indexed
                        <ArrowMark />
                      </small>
                    </a>
                    <a data-od-id="atlas-feed-unlock" href="https://atlas.degov.ai/">
                      <span>Unlock</span>
                      <strong>DAO Constant Payment Roll — May</strong>
                      <small>
                        Indexed
                        <ArrowMark />
                      </small>
                    </a>
                  </div>
                  <div className="arc-proof__lifecycle" aria-label="Atlas data lifecycle">
                    <span>Ingest</span>
                    <span>Index</span>
                    <span>Analyze</span>
                    <span>Explain</span>
                  </div>
                  <footer className="arc-proof__foot">
                    <a data-od-id="atlas-evidence-cta" href="https://atlas.degov.ai/">
                      Investigate in Atlas
                      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path d="M3 9h11M10 4l5 5-5 5" />
                      </svg>
                    </a>
                  </footer>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="arc-lower arc-community"
          id="community"
          data-od-id="governance-builds-community"
        >
          <div className="arc-community__atmosphere" aria-hidden="true" />
          <div className="arc-lower__inner arc-community__layout">
            <div className="arc-community__intro">
              <h2 data-od-id="community-title">Decisions become a community capability</h2>
              <p data-od-id="community-intro-copy">
                A community is more than an audience. It builds shared context, shapes outcomes, and
                learns from its record
              </p>
              <div className="arc-community__orbit" aria-hidden="true">
                <span />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>

            <ol className="arc-community__steps" data-od-id="community-governance-chain">
              <li className="arc-community__step" data-od-id="community-step-context">
                <span className="arc-community__index">01</span>
                <div>
                  <strong>Context</strong>
                  <h3>See the same reality</h3>
                  <p>Proposals, risks, votes, and executions become visible instead of scattered</p>
                </div>
              </li>
              <li className="arc-community__step" data-od-id="community-step-voice">
                <span className="arc-community__index">02</span>
                <div>
                  <strong>Voice</strong>
                  <h3>Give participation a path</h3>
                  <p>
                    Members move from discussion to delegation and voting through a clear process
                  </p>
                </div>
              </li>
              <li className="arc-community__step" data-od-id="community-step-action">
                <span className="arc-community__index">03</span>
                <div>
                  <strong>Action</strong>
                  <h3>Make decisions consequential</h3>
                  <p>Approved choices execute onchain, turning intent into change</p>
                </div>
              </li>
              <li className="arc-community__step" data-od-id="community-step-memory">
                <span className="arc-community__index">04</span>
                <div>
                  <strong>Memory</strong>
                  <h3>Build trust over time</h3>
                  <p>A durable record helps every member understand how the community moves</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="arc-lower arc-index" id="proof" data-od-id="portfolio-proof">
          <div className="arc-lower__inner">
            <header className="arc-index__header">
              <h2>Portfolio at a glance</h2>
              <p>
                Portfolio figures from DeGov product materials. Add a confirmed reporting date
                before launch
              </p>
            </header>

            <div className="arc-index__metrics" role="list" aria-label="DeGov portfolio metrics">
              <div role="listitem" data-od-id="metric-active-projects">
                <span>30+</span>
                <strong>Active projects</strong>
                <p>Governance teams using DeGov infrastructure</p>
              </div>
              <div role="listitem" data-od-id="metric-indexed-daos">
                <span>800+</span>
                <strong>DAOs indexed</strong>
                <p>Governance coverage across the Atlas portfolio</p>
              </div>
              <div role="listitem" data-od-id="metric-proposals">
                <span>30K+</span>
                <strong>Proposals</strong>
                <p>Decisions made discoverable and researchable</p>
              </div>
              <div role="listitem" data-od-id="metric-votes">
                <span>3M</span>
                <strong>Votes indexed</strong>
                <p>Structured signals for monitoring and integrations</p>
              </div>
            </div>

          </div>
        </section>

        <section className="arc-lower arc-agents" id="agents" data-od-id="agent-governance-access">
          <div className="arc-agents__atmosphere" aria-hidden="true" />
          <div className="arc-lower__inner">
            <header className="arc-agents__header" data-od-id="agent-skills-panel">
              <h2 data-od-id="agent-section-title">Governance research agents can verify</h2>
              <div className="arc-agents__aside">
                <p>
                  Reusable skills help agents research DAO activity and review proposal security with
                  evidence, sources, and explicit uncertainty
                </p>
                <div className="arc-agents__actions">
                  <a
                    data-od-id="agent-skills-cta"
                    href="https://github.com/ringecosystem/degov-agent-skills"
                  >
                    View skills on GitHub
                    <ArrowMark />
                  </a>
                  <a data-od-id="agent-api-daos-cta" href="https://agent-api.degov.ai/v1/daos">
                    Explore covered DAOs
                    <ArrowMark />
                  </a>
                </div>
                <div className="arc-agents__install" data-od-id="agent-skills-install">
                  <span>Install DeGov agent skills</span>
                  <div className="arc-agents__command">
                    <code>{AGENT_SKILLS_INSTALL_COMMAND}</code>
                    <button
                      type="button"
                      data-od-id="agent-skills-copy"
                      onClick={copyAgentSkillsCommand}
                      aria-label="Copy the DeGov agent skills install command"
                    >
                      {copyStatus === 'copied'
                        ? 'Copied'
                        : copyStatus === 'error'
                          ? 'Copy failed'
                          : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <div className="arc-agents__system" data-od-id="atlas-x402-panel">
              <div className="arc-agents__rail">
                <span>Atlas structured data</span>
                <span>Agent × x402</span>
              </div>
              <ol className="arc-agents__flow" data-od-id="x402-access-flow">
                <li className="arc-agent__step" data-od-id="x402-step-discover">
                  <span>01</span>
                  <strong>Discover</strong>
                  <p>Agents can inspect covered DAOs through public endpoints</p>
                </li>
                <li className="arc-agent__step" data-od-id="x402-step-request">
                  <span>02</span>
                  <strong>Request</strong>
                  <p>
                    Recent activity, governance events, briefs, and proposal details are available
                    on demand
                  </p>
                </li>
                <li className="arc-agent__step" data-od-id="x402-step-settle">
                  <span>03</span>
                  <strong>Pay per call</strong>
                  <p>
                    Paid requests settle in USDC on Base through x402—without a subscription or API
                    key
                  </p>
                </li>
                <li className="arc-agent__step" data-od-id="x402-step-explain">
                  <span>04</span>
                  <strong>Explain</strong>
                  <p>Skills turn Atlas data into source-aware answers instead of raw JSON</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="arc-lower arc-commercial" data-od-id="commercial-paths">
          <div className="arc-commercial__paths">
            <article
              className="arc-commercial__path arc-commercial__path--square"
              data-od-id="square-pricing-panel"
            >
              <span className="arc-commercial__identity">
                <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
                  <path d="M8 21V8h13M35 8h13v13M48 35v13H35M21 48H8V35" />
                </svg>
                Square · managed hosting
              </span>
              <h2>Start managed. Keep your exit open</h2>
              <div className="arc-commercial__price">
                <strong>$0</strong>
                <span>first 6 months</span>
              </div>
              <p>
                Then pay $200/month or $2,000/year—or self-host free. Both use the same open-source
                code
              </p>
              <a data-od-id="view-pricing-cta" href="/pricing">
                View Square pricing
                <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 9h11M10 4l5 5-5 5" />
                </svg>
              </a>
            </article>

            <article
              className="arc-commercial__path arc-commercial__path--atlas"
              data-od-id="atlas-commercial-panel"
            >
              <span className="arc-commercial__identity">
                <AtlasMark />
                Atlas · data partnerships
              </span>
              <h2>Bring governance intelligence into your product</h2>
              <p>
                Use Atlas for governance discovery, analysis, and integration. Access is scoped to
                your product needs
              </p>
              <a
                data-od-id="talk-atlas-cta"
                href="mailto:support@degov.ai?subject=Atlas%20data%20partnership"
              >
                Talk to Atlas
                <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 9h11M10 4l5 5-5 5" />
                </svg>
              </a>
            </article>
          </div>
        </section>

        <section className="arc-closing" data-od-id="closing-cta">
          <div className="arc-closing__art" aria-hidden="true" />
          <div className="arc-closing__inner">
            <h2 data-od-id="closing-title">
              <span>Run it</span>
              <span>Understand it</span>
              <span>Improve it</span>
            </h2>
            <div className="arc-closing__copy">
              <p>
                Square runs governance. Atlas makes it legible. Together, they help communities
                coordinate with clarity
              </p>
              <div className="arc-closing__actions">
                <a data-od-id="closing-square-cta" href="https://square.degov.ai/">
                  Enter Square
                  <ArrowMark />
                </a>
                <a data-od-id="closing-atlas-cta" href="https://atlas.degov.ai/">
                  Explore Atlas
                  <ArrowMark />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="home" />
    </div>
  );
}
