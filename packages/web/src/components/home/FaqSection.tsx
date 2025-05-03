'use client';

import FaqItem from './FaqItem';
import FaqItemMobile from './FaqItemMobile';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
const faqItems = [
  {
    question: 'How does DeGov.AI compare to traditional DAO platforms?',
    answer:
      'Degov.AI offers AI-powered analytics and decision support that traditional tools lack. Our platform is designed to simplify governance while providing deeper insights into proposal outcomes, voting patterns, and treasury management. Unlike most tools, we offer cross-chain deployment options and require zero coding knowledge.'
  },
  {
    question: 'How does DeGov.AI ensure security?',
    answer:
      "Degov.AI is built on OpenZeppelin's battle-tested contracts, ensuring the highest level of security for your DAO. We also conduct regular audits and security assessments to maintain the integrity of our platform. All the contracts are open-source, allowing the community to review and verify our code."
  },
  {
    question: 'Is coding knowledge required to create a DAO?',
    answer:
      "Absolutely not. Our expert team are always available to assist you in creating your DAO, you can submit your DAO's information through our user-friendly wizard, and we will handle the technical details."
  },
  {
    question: 'How does AI enhance DAO governance?',
    answer:
      'Our AI analyzes governance patterns, evaluates proposal language for clarity and potential conflicts, predicts voting outcomes based on historical data, and identifies optimal timing for proposal submission. It also provides treasury management recommendations and governance optimization suggestions.'
  },
  {
    question: 'Which blockchain are supported?',
    answer:
      'Degov.AI currently supports Ethereum, Arbitrum, Base, and Ethereum Sepolia. We are continuously adding support for additional networks based on community demand and emerging standards.'
  },
  {
    question: 'How does Degov.AI handle cross-chain actions?',
    answer:
      "Degov.AI allows you to create and manage DAOs across multiple chains by integrating with the Msgport protocol. This enables cross-chain proposal creation, voting, and execution. You can easily manage your DAO's governance across different networks without the need for complex setups."
  },
  {
    question: 'Can I migrate my existing DAO to Degov.AI?',
    answer:
      'Yes, you can migrate your existing DAO to Degov.AI as long as it is built on compatible smart contracts from OpenZeppelin. Our team will assist you in the migration process to ensure a smooth transition.'
  },
  {
    question: 'Does DeGov.AI support other governance frameworks besides OpenZeppelin?',
    answer:
      "Currently, DeGov.AI exclusively supports OpenZeppelin's governance framework. This focus allows us to provide a robust and user-friendly experience. However, we may consider supporting other frameworks in the future based on user demand and feedback."
  }
];
export default function FaqSection() {
  const { ref, animatedStyles } = useScrollAnimation();
  const { ref: ref2, animatedStyles: animatedStyles2 } = useScrollAnimation({
    delay: 0.3
  });
  const { ref: ref3, animatedStyles: animatedStyles3 } = useScrollAnimation({
    delay: 0.6
  });
  const { ref: ref4, animatedStyles: animatedStyles4 } = useScrollAnimation({
    delay: 0.6
  });
  return (
    <section className="container py-[100px] md:py-[120px]">
      <h2
        className="text-[34px] leading-[120%] font-semibold md:text-[70px]"
        ref={ref}
        style={animatedStyles}
      >
        Frequently Asked Questions
      </h2>
      <p
        className="mt-[16px] text-[16px] leading-[140%] font-normal opacity-70 md:mt-[10px] md:text-[30px]"
        ref={ref2}
        style={animatedStyles2}
      >
        Get answers to common questions about Degov.AI and DAO governance
      </p>

      <div
        className="grid-col-1 my-[30px] hidden gap-x-[0] gap-y-[30px] md:my-[83px] md:grid md:grid-cols-2 md:gap-x-[80px] md:gap-y-[50px]"
        ref={ref3}
        style={animatedStyles3}
      >
        {faqItems.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
      <div className="grid-col-1 my-[30px] grid gap-x-[0] gap-y-[30px] md:my-[83px] md:hidden md:grid-cols-2 md:gap-x-[80px] md:gap-y-[50px]">
        {faqItems.map((item, index) => (
          <FaqItemMobile key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
      <p
        className="mt-[30px] text-left text-[16px] leading-[140%] font-normal text-[#979797] md:mt-0 md:text-right md:text-[20px]"
        ref={ref4}
        style={animatedStyles4}
      >
        Still have questions? Contact our{' '}
        <Link
          href="https://t.me/deGovAI_Support"
          target="_blank"
          className="text-[var(--foreground)] underline transition-opacity duration-300 hover:opacity-80"
        >
          support team
        </Link>{' '}
        or join our{' '}
        <Link
          href="https://t.me/deGovAI_Community"
          target="_blank"
          className="text-[var(--foreground)] underline transition-opacity duration-300 hover:opacity-80"
        >
          community Telegram
        </Link>
      </p>
    </section>
  );
}
