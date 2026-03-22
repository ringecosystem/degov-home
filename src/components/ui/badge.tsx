import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'highlight' | 'network';
type NetworkName = 'ethereum' | 'arbitrum' | 'optimism' | 'polygon' | 'base';

const networkColors: Record<NetworkName, string> = {
  ethereum: 'bg-chain-ethereum/10 text-chain-ethereum',
  arbitrum: 'bg-chain-arbitrum/10 text-chain-arbitrum',
  optimism: 'bg-chain-optimism/10 text-chain-optimism',
  polygon: 'bg-chain-polygon/10 text-chain-polygon',
  base: 'bg-chain-base/10 text-chain-base'
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  network?: NetworkName;
}

function Badge({ variant = 'default', network, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variant === 'default' && 'bg-white/10 text-white',
        variant === 'highlight' && 'bg-brand-blue-dim text-brand-blue',
        variant === 'network' && network && networkColors[network],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps, NetworkName };
