import { createHmac, timingSafeEqual } from 'node:crypto';

import { reduceHastEvents } from '@/lib/hast-events';

const DEFAULT_BASE = 'https://backend.hast.so/api/public/v1';
const POLL_INTERVAL_MS = 800;
const POLL_BUDGET_MS = 110_000;

type HastInvoke = {
  session_id?: string;
  request_id?: string;
  after_event_id?: number;
};

export type HastReply = {
  sessionId: string;
  sessionToken: string;
  text: string;
};

function apiKey() {
  const key = process.env.HAST_API_KEY?.trim();
  if (!key) throw new Error('Hast is not configured');
  return key;
}

function baseUrl() {
  return (process.env.HAST_API_BASE?.trim() || DEFAULT_BASE).replace(/\/$/, '');
}

export function sessionToken(sessionId: string) {
  return createHmac('sha256', apiKey()).update(sessionId).digest('hex');
}

const SESSION_ID = /^(?:webhook-[a-f0-9]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

export function validSession(sessionId: string, token: string) {
  if (!SESSION_ID.test(sessionId) || !/^[a-f0-9]{64}$/.test(token)) return false;
  const expected = Buffer.from(sessionToken(sessionId));
  const actual = Buffer.from(token);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

async function hast(path: string, init?: RequestInit) {
  const response = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
    },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Hast returned ${response.status}`);
  }
  return response;
}

export async function askHast(
  prompt: string,
  sessionId: string | undefined,
  onText: (text: string) => void,
  signal?: AbortSignal
) {
  const payload: { prompt: string; session_id?: string } = { prompt };
  if (sessionId) payload.session_id = sessionId;

  const invoked = await hast('/agent/prompts', {
    method: 'POST',
    body: JSON.stringify(payload),
    signal,
  });
  const started = (await invoked.json()) as HastInvoke;
  if (!started.session_id) throw new Error('Hast did not start a session');

  const replySession = started.session_id;
  let after = started.after_event_id ?? 0;
  let text: string | null = null;
  const deadline = Date.now() + POLL_BUDGET_MS;

  while (Date.now() < deadline) {
    if (signal?.aborted) throw new Error('The request was cancelled');
    const page = await hast(`/agent/sessions/${replySession}/events?after=${after}`, { signal });
    const body = (await page.json()) as { events?: unknown[]; has_more?: boolean; next_after?: number };
    const reduced = reduceHastEvents(body.events ?? [], text);
    if (reduced.text && reduced.text !== text) {
      text = reduced.text;
      onText(text);
    } else {
      text = reduced.text;
    }
    if (typeof body.next_after === 'number') after = body.next_after;
    if (reduced.failed) throw new Error('Hast could not finish this answer');
    if (reduced.done) {
      if (!text) throw new Error('Hast finished without an answer');
      return {
        sessionId: replySession,
        sessionToken: sessionToken(replySession),
        text,
      } satisfies HastReply;
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }

  throw new Error('Hast did not finish in time');
}
