'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/ui/Empty';
import { LazyImage } from '@/components/ui/LazyImage';
import { SectionLabel } from '@/components/ui/section-label';
import { SectionWrapper } from '@/components/ui/section-wrapper';

import { fetchTopDaos, type DaoSummary } from '@/lib/degov';
import { formatNetworkName, formatTimeAgo } from '@/lib/formatters';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function formatNumber(value: number) {
  return value.toLocaleString();
}

type EcosystemSectionClientProps = {
  initialDaos: DaoSummary[];
  initialError: string | null;
};

export function EcosystemSectionClient({ initialDaos, initialError }: EcosystemSectionClientProps) {
  const { ref: headingRef, animatedStyles: headingStyles } = useScrollAnimation({ delay: 0.1 });
  const { ref: listRef, animatedStyles: listStyles } = useScrollAnimation({ delay: 0.2 });
  const { ref: buttonRef, animatedStyles: buttonStyles } = useScrollAnimation({ delay: 0.3 });

  const {
    data: daoData,
    isLoading,
    isFetching,
    error,
    isFetchedAfterMount
  } = useQuery({
    queryKey: ['top-daos'],
    queryFn: () => fetchTopDaos(5),
    initialData: initialDaos,
    staleTime: 60 * 1000,
    retry: 1
  });

  const daoList = daoData ?? [];

  const effectiveError = useMemo(() => {
    if (error) return error instanceof Error ? error.message : 'Unknown error';
    if (!isFetchedAfterMount) return initialError;
    return null;
  }, [error, initialError, isFetchedAfterMount]);

  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <div
      key={`skeleton-${index}`}
      className="inline-flex w-full animate-pulse items-center justify-start border-b border-white/[0.06] py-3"
    >
      <div className="flex w-96 items-center gap-2.5 px-5">
        <div className="h-8 w-8 rounded-full bg-white/[0.06]" />
        <div className="h-5 w-32 rounded bg-white/[0.06]" />
      </div>
      <div className="flex flex-1 items-center gap-2.5 px-5">
        <div className="h-6 w-6 rounded-full bg-white/[0.06]" />
        <div className="h-5 w-24 rounded bg-white/[0.06]" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-1 px-5">
        <div className="h-5 w-28 rounded bg-white/[0.06]" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-1 px-5">
        <div className="h-5 w-16 rounded bg-white/[0.06]" />
      </div>
    </div>
  ));

  return (
    <SectionWrapper className="relative overflow-hidden">
      <div className="flex flex-col gap-5 lg:gap-6">
        <div
          id="ecosystem"
          className="flex scroll-mt-[88px] flex-col gap-2.5 text-left lg:scroll-mt-[104px]"
          ref={headingRef}
          style={headingStyles}
        >
          <SectionLabel>Ecosystem</SectionLabel>
          <h2 className="text-text-primary text-4xl font-bold tracking-[-0.03em] lg:text-6xl">
            DAOs Using DeGov
          </h2>
        </div>

        <div ref={listRef} style={listStyles} className="text-text-primary self-stretch">
          <div className="inline-flex w-full items-center justify-start rounded-[14px] bg-white/[0.05]">
            <div className="flex w-full items-center px-5 py-[15px] lg:w-96">
              <div className="text-text-primary text-xs font-semibold">Name</div>
            </div>
            <div className="hidden flex-1 items-center px-5 py-[15px] lg:flex">
              <div className="text-text-primary text-xs font-semibold">Network</div>
            </div>
            <div className="hidden flex-1 items-center px-5 py-[15px] lg:flex">
              <div className="text-text-primary text-xs font-semibold">Last Proposal</div>
            </div>
            <div className="hidden flex-1 items-center justify-center px-5 py-[15px] lg:flex">
              <div className="text-text-primary text-xs font-semibold">Proposals</div>
            </div>
          </div>

          {effectiveError ? (
            <div className="w-full border-b border-white/[0.06] p-5 text-center text-sm text-red-400">
              {effectiveError}
            </div>
          ) : null}

          {isLoading && !initialDaos.length ? skeletonRows : null}

          {!isLoading && !isFetching && daoList.length === 0 && !effectiveError ? (
            <div className="flex w-full justify-center border-b border-white/[0.06] py-10">
              <Empty label="No DAOs available." />
            </div>
          ) : null}

          {daoList.map((dao: DaoSummary, index: number) => {
            const isActiveDao = dao.chips.some(
              (chip) => chip.chipCode === 'METRICS_STATE' && chip.flag === 'ACTIVE'
            );
            const networkLabel = formatNetworkName(dao.network ?? undefined);
            const lastProposalTimestamp = dao.lastProposal?.proposalCreatedAt ?? '';
            const lastProposalLabel = lastProposalTimestamp
              ? formatTimeAgo(lastProposalTimestamp)
              : '';
            const isLastRow = index === daoList.length - 1;
            const daoDashboardUrl =
              dao.endpoint ??
              (dao.code ? `https://square.degov.ai/dao/${dao.code}` : 'https://square.degov.ai/');

            return (
              <div
                key={dao.id}
                className={`inline-flex w-full items-center justify-start transition-colors hover:bg-white/[0.02] ${
                  isLastRow ? '' : 'border-b border-white/[0.06]'
                }`}
              >
                <div className="flex w-full items-center gap-2.5 px-5 py-3 lg:w-96">
                  {dao.logo ? (
                    <LazyImage
                      src={dao.logo}
                      alt={`${dao.name} logo`}
                      width={34}
                      height={34}
                      className="h-[34px] w-[34px] rounded-full object-cover"
                    />
                  ) : (
                    <div className="bg-bg-elevated flex h-[34px] w-[34px] items-center justify-center rounded-full text-[16px] text-white/70">
                      {dao.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2.5">
                      <Link
                        href={daoDashboardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-primary hover:text-text-primary/80 text-base leading-snug transition-colors"
                      >
                        {dao.name}
                      </Link>
                      {isActiveDao ? <Badge variant="highlight">Active</Badge> : null}
                    </div>
                  </div>
                </div>
                <div className="hidden flex-1 items-center gap-2.5 px-5 py-3 lg:flex">
                  {dao.networkLogo ? (
                    <LazyImage
                      src={dao.networkLogo}
                      alt={`${dao.network ?? 'Network'} logo`}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="bg-bg-elevated h-6 w-6 rounded-full" />
                  )}
                  <span className="text-text-primary text-base leading-snug">{networkLabel}</span>
                </div>
                <div className="hidden flex-1 flex-col items-start gap-1 px-5 py-3 text-left lg:flex">
                  {dao.lastProposal?.proposalLink ? (
                    <Link
                      href={dao.lastProposal.proposalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary text-base underline-offset-4 hover:underline"
                    >
                      {lastProposalLabel || '-'}
                    </Link>
                  ) : (
                    <span className="text-text-primary text-base">No proposals yet</span>
                  )}
                </div>
                <div className="hidden flex-1 flex-col items-center gap-1 px-5 py-3 lg:flex">
                  <span className="text-text-primary text-base">{formatNumber(dao.proposals)}</span>
                </div>
              </div>
            );
          })}

          {isFetching && !isLoading ? (
            <div className="w-full border-b border-transparent p-2 text-center text-xs text-white/40">
              Refreshing…
            </div>
          ) : null}
        </div>

        <div ref={buttonRef} style={buttonStyles}>
          <Button
            variant="secondary"
            arrow
            className="w-full justify-between lg:w-auto lg:justify-center"
            href="https://square.degov.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore All on Square
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
