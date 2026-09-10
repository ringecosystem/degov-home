import { InfoPage } from '@/components/layout/info-page';
import Link from 'next/link';

export default function NotFound() {
  return (
    <InfoPage title="Page not found">
      <p>This address does not point to a page on DeGov.AI. Use an official entry point below.</p>
      <ul>
        <li>
          <Link href="/">DeGov homepage</Link>
        </li>
        <li>
          <a href="https://docs.degov.ai/">Documentation</a>
        </li>
        <li>
          <a href="https://docs.degov.ai/agent-api/quickstart/">Agent API quickstart</a>
        </li>
        <li>
          <a href="https://agent-api.degov.ai/openapi.json">Current OpenAPI specification</a>
        </li>
        <li>
          <a href="/llms.txt">Agent navigation</a>
        </li>
        <li>
          <a href="/sitemap.xml">Sitemap</a>
        </li>
      </ul>
    </InfoPage>
  );
}
