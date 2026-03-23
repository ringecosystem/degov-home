import { EcosystemSectionClient } from './EcosystemSectionClient';
import { fetchTopDaos, type DaoSummary } from '@/lib/degov';

export default async function EcosystemSection() {
  let initialDaos: DaoSummary[] = [];
  let initialError: string | null = null;

  try {
    initialDaos = await fetchTopDaos(5, {
      next: {
        revalidate: 300
      }
    });
  } catch (error) {
    initialError = error instanceof Error ? error.message : 'Failed to load DAO data';
  }

  return <EcosystemSectionClient initialDaos={initialDaos} initialError={initialError} />;
}
