import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { SiteFooter } from './site-footer';
import '@/app/site.css';
import '@/app/info.css';

export function InfoPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="degov-site info-site" id="top">
      <header className="info-header">
        <Link className="brand" href="/" aria-label="DeGov.AI home">
          <Image src="/images/degov-ai-2x.svg" alt="DeGov.AI" width={147} height={30} />
        </Link>
        <nav aria-label="Page navigation">
          <Link href="/">Home</Link>
          <a href="https://docs.degov.ai/">Docs</a>
        </nav>
      </header>
      <main className="info-content">
        <h1>{title}</h1>
        {children}
      </main>
      <SiteFooter variant="home" />
    </div>
  );
}
