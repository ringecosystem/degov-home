'use client';

import Script from 'next/script';
import { useId, useState } from 'react';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const faqs = [
  {
    question: 'Does DeGov governance happen on-chain or off-chain?',
    answer: [
      'The answer is on-chain. DeGov governance is built on top of the OpenZeppelin Governor framework, which is an on-chain governance solution. All proposals, voting, and execution of decisions occur on the blockchain, ensuring transparency and immutability.'
    ]
  },
  {
    question: 'How does DeGov.AI utilize AI capabilities?',
    answer: [
      'The capabilities of AI currently include:',
      ' • Explanation of complex proposals in simpler terms with the help of large language models (LLMs).',
      ' • A dedicated agent that can accept delegations from DAO members and vote on their behalf before the voting deadline.',
      'You can also learn more about our agent governance here: https://docs.degov.ai/governance/agent/overview'
    ]
  },
  {
    question: "What's the difference between DeGov.AI and Tally?",
    answer: [
      'Both DeGov.AI and Tally are tools that build on top of the OpenZeppelin Governor framework. However, DeGov.AI has been open-source since day one, while Tally is a closed-source product. Additionally, DeGov actively explores the integration of AI capabilities to enhance the governance experience.'
    ]
  },

  {
    question: "What's the difference between DeGov.AI and Snapshot?",
    answer: [
      "DeGov.AI is an on-chain governance solution built on the OpenZeppelin Governor framework, while Snapshot is an off-chain voting platform. That's the main difference."
    ]
  },
  {
    question: 'How can my DAO get support from DeGov.AI?',
    answer: [
      'Check the integration guide here: https://docs.degov.ai/integration/deploy/, and feel free to reach out to us.'
    ]
  }
];

const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer.join('\n')
    }
  }))
});

export default function FaqSection() {
  const { ref: headerRef, animatedStyles: headerStyles } = useScrollAnimation({ delay: 0.1 });
  const { ref: footerRef, animatedStyles: footerStyles } = useScrollAnimation({ delay: 0.3 });

  return (
    <section className="container flex w-full flex-col justify-center gap-[30px] bg-black lg:gap-[83px]">
      <header className="flex flex-col gap-2.5 text-left" ref={headerRef} style={headerStyles}>
        <h2 className="text-[34px] leading-[40px] font-medium tracking-wide lg:text-[60px] lg:leading-[72px]">
          Frequently Asked Questions
        </h2>
        <p className="text-[16px] leading-[22px] font-normal text-white/70 lg:text-[30px] lg:leading-[42px]">
          Get answers to common questions about Degov.AI and DAO governance
        </p>
      </header>

      <div className="hidden grid-cols-1 text-left lg:grid lg:grid-cols-2 lg:gap-x-[80px] lg:gap-y-[50px]">
        {faqs.map((faq, index) => (
          <FaqItem key={faq.question} faq={faq} index={index} />
        ))}
      </div>

      <div className="flex flex-col text-left lg:hidden">
        {faqs.map((faq, index) => (
          <FaqAccordionItem key={faq.question} faq={faq} index={index} />
        ))}
      </div>

      <p
        className="text-[16px] leading-[22px] font-normal text-[#979797] lg:text-[20px] lg:leading-[28px]"
        ref={footerRef}
        style={footerStyles}
      >
        Want to see more FAQs? Check out the full list here:{' '}
        <a
          className="text-white underline transition-opacity duration-200 hover:opacity-70"
          href="https://docs.degov.ai/faqs"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://docs.degov.ai/faqs
        </a>
      </p>
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
    </section>
  );
}

type Faq = (typeof faqs)[number];

type AnswerSection =
  | {
      type: 'paragraph';
      content: string;
    }
  | {
      type: 'list';
      items: string[];
    };

function getAnswerSections(answer: string[]): AnswerSection[] {
  const sections: AnswerSection[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length === 0) {
      return;
    }

    sections.push({ type: 'list', items: currentList });
    currentList = [];
  };

  answer.forEach((segment) => {
    const trimmed = segment.trim();

    if (!trimmed) {
      return;
    }

    const withoutLeadingSpaces = segment.trimStart();

    if (withoutLeadingSpaces.startsWith('•')) {
      const listItem = withoutLeadingSpaces.slice(1).trim();

      if (listItem) {
        currentList.push(listItem);
      }

      return;
    }

    flushList();
    sections.push({ type: 'paragraph', content: trimmed });
  });

  flushList();

  return sections;
}

