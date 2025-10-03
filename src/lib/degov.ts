const GRAPHQL_ENDPOINT = 'https://api.degov.ai/graphql';
const DEFAULT_FETCH_TIMEOUT_MS = 8000;

const DAO_QUERY = /* GraphQL */ `
  query TopDaos {
    daos {
      id
      name
      code
      endpoint
      logo
      chainName
      chainLogo
      metricsCountProposals
      tags
      chips {
        id
        chipCode
        flag
      }
      lastProposal {
        proposalLink
        proposalCreatedAt
      }
    }
  }
`;

type DaoChip = {
  id: string;
  chipCode: string;
  flag?: string | null;
};

type DaoLastProposal = {
  proposalLink?: string | null;
  proposalCreatedAt?: string | null;
};

type Dao = {
  id: string;
  name: string;
  code: string;
  endpoint?: string | null;
  logo?: string | null;
  chainName?: string | null;
  chainLogo?: string | null;
  metricsCountProposals?: number | null;
  tags?: string[] | null;
  chips?: DaoChip[] | null;
  lastProposal?: DaoLastProposal | null;
};

type GraphqlResponse = {
  data?: {
    daos?: Dao[] | null;
  };
  errors?: { message?: string }[];
};

export type DaoSummary = {
  id: string;
  code: string | null;
  endpoint: string | null;
  name: string;
  logo: string | null;
  network: string | null;
  networkLogo: string | null;
  proposals: number;
  tags: string[];
  chips: DaoChip[];
  lastProposal?: DaoLastProposal | null;
};

function mapDao(dao: Dao): DaoSummary {
  return {
    id: dao.id,
    code: dao.code ?? null,
    endpoint: dao.endpoint ?? null,
    name: dao.name,
    logo: dao.logo ?? null,
    network: dao.chainName ?? null,
    networkLogo: dao.chainLogo ?? null,
    proposals: dao.metricsCountProposals ?? 0,
    tags: dao.tags ?? [],
    chips: dao.chips ?? [],
    lastProposal: dao.lastProposal ?? undefined
  };
}

type ExtendedRequestInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

export async function fetchTopDaos(limit = 5, init: ExtendedRequestInit = {}): Promise<DaoSummary[]> {
  const { signal, headers: initHeaders, ...restInit } = init;

  const headers = new Headers(initHeaders as HeadersInit | undefined);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const controller = signal ? null : new AbortController();
  const activeSignal = signal ?? controller?.signal;
  const timeoutId = controller
    ? setTimeout(() => {
        controller.abort();
      }, DEFAULT_FETCH_TIMEOUT_MS)
    : null;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      ...restInit,
      method: 'POST',
      headers,
      body: JSON.stringify({ query: DAO_QUERY }),
      signal: activeSignal
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const json = (await response.json()) as GraphqlResponse;

    if (json.errors?.length) {
      throw new Error(json.errors.map((err) => err.message).filter(Boolean).join('; '));
    }

    const rawDaos = json.data?.daos ?? [];

    return rawDaos
      .filter((dao): dao is Dao => Boolean(dao) && Boolean(dao.id))
      .map(mapDao)
      .sort((a, b) => b.proposals - a.proposals)
      .slice(0, limit);
  } catch (error) {
    if (
      error instanceof DOMException &&
      (error.name === 'AbortError' || error.message === 'The operation was aborted.')
    ) {
      throw new Error('Request timed out. Please try again.');
    }

    throw error;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
