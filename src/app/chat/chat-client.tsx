'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

import { ThemeToggle } from '@/components/theme/ThemeToggle';

import './chat.css';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

const SUGGESTIONS = [
  'Which DAOs index proposals about treasury automation?',
  'Show me the last proposal of ENS DAO'
];

const PENDING_REPLY = 'Square and Atlas answers are not connected yet.';

function nextId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ChatClient() {
  const params = useSearchParams();
  const question = params.get('q')?.trim() ?? '';
  const threadRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState('');
  const [helpOpen, setHelpOpen] = useState(true);
  const [extra, setExtra] = useState<ChatMessage[]>([]);
  const messages: ChatMessage[] = [
    ...(question
      ? [
          { id: `user-${question}`, role: 'user' as const, text: question },
          { id: `assistant-${question}`, role: 'assistant' as const, text: PENDING_REPLY }
        ]
      : []),
    ...extra
  ];

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    thread.scrollTo({ top: thread.scrollHeight });
  }, [extra.length, question]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setExtra((current) => [
      ...current,
      { id: nextId(), role: 'user', text: trimmed },
      { id: nextId(), role: 'assistant', text: PENDING_REPLY }
    ]);
    setDraft('');
    setHelpOpen(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(draft);
  };

  return (
    <div className="degov-site home-site chat-page">
      <header className="home-bar">
        <Link className="home-brand" href="/" aria-label="DeGov.AI home">
          <Image src="/images/degov-ai-2x.svg" alt="" width={118} height={24} priority />
        </Link>
        <div className="home-bar__actions">
          <ThemeToggle />
          <Link className="home-menu-button" href="/">
            Home
          </Link>
        </div>
      </header>

      <main className="chat-main">
        <div className="chat-thread" ref={threadRef}>
          {messages.length === 0 ? (
            <section className="chat-help">
              <button type="button" className="chat-help__chip" onClick={() => setHelpOpen((open) => !open)}>
                How to use?
              </button>
              {helpOpen ? (
                <>
                  <p>Ask about a proposal, a vote, or what a DAO decided. Name the DAO when you can.</p>
                  <ul>
                    <li>Be specific about the proposal or the decision you want.</li>
                    <li>Square is the decision. Atlas is the record.</li>
                    <li>Press Enter to send.</li>
                  </ul>
                </>
              ) : null}
              <div className="chat-suggestions">
                {SUGGESTIONS.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => send(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <ol className="chat-messages">
              {messages.map((message) => (
                <li key={message.id} className={`chat-message chat-message--${message.role}`}>
                  {message.text}
                </li>
              ))}
            </ol>
          )}
        </div>

        <form className="chat-composer" onSubmit={onSubmit}>
          <label className="chat-composer__field">
            <span className="sr-only">Ask DeGov</span>
            <input
              value={draft}
              placeholder="Ask anything..."
              autoComplete="off"
              onChange={(event) => setDraft(event.target.value)}
            />
          </label>
          <button className="chat-composer__icon" type="button" disabled aria-label="Attach a file">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 12.5 14.2 6.3a3 3 0 0 1 4.2 4.2l-7.4 7.5a4.2 4.2 0 0 1-6-6L12 5" />
            </svg>
          </button>
          <button className="chat-composer__icon" type="button" disabled aria-label="Use microphone">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="9" y="4" width="6" height="10" rx="3" />
              <path d="M7 11a5 5 0 0 0 10 0M12 16v4" />
            </svg>
          </button>
          <button className="chat-composer__send" type="submit" aria-label="Send" disabled={!draft.trim()}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 19V6M7 11l5-5 5 5" />
            </svg>
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
      </main>
    </div>
  );
}
