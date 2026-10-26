export type HastPoll = {
  text: string | null;
  done: boolean;
  failed: boolean;
};

type HastEvent = {
  type?: unknown;
  data?: unknown;
};

function eventData(event: HastEvent): Record<string, unknown> {
  return event.data && typeof event.data === 'object' ? (event.data as Record<string, unknown>) : {};
}

export function reduceHastEvents(events: unknown[], priorText: string | null): HastPoll {
  let text = priorText;
  let done = false;
  let failed = false;

  for (const event of events) {
    if (!event || typeof event !== 'object') continue;
    const record = event as HastEvent;
    const type = typeof record.type === 'string' ? record.type : '';
    const data = eventData(record);
    const role = typeof data.role === 'string' ? data.role : '';
    const piece = typeof data.text === 'string' ? data.text : '';

    if (role === 'assistant' && piece && (type === 'message.completed' || type === 'message.delta')) {
      text = type === 'message.delta' ? `${text ?? ''}${piece}` : piece;
    }
    if (type === 'run.completed') done = true;
    if (type === 'run.failed' || type === 'run.interrupted') failed = true;
  }

  return { text, done: done || failed, failed };
}
