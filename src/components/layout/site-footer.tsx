import Image from 'next/image';

type SiteFooterProps = {
  variant: 'home' | 'pricing';
};

export function SiteFooter({ variant }: SiteFooterProps) {
  const isPricing = variant === 'pricing';

  return (
    <footer
      className="arc-footer"
      id="site-footer"
      data-od-id={isPricing ? 'pricing-footer' : 'site-footer'}
    >
      <div className="arc-footer__inner">
        <div className="arc-footer__brand">
          <a
            className="brand"
            data-od-id={isPricing ? 'pricing-footer-brand' : 'footer-brand'}
            href={isPricing ? '/' : '#top'}
            aria-label="DeGov.AI home"
          >
            <Image
              className="brand-logo"
              src="/images/degov-ai-2x.svg"
              alt="DeGov.AI"
              width={147}
              height={30}
            />
          </a>
          <p>Better governance for better communities</p>
        </div>

        <nav className="arc-footer__links" aria-label="Footer navigation">
          <div>
            <h3>Products</h3>
            <div>
              <a href="https://square.degov.ai/">Square</a>
              <a href="https://atlas.degov.ai/">Atlas</a>
              <a href="/pricing">Pricing</a>
            </div>
          </div>

          <div>
            <h3>Build</h3>
            <div>
              <a href="https://github.com/ringecosystem/degov">GitHub</a>
              <a href="https://github.com/ringecosystem/degov-agent-skills">Agent Skills</a>
              <a href="https://agent-api.degov.ai/v1/daos">Agent API</a>
              <a href="mailto:contact@degov.ai">Contact</a>
            </div>
          </div>

          <div>
            <h3>Principle</h3>
            <p>
              Open infrastructure where governance runs. Focused intelligence where governance is
              understood
            </p>
          </div>
        </nav>
      </div>
    </footer>
  );
}
