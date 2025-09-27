import { LazyImage } from '@/components/ui/LazyImage';

const tools = [
  {
    id: 'user-friendly-interface',
    title: 'User Friendly Interface',
    description:
      'Well-designed and intuitive interface for easy navigation and management of proposals, voting and delegation.',
    image: '/images/tools/user-friendly-interface.png'
  },
  {
    id: 'real-time-proposal-tracking',
    title: 'Real-time Proposal Tracking',
    description: 'Real-time updates on proposal status, voting progress, and community engagement.',
    image: '/images/tools/real-time-proposal-tracking.png'
  },
  {
    id: 'delegate-voting-power',
    title: 'Delegate Voting Power',
    description:
      'Allows users to delegate their voting power to trusted community members, enhancing participation and decision-making.',
    image: '/images/tools/delegate-voting-power.png'
  },
  {
    id: 'transparent-treasury-management',
    title: 'Transparent Treasury Management',
    description:
      'Provides a clear view of treasury assets, liabilities, and overall financial health.',
    image: '/images/tools/treasury.png'
  }
];

export default function ToolsSection() {
  return (
    <section className="container flex w-full flex-col justify-center gap-[60px] bg-black">
      <div className="flex flex-col gap-2.5 text-left">
        <h2 className="text-[60px] leading-[72px] font-medium tracking-wide">
          All Your Governance Tools in One Place
        </h2>
        <p className="text-[30px] leading-[42px] font-normal text-white/70">
          Offer a unified platform for governance: proposals, voting and delegation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-2 lg:gap-[60px]">
        {tools.map((tool) => (
          <article
            key={tool.id}
            className="group flex h-full flex-col gap-[30px] rounded-[20px] bg-[#202224] p-[30px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)]"
          >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '674 / 354' }}>
              <LazyImage
                src={tool.image}
                alt={tool.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="rounded-[10px] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                wrapperClassName="relative h-full w-full"
              />
            </div>

            <div className="flex flex-col gap-2.5 text-left">
              <h3 className="text-[40px] font-semibold text-white">{tool.title}</h3>
              <p className="text-[20px] font-normal text-white/70">{tool.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
