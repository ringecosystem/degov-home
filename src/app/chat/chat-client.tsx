'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { Streamdown } from 'streamdown';

import { ThemeToggle } from '@/components/theme/ThemeToggle';

import './chat.css';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  pending?: boolean;
  error?: boolean;
};

type StoredSession = {
  sessionId: string;
  sessionToken: string;
};

const SUGGESTIONS = [
  'Which DAOs index proposals about treasury automation?',
  'Show me the last proposal of ENS DAO'
];

const SESSION_KEY = 'degov-chat-session';
const startedQuestions = new Set<string>();

function nextId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readSession(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    if (!parsed.sessionId || !parsed.sessionToken) return null;
    return parsed;
  } catch {
    return null;
  }
}

function storeSession(session: StoredSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

async function readAnswer(
  response: Response,
  onText: (text: string) => void
) {
  if (!response.ok || !response.body) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error || 'Hast did not answer');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let answer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split('\n\n');
    buffer = chunks.pop() ?? '';
    for (const chunk of chunks) {
      const line = chunk.split('\n').find((item) => item.startsWith('data: '));
      if (!line) continue;
      const event = JSON.parse(line.slice(6)) as {
        text?: string;
        error?: string;
        sessionId?: string;
        sessionToken?: string;
      };
      if (event.error) throw new Error(event.error);
      if (event.sessionId && event.sessionToken) {
        storeSession({ sessionId: event.sessionId, sessionToken: event.sessionToken });
      }
      if (typeof event.text === 'string') {
        answer = event.text;
        onText(answer);
      }
    }
  }

  if (!answer) throw new Error('Hast finished without an answer');
}

export default function ChatClient() {
  const params = useSearchParams();
  const question = params.get('q')?.trim() ?? '';
  const threadRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState('');
  const [helpOpen, setHelpOpen] = useState(!question);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    question
      ? [
          { id: `user-${question}`, role: 'user', text: question },
          { id: `assistant-${question}`, role: 'assistant', text: '', pending: true }
        ]
      : []
  );

  const updateAssistant = (id: string, patch: Partial<ChatMessage>) => {
    setMessages((current) => current.map((message) => (message.id === id ? { ...message, ...patch } : message)));
  };

  const ask = async (text: string, assistantId: string) => {
    const session = readSession();
    try {
      const response = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          sessionId: session?.sessionId,
          sessionToken: session?.sessionToken,
        }),
      });
      await readAnswer(response, (answer) => updateAssistant(assistantId, { text: answer, pending: true, error: false }));
      updateAssistant(assistantId, { pending: false, error: false });
    } catch (error) {
      updateAssistant(assistantId, {
        text: error instanceof Error ? error.message : 'Hast did not answer',
        pending: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    thread.scrollTo({ top: thread.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (!question || startedQuestions.has(question)) return;
    startedQuestions.add(question);
    void ask(question, `assistant-${question}`);
    // The initial question is rendered with the page; this only starts its request.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || messages.some((message) => message.pending)) return;
    const assistantId = nextId();
    setMessages((current) => [
      ...current,
      { id: nextId(), role: 'user', text: trimmed },
      { id: assistantId, role: 'assistant', text: '', pending: true },
    ]);
    setDraft('');
    setHelpOpen(false);
    void ask(trimmed, assistantId);
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
                  {message.role === 'assistant' && !message.error ? (
                    message.text ? (
                      <Streamdown
                        className="chat-markdown"
                        controls={false}
                        linkSafety={{ enabled: false }}
                        mode={message.pending ? 'streaming' : 'static'}
                        tableMaxHeight={0}
                        codeBlockMaxHeight={0}
                      >
                        {message.text}
                      </Streamdown>
                    ) : (
                      <div className="chat-wait" role="status" aria-live="polite">
                        <span className="sr-only">Thinking</span>
                        <span className="chat-wait__line" aria-hidden="true" />
                        <span className="chat-wait__line chat-wait__line--short" aria-hidden="true" />
                        <span className="chat-wait__label" aria-hidden="true">
                          Thinking
                          <span className="chat-wait__dots">
                            <i />
                            <i />
                            <i />
                          </span>
                        </span>
                      </div>
                    )
                  ) : (
                    message.text
                  )}
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
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault();
                  send(draft);
                }
              }}
            />
          </label>
          <button className="chat-composer__send" type="submit" aria-label="Send" disabled={!draft.trim() || messages.some((message) => message.pending)}>
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
