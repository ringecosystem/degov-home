import { askHast, validSession } from '@/lib/hast';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const MAX_PROMPT = 8_000;

type ChatBody = {
  prompt?: unknown;
  sessionId?: unknown;
  sessionToken?: unknown;
};

function sse(encoder: TextEncoder, data: unknown) {
  return encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
}

export async function POST(request: Request) {
  let body: ChatBody;
  try {
    body = (await request.json()) as ChatBody;
  } catch {
    return Response.json({ error: 'Send a JSON prompt.' }, { status: 400 });
  }

  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt || prompt.length > MAX_PROMPT) {
    return Response.json({ error: 'Enter a shorter question.' }, { status: 400 });
  }

  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
  const sessionToken = typeof body.sessionToken === 'string' ? body.sessionToken : '';
  const continueSession = sessionId && sessionToken && validSession(sessionId, sessionToken) ? sessionId : undefined;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => controller.enqueue(sse(encoder, data));
      try {
        const reply = await askHast(prompt, continueSession, (text) => send({ text }), request.signal);
        send({ text: reply.text, sessionId: reply.sessionId, sessionToken: reply.sessionToken, done: true });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Hast did not answer';
        send({ error: message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
