'use client';

import { useId, useState } from 'react';

import { cn } from '@/lib/utils';

interface AccordionItem {
  question: string;
  answer: string | string[];
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number;
  allowMultiple?: boolean;
  className?: string;
}

function Accordion({ items, defaultOpenIndex = 0, allowMultiple = false, className }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex >= 0 ? [defaultOpenIndex] : []
  );

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const isOpen = prev.includes(index);

      if (allowMultiple) {
        if (isOpen) {
          return prev.filter((openIndex) => openIndex !== index);
        }

        return [...prev, index];
      }

      if (isOpen) {
        return [];
      }

      return [index];
    });
  };

  return (
    <div className={cn('flex flex-col', className)}>
      {items.map((item, index) => (
        <AccordionPanel
          key={item.question}
          item={item}
          isOpen={openIndices.includes(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}

interface AccordionPanelProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionPanel({ item, isOpen, onToggle }: AccordionPanelProps) {
  const contentId = useId();
  const answerId = useId();
  const answerText = Array.isArray(item.answer) ? item.answer : [item.answer];

  return (
    <div className="border-b border-white/[0.06]">
      <button
        type="button"
        id={contentId}
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-lg leading-6 font-medium text-white">{item.question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            'h-5 w-5 flex-shrink-0 text-text-secondary transition-transform duration-300',
            !isOpen && 'rotate-180'
          )}
        >
          <path
            d="M10 0.455566C8.07164 0.455566 6.18657 1.02739 4.58319 2.09874C2.97982 3.17008 1.73013 4.69282 0.992179 6.4744C0.254225 8.25598 0.061142 10.2164 0.437348 12.1077C0.813554 13.999 1.74215 15.7363 3.10571 17.0999C4.46928 18.4634 6.20656 19.392 8.09787 19.7682C9.98919 20.1444 11.9496 19.9513 13.7312 19.2134C15.5127 18.4754 17.0355 17.2258 18.1068 15.6224C19.1782 14.019 19.75 12.1339 19.75 10.2056C19.7473 7.62054 18.7192 5.14218 16.8913 3.31429C15.0634 1.4864 12.585 0.458296 10 0.455566ZM14.2806 12.2362C14.211 12.3059 14.1283 12.3612 14.0372 12.399C13.9462 12.4367 13.8486 12.4562 13.75 12.4562C13.6514 12.4562 13.5538 12.4367 13.4628 12.399C13.3718 12.3612 13.289 12.3059 13.2194 12.2362L10 9.01588L6.78063 12.2362C6.71095 12.3059 6.62822 12.3611 6.53718 12.3989C6.44613 12.4366 6.34855 12.456 6.25 12.456C6.15146 12.456 6.05388 12.4366 5.96283 12.3989C5.87179 12.3611 5.78906 12.3059 5.71938 12.2362C5.6497 12.1665 5.59442 12.0838 5.55671 11.9927C5.519 11.9017 5.49959 11.8041 5.49959 11.7056C5.49959 11.607 5.519 11.5094 5.55671 11.4184C5.59442 11.3273 5.6497 11.2446 5.71938 11.1749L9.46938 7.42494C9.53903 7.35521 9.62175 7.29989 9.7128 7.26215C9.80385 7.2244 9.90144 7.20498 10 7.20498C10.0986 7.20498 10.1962 7.2244 10.2872 7.26215C10.3783 7.29989 10.461 7.35521 10.5306 7.42494L14.2806 11.1749C14.3504 11.2446 14.4057 11.3273 14.4434 11.4184C14.4812 11.5094 14.5006 11.607 14.5006 11.7056C14.5006 11.8041 14.4812 11.9017 14.4434 11.9928C14.4057 12.0838 14.3504 12.1665 14.2806 12.2362Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <div
        id={answerId}
        role="region"
        aria-labelledby={contentId}
        className={cn(
          'overflow-hidden transition-all duration-300 ease-out',
          isOpen ? 'max-h-[2000px] pb-5 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="flex flex-col gap-2 text-text-secondary">
          {answerText.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function generateFaqJsonLd(items: AccordionItem[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: Array.isArray(item.answer) ? item.answer.join('\n') : item.answer
      }
    }))
  });
}

export { Accordion, generateFaqJsonLd };
export type { AccordionItem, AccordionProps };
