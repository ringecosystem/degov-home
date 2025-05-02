import FeatureCard from "./FeatureCard";

const features = [
  {
    id: "ai-powered",
    title: "AI-Powered Features",
    description:
      "Leverage AI to enhance your DAO's functionality with proposal analysis, prediction and advanced agent voting.",
    icon: "/images/feature-1.svg",
  },
  {
    id: "secure",
    title: "Secure and Reliable",
    description:
      "Built on OpenZeppelin's battle-tested contracts, ensuring the highest level of security for your DAO.",
    icon: "/images/feature-2.svg",
  },
  {
    id: "transparent",
    title: "Transparent Governance",
    description:
      "Every decision made within your DAO is transparent on the blockchain. Build trust with clear governance processes.",
    icon: "/images/feature-3.svg",
  },
  {
    id: "dashboard",
    title: "User-Friendly Dashboard",
    description:
      "Manage your DAO effortlessly with our intuitive dashboard. Monitor proposals, voting results, and engagement.",
    icon: "/images/feature-4.svg",
  },
  {
    id: "cross-chain",
    title: "Cross-Chain Support",
    description:
      "Deploy and manage your DAO across multiple chains with seamless integration and unified management.",
    icon: "/images/feature-5.svg",
  },
  {
    id: "zero-code",
    title: "Zero Code Required",
    description:
      "Launch your DAO without writing any code. Our wizard and team handle all the technical details.",
    icon: "/images/feature-6.svg",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-[120px] container">
      <h2 className="text-[70px] font-semibold leading-[120%]">
        Powerful Features
      </h2>
      <p className="text-[30px] font-normal leading-[140%] mt-[10px] opacity-70">
        Unlock powerful benefits for your DAO and foster effortless community
        growth.
      </p>

      <div className="mt-[60px] grid grid-cols-3 gap-[60px]">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
}
