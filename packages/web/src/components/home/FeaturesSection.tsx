'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import FeatureCard from './FeatureCard';

const features = [
  {
    id: 'ai-powered',
    title: 'AI-Powered Features',
    description:
      "Leverage AI to enhance your DAO's functionality with proposal analysis, prediction and advanced agent voting.",
    icon: '/images/feature-1.svg'
  },
  {
    id: 'secure',
    title: 'Secure and Reliable',
    description:
      "Built on OpenZeppelin's battle-tested contracts, ensuring the highest level of security for your DAO.",
    icon: '/images/feature-2.svg'
  },
  {
    id: 'transparent',
    title: 'Transparent Governance',
    description:
      'Every decision made within your DAO is transparent on the blockchain. Build trust with clear governance processes.',
    icon: '/images/feature-3.svg'
  },
  {
    id: 'dashboard',
    title: 'User-Friendly Dashboard',
    description:
      'Manage your DAO effortlessly with our intuitive dashboard. Monitor proposals, voting results, and engagement.',
    icon: '/images/feature-4.svg'
  },
  {
    id: 'cross-chain',
    title: 'Cross-Chain Support',
    description:
      'Deploy and manage your DAO across multiple chains with seamless integration and unified management.',
    icon: '/images/feature-5.svg'
  },
  {
    id: 'zero-code',
    title: 'Zero Code Required',
    description:
      'Launch your DAO without writing any code. Our wizard and team handle all the technical details.',
    icon: '/images/feature-6.svg'
  }
];

export default function FeaturesSection() {
  const { ref, animatedStyles } = useScrollAnimation();
  const { ref: ref2, animatedStyles: animatedStyles2 } = useScrollAnimation({
    delay: 0.3
  });

  return (
    <section className="container py-[100px] md:py-[120px]">
      <h2
        className="text-[34px] leading-[120%] font-medium md:text-[70px]"
        ref={ref}
        style={animatedStyles}
      >
        Powerful Features
      </h2>
      <p
        className="mt-[16px] text-[16px] leading-[140%] font-normal opacity-70 md:mt-[10px] md:text-[30px]"
        ref={ref2}
        style={animatedStyles2}
      >
        Unlock powerful benefits for your DAO and foster effortless community growth.
      </p>

      <div className="mt-[20px] grid grid-cols-1 gap-[20px] md:mt-[60px] md:grid-cols-3 md:gap-[60px]">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
