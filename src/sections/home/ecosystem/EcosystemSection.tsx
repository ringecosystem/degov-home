import { EcosystemSectionClient } from './EcosystemSectionClient';
import { fetchTopDaos } from '@/lib/degov';

export default async function EcosystemSection() {
  try {
    const daos = await fetchTopDaos(5, {
      next: {
        revalidate: 300
      }
    });
    return <EcosystemSectionClient initialDaos={daos} initialError={null} />;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load DAO data';
    return <EcosystemSectionClient initialDaos={[]} initialError={message} />;
  }
}
