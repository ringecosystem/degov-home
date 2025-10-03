'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Empty } from '@/components/ui/Empty';
import { LazyImage } from '@/components/ui/LazyImage';
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
      className="inline-flex w-full animate-pulse items-center justify-start border-b border-[#474747] py-5"
    >
      <div className="flex w-96 items-center gap-2.5 px-5">
        <div className="h-8 w-8 rounded-full bg-[#3a3a3a]" />
        <div className="h-5 w-32 rounded bg-[#3a3a3a]" />
      </div>
      <div className="flex flex-1 items-center gap-2.5 px-5">
        <div className="h-6 w-6 rounded-full bg-[#3a3a3a]" />
        <div className="h-5 w-24 rounded bg-[#3a3a3a]" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-1 px-5">
        <div className="h-5 w-28 rounded bg-[#3a3a3a]" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-1 px-5">
        <div className="h-5 w-16 rounded bg-[#3a3a3a]" />
      </div>
    </div>
  ));

  return (
    <section className="container flex w-full flex-col justify-center gap-[30px] bg-black lg:gap-[60px]">
      <div
        className="flex flex-col gap-2.5 text-left text-white"
        ref={headingRef}
        style={headingStyles}
      >
        <h2 className="text-[34px] leading-[40px] font-medium tracking-wide lg:text-[60px] lg:leading-[72px]">
          Explore the DAOs in our ecosystem
        </h2>
        <p className="text-[16px] leading-[24px] font-normal text-white/70 lg:text-[30px] lg:leading-[42px]">
          Helping our partner DAOs build stronger, more resilient communities.
        </p>
      </div>

      <div
        className="self-stretch rounded-[14px] bg-[#202224] p-5 text-white"
        ref={listRef}
        style={listStyles}
      >
        <div className="inline-flex w-full items-center justify-start rounded-[14px] bg-[#2E2E2E]">
          <div className="flex w-96 items-center px-5 py-[15px]">
            <div className="text-xs font-semibold text-white">Name</div>
          </div>
          <div className="hidden flex-1 items-center px-5 py-[15px] lg:flex">
            <div className="text-xs font-semibold text-white">Network</div>
          </div>
          <div className="hidden flex-1 items-center px-5 py-[15px] lg:flex">
            <div className="text-xs font-semibold text-white">Last Proposal</div>
          </div>
          <div className="hidden flex-1 items-center justify-center px-5 py-[15px] lg:flex">
            <div className="text-xs font-semibold text-white">Proposals</div>
          </div>
        </div>

        {effectiveError ? (
          <div className="w-full border-b border-[#474747] p-5 text-center text-sm text-red-400">
            {effectiveError}
          </div>
        ) : null}

        {isLoading && !initialDaos.length ? skeletonRows : null}

        {!isLoading && !isFetching && daoList.length === 0 && !effectiveError ? (
          <div className="flex w-full justify-center border-b border-[#474747] py-10">
            <Empty label="No DAOs available." />
          </div>
        ) : null}

        {daoList.map((dao, index) => {
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
            (dao.code ? `https://app.degov.io/dao/${dao.code}` : 'https://app.degov.io/');

          return (
            <div
              key={dao.id}
              className={`inline-flex w-full items-center justify-start ${
                isLastRow ? '' : 'border-b border-[#474747]'
              }`}
            >
              <div className="flex w-96 items-center gap-2.5 p-5">
                {dao.logo ? (
                  <LazyImage
                    src={dao.logo}
                    alt={`${dao.name} logo`}
                    width={34}
                    height={34}
                    className="h-[34px] w-[34px] rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#2a2a2a] text-[16px] text-white/70">
                    {dao.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-1 items-center gap-[10px]">
                  <Link
                    href={daoDashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base leading-snug text-white transition-colors hover:text-white/80"
                  >
                    {dao.name}
                  </Link>
                  {isActiveDao ? (
                    <span className="rounded-[100px] bg-[#00B7FF0D] px-2.5 py-[5px] text-xs font-medium text-[#00B7FF]">
                      Active
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="hidden flex-1 items-center gap-2.5 p-5 lg:flex">
                {dao.networkLogo ? (
                  <LazyImage
                    src={dao.networkLogo}
                    alt={`${dao.network ?? 'Network'} logo`}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-[#2a2a2a]" />
                )}
                <span className="text-base leading-snug text-white">{networkLabel}</span>
              </div>
              <div className="hidden flex-1 flex-col items-start gap-1 p-5 text-left lg:flex">
                {dao.lastProposal?.proposalLink ? (
                  <Link
                    href={dao.lastProposal.proposalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-white underline-offset-4 hover:underline"
                  >
                    {lastProposalLabel || '-'}
                  </Link>
                ) : (
                  <span className="text-base text-white">No proposals yet</span>
                )}
              </div>
              <div className="hidden flex-1 flex-col items-center gap-1 p-5 lg:flex">
                <span className="text-base text-white">{formatNumber(dao.proposals)}</span>
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

      <Link
        href="https://square.degov.ai"
        className="inline-flex w-full cursor-pointer items-center justify-between rounded-full border border-white px-[30px] py-2.5 text-[16px] font-medium text-white lg:w-[210px] lg:justify-center lg:text-[24px] lg:tracking-[-0.24px]"
        ref={buttonRef}
        style={buttonStyles}
        target="_blank"
        rel="noopener noreferrer"
      >
        View All DAOs
        <LazyImage
          src={'/images/arrow-light.svg'}
          alt="arrow"
          width={13}
          height={15}
          className="block lg:hidden"
        />
      </Link>
    </section>
  );
}
