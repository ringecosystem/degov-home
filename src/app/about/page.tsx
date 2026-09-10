import type { Metadata } from 'next';
import { SOCIAL_IMAGE_URL } from '@/lib/seo';
import { InfoPage } from '@/components/layout/info-page';

export const metadata: Metadata = {
  title: 'About DeGov',
  description: 'DAO governance infrastructure, intelligence, and evidence-based agent research.',
  alternates: { canonical: 'https://degov.ai/about/' },
  openGraph: {
    title: 'About DeGov',
    description: 'DAO governance infrastructure, intelligence, and evidence-based agent research.',
    url: 'https://degov.ai/about/',
    images: [SOCIAL_IMAGE_URL]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About DeGov',
    description: 'DAO governance infrastructure, intelligence, and evidence-based agent research.',
    images: [SOCIAL_IMAGE_URL]
  }
};

export default function AboutPage() {
  return (
    <InfoPage title="About DeGov">
      <p>
        DeGov builds governance infrastructure and intelligence for DAO communities, participants,
        researchers, and developers. Our products help communities make decisions and help people
        understand the public record around them.
      </p>
      <h2>Run governance and understand it</h2>
      <p>
        <a href="https://square.degov.ai/">Square</a> provides an open-source governance layer built
        on OpenZeppelin Governor for proposing, delegating, voting, and executing onchain decisions.{' '}
        <a href="https://atlas.degov.ai/">Atlas</a> organizes governance activity so people can
        explore proposals, votes, participants, and discussions across DAOs.
      </p>
      <h2>Research with evidence</h2>
      <p>
        The <a href="https://docs.degov.ai/agent-api/">Agent API</a> exposes a focused public set of
        structured governance resources.{' '}
        <a href="https://docs.degov.ai/agent-skills/">Agent Skills</a> combine that data with
        official sources for research and proposal-security analysis. Missing information remains
        explicit; an AI-generated answer does not replace source evidence.
      </p>
      <p>
        Explore the <a href="https://github.com/ringecosystem/degov">open-source governance code</a>
        , read the <a href="https://docs.degov.ai/">documentation</a>, or{' '}
        <a href="/contact/">contact us</a> about an integration.
      </p>
    </InfoPage>
  );
}
