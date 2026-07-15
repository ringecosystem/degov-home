'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { SiteHeader } from '@/components/layout/site-header';

export default function HomeClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const animatedItems = root.querySelectorAll<HTMLElement>(
      '.journey-step, .community-step, .evidence-panel'
    );
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      animatedItems.forEach((item) => item.classList.add('is-visible'));
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
      { threshold: 0.3 }
    );

    animatedItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="degov-site home-site" ref={rootRef}>
      <SiteHeader variant="home" />

      <main id="site-content">
        <div id="top" />
        <section className="hero" data-od-id="home-hero">
          <div className="hero-grid container">
            <div className="hero-title-wrap">
              <p className="eyebrow" data-od-id="hero-eyebrow">
                DeGov.AI · governance infrastructure
              </p>
              <h1 className="display" data-od-id="hero-title">
                <span className="hero-title-line">Better</span>
                <span className="hero-title-line">governance</span>
                <span className="hero-title-line">for better</span>
                <span className="hero-title-line">communities.</span>
              </h1>
            </div>
            <div className="hero-copy" data-od-id="hero-copy">
              <p className="lead">
                Strong communities understand decisions, participate with confidence, and verify the
                outcome.
              </p>
              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  data-od-id="hero-square-cta"
                  href="https://square.degov.ai/"
                >
                  Run with Square
                </a>
                <a
                  className="btn btn-ghost"
                  data-od-id="hero-atlas-cta"
                  href="https://atlas.degov.ai/"
                >
                  Understand with Atlas
                </a>
              </div>
              <p className="hero-note">
                Square turns participation into action.
                <br />
                Atlas turns activity into shared context.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section section-operational"
          id="products"
          data-ledger="LEDGER / 01"
          data-od-id="product-paths"
        >
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">One governance domain · two paths</p>
                <h2 className="h2" data-od-id="paths-title">
                  What does your community need now?
                </h2>
              </div>
              <p className="lead">
                Choose by task. Run governance in Square. Understand it in Atlas.
              </p>
            </div>
            <div className="paths" data-od-id="paths-chooser">
              <a
                className="path path-square"
                data-od-id="square-path-card"
                href="https://square.degov.ai/"
                aria-label="Enter DeGov Square"
              >
                <div>
                  <div className="path-index">
                    <span>01 / Square</span>
                    <span>Open governance layer</span>
                  </div>
                  <div className="path-word">RUN</div>
                  <p>
                    Launch governance, delegate, vote, and execute with an open layer built on
                    OpenZeppelin Governor.
                  </p>
                  <div className="path-signal" aria-hidden="true">
                    <span>Propose</span>
                    <span>Vote</span>
                    <span>Queue</span>
                    <span>Execute</span>
                  </div>
                </div>
                <div className="path-bottom">
                  <div className="path-list">
                    <span>For founders and core teams</span>
                    <span>For governance participants</span>
                  </div>
                  <span className="path-link-label">Enter Square</span>
                </div>
              </a>
              <a
                className="path path-atlas"
                data-od-id="atlas-path-card"
                href="https://atlas.degov.ai/"
                aria-label="Explore DeGov Atlas"
              >
                <div>
                  <div className="path-index">
                    <span>02 / Atlas</span>
                    <span>Governance intelligence</span>
                  </div>
                  <div className="path-word path-word-long">UNDERSTAND</div>
                  <p>
                    Discover DAOs, track proposals, and surface the context people and agents need
                    to act.
                  </p>
                  <div className="atlas-index" aria-hidden="true">
                    <span>
                      <b>DAO index</b>
                      <i>800+</i>
                    </span>
                    <span>
                      <b>Proposal record</b>
                      <i>30K+</i>
                    </span>
                    <span>
                      <b>Vote signals</b>
                      <i>3M</i>
                    </span>
                  </div>
                </div>
                <div className="path-bottom">
                  <div className="path-list">
                    <span>For DAO and community operators</span>
                    <span>For researchers and agents</span>
                  </div>
                  <span className="path-link-label">Explore Atlas</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section
          className="section section-narrative"
          data-ledger="LEDGER / 02"
          data-od-id="governance-journey"
        >
          <div className="journey container">
            <div>
              <p className="eyebrow">One governance journey</p>
              <h2 className="h2" data-od-id="journey-title">
                From signal to shared result.
              </h2>
              <p className="lead" style={{ marginTop: 24 }}>
                Square and Atlas connect the work a healthy community does together.
              </p>
            </div>
            <div className="journey-track" data-od-id="journey-track">
              <article className="journey-step" data-od-id="journey-discover">
                <strong>Atlas</strong>
                <p>A proposal enters the feed with clear context and status.</p>
              </article>
              <article className="journey-step" data-od-id="journey-understand">
                <strong>Community</strong>
                <p>Members understand the stakes and know when to act.</p>
              </article>
              <article className="journey-step" data-od-id="journey-decide">
                <strong>Square</strong>
                <p>Delegation and voting turn participation into a decision.</p>
              </article>
              <article className="journey-step" data-od-id="journey-remember">
                <strong>Record</strong>
                <p>Execution closes the loop and records what changed.</p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="section section-operational"
          id="evidence"
          data-ledger="LEDGER / 03"
          data-od-id="product-evidence"
        >
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Public product evidence</p>
                <h2 className="h2" data-od-id="evidence-title">
                  Not a promise. A visible governance system.
                </h2>
              </div>
              <p className="lead">Public index samples show what each product makes possible.</p>
            </div>
            <div className="evidence-grid">
              <article className="evidence-panel" data-od-id="square-evidence-panel">
                <div className="evidence-head">
                  <p className="evidence-product">Square / governance in action</p>
                  <h3>See participation move toward execution.</h3>
                </div>
                <div className="product-ui">
                  <div className="ui-bar">
                    <span>Compound DAO</span>
                    <span className="snapshot-status">Public snapshot</span>
                  </div>
                  <div className="proposal-title">
                    Return rsETH Price Feeds on WETH and wstETH Markets (Mainnet)
                  </div>
                  <div className="metrics" aria-label="Compound DAO public index metrics">
                    <div className="metric">
                      <b>199</b>
                      <span>Proposals</span>
                    </div>
                    <div className="metric">
                      <b>220,249</b>
                      <span>Members</span>
                    </div>
                    <div className="metric">
                      <b>9,404</b>
                      <span>Votes</span>
                    </div>
                  </div>
                  <div className="lifecycle" aria-label="Proposal lifecycle">
                    <span className="life-step">Propose</span>
                    <span className="life-step">Vote</span>
                    <span className="life-step">Queue</span>
                    <span className="life-step">Execute</span>
                  </div>
                  <div className="evidence-foot">
                    <span className="source-note">
                      Source: api.degov.ai · launch review pending
                    </span>
                    <a
                      className="text-link"
                      data-od-id="square-evidence-cta"
                      href="https://square.degov.ai/"
                    >
                      Open Square
                    </a>
                  </div>
                </div>
              </article>
              <article className="evidence-panel" data-od-id="atlas-evidence-panel">
                <div className="evidence-head">
                  <p className="evidence-product">Atlas / governance intelligence</p>
                  <h3>Turn distributed events into shared context.</h3>
                </div>
                <div className="product-ui">
                  <div className="ui-bar">
                    <span>Governance feed</span>
                    <span className="snapshot-status">Public snapshot</span>
                  </div>
                  <a
                    className="feed-row"
                    data-od-id="atlas-feed-ens-treasury"
                    href="https://atlas.degov.ai/"
                  >
                    <span className="feed-dao">ENS</span>
                    <span className="feed-title">Treasury Flow Automation</span>
                    <span className="feed-state">Proposal ↗</span>
                  </a>
                  <a
                    className="feed-row"
                    data-od-id="atlas-feed-ens-delegation"
                    href="https://atlas.degov.ai/"
                  >
                    <span className="feed-dao">ENS</span>
                    <span className="feed-title">
                      Delegation Incentives Program — Funding Transfer
                    </span>
                    <span className="feed-state">Executable ↗</span>
                  </a>
                  <a
                    className="feed-row"
                    data-od-id="atlas-feed-compound"
                    href="https://atlas.degov.ai/"
                  >
                    <span className="feed-dao">Compound</span>
                    <span className="feed-title">Return rsETH Price Feeds on Mainnet Markets</span>
                    <span className="feed-state">Indexed ↗</span>
                  </a>
                  <a
                    className="feed-row"
                    data-od-id="atlas-feed-unlock"
                    href="https://atlas.degov.ai/"
                  >
                    <span className="feed-dao">Unlock</span>
                    <span className="feed-title">DAO Constant Payment Roll — May</span>
                    <span className="feed-state">Indexed ↗</span>
                  </a>
                  <div className="evidence-foot">
                    <span className="source-note">
                      Sources: DeGov DAO indexers · approved snapshot required before launch
                    </span>
                    <a
                      className="text-link"
                      data-od-id="atlas-evidence-cta"
                      href="https://atlas.degov.ai/"
                    >
                      Investigate in Atlas
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="section section-narrative"
          id="community"
          data-ledger="LEDGER / 04"
          data-od-id="governance-builds-community"
        >
          <div className="container">
            <div className="community-intro">
              <div>
                <p className="eyebrow">Why governance builds community</p>
                <h2 className="h2" data-od-id="community-title">
                  Decisions become a community capability.
                </h2>
              </div>
              <p className="lead" data-od-id="community-intro-copy">
                A community is more than an audience. It builds shared context, shapes outcomes, and
                learns from its record.
              </p>
            </div>
            <div className="community-chain" data-od-id="community-governance-chain">
              <article className="community-step" data-od-id="community-step-context">
                <span className="community-index">01 / CONTEXT</span>
                <h3>See the same reality.</h3>
                <p>Proposals, risks, votes, and executions become visible instead of scattered.</p>
              </article>
              <article className="community-step" data-od-id="community-step-voice">
                <span className="community-index">02 / VOICE</span>
                <h3>Give participation a path.</h3>
                <p>
                  Members move from discussion to delegation and voting through a clear process.
                </p>
              </article>
              <article className="community-step" data-od-id="community-step-action">
                <span className="community-index">03 / ACTION</span>
                <h3>Make decisions consequential.</h3>
                <p>Approved choices execute onchain, turning intent into change.</p>
              </article>
              <article className="community-step" data-od-id="community-step-memory">
                <span className="community-index">04 / MEMORY</span>
                <h3>Build trust over time.</h3>
                <p>A durable record helps every member understand how the community moves.</p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="section section-operational"
          id="proof"
          data-ledger="LEDGER / 05"
          data-od-id="portfolio-proof"
        >
          <div className="container">
            <p className="eyebrow">Portfolio at a glance</p>
            <div className="ledger" role="list" aria-label="DeGov portfolio metrics">
              <div className="ledger-row" role="listitem" data-od-id="metric-active-projects">
                <span className="ledger-value">30+</span>
                <span className="ledger-label">Active projects</span>
                <span className="ledger-note">Governance teams using DeGov infrastructure.</span>
              </div>
              <div className="ledger-row" role="listitem" data-od-id="metric-indexed-daos">
                <span className="ledger-value">800+</span>
                <span className="ledger-label">DAOs indexed</span>
                <span className="ledger-note">Governance coverage across the Atlas portfolio.</span>
              </div>
              <div className="ledger-row" role="listitem" data-od-id="metric-proposals">
                <span className="ledger-value">30K+</span>
                <span className="ledger-label">Proposals</span>
                <span className="ledger-note">Decisions made discoverable and researchable.</span>
              </div>
              <div className="ledger-row" role="listitem" data-od-id="metric-votes">
                <span className="ledger-value">3M</span>
                <span className="ledger-label">Votes indexed</span>
                <span className="ledger-note">
                  Structured signals for monitoring and integrations.
                </span>
              </div>
            </div>
            <p className="portfolio-source">
              Portfolio figures from DeGov product materials. Add a confirmed reporting date before
              launch.
            </p>
          </div>
        </section>

        <section
          className="section section-operational"
          id="agents"
          data-ledger="LEDGER / 06"
          data-od-id="agent-governance-access"
        >
          <div className="container">
            <div className="agent-system">
              <div className="agent-intro" data-od-id="agent-skills-panel">
                <p className="eyebrow">Open agent skills</p>
                <h2 data-od-id="agent-section-title">Governance research agents can verify.</h2>
                <p className="lead">
                  Reusable skills help agents research DAO activity and review proposal security
                  with evidence, sources, and explicit uncertainty.
                </p>
                <div className="agent-actions">
                  <a
                    className="btn btn-primary"
                    data-od-id="agent-skills-cta"
                    href="https://github.com/ringecosystem/degov-agent-skills"
                  >
                    View skills on GitHub
                  </a>
                  <a
                    className="btn btn-ghost"
                    data-od-id="agent-api-daos-cta"
                    href="https://agent-api.degov.ai/v1/daos"
                  >
                    Explore covered DAOs
                  </a>
                </div>
              </div>
              <div className="agent-access" data-od-id="atlas-x402-panel">
                <div className="access-label">
                  <span>Atlas structured data</span>
                  <span>Agent × x402</span>
                </div>
                <div className="access-flow" data-od-id="x402-access-flow">
                  <article className="access-step" data-od-id="x402-step-discover">
                    <strong>Discover</strong>
                    <p>Agents can inspect covered DAOs through public endpoints.</p>
                  </article>
                  <article className="access-step" data-od-id="x402-step-request">
                    <strong>Request</strong>
                    <p>
                      Recent activity, governance events, briefs, and proposal details are available
                      on demand.
                    </p>
                  </article>
                  <article className="access-step" data-od-id="x402-step-settle">
                    <strong>Pay per call</strong>
                    <p>
                      Paid requests settle in USDC on Base through x402—without a subscription or
                      API key.
                    </p>
                  </article>
                  <article className="access-step" data-od-id="x402-step-explain">
                    <strong>Explain</strong>
                    <p>Skills turn Atlas data into source-aware answers instead of raw JSON.</p>
                  </article>
                </div>
                <p className="access-note">
                  Agents should ask for user consent before any paid request. Wallet credentials
                  stay local.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section section-narrative"
          data-ledger="LEDGER / 07"
          data-od-id="commercial-paths"
        >
          <div className="commercial container">
            <article className="commercial-panel" data-od-id="square-pricing-panel">
              <p className="eyebrow">Square · managed hosting</p>
              <h2>Start managed. Keep your exit open.</h2>
              <div className="price">
                $0 <small>first 6 months</small>
              </div>
              <p>
                Then pay $200/month or $2,000/year—or self-host free. Both use the same open-source
                code.
              </p>
              <a className="text-link" data-od-id="view-pricing-cta" href="/pricing">
                View Square pricing
              </a>
            </article>
            <article className="commercial-panel" data-od-id="atlas-commercial-panel">
              <p className="eyebrow">Atlas · data partnerships</p>
              <h2>Bring governance intelligence into your product.</h2>
              <p style={{ marginTop: 32 }}>
                Use Atlas for governance discovery, analysis, and integration. Access is scoped to
                your product needs.
              </p>
              <a
                className="text-link"
                data-od-id="talk-atlas-cta"
                href="mailto:contact@degov.ai?subject=Atlas%20data%20partnership"
              >
                Talk to Atlas
              </a>
            </article>
          </div>
        </section>

        <section className="section closing" data-od-id="closing-cta">
          <div className="container">
            <p className="eyebrow">Choose your next move</p>
            <h2 className="display" data-od-id="closing-title">
              Run it. Understand it. Improve it.
            </h2>
            <p>
              Square runs governance. Atlas makes it legible. Together, they help communities
              coordinate with clarity.
            </p>
            <div className="closing-actions">
              <a
                className="btn btn-primary"
                data-od-id="closing-square-cta"
                href="https://square.degov.ai/"
              >
                Enter Square
              </a>
              <a
                className="btn btn-ghost"
                data-od-id="closing-atlas-cta"
                href="https://atlas.degov.ai/"
              >
                Explore Atlas
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="site-footer" data-od-id="site-footer">
        <div className="footer-grid container">
          <div>
            <a className="brand" data-od-id="footer-brand" href="#top" aria-label="DeGov.AI home">
              <Image
                className="brand-logo"
                src="/images/logo.svg"
                alt="DeGov.AI"
                width={136}
                height={30}
              />
            </a>
            <p className="footer-note" style={{ marginTop: 16 }}>
              Better governance for better communities.
            </p>
          </div>
          <div>
            <h3>Products</h3>
            <div className="footer-links">
              <a href="https://square.degov.ai/">Square</a>
              <a href="https://atlas.degov.ai/">Atlas</a>
              <a href="/pricing">Pricing</a>
            </div>
          </div>
          <div>
            <h3>Build</h3>
            <div className="footer-links">
              <a href="https://github.com/ringecosystem/degov">GitHub</a>
              <a href="https://github.com/ringecosystem/degov-agent-skills">Agent Skills</a>
              <a href="https://agent-api.degov.ai/v1/daos">Agent API</a>
              <a href="mailto:contact@degov.ai">Contact</a>
            </div>
          </div>
          <div>
            <h3>Principle</h3>
            <p className="footer-note">
              Open infrastructure where governance runs. Focused intelligence where governance is
              understood.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
