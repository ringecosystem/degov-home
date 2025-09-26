import { LazyImage } from '@/components/ui/LazyImage';

const stories = [
  {
    id: 'always-available',
    title: 'degov-agent.eth: Always Available',
    description:
      'The degov-agent.eth is always available to accept delegations, vote on your behalf, and provide explanations of complex proposals.',
    image: '/images/storytelling/agent.png',
    reverse: false,
    width: 780,
    height: 608.7,
    bordered: true
  },
  {
    id: 'updates-on-x',
    title: 'Automated Proposal Updates on X',
    description:
      'Catch up the latest progress of the proposals on the DeGovX account on X (formerly Twitter).',
    image: '/images/storytelling/automated-proposal-updates-on-x.png',
    reverse: true,
    width: 780,
    height: 562,
    bordered: false
  },
  {
    id: 'never-misses-deadlines',
    title: 'Agent Voting Never Misses Deadlines',
    description:
      'The degov-agent.eth ensures that your votes are always cast before the voting deadline, even if you are busy or forgetful.',
    image: '/images/storytelling/agent-voting-never-misses-deadlines.png',
    reverse: false,
    width: 780,
    height: 517,
    bordered: true
  }
];

export default function StorytellingSection() {
  return (
    <section className="flex w-full justify-center bg-black">
      <div className="container flex w-full flex-col gap-16 px-6 pt-24 pb-20 text-white sm:px-10 lg:px-24 lg:pb-24">
        <div className="flex flex-col gap-2.5 text-left">
          <h2 className="text-4xl leading-[54px] font-medium tracking-wide lg:text-6xl lg:leading-[72px]">
            Agent governance unlocks new possibilities
          </h2>
          <p className="text-lg leading-8 font-normal text-white/70 lg:text-3xl lg:leading-10">
            Empower the latest AI technology to change the way we govern.
          </p>
        </div>

        <div className="flex flex-col items-center gap-[71px]">
          {stories.map((story) => (
            <StoryBlock key={story.id} {...story} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryBlock({
  title,
  description,
  image,
  reverse,
  width,
  height,
  bordered
}: {
  title: string;
  description: string;
  image: string;
  reverse: boolean;
  width: number;
  height: number;
  bordered: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 ${
        reverse ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-[20px] ${
          bordered ? 'border border-white/10' : ''
        }`}
        style={{ maxWidth: `${width}px` }}
      >
        <LazyImage
          src={image}
          alt={title}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 780px, 100vw"
          className="h-auto w-full object-cover"
          wrapperClassName="block w-full"
        />
      </div>

      <div className="flex w-full max-w-[384px] flex-col gap-7 text-left text-white">
        <h3 className="text-3xl font-semibold lg:text-4xl">{title}</h3>
        <p className="text-2xl leading-9 font-normal text-white/70">{description}</p>
      </div>
    </div>
  );
}
