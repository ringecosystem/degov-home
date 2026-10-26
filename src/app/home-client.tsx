'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const MENU_LINKS = [
  { href: '#products', label: 'How to use' },
  { href: '#pricing', label: 'Pricing' },
  { href: 'https://square.degov.ai/', label: 'Square', external: true },
  { href: 'https://atlas.degov.ai/', label: 'Atlas', external: true },
  { href: 'https://docs.degov.ai/', label: 'Docs', external: true },
  { href: 'https://github.com/ringecosystem/degov', label: 'GitHub', external: true },
  { href: 'https://docs.degov.ai/agent-api/', label: 'Agent API', external: true }
] as const;

function ChatGptMark() {
  return (
    <svg className="home-plugin__logo" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.142-.081 4.778-2.758a.795.795 0 0 0 .393-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.495 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.647zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.814 3.354-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855L13.104 8.364 15.12 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.104v-5.677a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zM8.307 12.863l-2.02-1.164a.08.08 0 0 1-.038-.057V6.074a4.5 4.5 0 0 1 7.376-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.098-2.366 2.602-1.5 2.607 1.5v3l-2.597 1.5-2.607-1.5z"
      />
    </svg>
  );
}

function ProductLockup({ name }: { name: string }) {
  return (
    <div className="home-lockup">
      <span className="home-lockup__mark">
        <Image src="/images/degov-mark.svg" alt="" width={16} height={16} />
      </span>
      <p>{name}</p>
    </div>
  );
}

function ExternalMark() {
  return (
    <svg className="menu-external" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 10 11 5M7 5h4v4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16.5 20 20.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function UpArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19V6M7 11l5-5 5 5" />
    </svg>
  );
}

function openChat(question: string) {
  const trimmed = question.trim();
  if (!trimmed) return;
  window.location.assign(`/chat/?q=${encodeURIComponent(trimmed)}`);
}

