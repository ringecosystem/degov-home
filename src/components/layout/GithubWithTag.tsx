'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

async function getLatestTag() {
  const response = await fetch('https://api.github.com/repos/ringecosystem/degov/tags');
  const tags = await response.json();
  return tags[0]?.name || 'v0.0.0';
}

export default function GithubWithTag() {
  const [tag, setTag] = useState('');
  useEffect(() => {
    getLatestTag().then((tag) => {
      setTag(tag);
    });
  }, []);

  return (
    <Link
      href={
        tag
          ? `https://github.com/ringecosystem/degov/tree/${tag}`
          : 'https://github.com/ringecosystem/degov'
      }
      className="flex items-center gap-[5px] rounded-[100px] bg-[rgba(255,255,255,0.1)] px-[10px] py-[5px] transition-opacity hover:opacity-80"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src="/images/social/github-light.svg" alt="GitHub" width={14} height={14} />
      {tag && <span className="text-[20px] leading-[140%] font-normal"> {tag}</span>}
    </Link>
  );
}
