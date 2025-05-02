import FaqItem from "./FaqItem";
import Link from "next/link";
const faqItems = [
  {
    question: "How does DeGov.AI compare to traditional DAO platforms?",
    answer:
      "Degov.AI offers AI-powered analytics and decision support that traditional tools lack. Our platform is designed to simplify governance while providing deeper insights into proposal outcomes, voting patterns, and treasury management. Unlike most tools, we offer cross-chain deployment options and require zero coding knowledge.",
  },
  {
    question: "How does DeGov.AI ensure security?",
    answer:
      "Degov.AI is built on OpenZeppelin's battle-tested contracts, ensuring the highest level of security for your DAO. We also conduct regular audits and security assessments to maintain the integrity of our platform. All the contracts are open-source, allowing the community to review and verify our code.",
  },
  {
    question: "Is coding knowledge required to create a DAO?",
    answer:
      "Absolutely not. Our expert team are always available to assist you in creating your DAO, you can submit your DAO's information through our user-friendly wizard, and we will handle the technical details.",
  },
  {
    question: "How does AI enhance DAO governance?",
    answer:
      "Our AI analyzes governance patterns, evaluates proposal language for clarity and potential conflicts, predicts voting outcomes based on historical data, and identifies optimal timing for proposal submission. It also provides treasury management recommendations and governance optimization suggestions.",
  },
  {
    question: "Which blockchain are supported?",
    answer:
      "Degov.AI currently supports Ethereum, Arbitrum, Base, and Ethereum Sepolia. We are continuously adding support for additional networks based on community demand and emerging standards.",
  },
  {
    question: "How does Degov.AI handle cross-chain actions?",
    answer:
      "Degov.AI allows you to create and manage DAOs across multiple chains by integrating with the Msgport protocol. This enables cross-chain proposal creation, voting, and execution. You can easily manage your DAO's governance across different networks without the need for complex setups.",
  },
  {
    question: "Can I migrate my existing DAO to Degov.AI?",
    answer:
      "Yes, you can migrate your existing DAO to Degov.AI as long as it is built on compatible smart contracts from OpenZeppelin. Our team will assist you in the migration process to ensure a smooth transition.",
  },
  {
    question:
      "Does DeGov.AI support other governance frameworks besides OpenZeppelin?",
    answer:
      "Currently, DeGov.AI exclusively supports OpenZeppelin's governance framework. This focus allows us to provide a robust and user-friendly experience. However, we may consider supporting other frameworks in the future based on user demand and feedback.",
  },
];
export default function FaqSection() {
  return (
    <section className="py-[120px] container">
      <h2 className="text-[70px] font-semibold leading-[120%]">
        Frequently Asked Questions
      </h2>
      <p className="text-[30px] font-normal leading-[140%] mt-[10px] opacity-70">
        Get answers to common questions about Degov.AI and DAO governance
      </p>

      <div className="my-[83px] grid grid-cols-2 gap-x-[80px] gap-y-[50px]">
        {faqItems.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
      <p className="text-[20px] text-[#979797] font-normal leading-[140%] text-right">
        Still have questions? Contact our{" "}
        <Link
          href="https://t.me/deGovAI_Support"
          target="_blank"
          className="text-[var(--foreground)] underline hover:opacity-80 transition-opacity duration-300"
        >
          support team
        </Link>{" "}
        or join our{" "}
        <Link
          href="https://t.me/deGovAI_Community"
          target="_blank"
          className="text-[var(--foreground)] underline hover:opacity-80 transition-opacity duration-300"
        >
          community Telegram
        </Link>
      </p>
    </section>
  );
}