function FaqContent({ answer, className }: { answer: string[]; className?: string }) {
  const sections = getAnswerSections(answer);
  const containerClassName = ['flex flex-col text-white/70', className].filter(Boolean).join(' ');

  return (
    <div className={containerClassName}>
      {sections.map((section, index) => {
        if (section.type === 'list') {
          return (
            <ul key={`list-${index}`} className="list-disc pl-6 marker:text-white">
              {section.items.map((item, itemIndex) => (
                <li key={`list-${index}-item-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          );
        }

        return <p key={`paragraph-${index}`}>{section.content}</p>;
      })}
    </div>
  );
}

function FaqItem({ faq, index }: { faq: Faq; index: number }) {
  const { ref, animatedStyles } = useScrollAnimation({
    delay: 0.12 * Math.min(index, 3),
    mobileDelay: 0.06 * Math.min(index, 2),
    mobileDuration: 0.18
  });

  return (
    <article ref={ref} style={animatedStyles} className="flex flex-col gap-6">
      <h3 className="text-[32px] leading-[42px] font-medium">{faq.question}</h3>
      <FaqContent answer={faq.answer} className="gap-4 text-[20px] leading-[28px]" />
    </article>
  );
}

function FaqAccordionItem({ faq, index }: { faq: Faq; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const contentId = useId();
  const { ref, animatedStyles } = useScrollAnimation({
    delay: 0.08 * Math.min(index, 3),
    mobileDelay: 0.05 * Math.min(index, 3),
    mobileDuration: 0.22
  });

  return (
    <article ref={ref} style={animatedStyles}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-lg leading-6 font-medium text-white">{faq.question}</span>

        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 flex-shrink-0 text-white transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M10 0.455566C8.07164 0.455566 6.18657 1.02739 4.58319 2.09874C2.97982 3.17008 1.73013 4.69282 0.992179 6.4744C0.254225 8.25598 0.061142 10.2164 0.437348 12.1077C0.813554 13.999 1.74215 15.7363 3.10571 17.0999C4.46928 18.4634 6.20656 19.392 8.09787 19.7682C9.98919 20.1444 11.9496 19.9513 13.7312 19.2134C15.5127 18.4754 17.0355 17.2258 18.1068 15.6224C19.1782 14.019 19.75 12.1339 19.75 10.2056C19.7473 7.62054 18.7192 5.14218 16.8913 3.31429C15.0634 1.4864 12.585 0.458296 10 0.455566ZM14.2806 12.2362C14.211 12.3059 14.1283 12.3612 14.0372 12.399C13.9462 12.4367 13.8486 12.4562 13.75 12.4562C13.6514 12.4562 13.5538 12.4367 13.4628 12.399C13.3718 12.3612 13.289 12.3059 13.2194 12.2362L10 9.01588L6.78063 12.2362C6.71095 12.3059 6.62822 12.3611 6.53718 12.3989C6.44613 12.4366 6.34855 12.456 6.25 12.456C6.15146 12.456 6.05388 12.4366 5.96283 12.3989C5.87179 12.3611 5.78906 12.3059 5.71938 12.2362C5.6497 12.1665 5.59442 12.0838 5.55671 11.9927C5.519 11.9017 5.49959 11.8041 5.49959 11.7056C5.49959 11.607 5.519 11.5094 5.55671 11.4184C5.59442 11.3273 5.6497 11.2446 5.71938 11.1749L9.46938 7.42494C9.53903 7.35521 9.62175 7.29989 9.7128 7.26215C9.80385 7.2244 9.90144 7.20498 10 7.20498C10.0986 7.20498 10.1962 7.2244 10.2872 7.26215C10.3783 7.29989 10.461 7.35521 10.5306 7.42494L14.2806 11.1749C14.3504 11.2446 14.4057 11.3273 14.4434 11.4184C14.4812 11.5094 14.5006 11.607 14.5006 11.7056C14.5006 11.8041 14.4812 11.9017 14.4434 11.9928C14.4057 12.0838 14.3504 12.1665 14.2806 12.2362Z"
            fill="#979797"
            style={{
              fill: '#979797',
              fillOpacity: 1
            }}
          />
        </svg>
      </button>
      <div
        id={contentId}
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-[480px] pb-5' : 'max-h-0'
        }`}
      >
        <FaqContent answer={faq.answer} className="gap-3 text-base leading-6" />
      </div>
    </article>
  );
}
