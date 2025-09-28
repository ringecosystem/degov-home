'use client';

import { JSX, useState, type ComponentProps } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { LazyImage } from '@/components/ui/LazyImage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import {
  AgentVotingIcon,
  DegovXThreadIcon,
  ProposalTrackingIcon
} from '@/components/icons/feature';
import { cn } from '@/lib/utils';

type FeatureTab = {
  id: string;
  label: string;
  Icon: (props: ComponentProps<'svg'>) => JSX.Element;
  screenshot: string;
};

const featureTabs: FeatureTab[] = [
  {
    id: 'proposal-tracking',
    label: 'Proposal Tracking',
    Icon: ProposalTrackingIcon,
    screenshot: '/images/feature/proposal-tracking.png'
  },
  {
    id: 'agent-voting',
    label: 'Agent Voting',
    Icon: AgentVotingIcon,
    screenshot: '/images/feature/agent-voting.png'
  },
  {
    id: 'degovx-thread',
    label: 'DeGovX Thread',
    Icon: DegovXThreadIcon,
    screenshot: '/images/feature/degovx-thread.png'
  }
];

export default function FeatureTabsSection() {
  const [activeTabId, setActiveTabId] = useState(featureTabs[0]?.id ?? '');
  const activeTab = featureTabs.find((tab) => tab.id === activeTabId) ?? featureTabs[0];
  const { ref: tabListRef, animatedStyles: tabListStyles } = useScrollAnimation({ delay: 0.1 });
  const { ref: previewRef, animatedStyles: previewStyles } = useScrollAnimation({ delay: 0.2 });

  return (
    <section className="container flex w-full flex-col items-center justify-center gap-[60px] bg-black">
      <div
        className="flex w-full flex-wrap items-center justify-center gap-[40px]"
        ref={tabListRef}
        style={tabListStyles}
      >
        {featureTabs.map((tab) => {
          const isActive = tab.id === activeTab?.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTabId(tab.id)}
              className={cn(
                'group relative flex cursor-pointer items-center gap-2.5 border-b-2 border-transparent pb-5 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none',
                isActive ? 'text-white' : 'text-[#979797] hover:text-white'
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-[1.05]',
                  isActive ? 'text-white' : 'text-[#979797]'
                )}
              >
                <tab.Icon className="h-6 w-6" />
              </span>
              <span className="text-[26px] font-normal transition-colors duration-200">
                {tab.label}
              </span>
              {isActive ? (
                <motion.span
                  layoutId="featureTabUnderline"
                  className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-white"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        className="relative flex w-full max-w-[1200px] justify-center overflow-hidden rounded-[26px]"
        ref={previewRef}
        style={previewStyles}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab?.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full w-full"
          >
            <LazyImage
              src={activeTab?.screenshot ?? featureTabs[0].screenshot}
              alt={`${activeTab?.label ?? featureTabs[0].label} screenshot`}
              width={1200}
              height={720}
              className="h-auto w-full object-cover"
              priority
              wrapperClassName="h-full w-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
