import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  children: React.ReactNode;
}

function Card({ className, noPadding, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-[20px] border border-white/[0.06] bg-bg-card',
        !noPadding && 'p-5 md:p-[30px]',
        'transition-all duration-200',
        'hover:border-white/[0.12] hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card };
export type { CardProps };
