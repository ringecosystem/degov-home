'use client';

import Script from 'next/script';

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
    <section className="container flex w-full flex-col justify-center gap-[83px] bg-black">
      <header className="flex flex-col gap-2.5 text-left" ref={headerRef} style={headerStyles}>
        <h2 className="text-[60px] leading-[72px] font-medium tracking-wide">
          Frequently Asked Questions
        </h2>
        <p className="text-[30px] leading-[42px] font-normal text-white/70">
          Get answers to common questions about Degov.AI and DAO governance
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12 text-left lg:grid-cols-2 lg:gap-20">
        {faqs.map((faq, index) => (
          <FaqItem key={faq.question} faq={faq} index={index} />
        ))}
      </div>

      <p
        className="text-base leading-snug font-normal text-[#979797] lg:text-lg"
        ref={footerRef}
        style={footerStyles}
      >
        Want to see more FAQs? Check out the full list here:{' '}
        <span className="text-white underline">https://docs.degov.ai/faqs</span>
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

function FaqItem({ faq, index }: { faq: Faq; index: number }) {
  const { ref, animatedStyles } = useScrollAnimation({
    delay: 0.12 * Math.min(index, 3),
    mobileDelay: 0.06 * Math.min(index, 2),
    mobileDuration: 0.18
  });

  return (
    <article ref={ref} style={animatedStyles} className="flex flex-col gap-6">
      <h3 className="text-[32px] leading-[42px] font-medium">{faq.question}</h3>
      <div className="flex flex-col text-[20px] leading-[28px] text-white/70">
        {faq.answer.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
