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
    <section className="flex w-full justify-center bg-black">
      <div className="container flex w-full flex-col gap-14 px-6 pt-24 pb-20 text-white sm:px-10 lg:px-24 lg:pb-24">
        <div className="flex flex-col gap-2.5 text-left">
          <h2 className="text-4xl leading-[54px] font-medium tracking-wide lg:text-6xl lg:leading-[72px]">
            All Your Governance Tools in One Place
          </h2>
          <p className="max-w-[1075px] text-lg leading-8 font-normal text-white/70 lg:text-3xl lg:leading-10">
            Offer a unified platform for governance: proposals, voting and delegation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-14">
          {tools.map((tool) => (
            <article
              key={tool.id}
              className="group flex h-full flex-col gap-7 rounded-[20px] bg-[#202224] p-7 shadow-[6px_6px_54px_rgba(0,0,0,0.05)]"
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '674 / 354' }}>
                <LazyImage
                  src={tool.image}
                  alt={tool.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  wrapperClassName="relative h-full w-full"
                />
              </div>
              <div className="flex flex-col gap-2.5 text-left">
                <h3 className="text-3xl font-semibold text-white lg:text-4xl">{tool.title}</h3>
                <p className="text-xl leading-7 font-normal text-white/70">{tool.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