export default function HomeClient() {
  const menuId = useId();
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const heroAskRef = useRef<HTMLFormElement>(null);
  const dockRef = useRef<HTMLFormElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const hero = heroAskRef.current;
    const dock = dockRef.current;
    if (!hero || !dock) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const bottom = hero.getBoundingClientRect().bottom;
      const progress = Math.min(1, Math.max(0, (72 - bottom) / 140));
      dock.style.opacity = String(progress);
      dock.style.pointerEvents = progress > 0.65 ? 'auto' : 'none';
      dock.toggleAttribute('inert', progress < 0.65);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;
      const links = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a') ?? []);
      const first = links.at(0);
      const last = links.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const ask = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    openChat(question);
  };

  const askOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
    event.preventDefault();
    ask();
  };

  return (
    <div className="degov-site home-site">
      <header className="home-bar">
        <a className="home-brand" href="#top" aria-label="DeGov.AI home">
          <Image src="/images/degov-ai-2x.svg" alt="" width={118} height={24} priority />
        </a>
        <div className="home-bar__actions">
          <ThemeToggle />
          <button
          ref={menuButtonRef}
          className="home-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
          </button>
          <nav
            className="home-menu"
            id={menuId}
            ref={menuRef}
            hidden={!menuOpen}
            aria-label="Site"
          >
            {MENU_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...('external' in link
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.label}</span>
                {'external' in link ? <ExternalMark /> : null}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="site-content">
        <div id="top" />
        <section className="home-hero" data-od-id="home-hero">
          <h1 className="home-hero__title" data-od-id="hero-title">
            Better Governance
            <span>For Better Communities</span>
          </h1>
          <form className="home-ask" ref={heroAskRef} onSubmit={ask}>
            <label className="home-ask__field">
              <SearchIcon />
              <span className="sr-only">Ask DeGov</span>
              <input
                name="q"
                value={question}
                placeholder="Ask about a proposal, a vote, or what a DAO decided."
                autoComplete="off"
                enterKeyHint="send"
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={askOnEnter}
              />
            </label>
            <button className="home-ask__submit" type="submit" aria-label="Ask Atlas">
              <ArrowIcon />
            </button>
          </form>

          <a
            className="home-hast"
            href="https://hast.so/?utm_source=degov"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/images/hast-wordmark.svg" alt="" width={20} height={20} />
            <span>Powered by hast</span>
          </a>
        </section>

        <section className="home-section" id="products" data-od-id="product-paths">
          <div className="home-section__intro">
            <h2>How to use</h2>
            <p>
              Square to run a decision onchain, Atlas to read what the community decided.
            </p>
          </div>
          <div className="arc-hero__paths home-pair home-use">
            <article className="home-panel" data-od-id="square-path-card">
              <ProductLockup name="DeGov Square" />
              <h3>Run the decision.</h3>
              <p>
                Launch governance, delegate, vote, and execute. An open layer built on OpenZeppelin
                Governor.
              </p>
              <a className="home-panel__open" href="https://square.degov.ai/">
                Go
                <ExternalMark />
              </a>
            </article>
            <aside className="home-plugin">
              <ChatGptMark />
              <h3>Ask from ChatGPT</h3>
              <p>
                One message can run through Square and read the record in Atlas, without opening
                another dashboard.
              </p>
              <div className="home-composer" aria-hidden="true">
                <svg className="home-composer__icon" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="home-composer__brand">
                  <Image src="/images/degov-mark.svg" alt="" width={14} height={14} />
                  DeGov
                </span>
                <span className="home-composer__prompt">Show me the last proposal of ENS DAO</span>
                <span className="home-composer__tools">
                  <span className="home-composer__pro">Pro</span>
                  <svg className="home-composer__icon" viewBox="0 0 24 24">
                    <rect x="9" y="4" width="6" height="10" rx="3" />
                    <path d="M7 11a5 5 0 0 0 10 0M12 16v4" />
                  </svg>
                  <span className="home-composer__send">
                    <UpArrowIcon />
                  </span>
                </span>
              </div>
            </aside>
            <article className="home-panel" data-od-id="atlas-path-card">
              <ProductLockup name="DeGov Atlas" />
              <h3>Understand the record.</h3>
              <p>See what a community proposed, how it voted, and what actually changed.</p>
              <a className="home-panel__open" href="https://atlas.degov.ai/">
                Go
                <ExternalMark />
              </a>
            </article>
          </div>
        </section>

        <section className="home-section" id="pricing" data-od-id="square-pricing-panel">
          <div className="home-section__intro">
            <h2>Pricing</h2>
            <p>Square hosting. Atlas stays free to browse.</p>
          </div>
          <div className="home-pair">
            <article className="home-price">
              <h3>Self-host</h3>
              <p className="home-price__amount">
                <strong>$0</strong>
              </p>
              <p>You deploy the same open-source code.</p>
              <ul>
                <li>Your infrastructure</li>
                <li>Your updates</li>
                <li>No software fee</li>
              </ul>
              <a href="https://github.com/ringecosystem/degov">Deploy yourself</a>
            </article>
            <article className="home-price home-price--managed">
              <h3>Managed</h3>
              <p className="home-price__amount">
                <s>$200 / month</s>
                <strong>$0</strong>
                <span>first 6 months</span>
              </p>
              <p>Then $200 / month, or $2,000 / year.</p>
              <ul>
                <li>DeGov deploys</li>
                <li>DeGov monitors</li>
                <li>Leave for self-hosting anytime</li>
              </ul>
              <a href="mailto:support@degov.ai?subject=DeGov%20managed%20hosting">
                Request hosting
              </a>
              <a className="home-price__quiet" href="https://playground.degov.ai/">
                Playground on Base
              </a>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter variant="home" />

      <form className="home-dock" ref={dockRef} onSubmit={ask} inert>
        <label className="home-ask__field">
          <SearchIcon />
          <span className="sr-only">Ask about a DAO record</span>
          <input
            name="q"
            value={question}
            placeholder="Ask about a DAO proposal, delegate flow, or Atlas record…"
            autoComplete="off"
            enterKeyHint="send"
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={askOnEnter}
          />
        </label>
        <button className="home-ask__submit" type="submit" aria-label="Ask Atlas">
          <ArrowIcon />
        </button>
      </form>
    </div>
  );
}
